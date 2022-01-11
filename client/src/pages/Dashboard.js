import React, {useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Mention from '../components/Mention';
import CustomizedDialog from '../components/Dialog';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import Toggle from '../components/Toggle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  top: {
    marginBottom: theme.spacing(3)
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [mention, setMention] = useState(null);

  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:3001/mention/")
    .then(res => setMentions(res.data))
    .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const openMentionDialog = (mention) => {
      setMention(mention);
      setOpen(true);
    }
    const foundMention = mentions.find(mention => mention._id === id)
    if (foundMention) {
      openMentionDialog(foundMention)
    } else if (id) {
      axios
        .get(`http://localhost:3001/mention/${id}`)
        .then(res => openMentionDialog(res.data))
        .catch(error => console.error(error))
    }
  }, [id, mentions]);
  
  const handleClick = (mention) => {
    history.push(`/dashboard/${mention._id}`);
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid container>
        <SideBar />
        <Grid item xs={9} container>
          <Paper className={classes.paper} component="h2">
            <Grid item container className={classes.top} alignItems="center">
              <Grid item>
                My mentions
              </Grid>
              <Grid item xs={5} />
              <Grid item>
                {/* <Toggle /> */}
              </Grid>
            </Grid>
            <CustomizedDialog open={open} close={() => setOpen(false)} mention={mention} />
            {mentions.map((mention) => (
                <Grid item key={mention._id} onClick={() => { handleClick(mention) }}>
                  <Mention
                    alt={mention.platform} 
                    imgSource={mention.image} 
                    title={mention.title}
                    contentSource={mention.platform}
                    text={mention.content}
                    url={mention.url}
                  />
                </Grid>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}