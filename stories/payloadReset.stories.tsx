import * as React from 'react';
import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import { Button, Form, Col, Row, Space } from 'antd';

import { createForm } from '../src';
import { DataTable, Input } from '../src/ui';

export default { title: 'Forms' };

// model

type Resets = {
  name: string;
  surname: string;
  age: string;
};

const submit = createEvent<void>();
const reset = createEvent<Resets>();

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
  submit,
  reset,
});

const resetPayload = {
  name: 'payload #1',
  surname: 'payload #2',
  age: 'payload #3',
};

// veiw

export const payloadReset = () => {
  const { $values, inputs } = testForm;

  const values = useStore($values);

  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Form layout="vertical">
            <Input
              change={inputs.name.change}
              value={values.name}
              label="Login"
            />
            <Input
              change={inputs.surname.change}
              value={values.surname}
              label="Password"
            />
            <Input
              change={inputs.age.change}
              value={values.age}
              label="Email"
            />
            <Button onClick={() => reset(resetPayload)} type="primary">
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
      <DataTable values={values} cols={[12, 0, 0]} />
    </Space>
  );
};
