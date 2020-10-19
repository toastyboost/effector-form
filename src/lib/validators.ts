

type ValidatorResult = string | null;

export const loginValidator = (login: string): ValidatorResult => {
  if (login.length === 0) {
    return 'Обязательное поле';
  }
  if (!/\w+/.test(login)) {
    return 'Некорректное имя';
  }
  return null;
};

export const passValidator = (password: string): ValidatorResult => {
  if (password.length === 0) {
    return 'Обязательное поле';
  }
  return null;
};

export function getKeys<T extends Record<string, unknown>>(o: T): Array<keyof T> {
  return <Array<keyof T>>Object.keys(o);
}

export function isObjectEmpty(obj: Record<string, unknown>): boolean {
  return Object.getOwnPropertyNames(obj).length > 0;
}