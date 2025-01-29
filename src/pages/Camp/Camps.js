import React, { useMemo } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

import { useCamps } from 'contexts/data';

import CampCard from 'components/CampCard';

function Camps() {
  const camps = useCamps();
  const sortedCamps = useMemo(
    () => camps && Object.values(camps).toSorted((a, b) => a.name > b.name),
    [camps]
  );

  function renderCamps() {
    if (!sortedCamps) {
      return Array(12)
        .fill(null)
        .map((_, index) => (
          <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
            <Skeleton variant="rectangular" width="100%" height={240} />
          </Grid>
        ));
    }
    return sortedCamps.map((camp) => <CampCard camp={camp} />);
  }

  return (
    <>
      <Typography variant="h2">Camps</Typography>
      <Grid container spacing={2} padding={2}>
        {renderCamps()}
      </Grid>
    </>
  );
}

export default Camps;
