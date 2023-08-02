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
