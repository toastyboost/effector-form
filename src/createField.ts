import { createEvent, createStore, sample, is, Store, Event } from 'effector';

type Primitives = null | boolean | string | number | undefined;

export type FieldConfig = {
  name: string;
  length?: number;
  initial?: Primitives | Primitives[];
  reset: Event<void>;
  validator?: (value: Primitives) => string | null;
  map?: (value: Primitives) => Primitives;
};

export type FieldResult = {
  name: string;
  $value: Store<Primitives>;
  $error: Store<string | null>;
  $touched: Store<boolean>;
  changed: Event<Primitives>;
  reset: Event<void>;
};

export const createField = ({
  name,
  length,
  validator,
  initial,
  reset = createEvent(`${name}Reset`),
  map,
}: FieldConfig): FieldResult => {
  const changed = createEvent<Primitives>(`${name}Changed`);
  const $touched = createStore<boolean>(false, { name: `${name}Touched` });

  const $initial = is.store(initial)
    ? initial
    : createStore<Primitives | Primitives[]>(initial, { name: `${name}Store` });

  const $source = sample($initial);
  const $value = $source.map(map ?? ((a) => a));
  const $error = $source.map(validator ?? (() => null));

  $touched.on(changed, () => true);

  $source.on(reset, (_, value) => (Array.isArray(value) ? [] : ''));
  $source.on(changed, (state, value) => {
    if (Array.isArray(value)) {
      const index = state.indexOf(value);

      if (index > -1) {
        return state.filter((selected: Primitives) => selected !== value);
      }

      return [...state, value];
    } else {
      if (typeof value === 'string' && length) {
        return value.slice(0, length);
      }

      return value;
    }
  });

  sample({
    source: $initial,
    clock: reset,
    target: $source,
  });

  return {
    name,
    $value,
    $error,
    $touched,
    changed,
    reset,
  };
};
