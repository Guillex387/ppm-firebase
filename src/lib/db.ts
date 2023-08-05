import type { User } from 'firebase/auth';
import Crypto, { type Hash } from './crypto';
import FirebaseVars from './firebase';
import {
  CollectionReference,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

export interface Password {
  origin: string;
  email: string;
  password: string;
  createdAt: number;
  others?: {
    [key: string]: string;
  };
}

export interface PasswordWithId extends Password {
  id: string;
}

export interface DocumentData {
  masterKeyHash: Hash;
}

/**
 * A class for operate with the password database
 * @class
 */
class PasswordsDB {
  private static vars = new FirebaseVars();
  private static crypto = new Crypto<Password>();

  /**
   * Constructor of the database manager
   * @constructor
   * @param masterKey
   * @param user
   */
  constructor(private masterKey: string, private user: User) {}

  /**
   * A method for obtain the user document reference
   * @returns The user document reference
   */
  private async userDocument(): Promise<DocumentReference> {
    return doc(
      await PasswordsDB.vars.getFirestore(),
      'user-data',
      this.user.uid
    );
  }

  /**
   * A method for obtain the user passwords collection reference
   * @returns The passwords collection reference
   */
  private async userPasswords(): Promise<CollectionReference> {
    return collection(
      await PasswordsDB.vars.getFirestore(),
      'user-data',
      this.user.uid,
      'passwords'
    );
  }

  /**
   * A method for obtain a password reference
   * @returns The password reference
   */
  private async userPassword(id: string): Promise<DocumentReference> {
    return doc(
      await PasswordsDB.vars.getFirestore(),
      'user-data',
      this.user.uid,
      'passwords',
      id
    );
  }

  /**
   * Creates the main document of the user
   * @returns If is created
   */
  public async createDefaultDocument(): Promise<boolean> {
    const documentRef = await this.userDocument();
    const document = await getDoc(documentRef);
    if (document.exists()) return false;
    await setDoc(documentRef, {
      masterKeyHash: await PasswordsDB.crypto.generateHash(this.masterKey),
    });
    return true;
  }

  /**
   * Check if is a new account (without main document)
   */
  public async isNewAccount(): Promise<boolean> {
    const document = await getDoc(await this.userDocument());
    if (document.exists()) return false;
    return true;
  }

  /**
   * Checks if the encryption password is correct
   */
  public async verifyMasterKey(): Promise<boolean> {
    const document = await getDoc(await this.userDocument());
    if (!document.exists()) return false;
    const { masterKeyHash } = document.data() as DocumentData;
    return await PasswordsDB.crypto.verifyHash(this.masterKey, masterKeyHash);
  }

  /**
   * Fetch the passwords
   * @returns An array of passwords
   */
  public async getPasswords(): Promise<PasswordWithId[]> {
    const correctMasterKey = await this.verifyMasterKey();
    if (!correctMasterKey) throw new Error();
    const passwordsQuery = await getDocs(await this.userPasswords());
    if (passwordsQuery.empty) return [];
    const passwords: PasswordWithId[] = passwordsQuery.docs.map((doc) => {
      const encryptedPassword = doc.data().data as string;
      const password = PasswordsDB.crypto.decryptData(
        encryptedPassword,
        this.masterKey
      );
      return {
        ...password,
        id: doc.id,
      };
    });
    return passwords;
  }

  /**
   * Add a password to the database
   * @param password Password data
   */
  public async addPassword(password: Password): Promise<void> {
    const correctMasterKey = await this.verifyMasterKey();
    if (!correctMasterKey) throw new Error();
    await addDoc(await this.userPasswords(), {
      data: PasswordsDB.crypto.encryptData(password, this.masterKey),
    });
  }

  /**
   * Updates the info of a password
   * @param id
   * @param password New password data
   */
  public async updatePassword(id: string, password: Password) {
    const correctMasterKey = await this.verifyMasterKey();
    if (!correctMasterKey) throw new Error();
    await setDoc(await this.userPassword(id), {
      data: PasswordsDB.crypto.encryptData(password, this.masterKey),
    });
  }

  /**
   * Removes a password
   * @param id
   */
  public async deletePassword(id: string): Promise<void> {
    await deleteDoc(await this.userPassword(id));
  }
}

export default PasswordsDB;
