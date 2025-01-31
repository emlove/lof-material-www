import React, { useState, useMemo } from 'react';

import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

import { useEventTimes } from 'contexts/data';
import { useFavoriteEventTimeIds } from 'contexts/favorites';

import EventCard from 'components/EventCard';
import Header from 'components/Header';
import SelectDayTabBar from 'components/SelectDayTabBar';

import FilterListIcon from '@mui/icons-material/FilterList';

function Events({ favoritesOnly }) {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const eventTimes = useEventTimes();
  const favoriteEventTimeIds = useFavoriteEventTimeIds();
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
    if (favoritesOnly && !favoriteEventTimeIds.has(eventTime.event_time_id)) {
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
      <Header
        button={
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label={filterDrawerOpen ? 'Show filters' : 'Hide filters'}
            sx={{ mr: 2 }}
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
          >
            <FilterListIcon />
          </IconButton>
        }
      >
        Events
      </Header>
      <Collapse in={filterDrawerOpen}>Filters filters !</Collapse>
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
