import React from 'react';
import {Button,Alert, Modal} from "react-bootstrap";
import Client from './Client';
import update from 'immutability-helper';
class DlgImport extends React.Component{
  state={ 
      showModal: false,
      show:false,
      error:"",
      packs:[],
      info:""
  }

  close=()=>{
    this.setState({ showModal: false });
  }
  upload=()=>{
    const file = this.fileUpload.files[0];
    console.log(file);
    var data1=new FormData();
    data1.append("file",file);
    //console.log(data1)
    var self=this;
    Client.postForm("/rest/standard",data1,function(res){
        if (res.result.length>0){
          const newFoods = update(self.state.packs, {$unshift: res.result});
          self.setState({packs: newFoods});
        }
        self.setState({showalert:true,info:"导入了"+res.result.length+"个合同的标钢。"})
    });
  }
  open=()=>{
    var self=this;
   this.setState({ showModal: true,showalert:false });
   var data= { limit:10,search:"xls"};
   Client.get("/rest/Pack",data, function(result){
       console.info(result);
       // if (!result.success){
       //    self.setState({error:result.message});
       // }
       // else
          self.setState({packs:result.data});
          console.log(result.data);
   })
  }
  handleDismiss=()=>{
    this.setState({ showalert: false });
  }
  inputChange=()=>{
   this.setState({ showalert: false }); 
  }
  render=()=>{
    const contactRows = this.state.packs.map((pack, idx) => (
      <tr key={idx} >
        <td>{pack.id}</td>
        <td>{pack.name}</td>
      </tr>
    ));   
    let alert;
    if (this.state.showalert) {
        alert=(<Alert bsStyle="info" onDismiss={this.handleDismiss}>
          <p>
            {this.state.info}
          </p>
        </Alert>
      );
    }
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>导入标样</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {alert}
          <form  ref="form1" encType="multipart/form-data">
          <input style={{margin:"10px 10px 10px 10px"}} 
          id="file"  accept="application/vnd.ms-excel" 
          type="file" name="file" 
          ref={(ref) => this.fileUpload = ref} 
          onChange={this.inputChange}>
          </input>
          <button  style={{margin:"10px 10px 10px 10px"}} className="btn btn-primary" onClick={this.upload} type="button">上传</button>
          </form>
          <div style={{"minHeight":"200px"}}>
          <table  className="table-bordered"><thead><tr><td>ID</td><td>名称</td></tr></thead><tbody>
          {contactRows}
          </tbody></table>
          </div>
          <div>
              {this.state.error}
          </div>
          </Modal.Body>
        </Modal>
    );
  }
}
export default DlgImport;