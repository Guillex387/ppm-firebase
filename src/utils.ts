export function formatDate(date: number, long: boolean = false): string {
  const timeFormat = Intl.DateTimeFormat('en', {
    dateStyle: long ? 'full' : 'short',
    timeStyle: long ? 'medium' : undefined,
  });
  return timeFormat.format(date);
}
