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

type Fields<Context, Config extends object = {}> = {
  [Key in keyof Context]: Field<Context[Key], Config>;
};

type FieldsResult<Context, Config = any> = {
  [Key in keyof Context]: FieldResult<Context[Key], Config>;
};

export type Errors<T> = {
  [Key in keyof T]: null | string;
};

export type Form<Value, Config extends {} = {}> = {
  name?: string;
  fields: Fields<Value, Config>;
  onSubmit: Event<void>;
  onReset?: Event<Value | void>;
};

type FormResult = {
  name: string;
  $valid: Store<boolean>;
  $submited: Store<boolean>;
  $dirty: Store<boolean>;
  $touched: Store<boolean>;
};

export function createForm<
  C,
  F extends { [key: string]: Field<any, C> }
>(form: {
  name?: string;
  fields: F;
  onSubmit: Event<void>;
  onReset?: Event<
    { [Key in keyof F]: F[Key] extends Field<infer T> ? T : never } | void
  >;
}): {
  $fields: {
    [Key in keyof F]: F[Key] extends Field<infer T, infer C>
      ? FieldResult<T, C>
      : never;
  };
  $values: Store<
    {
      [Key in keyof F]: F[Key] extends Field<infer T> ? T : never;
    }
  >;
  $errors: {
    [Key in keyof F]: string | null;
  };
} & FormResult {
  const {
    name = 'Form',
    fields,
    onSubmit = createEvent(`${name}Submit`),
    onReset = createEvent(`${name}Reset`),
  } = form;
  const $fields = Object.keys(fields).reduce((acc, fieldName) => {
    return {
      ...acc,
      [fieldName]: createField<T>(fields[fieldName]),
    };
  }, {} as FieldsResult<T>);

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

  const $touchedFields = merge(
    getKeys($fields).map((fieldName) => $fields[fieldName].$touched),
  );

  const $dirtyFields = merge(
    getKeys($fields).map((fieldName) => $fields[fieldName].onChange),
  );

  const $validFields = getKeys($fields).map(
    (fieldName) => $fields[fieldName].$error,
  );

  // cant use getKeys here
  const fieldsResets = Object.keys($fields).map(
    (fieldName) => $fields[fieldName].onReset,
  );

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
}
