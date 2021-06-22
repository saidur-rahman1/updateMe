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
  firstnameError: false,
  firstnameHelpertext: '',

  lastName: '',
  lastnameError: false,
  lastnameHelpertext: '',

  email: '',
  emailError: false,
  emailHelpertext: '',

  password1: '',
  password1Error: false,
  password1Helpertext: '',

  password2: '',
  password2Error: false,
  password2Helpertext: ''
};

export default function SignUp() {
  const classes = useStyles();

  // const passwordMatch = () => {
  //   let value1 = values.password1.toString()
  //   let value2 = values.password2.toString();
  //   if (value1 === value2) return "";
  //   return "Passwords don't match";
  // }

  // email regex => (/$^|.+@.+..+/).test()

  const [values, setValues] = useState(initialValues);
  //const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  // const initialValidation = () => {
  //   let temp = {}
  //   temp.firstName = values.firstName?"":"Enter first name"
  //   temp.lastName = values.lastName?"":"Enter last name"
  //   temp.email = (/$^|.+@.+..+/).test(values.email)?"":"Enter valid email"
  //   temp.password1 = values.password1.length>5?"":"Password should have minimum 6 characters"
  //   temp.password2 = passwordMatch()
  //   setErrors({
  //     ...temp
  //   })

  //   return Object.values(temp).every(x => x == "")
  // }

  const finalValidation = () => {
    let isError = false;
    const errors = {};

    if (values.firstName == '') {
      isError = true;
      errors.firstnameHelpertext = "Enter first name";
      errors.firstnameError = true;
    }

    if (values.lastName == '') {
      isError = true;
      errors.lastnameHelpertext = "Enter last name";
      errors.lastnameError = true;
    }

    let emailChecker = (/$^|.+@.+..+/).test(values.email);
    if (!emailChecker || values.email == '') {
      isError = true;
      errors.emailHelpertext = "Enter valid email";
      errors.emailError = true;
    }

    if (!(values.password1.length > 5)) {
      isError = true;
      errors.password1Helpertext = "Minimum 6 characters needed";
      errors.password1Error = true;
    } 

    let pass1 = values.password1.toString()
    let pass2 = values.password2.toString();
    
    if (pass1 !== pass2) {
      isError = true;
      errors.password2Helpertext = "Passwords don't match";
      errors.password2Error = true;
    }

    if (isError) {
      setValues({
        ...values,
        ...errors
      });
    }

    return isError;
  }

  const handleSubmit = e => {
    e.preventDefault()
    //window.alert('testing.....');
    const err = finalValidation();
    if (!err) {
      setValues({
        ...values,
        id: 0,
        firstName: '',
        firstnameError: false,
        firstnameHelpertext: '',

        lastName: '',
        lastnameError: false,
        lastnameHelpertext: '',

        email: '',
        emailError: false,
        emailHelpertext: '',

        password1: '',
        password1Error: false,
        password1Helpertext: '',

        password2: '',
        password2Error: false,
        password2Helpertext: ''
      });
    }
  }

  return (
    <Grid component="main" maxWidth="xs">
      <Grid className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={values.firstnameError}
                helperText={values.firstnameHelpertext}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={values.lastnameError}
                helperText={values.lastnameHelpertext}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={values.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={values.emailError}
                helperText={values.emailHelpertext}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={values.password1Error}
                helperText={values.password1Helpertext}
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={values.password1}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={values.password2Error}
                helperText={values.password2Helpertext}
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={values.password2}
                onChange={handleInputChange}
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