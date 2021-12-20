import React, {useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Mention from '../components/Mention';
import CustomizedDialog from '../components/Dialog';
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

  const [dAlt, setdAlt] = useState();
  const [dImgSource, setdImgSource] = useState();
  const [dTitle, setdTitle] = useState();
  const [dContentSource, setdContentSource] = useState();
  const [dText, setdText] = useState();
  const [dUrl, setdUrl] = useState();
  const [open, setOpen] = useState(false);

  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:3001/mention/")
    .then(res => setMentions(res.data))
    .catch(error => console.log(error));
  }, []);

  const handleClick = () => {
      setOpen(true);
  }

  const handleClose = () => {
    setdAlt('');
    setdImgSource('');
    setdTitle('');
    setdContentSource('');
    setdText('');
    setdUrl('');
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid container>
        <SideBar />
        <Grid item xs={9} container>
          <Paper className={classes.paper} component="h2">
            My mentions
            <CustomizedDialog setOpen={open} />
            {mentions.map((mention) => (
                <Mention
                  alt={mention.platform} 
                  imgSource={mention.image} 
                  title={mention.title}
                  contentSource={mention.platform}
                  text={mention.content}
                  url={mention.url}
                  onClick={() => {setOpen(true)}}
                />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}