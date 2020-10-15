import * as React from 'react';
import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import { Button, Input, Form, Card, Col, Row, Space } from 'antd';

import { createForm } from '../src';
import { loginValidator, passValidator } from '../src/lib/validators';

export default { title: 'Forms' };

// model

const submitForm = createEvent<void>();
// const resetForm = createEvent<Auth | void>();

// const resets = {
//   login: '1',
//   pass: '2',
// };

const fields = {
  login: {
    name: 'login',
    validator: loginValidator,
    initial: '',
    config: {
      label: 'Имя',
      placeholder: 'Your e-mail',
    },
  },
  pass: {
    name: 'pass',
    initial: '',
    validator: passValidator,
    config: {
      placeholder: '',
    },
  },
};

type Auth = {
  login: string;
  pass: string;
};

const authForm = createForm({
  name: 'auth',
  fields,
  onSubmit: submitForm,
  // onReset: resetForm,
});

// view

export const simpleForm = () => {
  const {
    //  $values,
    $fields,
    // s$errors,
    $dirty,
    // $valid,
    $submited,
  } = authForm;

  // const values = useStore($values);
  // const errors = useStore($errors);

  // const isValid = useStore($valid);
  const isDirty = useStore($dirty);
  const isSubmited = useStore($submited);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    $fields.login.onChange(e.currentTarget.value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    $fields.pass.onChange(e.currentTarget.value);
  };

  return (
    <Space size={16} direction="vertical">
      <Row gutter={16}>
        <Col span={24}>
          <Form layout="vertical">
            <Form.Item label="Login">
              <Input
                // value={values.login}
                onChange={handleNameChange}
                placeholder={$fields.login.config.placeholder}
              />
            </Form.Item>
            <Form.Item label="Password">
              {/* <Input value={values.pass} onChange={handlePassChange} /> */}
            </Form.Item>
            <Button type="primary" onClick={() => submitForm()}>
              Submit
            </Button>
            &nbsp;
            {/* <Button type="dashed" onClick={() => resetForm()}>
              Reset
            </Button> */}
          </Form>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          {/* <Card title="Values">{JSON.stringify(values)}</Card> */}
        </Col>
        <Col span={8}>
          {/* <Card title="Errors">{JSON.stringify(errors)}</Card> */}
        </Col>
        <Col span={8}>
          <Card title="Conditions">
            {JSON.stringify({
              // isValid,
              isDirty,
              isSubmited,
            })}
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

// const massReset = createEvent();

// const resetFields = createFields({
//   login: {
//     name: 'fieldOne',
//     initial: '1',
//   },
//   pass: {
//     name: 'fieldTwo',
//     initial: '2',
//   },
//   email: {
//     name: 'fieldThree',
//     initial: '3',
//   },
// });

// const testForm = createForm({
//   name: 'auth',
//   fields: resetFields,
//   submit: submitForm,
//   reset: massReset,
// });

// export const massInputsReset = () => {
//   const { $fields, $errors } = testForm;

//   const values = useStore($fields);

//   const errors = useStore($errors);

//   const handleFieldValueOne = (e: React.ChangeEvent<HTMLInputElement>) => {
//     resetFields.login.changed(e.currentTarget.value);
//   };

//   const handleFieldValueTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
//     resetFields.pass.changed(e.currentTarget.value);
//   };

//   const handleFieldValueThree = (e: React.ChangeEvent<HTMLInputElement>) => {
//     resetFields.email.changed(e.currentTarget.value);
//   };

//   return (
//     <>
//       <div>
//         <input onChange={handleFieldValueOne} value={values.login} />
//         <input onChange={handleFieldValueTwo} value={values.pass} />
//         <input onChange={handleFieldValueThree} value={values.email} />
//         <button onClick={() => massReset()} data-type="danger">
//           Reset
//         </button>
//         <div className="container">
//           <div>Values:</div>
//           {JSON.stringify(values)}
//           <div>Errors:</div>
//           {JSON.stringify(errors)}
//           <div>Other:</div>
//         </div>
//       </div>
//     </>
//   );
// };
