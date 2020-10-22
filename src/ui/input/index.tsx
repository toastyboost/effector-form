import * as React from 'react';

import { Input as AntInput, Form } from 'antd';
import { Event } from 'effector';

type InputProps = {
  change: Event<string>;
  value: string;
  label?: string;
};

export const Input: React.FC<InputProps> = ({ change, value, label }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    change(e.currentTarget.value);
  };

  return (
    <Form.Item label={label}>
      <AntInput onChange={handleChange} value={value} />
    </Form.Item>
  );
};
