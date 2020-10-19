import * as React from 'react';
import { createEvent } from 'effector';
import { useStore } from 'effector-react';
import { Button, Form, Col, Row, Space } from 'antd';

import { createForm } from '../src';
import { DataTable, Input, Num, Tags, Switch } from '../src/ui';

export default { title: ' Forms' };

// model

type Resets = {
  name: string;
  items: string[];
  count: number;
  delivery: boolean;
};

const submit = createEvent<void>();
const reset = createEvent();

const fields = {
  name: {
    name: 'name',
    initial: 'John Doe',
  },
  items: {
    name: 'items',
    initial: ['Tomato'],
  },
  count: {
    name: 'count',
    initial: 0,
  },
  delivery: {
    name: 'delivery',
    initial: false,
  },
};

const testForm = createForm<Resets>({
  name: 'cart',
  fields,
  submit,
  reset,
});

// veiw

export const inputTypes = () => {
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
              label="Name"
            />
            <Tags
              change={inputs.items.change}
              values={['Apple', 'Lemon', 'Orange']}
              initial={values.items}
              label="Cart"
            />
            <Num
              change={inputs.count.change}
              value={values.count}
              label="Count"
            />
            <Switch
              change={inputs.delivery.change}
              value={values.delivery}
              label="Delivery"
            />
            <Button onClick={() => reset()} type="primary">
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
      <DataTable values={values} cols={[12, 0, 0]} />
    </Space>
  );
};
