import { createEvent, createStore, Event, Store, Unit } from 'effector';

export type FieldConfig = {
  name: string;
  initialValue?: string;
  maxLength?: number;
  reset?: Unit<void>;
  map?: (value: string) => string;
  validator?: (value: string) => string | null;
};

export type FieldResult = {
  name: string;
  $value: Store<string>;
  $error: Store<string | null>;
  changed: Event<React.ChangeEvent<HTMLInputElement | HTMLSelectElement>>;
};

export function createField({
  name,
  initialValue = '',
  reset = createEvent(`${name}Reset`),
  map,
  maxLength = -1,
  validator,
}: FieldConfig): FieldResult {
  const changed = createEvent<
    React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  >(`${name}Changed`);

  const $source = createStore(initialValue, { name: `${name}Store` });

  $source.on(reset, () => initialValue);

  const $value = $source.map(map ?? ((a) => a));
  const $error = $source.map(validator ?? (() => null));

  $source.on(changed, (_, payload) => {
    const value = payload.currentTarget.value;
    return maxLength < 0 ? value : value.slice(0, length);
  });

  return { name, $value, $error, changed };
}
