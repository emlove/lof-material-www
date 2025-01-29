import React from 'react';

import { Link } from 'react-router';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import { MAX_DESCRIPTION_LENGTH } from 'const';

function RadioCard({ radio }) {
  return (
    <Grid key={radio.id} size={{ xs: 12, md: 6, lg: 4 }}>
      <ButtonBase component={Link} to={`/radio/${radio.id}`}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">{radio.radio_dj_name}</Typography>
          <Typography variant="subtitle1">
            {radio.radio_description.length > MAX_DESCRIPTION_LENGTH
              ? `${radio.radio_description.substring(0, MAX_DESCRIPTION_LENGTH)}…`
              : radio.radio_description}
          </Typography>
        </Paper>
      </ButtonBase>
    </Grid>
  );
}

export default RadioCard;
