import { User } from 'firebase/auth';
import Crypto, { Hash } from './crypto';
import app from './firebase';
import {
  DocumentSnapshot,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

export interface Password {
  origin: string;
  email: string;
  password: string;
  score: number;
  createdAt: Date;
  others?: Object;
}

export interface PasswordWithId extends Password {
  id: string;
}

export interface DocumentData {
  masterKeyHash: Hash;
}

class PasswordsDB {
  private static db = getFirestore(app);

  constructor(
    private _masterKey: string,
    private crypto: Crypto<Password>,
    private user: User
  ) {}

  public set masterKey(value: string) {
    this._masterKey = value;
  }

  public async getUserDocument(): Promise<DocumentSnapshot> {
    // TODO
    // const documentRef = doc(PasswordsDB.db, 'user-data', this.user.uid);
    // const document = await getDoc(documentRef);
    // return document;
  }

  public async createDefaultDocument(): Promise<void> {
    // TODO
  }

  public async verifyMasterKey(): Promise<boolean> {
    // TODO
    // const document = await this.getUserDocument();
    // if (!document.exists()) return false;
    // const documentData = document.data() as DocumentData;
    // return this.crypto.verifyHash(this._masterKey, documentData.masterKeyHash);
  }

  public async getPasswords(): Promise<Password[]> {
    // TODO
  }

  public async addPassword(password: Password): Promise<void> {
    // TODO
  }

  public async deletePassword(id: number): Promise<void> {
    // TODO
  }
}

export default PasswordsDB;
