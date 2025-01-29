import React from 'react';

import { useParams } from 'react-router';

import { useCamp } from 'contexts/data';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Camp() {
  const params = useParams();
  const camp = useCamp(params.id);
  return (
    <>
      <Typography variant="h2">
        {camp === null ? <Skeleton /> : camp.name}
      </Typography>
      <Typography variant="body1">
        {camp === null
          ? Array(4)
              .fill(null)
              .map(() => <Skeleton />)
          : camp.description}
      </Typography>
    </>
  );
}

export default Camp;
