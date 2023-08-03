import { PasswordMeter } from 'password-meter/src/index';

export function formatDate(date: number, long: boolean = false): string {
  const timeFormat = Intl.DateTimeFormat('en', {
    dateStyle: long ? 'full' : 'short',
    timeStyle: long ? 'medium' : undefined,
  });
  return timeFormat.format(date);
}

export function passwordScore(password: string): number {
  const meter = new PasswordMeter();
  return meter.getResult(password).percent;
}

export function stringToBuffer(base64: string): ArrayBuffer {
  const raw = atob(base64);
  let array: number[] = [];
  for (let i = 0; i < raw.length; ++i) {
    const code = raw.charCodeAt(i);
    array.push(code);
  }
  return new Uint8Array(array).buffer;
}

export function bufferToString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const raw = String.fromCharCode(...bytes);
  return btoa(raw);
}
