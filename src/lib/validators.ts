export function isObjectEmpty(obj: object) {
  return Object.getOwnPropertyNames(obj).length > 0;
}

export const loginValidator = (login: string) => {
  if (login.length === 0) {
    return 'Обязательное поле';
  }
  if (!/\w+/.test(login)) {
    return 'Некорректное имя';
  }
  return null;
};

export const passValidator = (password: string) => {
  if (password.length === 0) {
    return 'Обязательное поле';
  }
  return null;
};

export const getKeys = <T extends {}>(o: T): Array<keyof T> =>
  <Array<keyof T>>Object.keys(o);
