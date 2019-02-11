import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Items from './Items';
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class DlgItems extends Component {
  render = () => {
    return (
      <Dialog open={this.props.showModal} onClose={this.props.handleClose} fullScreen>
      <AppBar className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={this.props.classes.flex}
            >
              备件
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Items />
        </DialogContent>
      </Dialog>
    );
  };
}
export default withStyles(styles)(DlgItems);