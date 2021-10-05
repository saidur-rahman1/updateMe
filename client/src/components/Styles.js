import { makeStyles } from '@material-ui/core/styles';

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
  },
  typography_settings: {
    cursor: 'pointer',
    color: 'lightgrey'
  }
}));

export { useStyles };