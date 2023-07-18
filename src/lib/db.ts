import auth from './auth';
import app from './firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { AES, enc, format } from 'crypto-js';

export interface Password {
  id: number;
  origin: string;
  email: string;
  password: string;
  score: number;
  createdAt: Date;
  others?: Object;
}

export interface EncryptedPassword {}

interface DocumentData {
  data: string[];
}

class PasswordsDB {
  private static db = getFirestore(app);

  constructor(private masterKey: string) {}

  private decryptPassword(password: string): Password {
    const parsed = format.OpenSSL.parse(password);
    const decrypted = AES.decrypt(parsed, this.masterKey);
    const obj: Password = JSON.parse(decrypted.toString(enc.Utf8));
    return obj;
  }

  private encryptPassword(password: Password): string {
    const json = JSON.stringify(password);
    const encrypted = AES.encrypt(json, this.masterKey);
    return encrypted.toString(format.OpenSSL);
  }

  // TODO: refactor the method for error handling
  public async getPasswords(): Promise<Password[]> {
    if (auth.currentUser === null) return [];
    const documentRef = doc(PasswordsDB.db, 'user-data', auth.currentUser.uid);
    const document = (await getDoc(documentRef)).data();
    if (document === undefined) return [];
    const passwords = document as DocumentData;
    return passwords.data.map(this.decryptPassword);
  }

  public async addPasswords(): Promise<void> {
    // TODO
  }
}

export default PasswordsDB;
