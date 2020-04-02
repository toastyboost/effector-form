import * as React from 'react';
import { createEvent } from 'effector'
import { useStore } from 'effector-react';

import { createField, createForm } from '../src';
import { loginValidator, passValidator } from '../lib/validators';

import '../.storybook/styles/default.css';

export default { title: 'Forms' };

type AuthResult = {
  login: string;
  password: string;
};

// model

const submitForm = createEvent<React.FormEvent<HTMLFormElement>>();
const resetForm = createEvent<void | React.MouseEvent<HTMLElement, MouseEvent>>();

const nameField = createField({
  name: 'login',
  validator: loginValidator,
});

const passField = createField({
  name: 'password',
  validator: passValidator,
});

const authForm = createForm<AuthResult>({
  name: 'auth',
  fields: [nameField, passField],
  submit: submitForm,
  reset: resetForm,
});

// view

export const textFields = () => {

  const { $values, $errors, $isValid, $dirty, $submited } = authForm;

  const nameValue = useStore(nameField.$value);
  const passValue = useStore(passField.$value);

  const values = useStore($values);
  const errors = useStore($errors);

  const isFormValid = useStore($isValid)
  const isFormDirty = useStore($dirty);
  const isFormSubmited = useStore($submited);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm(e)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={nameField.changed} value={nameValue} name={nameField.name} />
        <input onChange={passField.changed} value={passValue} name={passField.name} />
        <button type="submit" data-type="primary">Login</button>
        <button onClick={resetForm} data-type="danger">Reset</button>
      </form>
      <div className="container">
        <div>Values:</div>
        {JSON.stringify(values)}
        <div>Errors:</div>
        {JSON.stringify(errors)}
        <div>Other:</div>
        {JSON.stringify({
          isValid: isFormValid,
          isDirty: isFormDirty,
          isSubmited: isFormSubmited
        })}
      </div>
    </>
  );
};

const massResetForm = createEvent<void | React.MouseEvent<HTMLElement, MouseEvent>>();

const fieldOne = createField({
  name: 'fieldOne',
  initialValue: '1'
});

const fieldTwo = createField({
  name: 'fieldTwo',
  initialValue: '2'
});

const fieldThree = createField({
  name: 'fieldThree',
  initialValue: '3'
});

const massForm = createForm({
  name: 'massForm',
  fields: [fieldOne, fieldTwo, fieldThree],
  submit: submitForm,
  reset: massResetForm,
});


export const massReset = () => {

  const fieldOneValue = useStore(fieldOne.$value);
  const fieldTwoValue = useStore(fieldTwo.$value);
  const fieldThreeValue = useStore(fieldThree.$value);

  return (
    <>
      <div>
        <input onChange={fieldOne.changed} value={fieldOneValue} name={fieldOne.name} />
        <input onChange={fieldTwo.changed} value={fieldTwoValue} name={fieldTwo.name} />
        <input onChange={fieldThree.changed} value={fieldThreeValue} name={fieldThree.name} />
        <button onClick={massResetForm} data-type="danger">Reset</button>
      </div>
    </>
  );
};
