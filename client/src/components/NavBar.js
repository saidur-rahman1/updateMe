import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles.js';
import SettingsIcon from '@material-ui/icons/Settings';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AuthContext from '../context/AuthContext.js';

export default function NavBar() {
  const classes = useStyles();
  const { loggedIn } = useContext(AuthContext);

  const [redirectDashboard, setRedirectDashboard] = useState();
  const [redirectSettings, setRedirectSettings] = useState();

  function toDashboard() {
    if (loggedIn===true) {
      setRedirectDashboard('/dashboard');
    } else {
      setRedirectDashboard('/login');
    }
  }

  function toSettings() {
    if (loggedIn===true) {
      setRedirectSettings('/settings');
    } else {
      setRedirectSettings('/login');
    }
  }

  // component={Link} to="/dashboard"
  // component={Link} to="/settings"

  if (redirectDashboard) {
    return <Redirect to={redirectDashboard} />
  }

  if (redirectSettings) {
    return <Redirect to={redirectSettings} />
  }

  return (

        <Grid item xs={12} container className={classes.topBar}>
          <Grid item xs={3} container alignItems="center" justify="center">
            <Grid item container alignItems="center" justify="center" onClick={toDashboard} style={{ textDecoration: 'none' }}>
              <Typography component="h2" variant="h5" className={classes.typography_update}>
                  update
              </Typography>
              <Typography component="h2" variant="h5" className={classes.typography_me}>
                  Me
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={2} container alignItems="center" justify="flex-end">
            <Typography component="h2" variant="h5">
                <Button className={classes.typography_settings}
                  onClick={toSettings}
                  startIcon={<SettingsIcon />}
                >
                </Button>
            </Typography>
          </Grid>
        </Grid>
  );
}