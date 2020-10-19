import * as React from 'react';

import { Switch as AntSwitch, Form } from 'antd';
import { Event } from 'effector';

type ToggleProps = {
  change: Event<string | number | boolean | string[]>;
  value: boolean;
  label?: string;
};

export const Switch: React.FC<ToggleProps> = ({ change, value, label }) => {
  const handleChange = (e: boolean) => {
    change(e);
  };

  return (
    <Form.Item label={label}>
      <AntSwitch onChange={handleChange} checked={value} />
    </Form.Item>
  );
};
