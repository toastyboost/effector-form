import { createEvent, createStore, forward, Event, Store } from 'effector';

import { CreateConfig, CreateResult } from './createFields';

type CommonConfig = {
  name: string;
};

export interface FormConfig extends CommonConfig {
  fields: CreateConfig;
  submit: Event<void>;
  reset: Event<void>;
}

export interface FormResult extends CommonConfig {
  fields: CreateConfig;
  $submited: Store<boolean>;
}

export const createForm = ({
  name,
  fields,
  submit = createEvent(`${name}Reset`),
  reset = createEvent(`${name}Reset`),
}: FormConfig): FormResult => {
  const resets = Object.keys(fields).map(
    (fieldName) => fields[fieldName].reset,
  );

  const $submited = createStore<boolean>(false, {
    name: `${name}Submit`,
  });

  $submited.on(submit, () => true).on(reset, () => false);

  forward({
    from: reset,
    to: resets,
  });

  return {
    name,
    fields,
    $submited,
  };
};
