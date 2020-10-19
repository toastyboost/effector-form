import { createEvent, createStore, Store, Event } from 'effector';

export type Field<Value, Config = unknown> = {
  name?: string;
  initial: Value;
  reset?: Event<Value | void>;
  validate?: (value: Value) => string | null;
  map?: (value: Value) => Value;
  config?: Config;
};

export type FieldResult<Value, Config> = {
  name: string;
  $value: Store<Value>;
  $error: Store<string | null>;
  $touched: Store<boolean>;
  change: Event<Value>;
  reset: Event<Value | void>;
  config: Config | undefined;
};

export const createField = <Value, Config>(field: Field<Value, Config>): FieldResult<Value, Config> => {
  const {
    name = 'Field',
    initial,
    reset = createEvent<Value | void>(`${name}Reset`),
    validate,
    map,
    config,
  } = field;
  const change = createEvent<Value>(`${name}Changed`);

  const $touched = createStore<boolean>(false, { name: `${name}Touched` });
  const $initial = createStore<Value>(initial, {
    name: `${name}Store`,
  });

  const $source = $initial
    .on(change, (_, value) => value)
    .on(reset, (_, payload) => {

      if (payload) return payload;

      if (typeof payload === 'undefined') {

        if (Array.isArray(initial)) {
          return [] as unknown as Value;
        }

        switch (typeof initial) {
          case 'number':
            return 0 as unknown as Value;
          case 'boolean':
            return false as unknown as Value;
          case 'object':
            return null as unknown as Value;
          default:
            return '' as unknown as Value;
        }
      }

      return initial;
    });

  const $value = $source.map(map ?? ((a) => a));
  const $error = $source.map(validate ?? (() => null));

  $touched.on(change, () => true);

  return {
    name,
    $value,
    $error,
    $touched,
    change,
    reset,
    config,
  };
};
