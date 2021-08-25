import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';


const useStyles = makeStyles((theme) => ({
  topBar: {
    backgroundColor: theme.palette.primary.main,
    height:'5rem',
    padding:'1.5rem'
  },
  typography: {
    cursor: 'pointer'
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
      <Grid container>
        <Grid item xs={12} container className={classes.topBar}>
          <Grid item xs={3} container alignItems="center" justifyContent="center">
            <Typography component="h2" variant="h5" className={classes.typography} style={{color: 'white'}}>
                update
            </Typography>
            <Typography component="h2" variant="h5" className={classes.typography} style={{color: '#284097'}}>
                Me
            </Typography>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={2} container alignItems="center" justifyContent="flex-end">
            <Typography component="h2" variant="h5" className={classes.typography} style={{color: 'lightgrey'}}>
                <SettingsIcon />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
  );
}