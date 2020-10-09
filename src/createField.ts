import { createEvent, createStore, Store, Event } from 'effector';

export type Field<T> = {
  name?: string;
  initial: T;
  onReset?: Event<T | void>;
  onValidate?: (value: T) => string | null;
  map?: (value: T) => T;
  config: object;
};

export type FieldResult<T> = {
  name: string;
  $value: Store<T>;
  $error: Store<string | null>;
  $touched: Store<boolean>;
  onChange: Event<T>;
  onReset: Event<T | void>;
  config: object;
};

export const createField = <T>({
  name = 'Field',
  initial,
  onValidate,
  onReset = createEvent(`${name}Reset`),
  map,
  config,
}: Field<T>): FieldResult<T> => {
  const onChange = createEvent<T>(`${name}Changed`);

  const $touched = createStore<boolean>(false, { name: `${name}Touched` });
  const $initial = createStore<T>(initial, {
    name: `${name}Store`,
  });

  const $source = $initial.on(onReset, (_, payload) => {
    if (payload) return payload;
    return initial;
  });

  const $value = $source.map(map ?? ((a) => a));
  const $error = $source.map(onValidate ?? (() => null));

  $touched.on(onChange, () => true);
  $source.on(onChange, (_, value) => value);

  return {
    name,
    $value,
    $error,
    $touched,
    onChange,
    onReset,
    config,
  };
};
