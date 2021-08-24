import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Switch from '@material-ui/core/Switch';
import reddit from '../icons/reddit.png';
import twitter from '../icons/twitter.png';
import bi from '../icons/bi.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(0),
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '1rem',
    height: '100rem'
  },
  topBar: {
    backgroundColor: theme.palette.primary.main,
    height:'5rem',
    padding:'1.5rem'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [values, setValues] = useState({
    reddit: false,
    bi: false,
    twitter: false
  });

  const handleInputChange = e => {
    const { name, checked } = e.target
    setValues({
      ...values,
      [name]:checked
    })
  }


  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} container className={classes.topBar}>
          <Grid item xs={3} container alignItems="center" justifyContent= "center">
            <Typography component="h2" variant="h5" style={{ cursor: 'pointer', color: 'white' }}>
                update
            </Typography>
            <Typography component="h2" variant="h5" style={{ cursor: 'pointer', color: '#284097' }}>
                Me
            </Typography>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={2} container style={{alignItems:'center', justifyContent: 'right'}}>
            <Typography component="h2" variant="h5" style={{ cursor: 'pointer', color: 'lightgrey' }}>
                <SettingsIcon />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3} container>
          <Paper xs={3} className={classes.paper}>
            <Grid item spacing={1} container style={{alignItems:'center', padding: '0.5rem'}}>
              <Grid item><img src={reddit} alt="reddit" width="35rem" height="35rem"/></Grid>
              <Grid item style={{width: '11rem'}}><Typography component="h2" variant="h6">Reddit</Typography></Grid>
              <Grid item><Switch checked={values.reddit} onChange={handleInputChange} name="reddit" color="primary" /></Grid>
            </Grid>
            <Grid item spacing={1} container style={{alignItems:'center', padding: '0.5rem'}}>
              <Grid item><img src={twitter} alt="twitter" width="35rem" height="35rem"/></Grid>
              <Grid item style={{width: '11rem'}}><Typography component="h2" variant="h6">Twitter</Typography></Grid>
              <Grid item><Switch checked={values.twitter} onChange={handleInputChange} name="twitter" color="primary" /></Grid>
            </Grid>
            <Grid item spacing={1} container style={{alignItems:'center', padding: '0.5rem'}}>
              <Grid item><img src={bi} alt="bi" width="35rem" height="35rem"/></Grid>
              <Grid item style={{width: '11rem'}}><Typography component="h2" variant="h6">Business Insider</Typography></Grid>
              <Grid item><Switch checked={values.bi} onChange={handleInputChange} name="bi" color="primary" /></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={9} container>
          <Paper className={classes.paper} component="h2">My mentions</Paper>
        </Grid>
      </Grid>
    </div>
  );
}