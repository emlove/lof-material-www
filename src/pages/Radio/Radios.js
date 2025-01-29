import React, { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useRadios } from 'contexts/data';

import RadioCard from 'components/RadioCard';

import { EVENT_DAYS } from 'const';

function Radios() {
  const radios = useRadios();
  const sortedRadios = useMemo(
    () =>
      radios &&
      Object.values(radios).toSorted((a, b) => a.radio_time > b.radio_time),
    [radios]
  );

  const [selectedDay, setSelectedDay] = useState('Wednesday');

  function renderRadio(radio) {
    if (radio.radio_day !== selectedDay) {
      return null;
    }
    return <RadioCard radio={radio} />;
  }

  function renderRadios() {
    if (!sortedRadios) {
      return Array(12)
        .fill(null)
        .map((_, index) => (
          <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
            <Skeleton variant="rectangular" width="100%" height={240} />
          </Grid>
        ));
    }
    return sortedRadios.map(renderRadio);
  }

  return (
    <>
      <Typography variant="h2">Radio</Typography>
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
        {renderRadios()}
      </Grid>
    </>
  );
}

export default Radios;
