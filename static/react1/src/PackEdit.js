import React from 'react';
import PackItems from "./PackItems";
import {Modal} from "react-bootstrap";
var createReactClass = require('create-react-class');
const PackEdit = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      pack_id:null,
    };
  },

  close() {
    this.setState({ showModal: false });
  },
  handleChange(){
    
  },
  open(pack_id) {
    this.setState({ showModal: true ,pack_id:pack_id});
  },
  render() {
    return (
        <a onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>编辑包</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <label>id:{this.state.pack_id}</label>
          <div id="id_useusepacks">
            <PackItems  pack_id={this.state.pack_id}/>
          </div>
          </Modal.Body>
        </Modal>
        </a>
    );
  }
});
export default PackEdit;