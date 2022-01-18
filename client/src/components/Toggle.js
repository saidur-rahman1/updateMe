import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
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

export default function ToggleButtonNotEmpty() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('recent');

  const handleOrder = (event, newOrder) => {
    if (newOrder !== null) {
      setOrder(newOrder);
    }
  };

  return (
    <Grid item container className={classes.togglePaper}>
      <ToggleButtonGroup
        value={order}
        exclusive
        onChange={handleOrder}
      >
        <ToggleButton value="recent" className={classes.toggle}>
          <Typography>Most recent</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={order}
        exclusive
        onChange={handleOrder}
      >
        <ToggleButton value="popular" className={classes.toggle}>
          <Typography>Most popular</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
      
  );
}