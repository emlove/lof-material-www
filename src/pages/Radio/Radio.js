import React from 'react';

import { useParams } from 'react-router';

import { useRadio } from 'contexts/data';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Header from 'components/Header';

function Radio() {
  const params = useParams();
  const radio = useRadio(params.id);
  return (
    <>
      <Header>{radio === null ? <Skeleton /> : radio.radio_dj_name}</Header>
      <Typography variant="h5">{radio.radio_time.format('dddd LT')}</Typography>
      <Typography variant="body1">
        {radio === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : radio.radio_description}
      </Typography>
    </>
  );
}

export default Radio;
