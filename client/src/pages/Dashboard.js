import React, {useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Mention from '../components/Mention';
import CustomizedDialog from '../components/Dialog';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import Typography from '@material-ui/core/Typography';

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
  },
  togglePaper: {
    marginTop: theme.spacing(0),
    alignItems: 'center',
    background: '#ccd2e6',
    padding: '0.2rem',
    borderRadius: '35px',
  },
  toggle: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    borderColor: '#ccd2e6',
    borderRadius: '35px',
    padding: '0.5rem',
    "&.Mui-selected": {
      background: theme.palette.primary.main,
      color: 'white'
    },
    textTransform: 'none',
    width: '9rem',
    height: '2rem'
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [mention, setMention] = useState(null);
  const [order, setOrder] = useState("recent");

  

  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:3001/mention/")
    .then(res => setMentions(res.data))
    .catch(error => console.log(error));
  }, []);


  const sortMentions = useCallback(() => {
    let orderedMentions = [];
    const initialMentions = mentions;
    if (order === 'recent') {
      orderedMentions = initialMentions.sort((a,b) => b.date - a.date);
      setMentions(orderedMentions);
      console.log("Recent =>");
      console.log(orderedMentions);
    } else 
    if (order === 'popular') {
      orderedMentions = initialMentions.sort((a,b) => b.popularity - a.popularity);
      setMentions(orderedMentions);
      console.log("Popularity =>");
      console.log(orderedMentions);
    }
  },[mentions, order]);

  useEffect(() => {
    sortMentions();
  }, [order, sortMentions, mentions]);

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

  const handleOrder = (event, newOrder) => {
    if (newOrder !== null) {
      setOrder(newOrder);
    }
  };

  const toggleClick = (value) => {
    setOrder(value);
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
              <Grid item xs={6} />
              <Grid item>
                <Grid item container className={classes.togglePaper}>
                  <ToggleButtonGroup
                    value={order}
                    exclusive
                    onChange={handleOrder}
                  >
                    <ToggleButton value="recent" className={classes.toggle} onClick={() => { toggleClick("recent") }}>
                      <Typography>Most recent</Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <ToggleButtonGroup
                    value={order}
                    exclusive
                    onChange={handleOrder}
                  >
                    <ToggleButton value="popular" className={classes.toggle} onClick={() => { toggleClick("popular") }}>
                      <Typography>Most popular</Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
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