import { PasswordMeter } from 'password-meter/src/index';

/**
 * Format the unix date in a human readable date
 * @param date The unix date
 * @param long choose between long and short format
 * @returns The date string
 */
export function formatDate(date: number, long: boolean = false): string {
  const timeFormat = Intl.DateTimeFormat('en', {
    dateStyle: long ? 'full' : 'short',
    timeStyle: long ? 'medium' : undefined,
  });
  return timeFormat.format(date);
}

/**
 * Rates the security of a password
 * @param password
 * @returns Score between 0 and 100
 */
export function passwordScore(password: string): number {
  const meter = new PasswordMeter();
  return meter.getResult(password).percent;
}

/**
 * Converts a base64 string in a binary buffer
 * @param base64 buffer in base64
 * @returns binary buffer
 */
export function stringToBuffer(base64: string): ArrayBuffer {
  const raw = atob(base64);
  let array: number[] = [];
  for (let i = 0; i < raw.length; ++i) {
    const code = raw.charCodeAt(i);
    array.push(code);
  }
  return new Uint8Array(array).buffer;
}

/**
 * Converts a binary buffer in a base64 string
 * @param buffer binary buffer
 * @returns base64 string
 */
export function bufferToString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const raw = String.fromCharCode(...bytes);
  return btoa(raw);
}
