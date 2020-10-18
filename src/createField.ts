import { createEvent, createStore, Store, Event } from 'effector';

export type Field<Value, Config = any> = {
  name?: string;
  initial?: Value | string;
  onReset?: Event<Value | void>;
  onValidate?: (value: Value | string) => string | null;
  map?: (value: Value | string) => Value;
  config?: Config;
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

export const createField = <Value, Config>(field: Field<Value, Config>) => {
  const {
    name = 'Field',
    initial = '',
    onValidate,
    onReset = createEvent<Value | void>(`${name}Reset`),
    map,
    config,
  } = field;
  const onChange = createEvent<Value>(`${name}Changed`);

  const $touched = createStore<boolean>(false, { name: `${name}Touched` });
  const $initial = createStore<Value | string>(initial, {
    name: `${name}Store`,
  });

  const $source = $initial.on(onReset, (_, payload) => {
    if (payload) return payload;
    return '';
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
