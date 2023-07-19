import { AES, SHA512, enc, format, lib } from 'crypto-js';

export interface Hash {
  hash: string;
  salt: string;
}

class Crypto<T> {
  public generateHash(value: string, saltStr?: string): Hash {
    const salt = saltStr ? enc.Base64.parse(saltStr) : lib.WordArray.random(16);
    const buffer = enc.Utf8.parse(value);
    const hash = SHA512(buffer.concat(salt));
    return {
      hash: hash.toString(enc.Base64),
      salt: salt.toString(enc.Base64),
    };
  }

  public verifyHash(value: string, hash: Hash): boolean {
    const generated = this.generateHash(value, hash.salt).hash;
    return generated === hash.hash;
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
