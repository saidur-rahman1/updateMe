import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles.js';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AuthContext from '../context/AuthContext';

export default function NavBar() {
  const classes = useStyles();
  const { user, dispatch } = useContext(AuthContext);
  const [values, setValues] = useState();

  let tempUser = user;

  const handleInputChange = e => {
    setValues(e.target.value)
    tempUser.search = e.target.value;
    dispatch({ type: "SEARCH", payload: tempUser });
  }

  return (
        <Grid item xs={12} container className={classes.topBar}>
          <Grid item xs={3} container alignItems="center" justify="center">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Grid item container alignItems="center" justify="center" style={{ textDecoration: 'none' }}>
                  <Typography component="h2" variant="h5" className={classes.typography_update}>
                      update
                  </Typography>
                  <Typography component="h2" variant="h5" className={classes.typography_me}>
                      Me
                  </Typography>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={7} container alignItems="center" justify="center">
            <TextField
              className={classes.debouncedSearch}
              variant="outlined"
              margin="normal"
              id="search"
              placeholder="Keyword..."
              name="search"
              value={values}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2} container alignItems="center" justify="flex-end">
            <Typography component="h2" variant="h5">
              <Link to="/settings" style={{ textDecoration: "none" }}>
                <Button className={classes.typography_settings}
                  startIcon={<SettingsIcon />}
                >
                </Button>
              </Link>
            </Typography>
          </Grid>
        </Grid>
  );
}