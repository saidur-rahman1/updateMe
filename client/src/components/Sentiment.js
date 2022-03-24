import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    emoji: {
      marginRight: theme.spacing(1),
      width: 20,
      height: 20,
      cursor: 'default'
    }
  }));

export default function Sentiment({sentiment}) {
    const classes = useStyles();
    let mood = '';
    let emoji = '';
    
    if (sentiment > 0) {
        mood = 'Positive sentiment';
        emoji = '😃';
    } else if (sentiment < 0) {
        mood = 'Negative sentiment';
        emoji = '😕';
    } else {
        mood = 'Neutral sentiment';
        emoji = '😐';
    }

    const click = (e) => {
        e.stopPropagation();
    }

  return (
    <Tooltip title={mood} placement="bottom">
        <Typography onClick={ click } className={classes.emoji}>
            {emoji}&nbsp;
        </Typography>
    </Tooltip>
  );
}
