import * as React from 'react';
import { useStore } from 'effector-react';

import { nameField, resetForm, genderField, petsField, fruitsField } from './models'

export default { title: 'Inputs' };

// model

export const textField = () => {
  const { name, $value, $error, changed } = nameField;

  const value = useStore($value);
  const error = useStore($error);

  return (
    <>
      <input onChange={changed} value={value} name={name} />
      <button onClick={() => resetForm()}>reset</button>
      <div>{error && error}</div>
    </>
  );
};

export const radioField = () => {
  const { name, $value, $error, changed } = petsField;

  const value = useStore($value);
  const error = useStore($error);

  const values = ['Dog', 'Cat', 'Dinosaurus']

  return (
    <>
      {values.map((item, key) => <div key={key}>
        <label>
          <input type="radio" onChange={changed} value={item} name={name} />
          {item}
        </label>
      </div>)}
      <button onClick={() => resetForm()}>reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
}

export const checkboxField = () => {
  const { name, $value, $error, changed } = genderField;

  const value = useStore($value);
  const error = useStore($error);

  const values = ['Male', 'Female', 'Unknown']

  return (
    <>
      {values.map((item, key) => <div key={key}>
        <label>
          <input type="checkbox" onChange={changed} value={item} name={name} />
          {item}
        </label>
      </div>)}
      <button onClick={() => resetForm()}>reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
};

export const optionsField = () => {
  const { name, $value, $error, changed } = fruitsField;

  const value = useStore($value);
  const error = useStore($error);

  const values = ['Apple', 'Orange', 'Pineapple', 'Banana']

  return (
    <>
      <select onChange={changed} name={name}>
        {values.map((item, key) =>
          <option key={key}>{item}</option>
        )}
      </select>
      <button onClick={() => resetForm()}>reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
};




