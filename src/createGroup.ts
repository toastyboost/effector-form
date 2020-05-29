import { createEvent, createStore, Event, Store, Unit, is } from 'effector';

export type GroupConfig = {
  name: string;
  initialValue?: string[] | Store<string[]>;
  reset?: Unit<void>;
  map?: (value: string[]) => string[];
  validator?: (value: string[]) => string | null;
};

export type GroupResult = {
  name: string;
  $value: Store<string[]>;
  $error: Store<string | null>;
  $isTouched: Store<boolean>;
  changed: Event<string>;
  reset: Unit<void>;
};

export function createGroup({
  name,
  initialValue = [],
  reset = createEvent(`${name}Reset`),
  map,
  validator,
}: GroupConfig): GroupResult {
  const changed = createEvent<string>(`${name}Changed`);

  const $isTouched = createStore(false, { name: `${name}Touched` });
  const $source = is.unit(initialValue)
    ? initialValue
    : createStore(initialValue, { name: `${name}Store` });

  $source.on(reset, () => []);

  const $value = $source.map(map ?? ((a) => a));
  const $error = $source.map(validator ?? (() => null));

  $isTouched.on(changed, () => true);

  $source.on(changed, (state, payload) => {
    const index = state.indexOf(payload);

    if (index > -1) {
      return state.filter((selected) => selected !== payload);
    }
    return [...state, payload];
  });

  return { name, $value, $error, $isTouched, changed, reset };
}
