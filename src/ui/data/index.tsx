import * as React from 'react';
import { Card, Col, Row } from 'antd';

type Data = {
  values?: {
    [key: string]: string;
  };
  errors?: {
    [key: string]: string;
  };
  conditions?: {
    isValid: boolean;
    isDirty: boolean;
    isSubmited: boolean;
  };
  cols?: number;
};

export const DataTable: React.FC<Data> = ({
  values,
  errors,
  conditions,
  cols = 8,
}) => {
  return (
    <Row gutter={16} style={{ width: '100%' }}>
      <Col span={cols}>
        <Card title="Values">
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Card>
      </Col>

      <Col span={cols}>
        <Card title="Errors">
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Card>
      </Col>
      <Col span={cols}>
        <Card title="Conditions">
          <pre>{JSON.stringify(conditions, null, 2)}</pre>
        </Card>
      </Col>
    </Row>
  );
};
