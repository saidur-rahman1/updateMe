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

export default function Sentiment({emoji, sentiment}) {
    const classes = useStyles();
    let mood = '';
    
    if (sentiment.$numberDecimal > 0) {
        mood = 'Positive sentiment';
    } else if (sentiment.$numberDecimal < 0) {
        mood = 'Negative sentiment';
    } else {
        mood = 'Neutral sentiment'
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
