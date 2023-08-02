import { AES, enc, format } from 'crypto-js';
import * as scrypt from 'scrypt-pbkdf';

export interface Hash {
  hash: string;
  salt: string;
}

class Crypto<T> {
  private stringToBuffer(base64: string): ArrayBuffer {
    const raw = atob(base64);
    let array: number[] = [];
    for (let i = 0; i < raw.length; ++i) {
      const code = raw.charCodeAt(i);
      array.push(code);
    }
    return new Uint8Array(array).buffer;
  }

  private bufferToString(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    const raw = String.fromCharCode(...bytes);
    return btoa(raw);
  }

  public async generateHash(value: string, saltStr?: string): Promise<Hash> {
    const salt = saltStr ? this.stringToBuffer(saltStr) : scrypt.salt(16);
    const derivedKeyLength = 32;
    const result = await scrypt.scrypt(value, salt, derivedKeyLength, {
      r: 8,
      p: 1,
      N: 32768,
    });
    return {
      salt: this.bufferToString(salt),
      hash: this.bufferToString(result),
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
