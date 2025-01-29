import React, { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useEventTimes } from 'contexts/data';

import EventCard from 'components/EventCard';

import { EVENT_DAYS } from 'const';

function Events() {
  const eventTimes = useEventTimes();
  const sortedEventTimes = useMemo(
    () =>
      eventTimes &&
      Object.values(eventTimes).toSorted((a, b) => a.starting < b.starting),
    [eventTimes]
  );

  const [selectedDay, setSelectedDay] = useState('Wednesday');

  function renderEventTime(eventTime) {
    if (eventTime.day_of_week !== selectedDay) {
      return null;
    }
    return <EventCard eventTime={eventTime} />;
  }

  function renderEvents() {
    if (!sortedEventTimes) {
      return Array(12)
        .fill(null)
        .map((_, index) => (
          <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
            <Skeleton variant="rectangular" width="100%" height={240} />
          </Grid>
        ));
    }
    return sortedEventTimes.map(renderEventTime);
  }

  return (
    <>
      <Typography variant="h2">Events</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedDay}
          onChange={(e, newValue) => setSelectedDay(newValue)}
          aria-label="Select day of week"
          scrollButtons
          allowScrollButtonsMobile
        >
          {EVENT_DAYS.map((day) => (
            <Tab key={day} label={day} value={day} />
          ))}
        </Tabs>
      </Box>
      <Grid container spacing={2} padding={2}>
        {renderEvents()}
      </Grid>
    </>
  );
}

export default Events;
