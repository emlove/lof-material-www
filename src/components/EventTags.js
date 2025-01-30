import React from 'react';

import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';

import LocalBarIcon from '@mui/icons-material/LocalBar';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BrushIcon from '@mui/icons-material/Brush';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

const TAGS = [
  {
    slug: 'alcohol',
    name: 'Alcohol',
    icon: LocalBarIcon,
  },
  {
    slug: 'crafting',
    name: 'Crafting',
    icon: BrushIcon,
  },
  {
    slug: 'fire_art',
    name: 'Fire Art',
    icon: LocalFireDepartmentIcon,
  },
  {
    slug: 'food',
    name: 'Food',
    icon: LocalDiningIcon,
  },
  {
    slug: 'red_light',
    name: 'Red Light',
    icon: LightbulbIcon,
  },
  {
    slug: 'sober',
    name: 'Sober',
    icon: NoDrinksIcon,
  },
  {
    slug: 'spectacle',
    name: 'Spectacle',
    icon: TheaterComedyIcon,
  },
];

function EventTags({ event }) {
  if (!event) return null;

  return (
    <Grid container spacing={1}>
      {TAGS.map((tag) => {
        if (!event[tag.slug]) return null;
        const IconComponent = tag.icon;
        return (
          <Grid key={tag.slug}>
            <Chip icon={<IconComponent />} label={tag.name} color={tag.slug} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default EventTags;
