export function convertDecimalToHour(decimal: number) {
  if (decimal === 0 || null) {
    return '-:--';
  }

  const hoursInDay = 24;
  const hours = decimal * hoursInDay;
  const hourFloor = Math.floor(hours);
  let minutes = (hours - hourFloor) * 60;

  minutes = Math.round(minutes);

  let adjustedHour = hourFloor;
  if (minutes === 60) {
    adjustedHour += 1;
    minutes = 0;
  }

  const formattedHour = `${adjustedHour.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}h`;

  return formattedHour;
}

export function convertHourToDecimal(formattedHour: string): number | null {
  const hoursInDay = 24;

  if (formattedHour === '-:--') {
    return null;
  }

  if (formattedHour === '00:00h') {
    return 1;
  }

  if (formattedHour === '00:01h') {
    return 0;
  }

  const [hourStr, minuteStr] = formattedHour.replace('h', '').split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const decimalHour = hour / hoursInDay;
  const decimalMinute = minute / 60 / hoursInDay;

  return decimalHour + decimalMinute;
}
