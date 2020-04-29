import * as React from 'react';
import { createEvent } from 'effector'
import { useStore } from 'effector-react';

import { createInput, createForm } from '../src';
import { loginValidator, passValidator } from '../src/lib/validators';

import '../.storybook/styles/default.css';

export default { title: 'Forms' };

type AuthResult = {
  login: string;
  password: string;
};

// model

const submitForm = createEvent<void>();
const resetForm = createEvent<void>();

const nameField = createInput({
  name: 'login',
  validator: loginValidator,
});

const passField = createInput({
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
    submitForm()
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    nameField.changed(e.currentTarget.value)
  }

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    passField.changed(e.currentTarget.value)
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={handleNameChange} value={nameValue} name={nameField.name} />
        <input onChange={handlePassChange} value={passValue} name={passField.name} />
        <button type="submit" data-type="primary">Login</button>
        <button onClick={() => resetForm()} data-type="danger">Reset</button>
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

const massResetForm = createEvent<void>();

const fieldOne = createInput({
  name: 'fieldOne',
  initialValue: '1'
});

const fieldTwo = createInput({
  name: 'fieldTwo',
  initialValue: '2'
});

const fieldThree = createInput({
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

  const { $values, $errors, } = massForm;

  const values = useStore($values);
  const errors = useStore($errors);

  const handleFieldValueOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    fieldOne.changed(e.currentTarget.value)
  }

  const handleFieldValueTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    fieldTwo.changed(e.currentTarget.value)
  }

  const handleFieldValueThree = (e: React.ChangeEvent<HTMLInputElement>) => {
    fieldThree.changed(e.currentTarget.value)
  }

  return (
    <>
      <div>
        <input onChange={handleFieldValueOne} value={fieldOneValue} name={fieldOne.name} />
        <input onChange={handleFieldValueTwo} value={fieldTwoValue} name={fieldTwo.name} />
        <input onChange={handleFieldValueThree} value={fieldThreeValue} name={fieldThree.name} />
        <button onClick={() => massResetForm()} data-type="danger">Reset</button>
        <div className="container">
          <div>Values:</div>
          {JSON.stringify(values)}
          <div>Errors:</div>
          {JSON.stringify(errors)}
          <div>Other:</div>
        </div>
      </div>
    </>
  );
};
