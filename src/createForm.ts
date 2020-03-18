import {
  createEvent,
  createStore,
  Event,
  Store,
  combine,
  merge,
} from 'effector';

import { FieldResult } from './createField';
import { GroupResult } from './createGroup';

import { fieldsValidator } from '../lib/validators';

export type FormConfig = {
  name: string;
  fields: (FieldResult | GroupResult)[];
  submit: Event<void>;
  reset?: Event<void>;
};

export type FormResult<V> = {
  $values: Store<V>;
  $errors: Store<Record<string, string>>;
  $isValid: Store<boolean>;
  $dirty: Store<boolean>;
  $submited: Store<boolean>;
};

export function createForm<V>({
  name,
  fields,
  submit,
  reset = createEvent(`${name}Reset`),
}: FormConfig): FormResult<V> {
  const $dirty = createStore<boolean>(false, {
    name: `${name}Touch`,
  });

  const $submited = createStore<boolean>(false, {
    name: `${name}Submit`,
  });

  const $dirtyFields = merge(fields.map(({ changed }) => changed));
  const $isValid = fieldsValidator(fields);

  $submited.on(submit, () => true).on(reset, () => false);
  $dirty.on($dirtyFields, () => true).on(reset, () => false);

  const $values: Store<any> = combine(
    fields.reduce(
      (fields, { $value, name: fieldName }) => ({
        ...fields,
        ...{ [fieldName]: $value },
      }),
      {},
    ),
  );

  const $errors: Store<Record<string, string>> = combine(
    fields.reduce(
      (accumulator, { $error, name: fieldName }) => ({
        ...accumulator,
        ...{ [fieldName]: $error },
      }),
      {},
    ),
  );

  return { $values, $errors, $isValid, $dirty, $submited };
}
