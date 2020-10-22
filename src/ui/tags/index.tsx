import * as React from 'react';

import { Select, Form } from 'antd';
import { Event } from 'effector';

const { Option } = Select;

type Value = string[];

type InputProps = {
  initial?: Value;
  values: Value;
  change: Event<Value>;
  label?: string;
};

export const Tags: React.FC<InputProps> = ({
  initial,
  values,
  change,
  label,
}) => {
  const handleChange = (value: Value) => {
    change(value);
  };

  return (
    <Form.Item label={label}>
      <Select<Value>
        mode="tags"
        style={{ width: '100%' }}
        onChange={handleChange}
        value={initial}
      >
        {values.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
