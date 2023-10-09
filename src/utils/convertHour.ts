export function convertDecimalToHour(decimal: number) {
  const hoursInDay = 24;
  const hours = decimal * hoursInDay;
  const hourFloor = Math.floor(hours);
  const minutes = (hours - hourFloor) * 60;

  const formattedHour = `${hourFloor}:${minutes.toFixed(0).padStart(2, '0')}h`;

  return formattedHour;
}

export function convertHourToDecimal(formattedHour: string): number {
  const hoursInDay = 24;

  const [hourStr, minuteStr] = formattedHour.replace('h', '').split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const decimalHour = hour / hoursInDay;
  const decimalMinute = minute / 60 / hoursInDay;

  return decimalHour + decimalMinute;
}
