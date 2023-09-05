import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  makeStyles,
} from '@material-ui/core';
import MlbLogo from '../images/mlb_logo.png';

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
    align: 'right'
  }
}));

const TopBar = ({ className, onMobileNavOpen }) => {
  const history = useNavigate();
  const classes = useStyles();
  return (
    <AppBar className={classes.MuiAppBar} elevation={0}>
      <Toolbar>
      <img src={MlbLogo} alt="Logo" className={classes.navbar_logo}/>
      <h3 className={classes.title}>MLB Pitcher StatCast</h3>
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
