import {
  createEvent,
  createStore,
  Store,
  combine,
  merge,
  forward,
  Unit,
} from 'effector';

import { InputResult } from './createInput';
import { GroupResult } from './createGroup';
import { FieldResult } from './createField';

import { fieldsValidator } from './lib/validators';

export type FormConfig<T> = {
  name: string;
  fields: (InputResult | GroupResult | FieldResult<any>)[];
  submit: Unit<void>;
  reset?: Unit<void>;
};

export type FormResult<T> = {
  $values: Store<{ [K in keyof T]: T[K] extends Store<infer U> ? U : T[K] }>;
  $errors: Store<{ [K in keyof T]: T[K] extends Store<infer U> ? U : T[K] }>;
  $isValid: Store<boolean>;
  $dirty: Store<boolean>;
  $submited: Store<boolean>;
};

export function createForm<T>({
  name,
  fields,
  submit,
  reset = createEvent(`${name}Reset`),
}: FormConfig<T>): FormResult<T> {
  const $dirty = createStore<boolean>(false, {
    name: `${name}Touch`,
  });

  const $submited = createStore<boolean>(false, {
    name: `${name}Submit`,
  });

  const $dirtyFields = merge(fields.map(({ changed }) => changed));

  const resets = fields.map(({ reset }) => reset);
  const $isValid = fieldsValidator(fields);

  $submited.on(submit, () => true).on(reset, () => false);
  $dirty.on($dirtyFields, () => true).on(reset, () => false);

  const $values = combine(
    fields.reduce(
      (fields, { $value, name: fieldName }) => ({
        ...fields,
        [fieldName]: $value,
      }),
      {} as T,
    ),
  );

  const $errors = combine(
    fields.reduce(
      (accumulator, { $error, name: fieldName }) => ({
        ...accumulator,
        [fieldName]: $error,
      }),
      {} as T,
    ),
  );

  forward({
    from: reset,
    to: resets,
  });

  return { $values, $errors, $isValid, $dirty, $submited };
}
