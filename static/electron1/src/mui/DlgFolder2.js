import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Browser from './Browser2';
export default class DlgFolder2 extends React.Component {
  // constructor(props){
  //   // this.state= {
  //   //   error: '',
  //   // };
  // },
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose} fullScreen>
        <DialogTitle>
          <IconButton
            color="inherit"
            onClick={this.props.onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          文件浏览
        </DialogTitle>
        <DialogContent>
          <Browser initpath={this.props.initpath} />
        </DialogContent>
      </Dialog>
    );
  }
}
