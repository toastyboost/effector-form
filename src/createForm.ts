import {
  createEvent,
  createStore,
  Event,
  Store,
  combine,
  merge,
} from 'effector';

import { FieldResult } from './createField';
import { fieldsValidator } from '../lib/validators';

type FormConfig = {
  name: string;
  fields: FieldResult[];
  submit: Event<React.FormEvent<HTMLFormElement>>;
  reset?: Event<void>;
};

export type FormResult = {
  $values: Store<Record<string, string>>;
  $errors: Store<Record<string, string>>;
  $isValid: Store<boolean>;
  $dirty: Store<boolean>;
  $submited: Store<boolean>;
};

export function createForm({
  name,
  fields,
  submit,
  reset = createEvent(`${name}Reset`),
}: FormConfig): FormResult {
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

  const $values: Store<Record<string, string>> = combine(
    fields.reduce(
      (accumulator, { $value, name: fieldName }) => ({
        ...accumulator,
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
