import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../styles.js';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const initialValues = {
  platform: '',
  image: '',
  title: '',
  content: '',
  url: ''
};

export default function CustomizedDialog({open, close, mention}) {
  const classes = useStyles();
  let history = useHistory();

  const [localMention, setLocalMention] = React.useState(initialValues);


  React.useEffect(() => {
    if (mention != null)
        setLocalMention({
            ...mention
        })
  }, [mention])

  const handleClose = () => {
    close(false);
    history.replace('/dashboard');
  };

  return (
      <Grid container>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle className={classes.visitPage} id="customized-dialog-title" onClose={handleClose}>
            {localMention.title}
          </BootstrapDialogTitle>
          <DialogContent dividers>
              <Grid container spacing={2}>
                  <Grid item>
                      <ButtonBase className={classes.image}>
                          <img className={classes.img} alt={localMention.platform} src={localMention.image} />
                      </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                              <Typography variant="body2" color="textSecondary">
                                  {localMention.content}
                              </Typography>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
          </DialogContent>
          <DialogActions>
            <Button className={classes.visitPage} href={localMention.url} autoFocus target="_blank">
              Visit page
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Grid>
  );
}
