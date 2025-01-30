import React from 'react';

import { Link } from 'react-router';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import { MAX_DESCRIPTION_LENGTH } from 'const';

function VehicleCard({ vehicle }) {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <ButtonBase component={Link} to={`/vehicle/${vehicle.id}`}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">{vehicle.title}</Typography>
          <Typography variant="subtitle1">
            {vehicle.description.length > MAX_DESCRIPTION_LENGTH
              ? `${vehicle.description.substring(0, MAX_DESCRIPTION_LENGTH)}…`
              : vehicle.description}
          </Typography>
        </Paper>
      </ButtonBase>
    </Grid>
  );
}

export default VehicleCard;
