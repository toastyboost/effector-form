# Effector Form

Build Effector models for forms and inputs with helpers.

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

- createInput - create input filed
- createGroup - create checkbox field
- createField - create custom fields
- createForm - create form

## TODO

- [ ] Add generics to field types
- [ ] Add custom_data fields (boolean, object)
- [ ] Handle stores in fieldsValidator
- [ ] Analyze forms libs
- [ ] Reset Fields throue form
