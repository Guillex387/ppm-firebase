export function formatDate(date: string, long: boolean = false): string {
  const timeFormat = Intl.DateTimeFormat('en', {
    dateStyle: long ? 'full' : 'short',
  });
  return timeFormat.format(new Date(date));
}
