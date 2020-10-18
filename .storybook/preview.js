import * as React from 'react';
import 'antd/dist/antd.css';

export const decorators = [
  (Story) => (
    <>
      <Story />
    </>
  ),
];

export const parameters = {
  controls: { expanded: false },
};
