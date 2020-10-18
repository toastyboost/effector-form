import {
  createEvent,
  createStore,
  combine,
  forward,
  merge,
  Event,
  Store,
  sample,
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
  onSubmit: Event<void>;
  onReset?: Event<Context | void>;
};

type FieldsResult<Context, Config> = {
  [P in keyof Context]: FieldResult<Context[keyof Context], Config>
}

export type FormResult<Context, Config> = {
  name: string;
  $fields: FieldsResult<Context, Config>;
  $values: Store<Context>;
  $errors: Store<Errors<Context>>;
  $valid: Store<boolean>;
  $submited: Store<boolean>;
  $dirty: Store<boolean>;
  $touched: Store<boolean>;
};

export const createForm = <T, C = any>({
  name = 'Form',
  fields,
  onSubmit = createEvent(`${name}Submit`),
  onReset = createEvent(`${name}Reset`),
}: Form<T, C>): FormResult<T, C> => {
  const $fields = getKeys(fields).reduce((acc, fieldName) => {
    return {
      ...acc,
      [fieldName]: createField<T[keyof T], C>(fields[fieldName]),
    };
  }, {}) as FieldsResult<T, C>;

  const $values = (combine(
    getKeys($fields).reduce(
      (acc, fieldName) => ({
        ...acc,
        [fieldName]: $fields[fieldName].$value,
      }),
      {} as T,
    ),
  ) as unknown) as Store<T>;

  const $errors = (combine(
    getKeys($fields).reduce(
      (acc, fieldName) => ({
        ...acc,
        [fieldName]: $fields[fieldName].$error,
      }),
      {} as Errors<T>,
    ),
  ) as unknown) as Store<Errors<T>>;

  const $touchedFields = merge<boolean>(
    getKeys($fields).map((fieldName) => $fields[fieldName].$touched),
  );

  const $dirtyFields = merge(
    getKeys($fields).map((fieldName) => $fields[fieldName].onChange),
  );

  const $validFields = getKeys($fields).map(
    (fieldName) => $fields[fieldName].$error,
  );

  const fieldsResets = getKeys($fields).map(
    (fieldName) => $fields[fieldName].onReset.prepend((field: T | void) => {
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

  $submited.on(onSubmit, () => true).on(onReset, () => true);
  $dirty.on($dirtyFields, () => true).on(onReset, () => false);
  $touched.on($touchedFields, () => true).on(onReset, () => false);

  forward({
    from: onReset,
    to: fieldsResets,
  });

  forward({
    from: $submited,
    to: $touched,
  });

  return {
    name,
    $fields,
    $values,
    $errors,
    $valid,
    $submited,
    $dirty,
    $touched,
  };
};
