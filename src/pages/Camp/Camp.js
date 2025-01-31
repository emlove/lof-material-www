import React from 'react';

import { useParams } from 'react-router';

import { useCamp } from 'contexts/data';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Header from 'components/Header';

function Camp() {
  const params = useParams();
  const camp = useCamp(params.id);
  return (
    <>
      <Header>{camp === null ? <Skeleton /> : camp.name}</Header>
      <Typography variant="h5">
        {camp === null ? (
          <Skeleton />
        ) : (
          `${camp.neighborhood} - Site ${camp.site}`
        )}
      </Typography>
      <Typography variant="body1">
        {camp === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : camp.description}
      </Typography>
    </>
  );
}

export default Camp;
