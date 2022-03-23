export interface ICookieProps {
  [key: string]: string | number | Date | boolean | undefined;
  expires?: string | number | Date | undefined;
}

export function setCookie(
  name: string,
  value: string | number | boolean,
  props: ICookieProps = {},
) {
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const date = new Date();
    date.setTime(date.getTime() + exp * 1000);
    exp = props.expires = date;
  }

  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
