import React from 'react';
import { Grid } from '../Grid';
import { ColWrapper as Col } from './ColWrapper';

const code = `
<Grid>
  <Grid.Col span={3}>1</Grid.Col>
  <Grid.Col span={3}>2</Grid.Col>
  <Grid.Col span={3} offset={3}>3</Grid.Col>
</Grid>
`;

function Demo() {
  return (
    <Grid>
      <Col span={3}>1</Col>
      <Col span={3}>2</Col>
      <Col span={3} offset={3}>
        3
      </Col>
    </Grid>
  );
}

export const offset: MantineDemo = {
  type: 'demo',
  code,
  component: Demo,
};
