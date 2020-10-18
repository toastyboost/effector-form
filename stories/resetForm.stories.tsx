import * as React from 'react';
import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import { Button, Input, Form, Col, Row, Space } from 'antd';

import { createForm } from '../src';
import { DataTable } from '../src/ui';

export default { title: ' Forms' };

type Resets = {
  name: string;
  surname: string;
  age: string;
};

const submitForm = createEvent<void>();
const resetFields = createEvent();

const fields = {
  name: {
    name: 'fieldOne',
    initial: 'John',
  },
  surname: {
    name: 'fieldTwo',
    initial: 'Doe',
  },
  age: {
    name: 'fieldThree',
    initial: 'Jr.',
  },
};

const testForm = createForm<Resets>({
  name: 'reset',
  fields,
  onSubmit: submitForm,
  onReset: resetFields,
});

export const resetForm = () => {
  const { $values, $fields } = testForm;

  const values = useStore($values);

  const handleFieldValueOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    $fields.name.onChange(e.currentTarget.value);
  };

  const handleFieldValueTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    $fields.surname.onChange(e.currentTarget.value);
  };

  const handleFieldValueThree = (e: React.ChangeEvent<HTMLInputElement>) => {
    $fields.age.onChange(e.currentTarget.value);
  };

  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Form layout="vertical">
            <Form.Item label="Login">
              <Input onChange={handleFieldValueOne} value={values.name} />
            </Form.Item>
            <Form.Item label="Password">
              <Input onChange={handleFieldValueTwo} value={values.surname} />
            </Form.Item>
            <Form.Item label="Email">
              <Input onChange={handleFieldValueThree} value={values.age} />
            </Form.Item>
            <Button onClick={() => resetFields()} type="primary">
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
      <DataTable values={values} cols={[12, 0, 0]} />
    </Space>
  );
};
