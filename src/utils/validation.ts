export const validateEmail = (email: string) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

/**
 * Функция проверяет наличие переданных ключей `keys` в объекте `object`
 * @param object Объект, в котором идёт поиск ключей
 * @param keys Массив ключей, которые ищутся в объекте
 */
export const objectHasKeys = (object: Object | null, keys: string[]) => {
  if (object === null) {
    return false;
  }

  for (const key of keys) {
    if (!(key in object)) {
      return false;
    }
  }

  return true;
};
