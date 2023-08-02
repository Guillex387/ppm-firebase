import { User } from 'firebase/auth';
import Crypto, { Hash } from './crypto';
import app from './firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

export interface Password {
  origin: string;
  email: string;
  password: string;
  score: number;
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
  private static db = getFirestore(app);
  private static crypto = new Crypto<Password>();

  constructor(private masterKey: string, private user: User) {}

  public async createDefaultDocument(): Promise<boolean> {
    const documentRef = doc(PasswordsDB.db, 'user-data', this.user.uid);
    const document = await getDoc(documentRef);
    if (document.exists()) return false;
    await setDoc(documentRef, {
      masterKeyHash: await PasswordsDB.crypto.generateHash(this.masterKey),
    });
    return true;
  }

  public async isNewAccount(): Promise<boolean> {
    const documentRef = doc(PasswordsDB.db, 'user-data', this.user.uid);
    const document = await getDoc(documentRef);
    if (document.exists()) return false;
    return true;
  }

  public async verifyMasterKey(): Promise<boolean> {
    const documentRef = doc(PasswordsDB.db, 'user-data', this.user.uid);
    const document = await getDoc(documentRef);
    if (!document.exists()) return false;
    const { masterKeyHash } = document.data() as DocumentData;
    return await PasswordsDB.crypto.verifyHash(this.masterKey, masterKeyHash);
  }

  public async getPasswords(): Promise<PasswordWithId[]> {
    const correctMasterKey = await this.verifyMasterKey();
    if (!correctMasterKey) throw new Error();
    const passwordsRef = collection(
      PasswordsDB.db,
      'user-data',
      this.user.uid,
      'passwords'
    );
    const passwordsQuery = await getDocs(passwordsRef);
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
    const passwordsRef = collection(
      PasswordsDB.db,
      'user-data',
      this.user.uid,
      'passwords'
    );
    const correctMasterKey = await this.verifyMasterKey();
    if (!correctMasterKey) throw new Error();
    await addDoc(passwordsRef, {
      data: PasswordsDB.crypto.encryptData(password, this.masterKey),
    });
  }

  public async updatePassword(id: string, password: Password) {
    const passwordRef = doc(
      PasswordsDB.db,
      'user-data',
      this.user.uid,
      'passwords',
      id
    );
    const correctMasterKey = await this.verifyMasterKey();
    if (!correctMasterKey) throw new Error();
    await setDoc(passwordRef, {
      data: PasswordsDB.crypto.encryptData(password, this.masterKey),
    });
  }

  public async deletePassword(id: string): Promise<void> {
    const documentRef = doc(
      PasswordsDB.db,
      'user-data',
      this.user.uid,
      'passwords',
      id
    );
    await deleteDoc(documentRef);
  }
}

export default PasswordsDB;
