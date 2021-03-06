import React, {useContext, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import NavBar from '../components/NavBar';
import SideBarSettings from '../components/SideBarSettings';
import AuthContext from '../context/AuthContext.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [`& fieldset`]: {
      borderRadius: 35,
    },
    background: 'white',
    borderRadius: '35px',
    width: '20rem',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(0),
    background: '#ecf0f1',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '3rem',
    height: '69vh',
    overflow: 'hidden'
  },
  remove: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    background: '#ccd2e6',
    borderColor: '#ccd2e6',
    borderRadius: '35px',
    padding: '0.5rem',
    "&.Mui-selected": {
      background: theme.palette.primary.main,
      color: 'white'
    },
    textTransform: 'none',
    height: '2rem',
    width: '70%'
  },
  add: {
    cursor: 'pointer',
    color: 'white',
    borderColor: 'white',
    borderRadius: '35px',
    height: '2rem',
    width: '70%'
  },
  marginTop: {
    marginTop: theme.spacing(2.8)
  },
  marginBottom: {
    marginBottom: theme.spacing(4)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    cursor: 'pointer',
    color: 'white',
    borderColor: 'white',
    borderRadius: '35px',
    height: '3rem',
    width: '15%'
  },
  marginLeft: {
    marginLeft: theme.spacing(9)
  }
}));


export default function Settings() {
  const classes = useStyles();
  const { user, dispatch } = useContext(AuthContext);
  const [snackbar, setSnackbar] = useState(false);

  const initialValues = {
    id: 0,
    email: user.email,
    emailError: false,
    emailHelperText: '',
  
    company: '',
    companyError: false,
    companyHelperText: ''
  };

  let tempUser = user;

  const companyList = [...tempUser.company];
  const [values, setValues] = useState(initialValues);
  const [companies, setCompanies] = useState([...companyList]);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  const removeCompany = (company) => {
    for( let i = 0; i < companyList.length; i++){   
      if (companyList[i] === company) { 
          companyList.splice(i, 1); 
          i--; 
      }
    }
    setCompanies([...companyList]);
    tempUser.company = companyList;
    dispatch({ type: "UPDATE_COMPANY", payload: tempUser });
  }

  const addCompany = (company) => {
    let trimName = company.trim();
    if (!companyList.includes(trimName) && (trimName !== "")) {
      companyList.push(company);
      setCompanies([...companyList]);
      setValues({
        ...values,
        company: '',
        companyError: false,
        companyHelperText: ''
      });
      tempUser.company = companyList;
      dispatch({ type: "UPDATE_COMPANY", payload: tempUser });
    } else {
      setValues({
        ...values,
        companyError: true,
        companyHelperText: 'Invalid entry or name already exists'
      });
    }
  }

  const finalValidation = () => {
    let isError = false;
    const errors = {
      emailError: false,
      emailHelperText: '',

      companyError: false,
      companyHelperText: ''
    };

    let emailChecker = (/$^|.+@.+..+/).test(values.email);
    if (!emailChecker || values.email === '') {
      isError = true;
      errors.emailHelperText = "Enter valid email";
      errors.emailError = true;
    }

    if (!(companies.length > 0)) {
      isError = true;
      errors.companyHelperText = "At least one company name needed";
      errors.companyError = true;
    } 

    setValues({
      ...values,
      ...errors
    });

    return isError;
  }

  async function handleSave (e) {
    e.preventDefault()
    const err = finalValidation();
    if (!err) {
      let email = values.email;
      let company = [...companyList];
      const saveData = {
        email, company
      };

      try {
        const savedUser = await axios.put("http://localhost:3001/user/save", saveData);
        dispatch({ type: "UPDATE_USER", payload: savedUser.data });
        if (savedUser.data !== false) {
          setSnackbar(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false);
  };

  return (
    <div>
      <NavBar />
      <Grid container item xs={12}>
        <Grid item xs={3}>
          <SideBarSettings />
        </Grid>
        <Grid item xs={9} container>
          <Paper className={classes.paper} component="h2">
            <Grid item container spacing={0} justifyContent="center" className={classes.marginBottom}>
              <Grid item xs={2} className={classes.marginTop}>
                <Typography component="h2" variant="h6">Your company</Typography>
              </Grid>
              <Grid item xs={7}>
                {companies.map((company) => (
                    <TextField
                      key={company + Math.floor(Date.now() / 1000)}
                      fullWidth
                      className={classes.root}
                      variant="outlined"
                      margin="normal"
                      name="company"
                      placeholder="Company name"
                      id="company"
                      value={company}
                      InputProps={{endAdornment: 
                        <Grid item xs onClick={() => { removeCompany(company) }}>
                          <Button className={classes.remove}>REMOVE</Button>
                        </Grid>
                      }}
                    />
                ))}
                <TextField 
                  fullWidth
                  className={classes.root}
                  error={values.companyError}
                  helperText={values.companyHelperText}
                  variant="outlined"
                  margin="normal"
                  name="company"
                  placeholder="Company name"
                  id="company"
                  value={values.company}
                  onChange={handleInputChange}
                  InputProps={{endAdornment: 
                    <Grid item xs onClick={() => { addCompany(values.company) }}>
                      <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.add}
                      >
                        Add
                      </Button>
                    </Grid>
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={0} justifyContent="center" className={classes.marginBottom}>
              <Grid item xs={2} className={classes.marginTop}>
                <Typography component="h2" variant="h6">Weekly report</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  className={classes.root}
                  error={values.emailError}
                  helperText={values.emailHelperText}
                  variant="outlined"
                  margin="normal"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Grid item container className={classes.marginLeft}>
              <Button
                onClick={handleSave}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
            </Grid>
          </Paper>
          <Snackbar open={snackbar} autoHideDuration={5000} onClose={closeSnackbar}>
            <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
              Saved successfully!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>
  );
}