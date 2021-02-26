import { Typography } from 'antd';
import React from 'react'

export default (props: { text: string }) => {
  return (
    <Typography.Title level={5}>
      <Typography.Text type="secondary" style={{ paddingLeft: 10 }}>
        {props.text}
      </Typography.Text>
    </Typography.Title>
  );
};