import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles.js';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const initialValues = {
  id: 0,
  email: '',
  emailError: false,
  emailHelperText: '',

  password: '',
  passwordError: false,
  passwordHelperText: ''
};

export default function Login(props) {
  const classes = useStyles();

  const { location: { state } } = props;

  const [values, setValues] = useState(initialValues);
  const {dispatch} = useContext(AuthContext);

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

      passwordError: false,
      passwordHelperText: ''
    };

    let emailChecker = (/$^|.+@.+..+/).test(values.email);
    if (!emailChecker || values.email === '') {
      isError = true;
      errors.emailHelperText = "Enter valid email";
      errors.emailError = true;
    }

    if (!(values.password.length > 5)) {
      isError = true;
      errors.passwordHelperText = "Minimum 6 characters needed";
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

      dispatch({ type: "LOGIN_START" });
      try {
        let outcome = await axios.post("http://localhost:3001/login/", loginData);
        if (outcome.status === 201) {
          dispatch({ type: "LOGIN_SUCCESS", payload: outcome.data });
          setRedirect(state?.from ?? '/dashboard');
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      }

      setValues({
        ...values,
        id: 0,
        email: '',
        emailError: false,
        emailHelperText: '',

        password: '',
        passwordError: false,
        passwordHelperText: ''
      });
    }
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

    return (
      <Grid component="main" container justify="center">
        <Grid item xs={12} container className={classes.topBar}>
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
              Don't have an account?
            </Typography>
          </Grid>
          <Grid item xs={2} container alignItems="center" justify="flex-start">
              <Button 
              className={classes.button}
              component={Link} to="/"
              size="large"
              variant="outlined" 
              color="secondary">
                <Typography component="h2">Sign Up</Typography>
              </Button>
          </Grid>
        </Grid>
        <Grid className={classes.paper}>
          <Typography component="h2" variant="h6">
            Welcome back!
          </Typography>
          <Typography component="h2" className={classes.subheading}>
            Login to your account
          </Typography>
             <form className={classes.form} onSubmit={handleSubmit} noValidate>
               <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <TextField
                      className={classes.root}
                      error={values.emailError}
                      helperText={values.emailHelperText}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Your email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={values.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.root}
                      error={values.passwordError}
                      helperText={values.passwordHelperText}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleInputChange}
                      InputProps={{endAdornment: 
                        <Grid item xs>
                          <Button className={classes.forgot}>Forgot?</Button>
                        </Grid>
                      }}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Login
                  </Button>
               </Grid>
              </form>
        </Grid>
      </Grid>
    )
}