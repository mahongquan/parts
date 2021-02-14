import React from 'react';
import PackItems from './PackItems';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';

class PackEdit extends React.Component {
  state = {
    showModal: false,
    pack_id: null,
  };

  close = () => {
    this.setState({ showModal: false });
  };
  handleChange() {}
  open(pack_id) {
    this.setState({ showModal: true, pack_id: pack_id });
  }
  render() {
    return (
      <Dialog open={this.state.showModal} onClose={this.close}>
        <DialogTitle>编辑包</DialogTitle>
        <DialogContent>
          <label>id:{this.state.pack_id}</label>
          <div id="id_useusepacks">
            <PackItems store={this.props.store} pack_id={this.state.pack_id} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default PackEdit;
