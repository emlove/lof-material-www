import React from 'react';

import { Link } from 'react-router';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import { MAX_DESCRIPTION_LENGTH } from 'const';

function EventCard({ eventTime }) {
  return (
    <Grid key={eventTime.event_time_id} size={{ xs: 12, md: 6, lg: 4 }}>
      <ButtonBase component={Link} to={`/event/${eventTime.event_time_id}`}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">{eventTime.event.title}</Typography>
          <Typography variant="subtitle1">
            {eventTime.event.event_description.length > MAX_DESCRIPTION_LENGTH
              ? `${eventTime.event.event_description.substring(0, MAX_DESCRIPTION_LENGTH)}…`
              : eventTime.event.event_description}
          </Typography>
        </Paper>
      </ButtonBase>
    </Grid>
  );
}

export default EventCard;
