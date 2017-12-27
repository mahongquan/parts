import React from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
class DlgCheck extends React.Component{
  state= {
      showModal: false,
      error:"",
      packs:[],
      hideTable:true,
  }

  close=()=>{
    this.setState({ showModal: false });
  }
  upload=()=>{
    const file = this.fileUpload.files[0];
    console.log(file);
    var data1=new FormData();
    data1.append("file",file);
    data1.append("id",this.contact_id);
    //console.log(data1)
    var self=this;
    Client.postForm("/rest/check",data1,function(data){
      var showdata=[];
      var left=data.result[0];
      var notequal=data.result[1];
      var right=data.result[2];
      console.log(notequal);
      var n=left.length;
      if (n<right.length){
        n=right.length;
      }
      for(var i=0;i<n;i++){
        var tr={}
        if(i<left.length){
          for(var one in left[i]){
              tr["left"+one]=left[i][one];
          }
        }
        else{
            tr["left0"]="";
            tr["left1"]="";
            tr["left2"]="";
        }
        if(i<right.length){
          for(one in right[i]){
            tr["right"+one]=right[i][one];
          }
        }
        else{
          tr["right0"]="";
          tr["right1"]="";
          tr["right2"]="";
        }
        showdata.push(tr);
       }
      n=notequal.length;
      for(i=0;i<n/2;i++){
        tr={};
        var l=2*i+0;
          for(one in notequal[l]){
            tr["left"+one]=notequal[l][one];
          }
          var r=2*i+1;
          for(one in notequal[r]){
            tr["right"+one]=notequal[r][one];
          }
        showdata.push(tr);
      }
      console.log(showdata);
      self.setState({packs: showdata});
      self.setState({hideTable:false});
    });
  }
  open=(contact_id,yiqibh)=>{
    this.contact_id=contact_id;
    this.setState({yiqibh:yiqibh});
    this.setState({ showModal: true });
    this.setState({hideTable:true});
  }
  render=()=>{
    const contactRows = this.state.packs.map((pack, idx) => (
      <tr key={idx} >
        <td style={{color:"blue"}}>{pack.left0}</td>
        <td style={{color:"blue"}}>{pack.left1}</td>
        <td style={{color:"blue"}}>{pack.left2}</td>
        <td style={{color:"green"}}>{pack.right0}</td>
        <td style={{color:"green"}}>{pack.right1}</td>
        <td style={{color:"green"}}>{pack.right2}</td>
      </tr>
    ));   
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>核对备料计划</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>仪器编号{this.state.yiqibh}备料计划核对，请上传备料计划导出的Excel文件</p>
          <form  ref="form1" encType="multipart/form-data">
          <input style={{margin:"10px 10px 10px 10px"}} id="file"  accept="application/vnd.ms-excel" type="file" name="file" ref={(ref) => this.fileUpload = ref}/>
          <button  style={{margin:"10px 10px 10px 10px"}} className="btn btn-primary" onClick={this.upload} type="button">上传</button>
          </form>
          <div hidden={this.state.hideTable} style={{"minHeight":"200px"}}>
          <table className="table-bordered">
          <tbody>
          <tr>
          <td  style={{color:"blue"}} colSpan='3'>装箱单</td>
          <td  style={{color:"green"}} colSpan='3'>备料计划</td>
          </tr>
          {contactRows}
          </tbody>
          </table>
          </div>
          <div>
              {this.state.error}
          </div>
          </Modal.Body>
        </Modal>
    );
  }
}
export default DlgCheck;