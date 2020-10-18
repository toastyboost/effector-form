import * as React from 'react';
import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import { Button, Input, Form, Col, Row, Space } from 'antd';

import { createForm } from '../src';
import { DataTable } from '../src/ui';

export default { title: 'Forms' };

type Auth = {
  login: string;
  pass: string;
};

// model

const resets: Auth = {
  login: 'John',
  pass: 'thepass',
};

const submitForm = createEvent<void>();
const resetFields = createEvent<Auth | void>();

const fields = {
  login: {
    name: 'login',
  },
  pass: {
    name: 'pass',
  },
};

const authForm = createForm<Auth>({
  name: 'reset',
  fields,
  onSubmit: submitForm,
  onReset: resetFields,
});

// view

export const simpleForm = () => {
  const { $values, $fields } = authForm;

  const values = useStore($values);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    $fields.login.onChange(e.currentTarget.value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    $fields.pass.onChange(e.currentTarget.value);
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
            <Button type="primary" onClick={() => submitForm()}>
              Submit
            </Button>
            &nbsp;
            <Button type="dashed" onClick={() => resetFields(resets)}>
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
      <DataTable values={values} cols={[12, 0, 0]} />
    </Space>
  );
};
