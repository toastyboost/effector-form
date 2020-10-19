import * as React from 'react';
import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import { Button, Input, Form, Col, Row, Space } from 'antd';

import { createForm } from '../src';
import { DataTable } from '../src/ui';

export default { title: 'Forms' };

// model

type Auth = {
  login: string;
  pass: string;
};

const submit = createEvent<void>();
const reset = createEvent<Auth | void>();

const fields = {
  login: {
    name: 'login',
    initial: 'mail@gmail.com',
  },
  pass: {
    name: 'pass',
    initial: '',
  },
};

const authForm = createForm<Auth>({
  name: 'reset',
  fields,
  submit,
  reset,
});

// view

export const simpleForm = () => {
  const { $values, inputs, $valid, $submited, $dirty, $touched } = authForm;

  const values = useStore($values);
  const isValid = useStore($valid);
  const isDirty = useStore($dirty);
  const isSubmited = useStore($submited);
  const isTouched = useStore($touched);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputs.login.change(e.currentTarget.value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputs.pass.change(e.currentTarget.value);
  };

  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Form layout="vertical">
            <Form.Item label="Login">
              <Input value={values.login} onChange={handleNameChange} />
            </Form.Item>
            <Form.Item label="Password">
              <Input
                value={values.pass}
                onChange={handlePassChange}
                type="password"
              />
            </Form.Item>
            <Button type="primary" onClick={() => submit()}>
              Submit
            </Button>
            &nbsp;
            <Button type="default" onClick={() => reset()}>
              Clear
            </Button>
          </Form>
        </Col>
      </Row>
      <DataTable
        values={values}
        cols={[6, 0, 6]}
        conditions={{ isValid, isDirty, isSubmited, isTouched }}
      />
    </Space>
  );
};
