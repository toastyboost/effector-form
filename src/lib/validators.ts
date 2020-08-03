import { combine } from 'effector';

export function isObjectEmpty(obj: object) {
  return Object.getOwnPropertyNames(obj).length > 0;
}
