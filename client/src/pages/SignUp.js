import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

const initialValues = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password1: '',
  password2: ''
};

export default function SignUp() {
  const classes = useStyles();

  const initialValidation = () => {
    let temp = {}
    temp.firstName = values.firstName?"":"Enter first name"
    temp.lastName = values.lastName?"":"Enter last name"
    temp.email = values.email?"":"Enter email"
    temp.password1 = values.password1?"":"Enter password"
    temp.password2 = values.password2?"":"Confirm password"
  }

  const [values, setValues] = useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  return (
    <Grid component="main" maxWidth="xs">
      <Grid className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error
                helperText=""
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleInputChange, initialValidation}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error
                helperText=""
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={values.lastName}
                onChange={handleInputChange, initialValidation}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error
                helperText=""
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleInputChange, initialValidation}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error
                helperText=""
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={values.password1}
                onChange={handleInputChange, initialValidation}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error
                helperText=""
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={values.password2}
                onChange={handleInputChange, initialValidation}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}