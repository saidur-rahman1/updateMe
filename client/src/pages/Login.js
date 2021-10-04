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
  },
  forgot: {
    textTransform: 'unset',
    [`&:hover`]: {
      background: 'none'
    }
  }
}));

const initialValues = {
  id: 0,
  email: '',
  emailError: false,
  emailHelperText: '',

  password: '',
  passwordError: false,
  passwordHelperText: ''
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

      try {
        let outcome = await axios.post("http://localhost:3001/login/", loginData);
        console.log("Login successful");
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
              Don't have an account?
            </Typography>
          </Grid>
          <Grid item xs={2} container alignItems="center" justify="flex-start">
              <Button 
              className={classes.button}
              component={Link} to="/"
              size="large"
              variant="outlined" 
              color="white">
                <Typography component="h2">Sign Up</Typography>
              </Button>
          </Grid>
        </Grid>
        <Grid className={classes.paper}>
          <Typography component="h2" variant="h7">
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
                      HelperText={values.emailHelperText}
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
                      HelperText={values.passwordHelperText}
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
                  {/* <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot?
                      </Link>
                    </Grid>
                  </Grid> */}
               </Grid>
              </form>
        </Grid>
      </Grid>
    )
}