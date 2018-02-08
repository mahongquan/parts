import React from 'react';
import PackItems from "./PackItems";
import {Modal} from "react-bootstrap";

class PackEdit extends React.Component{
  state={ 
      showModal: false,
      pack_id:null,
    }

  close=()=>{
    this.setState({ showModal: false });
  }
  handleChange(){
    
  }
  open(pack_id) {
    this.setState({ showModal: true ,pack_id:pack_id});
  }
  render() {
    return (
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
    );
  }
}
export default PackEdit;