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

class PasswordsDB {
  private static vars = new FirebaseVars();
  private static crypto = new Crypto<Password>();

  constructor(private masterKey: string, private user: User) {}

  private async userDocument(): Promise<DocumentReference> {
    return doc(
      await PasswordsDB.vars.getFirestore(),
      'user-data',
      this.user.uid
    );
  }

  private async userPasswords(): Promise<CollectionReference> {
    return collection(
      await PasswordsDB.vars.getFirestore(),
      'user-data',
      this.user.uid,
      'passwords'
    );
  }

  private async userPassword(id: string): Promise<DocumentReference> {
    return doc(
      await PasswordsDB.vars.getFirestore(),
      'user-data',
      this.user.uid,
      'passwords',
      id
    );
  }

  public async createDefaultDocument(): Promise<boolean> {
    const documentRef = await this.userDocument();
    const document = await getDoc(documentRef);
    if (document.exists()) return false;
    await setDoc(documentRef, {
      masterKeyHash: await PasswordsDB.crypto.generateHash(this.masterKey),
    });
    return true;
  }

  public async isNewAccount(): Promise<boolean> {
    const document = await getDoc(await this.userDocument());
    if (document.exists()) return false;
    return true;
  }

  public async verifyMasterKey(): Promise<boolean> {
    const document = await getDoc(await this.userDocument());
    if (!document.exists()) return false;
    const { masterKeyHash } = document.data() as DocumentData;
    return await PasswordsDB.crypto.verifyHash(this.masterKey, masterKeyHash);
  }

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

  public async addPassword(password: Password): Promise<void> {
    const correctMasterKey = await this.verifyMasterKey();
    if (!correctMasterKey) throw new Error();
    await addDoc(await this.userPasswords(), {
      data: PasswordsDB.crypto.encryptData(password, this.masterKey),
    });
  }

  public async updatePassword(id: string, password: Password) {
    const correctMasterKey = await this.verifyMasterKey();
    if (!correctMasterKey) throw new Error();
    await setDoc(await this.userPassword(id), {
      data: PasswordsDB.crypto.encryptData(password, this.masterKey),
    });
  }

  public async deletePassword(id: string): Promise<void> {
    await deleteDoc(await this.userPassword(id));
  }
}

export default PasswordsDB;
