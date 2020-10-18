import * as React from 'react';
import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import { Button, Input, Form, Col, Row, Space } from 'antd';

import { createForm } from '../src';
import { DataTable } from '../src/ui';
import { loginValidator, passValidator } from '../src/lib/validators';

export default { title: 'Forms' };

type Auth = {
  login: string;
  pass: string;
};

type Config = {
  placeholder: string;
};

// model

const resets: Auth = {
  login: 'John',
  pass: 'sexypass',
};

const submitForm = createEvent<void>();
const resetForm = createEvent<Auth | void>();

const fields = {
  login: {
    name: 'login',
    onValidate: loginValidator,
    initial: '',
    config: {
      label: 'Имя',
      placeholder: 'Your e-mail',
    },
  },
  pass: {
    name: 'pass',
    initial: '',
    onValidate: passValidator,
    config: {
      placeholder: 'Your password',
    },
  },
};

const authForm = createForm<Auth, Config>({
  name: 'reset',
  fields,
  onSubmit: submitForm,
  onReset: resetForm,
});

// view

export const simpleForm = () => {
  const { $values, $fields, $errors, $dirty, $valid, $submited } = authForm;

  const values = useStore($values);
  const errors = useStore($errors);

  const isValid = useStore($valid);
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
                value={values.login}
                onChange={handleNameChange}
                placeholder={$fields.login.config.placeholder}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input
                value={values.pass}
                onChange={handlePassChange}
                type="password"
                placeholder={$fields.pass.config.placeholder}
              />
            </Form.Item>
            <Button type="primary" onClick={() => submitForm()}>
              Submit
            </Button>
            &nbsp;
            <Button type="dashed" onClick={() => resetForm(resets)}>
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
      <DataTable
        values={values}
        errors={errors}
        conditions={{
          isValid,
          isDirty,
          isSubmited,
        }}
      />
    </Space>
  );
};
