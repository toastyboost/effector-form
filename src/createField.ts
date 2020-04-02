import { createEvent, createStore, Event, Store, Unit, is } from 'effector';

export type FieldConfig = {
  name: string;
  initialValue?: string | Store<string>;
  length?: number;
  reset?: Unit<void | React.MouseEvent<HTMLElement, MouseEvent>>;
  map?: (value: string) => string;
  validator?: (value: string) => string | null;
};

export type FieldResult = {
  name: string;
  $value: Store<string>;
  $error: Store<string | null>;
  changed: Event<
    React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  >;
  reset: Unit<void | React.MouseEvent<HTMLElement, MouseEvent>>;
};

export function createField({
  name,
  initialValue = '',
  reset = createEvent(`${name}Reset`),
  map,
  length = -1,
  validator,
}: FieldConfig): FieldResult {
  const changed = createEvent<
    React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  >(`${name}Changed`);

  const $source = is.unit(initialValue)
    ? initialValue
    : createStore(initialValue, { name: `${name}Store` });

  $source.on(reset, () => '');

  const $value = $source.map(map ?? ((a) => a));
  const $error = $source.map(validator ?? (() => null));

  $source.on(changed, (_, payload) => {
    const value =
      typeof payload === 'string' ? payload : payload.currentTarget.value;
    return length < 0 ? value : value.slice(0, length);
  });

  return { name, $value, $error, changed, reset };
}
