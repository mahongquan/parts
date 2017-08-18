import React from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
var createReactClass = require('create-react-class');
const DlgFolder = createReactClass({
  getInitialState() {
    return { 
      showModal: false,
      hiddenPacks:true,
      error:"",
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    var self=this;
   this.setState({ showModal: true });
   Client.get("/parts/folder/",{id:this.props.contact_id}, function(result){
       console.info(result);
       if (!result.success){
          self.setState({error:result.message});
       }
       else{
          self.close();
       }
   })
  },
  render() {
    return (
        <button onClick={this.open}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>请等待。。。</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>{this.state.error}</div>
          </Modal.Body>
        </Modal>
        </button>
    );
  }
});
export default DlgFolder;