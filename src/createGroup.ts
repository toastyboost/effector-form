import { createEvent, createStore, Event, Store, Unit } from 'effector';

export type GroupConfig = {
  name: string;
  initialValue?: string[];
  reset?: Unit<void>;
  map?: (value: string[]) => string[];
  validator?: (value: string[]) => string | null;
};

export type GroupResult = {
  name: string;
  $value: Store<string[]>;
  $error: Store<string | null>;
  changed: Event<React.ChangeEvent<HTMLInputElement>>;
};

export function createGroup({
  name,
  initialValue = [],
  reset = createEvent(`${name}Reset`),
  map,
  validator,
}: GroupConfig): GroupResult {
  const changed = createEvent<React.ChangeEvent<HTMLInputElement>>(
    `${name}Changed`,
  );

  const $source = createStore(initialValue, { name: `${name}Store` });

  $source.on(reset, () => initialValue);

  const $value = $source.map(map ? (value) => map(value) : (a) => a);
  const $error = $source.map(validator ?? (() => null));

  $source.on(changed, (state, payload) => {
    const value = payload.currentTarget.value;
    const index = state.indexOf(value);
    if (index > -1) {
      return state.filter((selected) => selected !== value);
    }
    return [...state, value];
  });

  return { name, $value, $error, changed };
}
