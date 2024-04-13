import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles,
} from '@material-ui/core';
import MlbLogo from '../resources/mlb_logo.png';

const useStyles = makeStyles(() => ({
  root: {
  },
  MuiAppBar: {
    backgroundColor: '#27251F',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  navbar_logo: {
    maxHeight: 40,
    width: 'auto',
    height: '100%',
  },
  title: {
    paddingLeft: '5px',
    align: 'right'
  }
}));

const TopBar = ({ className, onMobileNavOpen }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.MuiAppBar} elevation={0}>
      <Toolbar>
      <img src={MlbLogo} alt="Logo" className={classes.navbar_logo}/>
      <h3 className={classes.title}>Pitcher Versus</h3>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};
TopBar.defaultProps = {
  className: '',
  onMobileNavOpen: () => {},
};

export default TopBar;
