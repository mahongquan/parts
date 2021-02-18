import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Client from './Client';
class DlgUrl extends Component {
  state = {
    error: '',
  };
  componentDidUpdate(prevProps) {
    if (!prevProps.showModal && this.props.showModal) {
      this.open(this.props.url, this.props.contactid);
    }
  }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (!this.props.open && nextProps.open) {
  //     this.open(nextProps.url,nextProps.contactid);
  //   }
  //   else if (this.props.open && !nextProps.open) {
  //   }
  // }

  open = (url, contactid) => {
    let data = { id: contactid };
    Client.get(url, data, (result) => {
      console.info(result);
      if (!result.success) {
        this.setState({ error: result.message });
      } else {
        this.props.handleContactChange2(result.data);
        this.props.onClose();
      }
    });
  };
  render = () => {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>请等待。。。</DialogTitle>
        <DialogContent>
          <div>{this.state.error}</div>
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgUrl;
