import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.link}>
            Social Necessities
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/login" className={classes.link}>
            Login
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/signup" className={classes.link}>
            Sign Up
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
