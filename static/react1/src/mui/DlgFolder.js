import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Client from './Client';

class DlgFolder extends React.Component {
  constructor(){
    super();
    this.state={error:""}
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.onShow(nextProps.contactid);
    } else if (this.props.open && !nextProps.open) {
      this.onHide();
    }
  }
  onShow = idx => {
    this.open(idx);
  };
  onHide = () => {};

  open(contact_id) {

    Client.get('/rest/folder/', { id: contact_id }, (result)=>{
      console.info(result);
      if (!result.success) {
        this.setState({ error: result.message });
      } else {
        this.props.onClose();
      }
    });
  }
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>
          请等待。。。
        </DialogTitle>
        <DialogContent>
          <div>{this.state.error}</div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default DlgFolder;
