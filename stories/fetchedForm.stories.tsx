import * as React from 'react';
import { createEvent, createEffect, createStore, sample } from 'effector';

import { useStore } from 'effector-react';
import { Button, Input, Form, Col, Row, Space, Spin } from 'antd';

import { createForm } from '../src';
import { DataTable } from '../src/ui';

export default { title: 'Forms' };

// api

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

const getUsers = createEffect<void, User[]>();

getUsers.use(async () => {
  const url = `https://reqres.in/api/users`;
  const req = await fetch(url);
  return req.json().then((item) => item.data);
});

// model

const $users = createStore<User[] | null>(null);
$users.on(getUsers.done, (_, payload) => payload.result);

const submitForm = createEvent<void>();
const resetForm = createEvent<User>();

sample({
  source: $users,
  clock: getUsers.done,
  fn: (users) => users[0],
  target: resetForm,
});

const userFields = {
  id: {
    name: 'ID',
    initial: '',
  },
  email: {
    name: 'Email',
    initial: '',
  },
  first_name: {
    name: 'firstName',
    initial: '',
  },
  last_name: {
    name: 'lastName',
    initial: '',
  },
};

const userForm = createForm<User>({
  name: 'user',
  fields: userFields,
  submit: submitForm,
  reset: resetForm,
});

// veiw

export const fetchedForm = () => {
  const { $values } = userForm;
  const values = useStore($values);
  const pending = useStore(getUsers.pending);

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <Space size={16} direction="vertical" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Spin spinning={pending}>
            <Form layout="vertical">
              <Form.Item label="ID">
                <Input value={values.id} disabled />
              </Form.Item>
              <Form.Item label="Email">
                <Input value={values.email} />
              </Form.Item>
              <Form.Item label="First name">
                <Input value={values.first_name} />
              </Form.Item>
              <Form.Item label="Last name">
                <Input value={values.last_name} />
              </Form.Item>
              <Button type="primary" onClick={() => submitForm()} disabled>
                Submit
              </Button>
            </Form>
          </Spin>
        </Col>
      </Row>
      <DataTable values={values} cols={[12, 0, 0]} />
    </Space>
  );
};
