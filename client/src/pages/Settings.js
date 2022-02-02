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
    height: '100vh'
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
  const { user } = useContext(AuthContext);

  const initialValues = {
    id: 0,
    email: user.email,
    emailError: false,
    emailHelperText: '',
  
    company: '',
    companyError: false,
    companyHelperText: ''
  };

  const companyList = [...user.company];
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
    console.log(companyList);
    setCompanies([...companyList]);
    console.log(companies);
  }

  const addCompany = (company) => {
    let trimName = company.trim();
    if (!companyList.includes(trimName) && (trimName !== "")) {
      companyList.push(company);
      console.log(companyList);
      setCompanies([...companyList]);
      setValues({
        ...values,
        company: '',
        companyError: false,
        companyHelperText: ''
      });
    } else {
      setValues({
        ...values,
        companyError: true,
        companyHelperText: 'Invalid company name'
      });
    }
    console.log(companies);
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
      let company = [...companies];
      const saveData = {
        email, company
      };

      console.log(saveData);

    }
  }

  // const [mentions, setMentions] = useState([]);
  // useEffect(() => {
  //   axios
  //   .get("http://localhost:3001/mention/")
  //   .then(res => setMentions(res.data))
  //   .catch(error => console.log(error));
  // }, []);

  return (
    <div>
      <NavBar />
      <Grid container>
        <SideBarSettings />
        <Grid item xs={9} container>
          <Paper className={classes.paper} component="h2">
            <Grid item container spacing={0} justifyContent="center" className={classes.marginBottom}>
              <Grid item xs={2} className={classes.marginTop}>
                <Typography component="h2" variant="h6">Your company</Typography>
              </Grid>
              <Grid item xs={8}>
                {companies.map((company) => (
                  <TextField
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
              <Grid item xs={8}>
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
            <Grid item container className={classes.marginLeft} onClick={handleSave}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}