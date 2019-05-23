import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
export default class DlgInput extends React.Component {
  constructor(props) {
    super();
    this.state = {color: props.value };
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if (nextProps.value) {
      this.setState({ color: nextProps.value });
    }
  }
  ok = () => {
    this.props.ok(this.state.color);
    this.props.onClose();
  };
  onChange = e => {
    this.setState({ color: e.target.value });
  };
  render = () => {
    return (
        <Dialog open={this.props.open} onClose={this.props.onClose}>
          <DialogTitle>
          {this.props.prompt}
          </DialogTitle>
          <DialogContent>
            <input 
              value={this.state.color}
              onChange={this.onChange}
            />
          </DialogContent>
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
