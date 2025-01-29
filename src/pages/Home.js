import React from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { default as MuiLink } from '@mui/material/Link';
import { Link as RouterLink } from 'react-router';

import LaunchIcon from '@mui/icons-material/Launch';

const EXTERNAL_LINKS = [
  {
    title: 'Survival Guide',
    url: 'http://lakesoffire.org/the-event/survival-guide',
  },
  {
    title: 'Volunteeripate',
    url: 'https://volunteer.lakesoffire.org/',
  },
  {
    title: 'Shouting Fire',
    url: 'https://shoutingfire.com/',
  },
  {
    title: 'Code of Conduct',
    url: 'http://lakesoffire.org/code-of-conduct',
  },
];

const INTERNAL_LINKS = [
  {
    title: 'Events',
    path: '/events',
  },
];

function Home() {
  return (
    <Grid container spacing={2}>
      <Grid size="12">
        <Typography variant="h1">Welcome to Lakes of Fire!</Typography>
      </Grid>
      {EXTERNAL_LINKS.map((linkData) => (
        <Grid key={linkData.url} size={{ xs: 12, md: 6 }}>
          <Button
            component={MuiLink}
            href={linkData.url}
            target="_blank"
            rel="noreferrer"
            sx={{ width: '100%', height: '100%', padding: 2 }}
            variant="contained"
            endIcon={<LaunchIcon />}
          >
            {linkData.title}
          </Button>
        </Grid>
      ))}
      <Divider sx={{ width: '100%' }} />
      {INTERNAL_LINKS.map((linkData) => (
        <Grid key={linkData.path} size={{ xs: 12, md: 6, lg: 4 }}>
          <Button
            component={RouterLink}
            to={linkData.path}
            sx={{ width: '100%', height: '100%', padding: 2 }}
            variant="outlined"
          >
            {linkData.title}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
