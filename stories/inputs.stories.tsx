import * as React from 'react';
import { createEvent, createStore } from 'effector'
import { useStore } from 'effector-react';

import { createField, createGroup } from '../src';

export default { title: 'Inputs' };

const resetLogin = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

const loginField = createField({
  name: 'login',
  reset: resetLogin
});

export const textField = () => {

  const { name, $value, $error, changed } = loginField;

  const value = useStore($value);
  const error = useStore($error);

  return (
    <>
      <input onChange={changed} value={value} name={name} />
      <button onClick={resetLogin} data-type="primary">reset</button>
      <div>{error && error}</div>
    </>
  );
};

const resetPets = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

const petsField = createField({
  name: 'pets',
  reset: resetPets
});

export const radioField = () => {
  const { name, $value, $error, changed } = petsField;

  const value = useStore($value);
  const error = useStore($error);

  const values = ['Dog', 'Cat', 'Dinosaurus']

  return (
    <>
      {values.map((item, key) => <div key={key}>
        <label>
          <input type="radio" onChange={changed} value={item} name={name} checked={item === value} />
          {item}
        </label>
      </div>)}
      <button onClick={resetPets} data-type="primary">reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
}

const resetGender = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

const genderField = createGroup({
  name: 'gender',
  reset: resetGender
});

export const checkboxField = () => {
  const { name, $value, $error, changed } = genderField;

  const value = useStore($value);
  const error = useStore($error);

  const values = ['Male', 'Female', 'Unknown']

  return (
    <>
      {values.map((item, key) => <div key={key}>
        <label>
          <input type="checkbox" onChange={changed} value={item} name={name} checked={value.includes(item)} />
          {item}
        </label>
      </div>)}
      <button onClick={resetGender} data-type="primary">reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
};

const resetFruits = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

const fruitsField = createField({
  name: 'fruits',
  initialValue: 'Apple',
  reset: resetFruits
});

export const optionsField = () => {
  const { name, $value, $error, changed } = fruitsField;

  const value = useStore($value);
  const error = useStore($error);

  const values = ['Apple', 'Orange', 'Pineapple', 'Banana']

  return (
    <>
      <select onChange={changed} name={name}>
        {values.map((item, key) =>
          <option key={key} selected={item === value}>{item}</option>
        )}
      </select>
      <button onClick={resetFruits} data-type="primary">reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
};

const resetDogs = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

const dogsField = createField({
  name: 'dogs',
  initialValue: 'Dog',
  reset: resetDogs
});

export const initialValue = () => {
  const { name, $value, $error, changed } = dogsField;

  const value = useStore($value);
  const error = useStore($error);

  return (
    <>
      <input onChange={changed} value={value} name={name} />
      <button onClick={resetDogs} data-type="primary">reset</button>
      <div>{error && error}</div>
    </>
  );
};

const resetCats = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

const $initialStore = createStore('Bary');

const catsField = createField({
  name: 'cats',
  initialValue: $initialStore,
  reset: resetCats
});

export const initialStore = () => {
  const { name, $value, $error, changed } = catsField;

  const value = useStore($value);
  const error = useStore($error);

  return (
    <>
      <input onChange={changed} value={value} name={name} />
      <button onClick={resetCats} data-type="primary">reset</button>
      <div>{error && error}</div>
    </>
  );
};



