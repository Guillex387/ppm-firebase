import { AES, enc, format, lib } from 'crypto-js';
import { hash, verify } from 'argon2-browser';

class Crypto<T> {
  public async generateHash(value: string, salt?: string): Promise<string> {
    const result = await hash({
      pass: value,
      salt: salt ?? lib.WordArray.random(16).toString(enc.Base64),
      time: 20,
      mem: 32768,
      hashLen: 32,
    });
    return result.encoded;
  }

  public async verifyHash(value: string, hash: string): Promise<boolean> {
    try {
      verify({
        pass: value,
        encoded: hash,
      });
      return true;
    } catch (error) {
      return false;
    }
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
