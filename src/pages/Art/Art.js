import React from 'react';

import { useParams } from 'react-router';

import { useArt } from 'contexts/data';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Header from 'components/Header';

function Art() {
  const params = useParams();
  const art = useArt(params.id);
  return (
    <>
      <Header>{art === null ? <Skeleton /> : art.title}</Header>
      <Typography variant="body1">
        {art === null
          ? Array(4)
              .fill(null)
              .map(() => <Skeleton />)
          : art.description}
      </Typography>
    </>
  );
}

export default Art;
