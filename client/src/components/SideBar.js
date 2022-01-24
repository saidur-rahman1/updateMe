import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import reddit from '../icons/reddit.png';
import twitter from '../icons/twitter.png';
import bi from '../icons/bi.jpg';
import AuthContext from '../context/AuthContext.js';
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
  switch: {
      alignItems:'center', 
      padding: '0.5rem'
  },
  gridWidth: {
    width: '11rem'
  }
}));

export default function SideBar() {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
  
    const [values, setValues] = useState({
      reddit: false,
      bi: false,
      twitter: false
    });
  
    const handleInputChange = async (e) => {
      const email = user.email;
      const { name, checked } = e.target
      setValues({
        ...values,
        [name]:checked
      })
      if (checked) {
        await axios.post("http://localhost:3001/addPlatform/", {name, email});
      } else {
        await axios.post("http://localhost:3001/removePlatform/", {name, email});
      }
    }
  
  
    return (
          <Grid item xs={12} container>
            <Paper xs={3} className={classes.paper}>
              <Grid item spacing={1} container className={classes.switch}>
                <Grid item><img src={reddit} alt="reddit" width="35rem" height="35rem"/></Grid>
                <Grid item className={classes.gridWidth}><Typography component="h2" variant="h6">Reddit</Typography></Grid>
                <Grid item><Switch checked={values.reddit} onChange={handleInputChange} name="reddit" color="primary" /></Grid>
              </Grid>
              <Grid item spacing={1} container className={classes.switch}>
                <Grid item><img src={twitter} alt="twitter" width="35rem" height="35rem"/></Grid>
                <Grid item className={classes.gridWidth}><Typography component="h2" variant="h6">Twitter</Typography></Grid>
                <Grid item><Switch checked={values.twitter} onChange={handleInputChange} name="twitter" color="primary" /></Grid>
              </Grid>
              <Grid item spacing={1} container className={classes.switch}>
                <Grid item><img src={bi} alt="bi" width="35rem" height="35rem"/></Grid>
                <Grid item className={classes.gridWidth}><Typography component="h2" variant="h6">Business Insider</Typography></Grid>
                <Grid item><Switch checked={values.bi} onChange={handleInputChange} name="bi" color="primary" /></Grid>
              </Grid>
            </Paper>
          </Grid>
    );
  }