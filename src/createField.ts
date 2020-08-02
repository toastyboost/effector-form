import {
  createEvent,
  createStore,
  sample,
  Event,
  Store,
  Unit,
  is,
} from 'effector';

export type FieldConfig<T> = {
  name: string;
  initialValue: T | Store<T>;
  reset?: Unit<void>;
  map?: (value: T) => T;
  validator?: (value: T) => T | null;
};

export type FieldResult<T> = {
  name: string;
  $value: Store<T>;
  $error: Store<T | null>;
  $isTouched: Store<boolean>;
  changed: Event<T>;
  reset: Unit<void>;
};

export function createField<T>({
  name,
  initialValue,
  reset = createEvent(`${name}Reset`),
  map,
  validator,
}: FieldConfig<T>): FieldResult<T> {
  const changed = createEvent<T>(`${name}Changed`);
  const $isTouched = createStore(false, { name: `${name}Touched` });

  const $initialValue = is.unit(initialValue)
    ? initialValue
    : createStore(initialValue, { name: `${name}Store` });

  const $source = sample($initialValue);

  const $value = $source.map(map ?? ((a) => a));
  const $error = $source.map(validator ?? (() => null));

  sample({
    source: $initialValue,
    clock: reset,
    target: $source,
  });

  $isTouched.on(changed, () => true);
  $source.on(changed, (_state, payload) => payload);

  return { name, $value, $error, $isTouched, changed, reset };
}
