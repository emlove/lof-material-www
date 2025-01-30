import React from 'react';

import { useParams } from 'react-router';

import { useEventTime } from 'contexts/data';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Header from 'components/Header';

function Event() {
  const params = useParams();
  const eventTime = useEventTime(params.id);
  return (
    <>
      <Header>
        {eventTime === null ? <Skeleton /> : eventTime.event.title}
      </Header>
      <Typography variant="body1">
        {eventTime === null
          ? Array(4)
              .fill(null)
              .map(() => <Skeleton />)
          : eventTime.event.event_description}
      </Typography>
    </>
  );
}

export default Event;
