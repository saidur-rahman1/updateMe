import React, {useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Mention from '../components/Mention';
import CustomizedDialog from '../components/Dialog';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mention, setMention] = useState(null);

  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:3001/mention/")
    .then(res => setMentions(res.data))
    .catch(error => console.log(error));
  }, []);

  const handleClick = (mention) => {
    setMention(mention);
    setOpen(!open);
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid container>
        <SideBar />
        <Grid item xs={9} container>
          <Paper className={classes.paper} component="h2">
            My mentions
            <CustomizedDialog open={open} close={() => setOpen(false)} mention={mention} />
            {mentions.map((mention) => (
                <Grid item onClick={() => { handleClick(mention) }}>
                  <Mention
                    alt={mention.platform} 
                    imgSource={mention.image} 
                    title={mention.title}
                    contentSource={mention.platform}
                    text={mention.content}
                    url={mention.url}
                    id={mention._id}
                  />
                </Grid>
                // <Link
                //   key={mention._id}
                //   to={{
                //     pathname: `/mention/${mention._id}`,
                //     state: { background: location }
                //   }}
                // >
                //   <Mention
                //     alt={mention.platform} 
                //     imgSource={mention.image} 
                //     title={mention.title}
                //     contentSource={mention.platform}
                //     text={mention.content}
                //     url={mention.url}
                //   />
                // </Link>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}