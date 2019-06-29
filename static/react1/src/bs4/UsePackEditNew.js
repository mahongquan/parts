import React, { Component } from 'react';
import PackItems from './PackItems';
import { Form,Modal } from 'react-bootstrap';
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
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>名称:</Form.Label>
    <Form.Label>{this.state.usepack.name}</Form.Label>
    <Form.Label>(ID:</Form.Label>
    <Form.Label>{this.state.usepack.pack})</Form.Label>
  </Form.Group>
  </Form>{
          // <div style={{display:"flex"}}>
          //       <Badge>ID:</Badge>
          //         <Badge>
          //           {this.state.usepack.pack}
          //         </Badge>
          //         <Badge>名称:</Badge>
          //         <Badge>{this.state.usepack.name}</Badge>
          // </div>
        }
          <div id="id_useusepacks">
            <PackItems pack_id={this.state.usepack.pack} />
          </div>
        </Modal.Body>
      </Modal>
    );
  };
}
export default UsePackEditNew;
