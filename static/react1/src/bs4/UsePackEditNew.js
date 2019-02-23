import React, { Component } from 'react';
import PackItems from './PackItems';
import { Modal } from 'react-bootstrap';
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
  // componentWillReceiveProps(nextProps) {
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
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>编辑包</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    defaultValue={this.state.usepack.pack}
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
        </Modal.Body>
      </Modal>
    );
  };
}
export default UsePackEditNew;
