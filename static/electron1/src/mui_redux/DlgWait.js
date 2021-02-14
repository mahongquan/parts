import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
class DlgWait extends React.Component {
  render() {
    return (
      <Dialog open={this.props.showModal} onClose={this.props.handleClose}>
        <DialogTitle>请等待。。。</DialogTitle>
        <DialogContent>
          <div>{this.props.store.allfile_err}</div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default DlgWait;
