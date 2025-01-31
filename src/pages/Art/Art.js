import React from 'react';

import { useParams } from 'react-router';

import { useArt } from 'contexts/data';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Header from 'components/Header';

function Art() {
  const params = useParams();
  const art = useArt(params.id);

  function renderFunding() {
    if (art === null) return null;

    if (art.type === 'honoraria') {
      return `Funded ${art.funded} - Honoraria`;
    }

    if (art.type === 'grant') {
      return `Funded ${art.funded} - Grant`;
    }

    return null;
  }

  return (
    <>
      <Header>{art === null ? <Skeleton /> : art.title}</Header>
      <Typography variant="h5">
        {art === null ? <Skeleton /> : `By ${art.artist}`}
      </Typography>
      <Typography variant="h6">
        {art === null ? (
          <Skeleton />
        ) : isNaN(art.location) ? (
          art.location
        ) : (
          `Site ${art.location}`
        )}
      </Typography>
      <Typography variant="body1">
        {art === null
          ? Array(4)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          : art.description}
      </Typography>
      <Typography variant="body2" padding={1}>
        {renderFunding()}
      </Typography>
    </>
  );
}

export default Art;
