# Effector Form

Build Effector models and React inputs with some help

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://toastyboost.github.io/effector-form/)

## Example

model.ts

```TS
import { createEvent, useStore } from 'effector';
import { createForm } from 'effector-form';

const submit = createEvent<void>();

type Login = {
  email: string;
  pass: string;
};

const fields = {
  email: {
    name: 'email',
    initial: 'mail@gmail.com'
  },
  pass: {
    name: 'password'
  }
}

const authForm = createForm<Login>({
  name: 'login',
  fields,
  submit,
});
```

view.tsx

```TSX
export const Input = () => {
  const { $values, inputs } = authForm;

  const values = useStore($values);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputs.login.change(e.currentTarget.value);
  };

  return (
    <input onChange={onChange} value={values.login} />
  );
};
```

## TODO

- [ ] Add examples
- [ ] Add API to readme
- [ ] Fix problem with mutliple types in input
