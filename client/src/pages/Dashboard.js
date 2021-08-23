import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
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
    padding: '16px',
    height: '100vh'
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
        <Grid item xs={12} container style={{backgroundColor:"#2196f3", height:"50px"}}>
          <Grid item xs={3} container style={{alignItems:'center', justifyContent: 'center'}}>
            <Typography component="h1" variant="h5" style={{ cursor: 'pointer', color: 'white' }}>
                update
            </Typography>
            <Typography component="h1" variant="h5" style={{ cursor: 'pointer', color: 'black' }}>
                Me
            </Typography>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={2} container style={{alignItems:'center', justifyContent: 'center'}}>
            <Typography component="h1" variant="h5" style={{ cursor: 'pointer', color: 'black' }}>
                <SettingsIcon />
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3} container>
          <Paper xs={3} className={classes.paper}>
            <Grid item spacing={1} container style={{alignItems:'center'}}>
              <Grid item><img src={reddit} alt="reddit" width="20" height="20"/></Grid>
              <Grid item style={{width: '210px'}}><Typography>Reddit</Typography></Grid>
              <Grid item><Switch checked={values.reddit} onChange={handleInputChange} name="reddit" color="primary" /></Grid>
            </Grid>
            <Grid item spacing={1} container style={{alignItems:'center'}}>
              <Grid item><img src={bi} alt="bi" width="20" height="20"/></Grid>
              <Grid item style={{width: '210px'}}><Typography>Business Insider</Typography></Grid>
              <Grid item><Switch checked={values.bi} onChange={handleInputChange} name="bi" color="primary" /></Grid>
            </Grid>
            <Grid item spacing={1} container style={{alignItems:'center'}}>
              <Grid item><img src={twitter} alt="twitter" width="20" height="20"/></Grid>
              <Grid item style={{width: '210px'}}><Typography>Twitter</Typography></Grid>
              <Grid item><Switch checked={values.twitter} onChange={handleInputChange} name="twitter" color="primary" /></Grid>
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