import { createEvent } from 'effector';

import { createField, createGroup, createForm } from '../src';
import { loginValidator, passValidator } from '../lib/validators';

export const resetForm = createEvent<void>();
export const submitForm = createEvent<React.FormEvent<HTMLFormElement>>();

export const nameField = createField({
  name: 'login',
  validator: loginValidator,
});

export const passField = createField({
  name: 'password',
  validator: passValidator,
});

export const petsField = createField({
  name: 'pets',
});

export const genderField = createGroup({
  name: 'gender',
});

export const fruitsField = createField({
  name: 'fruits',
  initialValue: 'Apple',
});

export const authForm = createForm({
  name: 'auth',
  fields: [nameField, passField],
  submit: submitForm,
  reset: resetForm,
});
