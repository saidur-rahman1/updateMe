import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import NavBar from '../components/NavBar';
import SideBarSettings from '../components/SideBarSettings';
import AuthContext from '../context/AuthContext.js';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(0),
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '1rem',
    height: '100vh'
  }
}));

export default function Settings() {
  const classes = useStyles();
  const { loggedIn } = useContext(AuthContext);

  // const [mentions, setMentions] = useState([]);
  // useEffect(() => {
  //   axios
  //   .get("http://localhost:3001/mention/")
  //   .then(res => setMentions(res.data))
  //   .catch(error => console.log(error));
  // }, []);

  if (!loggedIn===true) {
    return <Redirect to={'/login'} />
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid container>
        <SideBarSettings />
        <Grid item xs={9} container>
          <Paper className={classes.paper} component="h2">
            Company
            
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}