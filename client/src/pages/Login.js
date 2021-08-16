import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
//import Dashboard from './Dashboard';

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
    marginTop: theme.spacing(1),
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

  password: '',
  passwordError: false,
  passwordHelpertext: ''
};

export default function Login() {
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

      passwordError: false,
      passwordHelpertext: ''
    };

    let emailChecker = (/$^|.+@.+..+/).test(values.email);
    if (!emailChecker || values.email === '') {
      isError = true;
      errors.emailHelpertext = "Enter valid email";
      errors.emailError = true;
    }

    if (!(values.password.length > 5)) {
      isError = true;
      errors.passwordHelpertext = "Minimum 6 characters needed";
      errors.passwordError = true;
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
      let password = values.password;
      const loginData = {
        email, password
      };

      try {
        await axios.post("http://localhost:3001/login/", loginData).then((outcome) => {
          if (outcome.status === 201) {
            console.log("Welcome to Dashboard");
            // setRedirect('/dashboard');
            // if (redirect) {
            //   return <Redirect push to={redirect} />;
            // }
            window.location = '/dashboard';
          }
        }, (error) => {
          console.log(error);
        });
      } catch (err) {
        console.log(err);
      }

      setValues({
        ...values,
        id: 0,
        email: '',
        emailError: false,
        emailHelpertext: '',

        password: '',
        passwordError: false,
        passwordHelpertext: ''
      });
    }
  }

    return (
      <Grid component="main">
        <Grid className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              error={values.emailError}
              helperText={values.emailHelpertext}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleInputChange}
            />
            <TextField
              error={values.passwordError}
              helperText={values.passwordHelpertext}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    )
}