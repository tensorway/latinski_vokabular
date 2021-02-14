import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {domain_name} from '../src/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Latinski vokabular
          </Typography>
          {/* <a href={}> */}
          <Button color="inherit" onClick={(e) => {
            e.preventDefault();
            window.location.href=domain_name;
          }}>
            home</Button>
          {/* </a> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
