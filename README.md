# Effector Form

Build form and input Effector models with helpers.

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://toastyboost.github.io/effector-form/)

## Example

model.ts

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

view.tsx

```
export const Input = (inputProps) => {
  const { name, $value, $error, changed } = inputProps;

  const value = useStore($value);
  const error = useStore($error);

  return (
    <div>
      <label>{name}</label>
      <input onChange={changed} value={value} name={name} />
      <div>{error && error}</div>
    <div/>
  );
};
```

## Features

- createField
- createGroup
- createForm

## TODO

- [ ] Analyze forms libs
