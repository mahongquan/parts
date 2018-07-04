import React from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
class DlgWait extends React.Component{
  state={ 
      showModal: false,
      hiddenPacks:true,
      error:"",
  }

  close=()=> {
    this.setState({ showModal: false });
  }

  open(contact_id) {
    var self=this;
   this.setState({ showModal: true });
   Client.get("/rest/allfile",{id:contact_id}, function(result){
       console.info(result);
       if (!result.success){
          self.setState({error:result.message});
       }
       else{
          self.close();
       }
   })
  }
  render() {
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>请等待。。。</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>{this.state.error}</div>
          </Modal.Body>
        </Modal>
    );
  }
}
export default DlgWait;