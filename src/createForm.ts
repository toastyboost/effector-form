import {
  createEvent,
  createStore,
  combine,
  forward,
  merge,
  Event,
  Store,
} from 'effector';

import { createField, Field, FieldResult } from './createField';
import { getKeys } from './lib/validators';


export type Errors<T> = {
  [P in keyof T]: null | string;
};

type FieldsConfigs<Context, Config> = {
  [P in keyof Context]: Field<Context[keyof Context], Config>
}

export type Form<Context, Config> = {
  name?: string;
  fields: FieldsConfigs<Context, Config>;
  submit: Event<void>;
  reset?: Event<Context | void>;
};

type FieldsResult<Context, Config> = {
  [P in keyof Context]: FieldResult<Context[keyof Context], Config>
}

export type FormResult<Context, Config> = {
  name: string;
  inputs: FieldsResult<Context, Config>;
  $values: Store<Context>;
  $errors: Store<Errors<Context>>;
  $valid: Store<boolean>;
  $submited: Store<boolean>;
  $dirty: Store<boolean>;
  $touched: Store<boolean>;
};

export const createForm = <T, C = unknown>({
  name = 'Form',
  fields,
  submit = createEvent(`${name}Submit`),
  reset = createEvent(`${name}Reset`),
}: Form<T, C>): FormResult<T, C> => {
  const inputs = getKeys(fields).reduce((acc, fieldName) => {
    return {
      ...acc,
      [fieldName]: createField<T[keyof T], C>(fields[fieldName]),
    };
  }, {}) as FieldsResult<T, C>;

  const $values = (combine(
    getKeys(inputs).reduce(
      (acc, fieldName) => ({
        ...acc,
        [fieldName]: inputs[fieldName].$value,
      }),
      {} as T,
    ),
  ) as unknown) as Store<T>;

  const $errors = (combine(
    getKeys(inputs).reduce(
      (acc, fieldName) => ({
        ...acc,
        [fieldName]: inputs[fieldName].$error,
      }),
      {} as Errors<T>,
    ),
  ) as unknown) as Store<Errors<T>>;

  const $touchedFields = merge<boolean>(
    getKeys(inputs).map((fieldName) => inputs[fieldName].$touched),
  );

  const $dirtyFields = merge(
    getKeys(inputs).map((fieldName) => inputs[fieldName].change),
  );

  const $validFields = getKeys(inputs).map(
    (fieldName) => inputs[fieldName].$error,
  );

  const fieldsResets = getKeys(inputs).map(
    (fieldName) => inputs[fieldName].reset.prepend((field: T | void) => {
      if (field) {
        return field[fieldName]
      }
    }))

  const $valid = combine($validFields, (all) => all.every((e) => !e));

  const $submited = createStore<boolean>(false, {
    name: `${name}Submit`,
  });

  const $dirty = createStore<boolean>(false, {
    name: `${name}Touch`,
  });

  const $touched = createStore<boolean>(false, {
    name: `${name}Submit`,
  });

  $submited.on(submit, () => true).on(reset, () => true);
  $dirty.on($dirtyFields, () => true).on(reset, () => false);
  $touched.on($touchedFields, () => true).on(reset, () => false);

  forward({
    from: reset,
    to: fieldsResets,
  });

  forward({
    from: $submited,
    to: $touched,
  });

  return {
    name,
    inputs,
    $values,
    $errors,
    $valid,
    $submited,
    $dirty,
    $touched,
  };
};
