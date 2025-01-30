import React, { useState, useMemo } from 'react';

import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

import { useEventTimes } from 'contexts/data';

import EventCard from 'components/EventCard';
import Header from 'components/Header';
import SelectDayTabBar from 'components/SelectDayTabBar';

function Events() {
  const eventTimes = useEventTimes();
  const sortedEventTimes = useMemo(
    () =>
      eventTimes &&
      Object.values(eventTimes).toSorted(
        (a, b) =>
          b.all_day - a.all_day ||
          a.starting - b.starting ||
          a.ending - b.ending ||
          a.event.title.localeCompare(b.event.title)
      ),
    [eventTimes]
  );

  const [selectedDay, setSelectedDay] = useState('Wednesday');

  function renderEventTime(eventTime) {
    if (eventTime.day_of_week !== selectedDay) {
      return null;
    }
    return <EventCard key={eventTime.event_time_id} eventTime={eventTime} />;
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
      <Header>Events</Header>
      <SelectDayTabBar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <Grid container spacing={2} padding={2}>
        {renderEvents()}
      </Grid>
    </>
  );
}

export default Events;
