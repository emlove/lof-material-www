import React, { useState, useLayoutEffect } from 'react';

import { useLocation } from 'react-router';

import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function BackToTopButton() {
  const theme = useTheme();
  const location = useLocation();
  const [lastScroll, setLastScroll] = useState(null);
  const scrolledDown = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });
  useLayoutEffect(() => {
    if (scrolledDown) {
      setLastScroll(null);
    }
  }, [scrolledDown]);

  useLayoutEffect(() => {
    setLastScroll(null);
  }, [location.key]);

  const handleClick = (event) => {
    if (lastScroll) {
      setLastScroll(null);
      window.scroll({ top: lastScroll, behavior: 'smooth' });
    } else {
      setLastScroll(window.scrollY);
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  };

  const biggerScreen = useMediaQuery(theme.breakpoints.up('md'));
  const fabSpacing = theme.spacing(biggerScreen ? 4 : 2);
  const fabSize = biggerScreen ? 'medium' : 'small';

  return (
    <Fade in={scrolledDown || lastScroll}>
      <Fab
        size={fabSize}
        sx={{ position: 'fixed', bottom: fabSpacing, right: fabSpacing }}
        onClick={handleClick}
      >
        {lastScroll ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </Fab>
    </Fade>
  );
}

export default BackToTopButton;
