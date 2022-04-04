import { SECONDS_IN_DAY } from './constants';

export const digitDecl = (digit: number, declensions: [string, string, string]) => {
  if (digit >= 11 && digit < 15) {
    return declensions[2];
  }

  const lastLetter = parseInt(digit.toString().slice(-1), 10);
  if (lastLetter === 1) {
    return declensions[0];
  }

  if (lastLetter > 1 && lastLetter < 5) {
    return declensions[1];
  }

  if (lastLetter === 0 || lastLetter >= 5) {
    return declensions[2];
  }

  return 'Неопр.';
};

export const daysBetweenDates = (firstDate: Date, secondDate: Date) => {
  const difference = firstDate.getTime() - secondDate.getTime();
  return Math.ceil(difference / (1000 * SECONDS_IN_DAY));
};

export const humanizationDate = (dateUTC: string) => {
  const now = new Date();
  const processedUTCDate = new Date(dateUTC);
  const normalizedNowDate = new Date(now.setUTCHours(0, 0, 0));

  const datesDifference = daysBetweenDates(normalizedNowDate, processedUTCDate);
  if (datesDifference === 1) {
    return `Сегодня, ${processedUTCDate.toLocaleTimeString()}`;
  }

  if (datesDifference === 2) {
    return `Вчера, ${processedUTCDate.toLocaleTimeString()}`;
  }

  if (datesDifference === 3) {
    return `Позавчера, ${processedUTCDate.toLocaleTimeString()}`;
  }

  if (datesDifference <= 6) {
    const normalizedDays = (datesDifference - 1);
    return `${normalizedDays} ${digitDecl(normalizedDays, ['день', 'дня', 'дней'])} назад, ${processedUTCDate.toLocaleTimeString()}`;
  }

  return `${processedUTCDate.toLocaleDateString()} ${processedUTCDate.toLocaleTimeString()}`;
};
