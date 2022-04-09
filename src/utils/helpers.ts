import dayjs from 'dayjs';
import 'dayjs/locale/ru';
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
  const dayJsDate = dayjs(processedUTCDate);
  const processedUTCTime = dayJsDate.format('HH:mm');
  const normalizedNowDate = new Date(now.setUTCHours(0, 0, 0));
  const timeZone = dayJsDate.format('Z');
  const gmtValue = `i-GMT${timeZone[0]}${parseInt(timeZone.slice(1, 3), 10)}`;

  const datesDifference = daysBetweenDates(normalizedNowDate, processedUTCDate);
  if (datesDifference === 1 || datesDifference <= 0) {
    return `Сегодня, ${processedUTCTime} ${gmtValue}`;
  }

  if (datesDifference === 2) {
    return `Вчера, ${processedUTCTime} ${gmtValue}`;
  }

  if (datesDifference === 3) {
    return `Позавчера, ${processedUTCTime} ${gmtValue}`;
  }

  if (datesDifference <= 6) {
    const normalizedDays = (datesDifference - 1);
    return `${normalizedDays} ${digitDecl(normalizedDays, ['день', 'дня', 'дней'])} назад, ${processedUTCTime} ${gmtValue}`;
  }

  return `${dayJsDate.format('DD.MM.YYYY')} ${processedUTCTime} ${gmtValue}`;
};

export const humanizationOrderStatus = (status: string) => {
  switch (status) {
    case 'done':
      return {
        status,
        name: 'Выполнен',
        fontClass: 'text_color_success',
      };
    case 'created':
      return {
        status,
        name: 'Создан',
        fontClass: '',
      };
    case 'pending':
      return {
        status,
        name: 'Готовится',
        fontClass: '',
      };
    case 'canceled':
      return {
        status,
        name: 'Отменен',
        fontClass: 'text_color_error',
      };
    default:
      return {
        status,
        name: 'Не определен',
        fontClass: 'text_color_error',
      };
  }
};
