import React, { Component } from 'react';
import PackItems from './PackItems';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
// import Button from '@material-ui/core/Button';
class UsePackEditNew extends Component {
  state = {
    showModal: false,
    usepack: {},
    bg: {},
  };

  close = () => {
    this.setState({ showModal: false });
  };
  handleChange = () => {};
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   this.setState({ showModal: nextProps.showModal });
  //   if (nextProps.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=nextProps.parent;
  //     this.old=this.parent.state.usepacks[nextProps.index];
  //   }
  //   this.setState({usepack:this.old});
  // }
  close = () => {
    this.setState({ showModal: false });
  };
  open2 = idx => {
    this.index = idx;
    this.setState({ showModal: true });
    if (this.index == null) {
      this.old = {};
    } else {
      this.parent = this.props.parent;
      this.old = this.parent.state.usepacks[this.index];
    }
    this.setState({ usepack: this.old });
  };
  // open=()=>{
  //   this.setState({ showModal: true });
  //   if (this.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=this.props.parent;
  //     this.old=this.parent.state.usepacks[this.index];
  //   }
  //   this.setState({usepack:this.old});
  // }
  render = () => {
    // console.log(this.state);
    return (
      <Dialog open={this.state.showModal} onClose={this.close}>
        <DialogTitle>编辑包</DialogTitle>
        <DialogContent>
          <table id="table_input" className="table-condensed">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    readOnly={true}
                    disabled="disabled"
                    value={this.state.usepack.pack}
                  />
                </td>
                <td>
                  <label>名称:</label>
                </td>
                <td>
                  <label>{this.state.usepack.name}</label>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="id_useusepacks">
            <PackItems pack_id={this.state.usepack.pack} />
          </div>
        </DialogContent>
      </Dialog>
    );
  };
}
export default UsePackEditNew;
