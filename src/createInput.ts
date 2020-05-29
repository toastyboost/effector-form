import { createEvent, createStore, Event, Store, Unit, is } from 'effector';

export type InputConfig = {
  name: string;
  initialValue?: string | Store<string>;
  length?: number;
  reset?: Unit<void>;
  map?: (value: string) => string;
  validator?: (value: string) => string | null;
};

export type InputResult = {
  name: string;
  $value: Store<string>;
  $error: Store<string | null>;
  $isTouched: Store<boolean>;
  changed: Event<string>;
  reset: Unit<void>;
};

export function createInput({
  name,
  initialValue = '',
  reset = createEvent(`${name}Reset`),
  map,
  length,
  validator,
}: InputConfig): InputResult {
  const changed = createEvent<string>(`${name}Changed`);
  const $isTouched = createStore(false, { name: `${name}Touched` });

  const $source = is.unit(initialValue)
    ? initialValue
    : createStore(initialValue, { name: `${name}Store` });

  const $value = $source.map(map ?? ((a) => a));
  const $error = $source.map(validator ?? (() => null));

  $isTouched.on(changed, () => true);
  $source.on(reset, () => '');

  $source.on(changed, (_, payload) => {
    if (typeof payload === 'string' && length) {
      return payload.slice(0, length);
    }

    return payload;
  });

  return { name, $value, $error, $isTouched, changed, reset };
}
