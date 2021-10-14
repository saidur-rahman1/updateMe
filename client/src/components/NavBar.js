import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles.js';
import SettingsIcon from '@material-ui/icons/Settings';

export default function NavBar() {
  const classes = useStyles();

  return (

        <Grid item xs={12} container className={classes.topBar}>
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