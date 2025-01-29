import React from 'react';

import { useParams } from 'react-router';

import { useRadio } from 'contexts/data';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Radio() {
  const params = useParams();
  const radio = useRadio(params.id);
  return (
    <>
      <Typography variant="h2">
        {radio === null ? <Skeleton /> : radio.radio_dj_name}
      </Typography>
      <Typography variant="body1">
        {radio === null
          ? Array(4)
              .fill(null)
              .map(() => <Skeleton />)
          : radio.radio_description}
      </Typography>
    </>
  );
}

export default Radio;
