import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
export default class DlgOkCancel extends React.Component {
  constructor(props) {
    super();
  }

  ok = () => {
    this.props.ok();
    this.props.onClose();
  };
  render = () => {
    return (
        <Dialog open={this.props.open} onClose={this.props.onClose}>
          <DialogTitle>
          {this.props.prompt}
          </DialogTitle>
          <DialogActions>
            <Button
              variant="outlined"
              className="btn btn-primary"
              onClick={this.ok}
            >
              确定
            </Button>
            <Button
              variant="outlined"
              className="btn btn-primary"
              onClick={this.props.onClose}
            >
              取消
            </Button>
          </DialogActions>
        </Dialog>
    );
  };
}
