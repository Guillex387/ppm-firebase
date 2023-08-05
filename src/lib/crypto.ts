import { AES, enc, format } from 'crypto-js';
import * as scrypt from 'scrypt-pbkdf';
import { bufferToString, stringToBuffer } from '../utils';

export interface Hash {
  hash: string;
  salt: string;
}

/**
 * A class for data encryption and verification
 * @class
 */
class Crypto<T> {
  /**
   * Hashes the value with the scrypt algorithm
   * @param value
   * @param saltStr base64 salt
   * @returns The hash of the value
   */
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

  /**
   * Check a value with an scrypt hash
   * @param value
   * @param hash
   * @returns If the value is valid
   */
  public async verifyHash(value: string, hash: Hash): Promise<boolean> {
    const generated = await this.generateHash(value, hash.salt);
    return generated.hash === hash.hash;
  }

  /**
   * Encrypt the data with the AES algorithm
   * @param data
   * @param masterKey The encryption password
   * @returns
   */
  public encryptData(data: T, masterKey: string): string {
    const json = JSON.stringify(data);
    const encrypted = AES.encrypt(json, masterKey);
    return encrypted.toString(format.OpenSSL);
  }

  /**
   * Decrypt the data with the AES algorithm
   * @param buffer
   * @param masterKey The encryption password
   * @returns
   */
  public decryptData(buffer: string, masterKey: string): T {
    const parsedBuffer = format.OpenSSL.parse(buffer);
    const decrypted = AES.decrypt(parsedBuffer, masterKey);
    const json = decrypted.toString(enc.Utf8);
    return JSON.parse(json);
  }
}

export default Crypto;
