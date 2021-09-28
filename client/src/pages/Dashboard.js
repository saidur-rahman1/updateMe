import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Mention from '../components/Mention';
import reddit from '../icons/reddit.png';
import axios from 'axios';

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

export default function Dashboard() {
  const classes = useStyles();

  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:3001/mention/")
    .then(res => setMentions(res.data))
    .catch(error => console.log(error));
  });

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid container>
        <SideBar />
        <Grid xs={9} container>
          <Paper className={classes.paper} component="h2">
            My mentions
            {/* <Mention 
              alt="reddit" 
              imgSource={reddit} 
              title="Microsoft pays US 8 billion to acquire Github"
              contentSource="Business Insider"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            /> */}
            {mentions.map((mention, key) => (
              <Mention 
                alt={mention.platform} 
                imgSource={mention.image} 
                title={mention.title}
                contentSource={mention.platform}
                text={mention.content}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}