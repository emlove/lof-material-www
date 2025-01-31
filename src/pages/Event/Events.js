import React, { useState, useMemo, useRef, useEffect } from 'react';

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useEventTimes } from 'contexts/data';
import { useFavoriteEventTimeIds } from 'contexts/favorites';

import EventCard from 'components/EventCard';
import Header from 'components/Header';
import SelectDayTabBar from 'components/SelectDayTabBar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { TAGS } from 'const';

function Events({ favoritesOnly }) {
  const weekSelectionHeaderRef = useRef();
  const [filters, setFilters] = useState(
    Object.fromEntries(TAGS.map((tag) => [tag.slug, false]))
  );
  const [showAllDayEvents, setShowAllDayEvents] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Wednesday');
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

  const filteredEventTimes = useMemo(() => {
    const selectedTagSlugs = TAGS.reduce((acc, tag) => {
      if (filters[tag.slug]) {
        acc.add(tag.slug);
      }
      return acc;
    }, new Set());
    if (selectedTagSlugs.size === 0) {
      return sortedEventTimes;
    }
    return sortedEventTimes?.filter((eventTime) =>
      [...selectedTagSlugs].some((slug) => eventTime.event[slug])
    );
  }, [sortedEventTimes, filters]);

  useEffect(() => {
    if (!showAllDayEvents && weekSelectionHeaderRef.current) {
      weekSelectionHeaderRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [showAllDayEvents]);

  function handleFilterToggle(slug) {
    setFilters((oldFilters) => ({
      ...oldFilters,
      [slug]: !filters[slug],
    }));
  }

  function handleToggleAllDayEvents() {
    setShowAllDayEvents(!showAllDayEvents);
  }

  function renderEventTime(eventTime) {
    if (eventTime.day_of_week !== selectedDay) {
      return null;
    }
    if (favoritesOnly && !favoriteEventTimeIds.has(eventTime.event_time_id)) {
      return null;
    }
    return <EventCard key={eventTime.event_time_id} eventTime={eventTime} />;
  }

  function renderEvents(allDay = false) {
    if (!filteredEventTimes) {
      return Array(12)
        .fill(null)
        .map((_, index) => (
          <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
            <Skeleton variant="rectangular" width="100%" height={240} />
          </Grid>
        ));
    }
    return filteredEventTimes.map((eventTime) => {
      if (allDay !== eventTime.all_day) return null;
      return renderEventTime(eventTime);
    });
  }

  return (
    <>
      <Header>{favoritesOnly ? 'Favorites' : 'Events'}</Header>
      <Grid container spacing={1}>
        {TAGS.map((tag) => {
          const IconComponent = tag.icon;
          return (
            <Grid key={tag.slug}>
              <Chip
                onClick={() => handleFilterToggle(tag.slug)}
                variant={filters[tag.slug] ? 'filled' : 'outlined'}
                icon={<IconComponent />}
                label={tag.name}
                color={tag.slug}
              />
            </Grid>
          );
        })}
      </Grid>
      <SelectDayTabBar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        ref={weekSelectionHeaderRef}
      />
      <Stack direction="column-reverse">
        <Collapse in={showAllDayEvents}>
          <Grid container spacing={2} padding={2}>
            {renderEvents(true)}
          </Grid>
        </Collapse>
        <Button
          sx={{
            margin: 2,
            padding: 1,
            position: 'sticky',
            top: (theme) => theme.spacing(2),
            display: 'flex',
            backgroundColor: 'white',
          }}
          variant="outlined"
          color="primaryText"
          onClick={handleToggleAllDayEvents}
          endIcon={showAllDayEvents ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          All Day Events
        </Button>
      </Stack>
      <Grid container spacing={2} padding={2}>
        {renderEvents(false)}
      </Grid>
    </>
  );
}

export default Events;
