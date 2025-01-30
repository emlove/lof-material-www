import React from 'react';

import { useParams } from 'react-router';

import { useVehicle } from 'contexts/data';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Header from 'components/Header';

function Vehicle() {
  const params = useParams();
  const vehicle = useVehicle(params.id);
  return (
    <>
      <Header>{vehicle === null ? <Skeleton /> : vehicle.title}</Header>
      <Typography variant="body1">
        {vehicle === null
          ? Array(4)
              .fill(null)
              .map(() => <Skeleton />)
          : vehicle.description}
      </Typography>
    </>
  );
}

export default Vehicle;
