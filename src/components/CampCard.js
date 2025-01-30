import React from 'react';

import { Link } from 'react-router';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import { MAX_DESCRIPTION_LENGTH } from 'const';

function CampCard({ camp }) {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <ButtonBase component={Link} to={`/camp/${camp.id}`}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">{camp.name}</Typography>
          <Typography variant="subtitle1">
            {camp.description.length > MAX_DESCRIPTION_LENGTH
              ? `${camp.description.substring(0, MAX_DESCRIPTION_LENGTH)}…`
              : camp.description}
          </Typography>
        </Paper>
      </ButtonBase>
    </Grid>
  );
}

export default CampCard;
