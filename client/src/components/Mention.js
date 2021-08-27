import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import reddit from '../icons/reddit.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(1),
    flexDirection: 'column',
    alignItems: 'center',
    width: '95%',
    padding: '1rem',
    justifyContent: 'flex-start'
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));

export default function Mention() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
        <Grid container spacing={2}>
            <Grid item>
                <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="reddit" src={reddit} />
                </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item container>
                    <Typography variant="h6">
                        Microsoft pays US 8 billion to acquire&nbsp;
                    </Typography>
                    <Typography variant="h6" color="primary">
                        Github
                    </Typography>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant="body2" gutterBottom color="textSecondary">
                            Business Insider
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>

  );
}
