import React, { useState, useMemo, useRef, useEffect } from 'react';

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { useEventTimes } from 'contexts/data';
import { useFavoriteEventTimeIds } from 'contexts/favorites';

import EventCard from 'components/EventCard';
import Header from 'components/Header';
import SelectDayTabBar from 'components/SelectDayTabBar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import { EVENT_DAYS, TAGS } from 'const';

function getDefaultFilters() {
  return Object.fromEntries(TAGS.map((tag) => [tag.slug, false]));
}

function Events({ favoritesOnly }) {
  const weekSelectionHeaderRef = useRef();
  const [filters, setFilters] = useState(() => {
    try {
      const storedFilters = JSON.parse(localStorage.getItem('lastFilters'));
      if (storedFilters === null) {
        return getDefaultFilters();
      }
      return Object.fromEntries(
        TAGS.map((tag) => [tag.slug, !!storedFilters[tag.slug]])
      );
    } catch (error) {
      console.error(error);
      return getDefaultFilters();
    }
  });
  const [showAllDayEvents, setShowAllDayEvents] = useState(
    localStorage.getItem('showAllDay') !== 'false'
  );
  const [selectedDay, setSelectedDay] = useState(
    EVENT_DAYS.find((d) => d === localStorage.getItem('lastSelectedDay')) ||
      'Wednesday'
  );
  const eventTimes = useEventTimes();
  const favoriteEventTimeIds = useFavoriteEventTimeIds();
  const sortedEventTimes = useMemo(
    () =>
      eventTimes &&
      Object.values(eventTimes).toSorted(
        (a, b) =>
          a.starting - b.starting || // Sort first by start time
          a.ending - b.ending || // Then by earliest end time
          a.event.title.localeCompare(b.event.title) // Then alphabetically
      ),
    [eventTimes]
  );

  const filteredEventTimes = useMemo(() => {
    const preFilteredEventTimes = sortedEventTimes?.filter(
      (eventTime) =>
        eventTime.day_of_week === selectedDay &&
        (!favoritesOnly || favoriteEventTimeIds.has(eventTime.event_time_id))
    );
    const selectedTagSlugs = TAGS.reduce((acc, tag) => {
      if (filters[tag.slug]) {
        acc.add(tag.slug);
      }
      return acc;
    }, new Set());
    if (selectedTagSlugs.size === 0) {
      return preFilteredEventTimes;
    }
    return preFilteredEventTimes?.filter((eventTime) =>
      [...selectedTagSlugs].some((slug) => eventTime.event[slug])
    );
  }, [
    sortedEventTimes,
    filters,
    selectedDay,
    favoriteEventTimeIds,
    favoritesOnly,
  ]);

  useEffect(() => {
    if (!showAllDayEvents && weekSelectionHeaderRef.current) {
      weekSelectionHeaderRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [showAllDayEvents]);

  useEffect(() => {
    localStorage.setItem('lastSelectedDay', selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem('showAllDay', showAllDayEvents);
  }, [showAllDayEvents]);

  useEffect(() => {
    localStorage.setItem('lastFilters', JSON.stringify(filters));
  }, [filters]);

  function handleFilterToggle(slug) {
    setFilters((oldFilters) => ({
      ...oldFilters,
      [slug]: !filters[slug],
    }));
  }

  function handleToggleAllDayEvents() {
    setShowAllDayEvents(!showAllDayEvents);
  }

  function handleRemoveFilters() {
    setFilters(getDefaultFilters());
    setShowAllDayEvents(true);
  }

  function renderEventTime(eventTime) {
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
      <Header
        button={
          !showAllDayEvents || Object.values(filters).some((f) => f) ? (
            <IconButton
              aria-label="Remove filters"
              size="large"
              onClick={handleRemoveFilters}
            >
              <FilterAltOffIcon />
            </IconButton>
          ) : null
        }
      >
        {favoritesOnly ? 'Favorites' : 'Events'}
      </Header>
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
      {filteredEventTimes?.some((e) => e.all_day) ? (
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
              top: (theme) => theme.spacing(9),
              display: 'flex',
              backgroundColor: 'white',
            }}
            variant="outlined"
            color="primaryText"
            onClick={handleToggleAllDayEvents}
            endIcon={showAllDayEvents ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {showAllDayEvents ? 'Hide ' : 'Show '}All Day Events
          </Button>
        </Stack>
      ) : null}
      <Grid container spacing={2} padding={2}>
        {renderEvents(false)}
      </Grid>
    </>
  );
}

export default Events;
