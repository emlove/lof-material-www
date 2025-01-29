import React from 'react';

import { Link } from 'react-router';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

import { useEventTimes } from 'contexts/data';

const MAX_DESCRIPTION_LENGTH = 200;

function Events() {
  const eventTimes = useEventTimes();

  function renderEvents() {
    if (!eventTimes) {
      return Array(12)
        .fill(null)
        .map(() => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Skeleton variant="rectangular" width="100%" height={240} />
          </Grid>
        ));
    }
    return Object.values(eventTimes).map((eventTime) => (
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
    ));
  }

  return (
    <>
      <Typography variant="h2">Events</Typography>
      <Grid container spacing={2}>
        {renderEvents()}
      </Grid>
    </>
  );
}

export default Events;
