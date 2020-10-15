import { createEvent, createStore, Store, Event } from 'effector';

export type Field<Value, Config = any> = {
  name?: string;
  initial: Value;
  onReset?: Event<Value | void>;
  onValidate?: (value: Value) => string | null;
  map?: (value: Value) => Value;
  // how to use infer here
  config: Config;
};

export type FieldResult<Value, Config> = {
  name: string;
  $value: Store<Value>;
  $error: Store<string | null>;
  $touched: Store<boolean>;
  onChange: Event<Value>;
  onReset: Event<Value | void>;

  config: Config;
};

export const createField = <T, F extends Field<T>>(
  field: F,
): F extends Field<T, infer C> ? FieldResult<T, C> : never => {
  const {
    name = 'Field',
    initial,
    onValidate,
    onReset = createEvent(`${name}Reset`),
    map,
    config,
  } = field;
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
