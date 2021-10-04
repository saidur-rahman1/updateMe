import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    [`& fieldset`]: {
          borderRadius: 35,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '50%',
    padding: '1.5rem'
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    cursor: 'pointer',
    color: 'white',
    borderColor: 'white',
    borderRadius: '35px',
    height: '3rem',
    width: '30%'
  },
  topBar: {
    backgroundColor: theme.palette.primary.main,
    height:'5rem',
    padding:'1rem'
  },
  typography_update: {
    cursor: 'pointer',
    color: 'white'
  },
  typography_me: {
    cursor: 'pointer',
    color: '#284097'
  },
  typography_redirect: {
    color: 'white',
    marginRight: '1.5rem'
  },
  button: {
    cursor: 'pointer',
    color: 'white',
    borderColor: 'white',
    borderRadius: '35px',
    width: '45%',
    height: '3rem'
  },
  subheading: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1)
  }
}));

const initialValues = {
  id: 0,
  email: '',
  emailError: false,
  emailHelperText: '',

  company: '',
  companyError: false,
  companyHelperText: '',

  password1: '',
  password1Error: false,
  password1HelperText: '',

  password2: '',
  password2Error: false,
  password2HelperText: ''
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
      emailHelperText: '',

      companyError: false,
      companyHelperText: '',

      password1Error: false,
      password1HelperText: '',

      password2Error: false,
      password2HelperText: ''
    };

    let emailChecker = (/$^|.+@.+..+/).test(values.email);
    if (!emailChecker || values.email === '') {
      isError = true;
      errors.emailHelperText = "Enter valid email";
      errors.emailError = true;
    }

    if (values.company === '') {
      isError = true;
      errors.companyHelperText = "Enter company name";
      errors.companyError = true;
    }

    if (!(values.password1.length > 5)) {
      isError = true;
      errors.password1HelperText = "Minimum 6 characters needed";
      errors.password1Error = true;
    } 

    let pass1 = values.password1.toString()
    let pass2 = values.password2.toString();
    
    if (pass1 !== pass2) {
      isError = true;
      errors.password2HelperText = "Passwords don't match";
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
        emailHelperText: '',

        company: '',
        companyError: false,
        companyHelperText: '',

        password1: '',
        password1Error: false,
        password1HelperText: '',

        password2: '',
        password2Error: false,
        password2HelperText: ''
      });
    }
  
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <Grid component="main" container justify="center">
      <Grid xs={12} container className={classes.topBar}>
        <Grid item xs={3} container alignItems="center" justify="center">
          <Typography component="h2" variant="h5" className={classes.typography_update}>
              update
          </Typography>
          <Typography component="h2" variant="h5" className={classes.typography_me}>
              Me
          </Typography>
        </Grid>
        <Grid item xs={7} container alignItems="center" justify="flex-end">
          <Typography component="h2" className={classes.typography_redirect}>
            Already have an account?
          </Typography>
        </Grid>
        <Grid item xs={2} container alignItems="center" justify="flex-start">
            <Button 
            className={classes.button}
            component={Link} to="/login"
            size="large"
            variant="outlined" 
            color="white">
              <Typography component="h2">Login</Typography>
            </Button>
        </Grid>
      </Grid>
      <Grid className={classes.paper}>
        <Typography component="h2" variant="h7">
          Let's Get Started!
        </Typography>
        <Typography component="h2" className={classes.subheading}>
          Create an account
        </Typography>
        <form method="post" action="/signup" className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <TextField
                className={classes.root}
                error={values.emailError}
                HelperText={values.emailHelperText}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Your email"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.root}
                error={values.companyError}
                HelperText={values.companyHelperText}
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company name"
                name="company"
                autoComplete="company"
                value={values.company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.root}
                error={values.password1Error}
                HelperText={values.password1HelperText}
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
                className={classes.root}
                error={values.password2Error}
                HelperText={values.password2HelperText}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}