import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    alignItems: 'center',
    background: '#eceffd',
    padding: '0.5rem',
    borderRadius: '35px',
  },
  tab: {
    cursor: 'pointer',
    color: 'primary',
    borderColor: 'white',
    borderRadius: '35px',
    padding: '0.5rem',
    "&.Mui-selected": {
      background: theme.palette.primary.main
    },
  },
  tabs: {
    height: '1.5rem'
  }
}));

export default function ToggleButtonNotEmpty() {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="recent">
          <Typography>Most recent</Typography>
        </ToggleButton>
        <ToggleButton value="popular">
          <Typography>Most popular</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
  );
}