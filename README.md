# Effector Form

Build form/input models for Effector.

## Example

```
import { createField, createForm } from 'effector-form';

export const loginField = createField({
  name: 'login',
});

export const passField = createField({
  name: 'pass',
});

export const authForm = createForm({
  name: 'auth',
  fields: [nameField, passField],
});

```

## Features

## TODO
