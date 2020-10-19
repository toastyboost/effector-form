import * as React from 'react';
import { Card, Col, Row } from 'antd';

type Data = {
  values?: {
    [key: string]: string | boolean | string[] | number;
  };
  errors?: {
    [key: string]: string | boolean | string[] | number;
  };
  conditions?: {
    isValid?: boolean;
    isDirty?: boolean;
    isSubmited?: boolean;
    isTouched?: boolean;
  };
  cols?: number[];
};

export const DataTable: React.FC<Data> = ({
  values,
  errors,
  conditions,
  cols = [8, 8, 8],
}) => {
  return (
    <Row gutter={16} style={{ width: '100%' }}>
      {values && (
        <Col span={cols[0]}>
          <Card title="Values">
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Card>
        </Col>
      )}
      {errors && (
        <Col span={cols[1]}>
          <Card title="Errors">
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Card>
        </Col>
      )}
      {conditions && (
        <Col span={cols[2]}>
          <Card title="Conditions">
            <pre>{JSON.stringify(conditions, null, 2)}</pre>
          </Card>
        </Col>
      )}
    </Row>
  );
};
