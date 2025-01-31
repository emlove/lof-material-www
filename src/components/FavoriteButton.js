import React from 'react';

import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {
  useFavoriteEventTimeIds,
  useToggleFavoriteEventTime,
} from 'contexts/favorites';

function FavoriteButton({ eventTime, variant = 'small' }) {
  const favoriteEventTimeIds = useFavoriteEventTimeIds();
  const toggleFavoriteEventTime = useToggleFavoriteEventTime();
  const isFavorite = favoriteEventTimeIds.has(eventTime?.event_time_id);

  function handleClick() {
    toggleFavoriteEventTime(eventTime.event_time_id);
  }

  if (eventTime === null) {
    return <Skeleton variant="rectangular" width={78} height={36} />;
  }
  if (variant === 'small') {
    return (
      <Button
        variant="outlined"
        endIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={handleClick}
      >
        {eventTime.event.heart_count + (isFavorite ? 1 : 0)}
      </Button>
    );
  }
  if (variant === 'large') {
    return (
      <Button
        variant="outlined"
        startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={handleClick}
      >
        {isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
      </Button>
    );
  }
}

export default FavoriteButton;
