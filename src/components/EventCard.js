import React from 'react';

import { Link } from 'react-router';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import EventTags from 'components/EventTags';

import { MAX_DESCRIPTION_LENGTH } from 'const';

function EventCard({ eventTime }) {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Card>
        <CardActionArea
          component={Link}
          to={`/event/${eventTime.event_time_id}`}
        >
          <CardHeader
            title={eventTime.event.title}
            subheader={
              eventTime.all_day
                ? 'All Day'
                : `${eventTime.starting.format('LT')} - ${eventTime.ending.format('LT')}`
            }
          />
          <CardContent>
            <Typography variant="subtitle1">
              {eventTime.event.event_description.length > MAX_DESCRIPTION_LENGTH
                ? `${eventTime.event.event_description.substring(0, MAX_DESCRIPTION_LENGTH)}…`
                : eventTime.event.event_description}
            </Typography>
            <EventTags event={eventTime.event} />
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" endIcon={<FavoriteBorderIcon />}>
            {eventTime.event.heart_count}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default EventCard;
