import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Like from './Like';

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
    justifyContent: 'flex-start',
    cursor: 'pointer'
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

export default function Mention(props) {
  const classes = useStyles();

  let title = props.title;
  let n = title.lastIndexOf(" ");
  let title1 = title.substring(0, n);
  let title2 = title.substring(n);

  return (
      <Paper className={classes.paper}>
          <Grid container spacing={2}>
              <Grid item>
                  <ButtonBase className={classes.image}>
                      <img className={classes.img} alt={props.alt} src={props.imgSource} />
                  </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                  <Grid item container>
                      <Typography variant="h6">
                          {title1}&nbsp;
                      </Typography>
                      <Typography variant="h6" color="primary">
                          {title2}
                      </Typography>
                  </Grid>
                  <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                          <Typography variant="body2" gutterBottom color="textSecondary">
                              {props.contentSource}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                              {props.text}
                          </Typography>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" style={{ marginTop: '1rem', marginRight: '1rem', marginBottom: '0.5rem' }}>
                <Like mention={props} style={{ zIndex: '2', cursor: 'pointer' }} />
            </Grid>
      </Paper>
  );
}
