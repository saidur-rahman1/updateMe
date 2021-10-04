import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';


const useStyles = makeStyles((theme) => ({
  topBar: {
    backgroundColor: theme.palette.primary.main,
    height:'5rem',
    padding:'1rem'
  },
  typography_update: {
    cursor: 'pointer',
    color: 'white'
  },
  typography_me: {
    cursor: 'pointer',
    color: '#284097'
  },
  typography_settings: {
    cursor: 'pointer',
    color: 'lightgrey'
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (

        <Grid xs={12} container className={classes.topBar}>
          <Grid item xs={3} container alignItems="center" justify="center">
            <Typography component="h2" variant="h5" className={classes.typography_update}>
                update
            </Typography>
            <Typography component="h2" variant="h5" className={classes.typography_me}>
                Me
            </Typography>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={2} container alignItems="center" justify="flex-end">
            <Typography component="h2" variant="h5" className={classes.typography_settings}>
                <SettingsIcon />
            </Typography>
          </Grid>
        </Grid>
  );
}