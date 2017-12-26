import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
class DlgUrl extends Component{
  state= { 
      showModal: false,
      error:"",
  }

  close=()=> {
    this.setState({ showModal: false });
  }

  open=(url,parent,idx,data)=>{
   this.parent=parent;
   this.index=idx;
   var self=this;
   this.setState({ showModal: true });
   Client.get(url,data, function(result){
       console.info(result);
       if (!result.success){
          self.setState({error:result.message});
       }
       else{
          self.parent.handleContactChange(self.index,result.data);
          self.close();
       }
   })
  }
  render=()=> {
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
}
export default DlgUrl;