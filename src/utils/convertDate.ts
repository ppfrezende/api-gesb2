import { format, getDay } from 'date-fns';

export function convertDate(date: string) {
  const parts = date.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const formattedDate = new Date(year, month, day);
  const formattedYear = formattedDate.getFullYear();
  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const formattedDay = String(formattedDate.getDate()).padStart(2, '0');

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

export function formatDateToDDMMYYYY(date: string) {
  const dateToFormat = new Date(date);

  const day = String(dateToFormat.getUTCDate()).padStart(2, '0');
  const month = String(dateToFormat.getUTCMonth() + 1).padStart(2, '0');
  const year = dateToFormat.getUTCFullYear().toString();
  return `${day}/${month}/${year}`;
}

export function formatWeekday(dateString: Date | string, locale: string) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const dayOfWeek = getDay(new Date(year, month, day));

  const daysOfWeekEN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const daysOfWeekPT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  let weekday;
  let dateFormatted;
  if (locale === 'USD') {
    weekday = daysOfWeekEN[dayOfWeek];
    dateFormatted = format(new Date(year, month, day), 'MM/dd/yyyy');
  } else if (locale === 'BRL') {
    weekday = daysOfWeekPT[dayOfWeek];
    dateFormatted = format(new Date(year, month, day), 'dd/MM/yyyy');
  }

  return {
    dateFormatted,
    weekday,
  };
}
