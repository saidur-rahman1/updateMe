import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
  email: '',
  emailError: false,
  emailHelpertext: '',

  company: '',
  companyError: false,
  companyHelpertext: '',

  password1: '',
  password1Error: false,
  password1Helpertext: '',

  password2: '',
  password2Error: false,
  password2Helpertext: ''
};

export default function SignUp() {
  const classes = useStyles();

  const [values, setValues] = useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  const finalValidation = () => {
    let isError = false;
    const errors = {
      emailError: false,
      emailHelpertext: '',

      companyError: false,
      companyHelpertext: '',

      password1Error: false,
      password1Helpertext: '',

      password2Error: false,
      password2Helpertext: ''
    };

    let emailChecker = (/$^|.+@.+..+/).test(values.email);
    if (!emailChecker || values.email === '') {
      isError = true;
      errors.emailHelpertext = "Enter valid email";
      errors.emailError = true;
    }

    if (values.company === '') {
      isError = true;
      errors.companyHelpertext = "Enter company name";
      errors.companyError = true;
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

    setValues({
      ...values,
      ...errors
    });

    return isError;
  }

  const [redirect, setRedirect] = useState();

  async function handleSubmit (e) {
    e.preventDefault()
    
    const err = finalValidation();
    if (!err) {
      let email = values.email;
      let company = values.company;
      let password1 = values.password1;
      let password2 = values.password2;
      const signUpData = {
        email, company, password1, password2
      };

      try {
        let outcome = await axios.post("http://localhost:3001/signup/", signUpData);
        console.log("Registration successful");
        if (outcome.status === 201) {
          setRedirect('/dashboard');
        }
      } catch (err) {
        console.log(err);
      }

      setValues({
        ...values,
        id: 0,
        email: '',
        emailError: false,
        emailHelpertext: '',

        company: '',
        companyError: false,
        companyHelpertext: '',

        password1: '',
        password1Error: false,
        password1Helpertext: '',

        password2: '',
        password2Error: false,
        password2Helpertext: ''
      });
    }
  
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <Grid component="main">
      <Grid className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form method="post" action="/signup" className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
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
                error={values.companyError}
                helperText={values.companyHelpertext}
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
                value={values.company}
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