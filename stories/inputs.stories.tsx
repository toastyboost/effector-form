import * as React from 'react';
import { createEvent, createStore } from 'effector'
import { useStore } from 'effector-react';

import { createInput, createField, createGroup } from '../src';

export default { title: 'Inputs' };

const resetLogin = createEvent<void>();

const loginField = createInput({
  name: 'login',
  reset: resetLogin
});

export const textField = () => {

  const { name, $value, $error, changed } = loginField;

  const value = useStore($value);
  const error = useStore($error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changed(e.currentTarget.value)
  }

  return (
    <>
      <input onChange={handleChange} value={value} name={name} />
      <button onClick={() => resetLogin()} data-type="primary">reset</button>
      <div>{error && error}</div>
      <div>Other:</div>
      <div>{JSON.stringify(value)}</div>
    </>
  );
};

const resetPets = createEvent<void>();

const petsField = createInput({
  name: 'pets',
  reset: resetPets
});

export const radioField = () => {
  const { name, $value, $error, changed } = petsField;

  const value = useStore($value);
  const error = useStore($error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changed(e.currentTarget.value)
  }

  const values = ['Dog', 'Cat', 'Dinosaurus']

  return (
    <>
      {values.map((item, key) => <div key={key}>
        <label>
          <input type="radio" onChange={handleChange} value={item} name={name} checked={item === value} />
          {item}
        </label>
      </div>)}
      <button onClick={() => resetPets()} data-type="primary">reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
}

const resetGender = createEvent<void>();

const genderField = createGroup({
  name: 'gender',
  reset: resetGender
});

export const checkboxField = () => {
  const { name, $value, $error, changed } = genderField;

  const value = useStore($value);
  const error = useStore($error);

  const values = ['Male', 'Female', 'Unknown']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changed(e.currentTarget.value)
  }

  return (
    <>
      {values.map((item, key) => <div key={key}>
        <label>
          <input type="checkbox" onChange={handleChange} value={item} name={name} checked={value.includes(item)} />
          {item}
        </label>
      </div>)}
      <button onClick={() => resetGender()} data-type="primary">reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
};

const resetFruits = createEvent<void>();

const fruitsField = createInput({
  name: 'fruits',
  initialValue: 'Apple',
  reset: resetFruits
});

export const optionsField = () => {
  const { name, $value, $error, changed } = fruitsField;

  const value = useStore($value);
  const error = useStore($error);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changed(e.currentTarget.value)
  }

  const values = ['Apple', 'Orange', 'Pineapple', 'Banana']

  return (
    <>
      <select onChange={handleChange} name={name}>
        {values.map((item, key) =>
          <option key={key} selected={item === value}>{item}</option>
        )}
      </select>
      <button onClick={() => resetFruits()} data-type="primary">reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(value)}</div>
    </>
  );
};

const resetDogs = createEvent<void>();

const dogsField = createInput({
  name: 'dogs',
  initialValue: 'Dog',
  reset: resetDogs
});

export const initialValue = () => {
  const { name, $value, $error, changed } = dogsField;

  const value = useStore($value);
  const error = useStore($error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changed(e.currentTarget.value)
  }

  return (
    <>
      <input onChange={handleChange} value={value} name={name} />
      <button onClick={() => resetDogs()} data-type="primary">reset</button>
      <div>{error && error}</div>
    </>
  );
};

const resetRats = createEvent<void>();

const ratsField = createInput({
  name: 'rats',
  initialValue: 'Rat',
  reset: resetRats
});

export const textareaFields = () => {
  const { name, $value, $error, changed } = ratsField;

  const value = useStore($value);
  const error = useStore($error);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changed(e.currentTarget.value)
  }

  return (
    <>
      <textarea onChange={handleChange} value={value} name={name} />
      <button onClick={() => resetRats()} data-type="primary">reset</button>
      <div>{error && error}</div>
    </>
  );
};

const resetCats = createEvent<void>();

const $initialStore = createStore('Bary');

const catsField = createInput({
  name: 'cats',
  initialValue: $initialStore,
  reset: resetCats
});

export const initialStore = () => {
  const { name, $value, $error, changed } = catsField;

  const value = useStore($value);
  const error = useStore($error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changed(e.currentTarget.value)
  }

  return (
    <>
      <input onChange={handleChange} value={value} name={name} />
      <button onClick={() => resetCats()} data-type="primary">reset</button>
      <div>{error && error}</div>
    </>
  );
};

const resetRange = createEvent<void>();

type RangeField = {
  start: number;
  end: number;
}

const initialRange = {
  start: 0,
  end: 1,
};

const rangeField = createField<RangeField>({
  name: 'range',
  initialValue: initialRange,
  reset: resetRange
});

export const customField = () => {
  const { name, $value, $error, changed } = rangeField;

  const range = useStore($value);
  const error = useStore($error);

  const handleStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const start = e.currentTarget.value;

    changed({
      start: Number(start),
      end: range.end,
    })
  }

  const handleEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const end = e.currentTarget.value;

    changed({
      start: range.start,
      end: Number(end),
    })
  }

  return (
    <>
      <input type="number" onChange={handleStart} value={range.start} name={name} />
      <input type="number" onChange={handleEnd} value={range.end} name={name} />
      <button onClick={() => resetRange()} data-type="primary">reset</button>
      <div>{error && error}</div>
      <div>values: {JSON.stringify(range)}</div>
    </>
  );
};
