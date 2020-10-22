import * as React from 'react';

import { InputNumber, Form } from 'antd';
import { Event } from 'effector';

type InputProps = {
  change: Event<number>;
  value: number;
  label?: string;
};

export const Num: React.FC<InputProps> = ({ change, value, label }) => {
  const handleChange = (e: string | number | undefined) => {
    change(Number(e));
  };

  return (
    <Form.Item label={label}>
      <InputNumber onChange={handleChange} value={value} />
    </Form.Item>
  );
};
