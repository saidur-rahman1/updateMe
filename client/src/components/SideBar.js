import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import reddit from '../icons/reddit.png';
import twitter from '../icons/twitter.png';
import bi from '../icons/bi.jpg';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

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
    const {dispatch, user} = useContext(AuthContext);
  
    const [values, setValues] = useState(() => ({
      reddit: user.platforms.includes("Reddit"),
      bi: user.platforms.includes("Business Insider"),
      twitter: user.platforms.includes("Twitter")
    }));
  
    const handleInputChange = async (e) => {
      const { name, checked } = e.target
      const newValues = { ...values, [name]: checked };
      setValues(newValues);
      const updatedUser = await axios.put("http://localhost:3001/user/platform", newValues);
      dispatch({ type: "UPDATE_PLATFORMS", payload: updatedUser.data });
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