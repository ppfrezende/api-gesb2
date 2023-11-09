export function serialNumberToDate(serialNumber: number) {
  const baseDate = new Date(1900, 0, 1);
  const milliseconds = (serialNumber - 2) * 24 * 60 * 60 * 1000;
  const date = new Date(baseDate.getTime() + milliseconds);

  return date;
}
