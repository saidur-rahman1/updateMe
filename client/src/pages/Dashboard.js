import React, {useState, useEffect, useCallback, useContext } from 'react';
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
import AuthContext from '../context/AuthContext.js';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    height: '100%'
  },
  gridHeight: {
    height: '100%'
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
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [mention, setMention] = useState(null);
  const [order, setOrder] = useState("date");
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const page = 1;
        const res = await axios.get("http://localhost:3001/mention/", {params:{order,page}});
        setMentions(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [user.platforms, order]);

  useEffect(() => {
    setPage(2);
    sethasMore(true);
}, [user.platforms]);

  const getMentions = async () => {
    const res = await axios.get("http://localhost:3001/mention/", {params:{order,page}});
    const data = await res.data;
    return data;
  };

  const getMore = async () => {
    try {
      const moreMentions = await getMentions();
      setMentions([...mentions, ...moreMentions]);

      if (moreMentions.length === 0 || moreMentions.length < 20) {
        sethasMore(false);
      }

      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const sortMentions = useCallback((order) => {
    setMentions(prevMentions => [...prevMentions.sort((a, b) => b[order] - a[order])]);
  },[]);

  useEffect(() => {
    sortMentions(order);
  }, [sortMentions, order]);

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
    setPage(2);
    sethasMore(true);
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid container xs={12}>
        <Grid item xs={3}>
          <SideBar />
        </Grid>
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
                    <ToggleButton value="date" className={classes.toggle} onClick={() => { toggleClick() }}>
                      <Typography>Most recent</Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <ToggleButtonGroup
                    value={order}
                    exclusive
                    onChange={handleOrder}
                  >
                    <ToggleButton value="popularity" className={classes.toggle} onClick={() => { toggleClick() }}>
                      <Typography>Most popular</Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Grid>
            <InfiniteScroll
              dataLength={mentions.length}
              next={getMore}
              hasMore={hasMore}
              loader={<h5>Loading ...</h5>}
            >
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
            </InfiniteScroll>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}