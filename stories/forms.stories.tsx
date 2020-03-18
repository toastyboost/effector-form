import * as React from 'react';
import { useStore } from 'effector-react';

import { authForm, nameField, passField, submitForm, resetForm } from './models'

export default { title: 'Forms' };

// model

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
        <button type="submit">Login</button>
        <button onClick={() => resetForm()}>Reset</button>
      </form>

      <div>
        <div>Values: {JSON.stringify(values)}</div>
        <div>Errors: {JSON.stringify(errors)}</div>
        <br />
        <div>Is form valid: {JSON.stringify(isFormValid)}</div>
        <div>Is form dirty: {JSON.stringify(isFormDirty)}</div>
        <div>Is form submited: {JSON.stringify(isFormSubmited)}</div>
      </div>
    </>
  );
};
