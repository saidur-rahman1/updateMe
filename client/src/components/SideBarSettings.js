import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '1rem',
    height: '100vh'
  },
  settingsMenu: {
    marginTop: theme.spacing(1.5),
    alignItems:'center', 
  },
  gridWidth: {
    width: '11rem',
    '&:hover':{
      color: theme.palette.primary.main
    },
    cursor: 'pointer'
  },
  settingsIcon: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1)
  }
}));

export default function SideBarSettings() {
    const classes = useStyles();
    const history = useHistory();

    async function logout() {
      let outcome = await axios.get("http://localhost:3001/logout/");
      if (outcome.status === 201) {
        history.push('/login');
      }
    }
  
    return (
          <Grid item xs={3} container>
            <Paper className={classes.paper} component="h2">
              <Grid container spacing={1}>
                <Grid item>Settings</Grid>
                <Grid item>
                  <Typography component="h2" variant="h5" className={classes.settingsIcon}>
                    <SettingsIcon />
                  </Typography>
                </Grid>
              </Grid>
              <Grid item spacing={1} container className={classes.settingsMenu}>
                <Grid item spacing={1} container className={classes.settingsMenu}>
                  <Grid item className={classes.gridWidth}><Typography component="h2" variant="h6">Company</Typography></Grid>
                </Grid>
                <Grid item spacing={1} container className={classes.settingsMenu}>
                  <Grid item className={classes.gridWidth}><Typography component="h2" variant="h6">Security</Typography></Grid>
                </Grid>
                <Grid item spacing={1} container className={classes.settingsMenu}>
                  <Grid item className={classes.gridWidth}><Typography component="h2" variant="h6" onClick={logout}>Log out</Typography></Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
    );
}