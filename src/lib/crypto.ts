import { AES, enc, format } from 'crypto-js';
import * as scrypt from 'scrypt-pbkdf';
import { bufferToString, stringToBuffer } from '../utils';

export interface Hash {
  hash: string;
  salt: string;
}

class Crypto<T> {
  public async generateHash(value: string, saltStr?: string): Promise<Hash> {
    const salt = saltStr ? stringToBuffer(saltStr) : scrypt.salt(16);
    const derivedKeyLength = 32;
    const result = await scrypt.scrypt(value, salt, derivedKeyLength, {
      r: 8,
      p: 1,
      N: 32768,
    });
    return {
      salt: bufferToString(salt),
      hash: bufferToString(result),
    };
  }

  public async verifyHash(value: string, hash: Hash): Promise<boolean> {
    const generated = await this.generateHash(value, hash.salt);
    return generated.hash === hash.hash;
  }

  public encryptData(data: T, masterKey: string): string {
    const json = JSON.stringify(data);
    const encrypted = AES.encrypt(json, masterKey);
    return encrypted.toString(format.OpenSSL);
  }

  public decryptData(buffer: string, masterKey: string): T {
    const parsedBuffer = format.OpenSSL.parse(buffer);
    const decrypted = AES.decrypt(parsedBuffer, masterKey);
    const json = decrypted.toString(enc.Utf8);
    return JSON.parse(json);
  }
}

export default Crypto;
