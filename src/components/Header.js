import React from 'react';

import Typography from '@mui/material/Typography';

function Header({ children, ...props }) {
  return (
    <Typography
      sx={{ typography: { sm: 'h1', xs: 'h3' }, width: '100%' }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Header;
