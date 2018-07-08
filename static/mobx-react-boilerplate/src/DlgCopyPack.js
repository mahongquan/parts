import React from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
//import Autocomplete from './Autocomplete'
import Autosuggest from 'react-autosuggest';
import Spinner from './react-spin';
var _ = require('lodash');
class DlgCopyPack  extends React.Component{
  state= { 
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      newPackName: '',
      newname:"",
      auto_value: '',
      auto_items:[],
      auto_loading: false,
      stopped:true,
  }
  shouldComponentUpdate(nextProps, nextState) {

    if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
       return true
    } else {
       return false
    }
  }
  newnameChange=(event)=>{
    this.setState({newname:event.target.value});
  }
  copy_pack=()=>{
    console.log(this.src_id+" "+this.state.newname);
    var self=this;
    var data1=new FormData();
    this.setState({stopped:false});
    data1.append("oldid",this.src_id);
    data1.append("newname",this.state.newname);
    Client.postForm("/rest/copypack/",data1,(result) => {
          self.setState({ error:result.message})
          this.setState({stopped:true});
    });
  }
  onSuggestionsClearRequested=()=>{
    
  }
  auto_change=(data)=>{
    var value=data.value;
    console.log("auto_change");
    if (value.length>1)
    {
      Client.get("/rest/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
  };
  // auto_change=(event, value)=>{
  //   console.log("auto_change");
  //   if (value.length>1)
  //   {
  //     this.setState({ auto_value:value, auto_loading: true });
  //     Client.get("/rest/Pack",{search:value} ,(items) => {
  //         this.setState({ auto_items: items.data, auto_loading: false })
  //     });
  //   }
  //   else{
  //     this.setState({ auto_value:value, auto_loading: false });
  //   };
  // }
  auto_select=(event,data) => {
      console.log("selected");
      console.log(data)
      this.src_id=data.suggestion.id;
      //this.setState({ auto_items: [ item ] })
  }
  close=()=>{
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true,stopped:true,error:"" ,auto_value:"",newname:""});
   this.src_id=null;
  }
    onChange=(event, { newValue })=>{
    console.log(newValue);
    this.setState({auto_value:newValue});
  }
  render=()=>{
    const spinCfg = {
      lines: 8, // The number of lines to draw
      length: 5, // The length of each line
      width: 30, // The line thickness
      radius: 35, // The radius of the inner circle
      scale: .25, // Scales overall size of the spinner
      //corners: 1, // Corner roundness (0..1)
      //color: '#ffffff', // CSS color or array of colors
      //fadeColor: 'transparent', // CSS color or array of colors
      // opacity: 0.25, // Opacity of the lines
      // rotate: 0, // The rotation offset
      // direction: 1, // 1: clockwise, -1: counterclockwise
      // speed: 1, // Rounds per second
      // trail: 60, // Afterglow percentage
      // fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
      // zIndex: 2e9, // The z-index (defaults to 2000000000)
       top: '85px', // Top position relative to parent
       left: '100px', // Left position relative to parent
       //position: 'realative' // Element positioning
    };
    let showbutton
    if(this.state.stopped){
      showbutton="block"
    }
    else{
      showbutton="none"
    }
    // console.log(this.state);
    return (
        <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>复制包</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
            <tbody>
            <tr>
              <td>
                <label>包名称:</label>
              </td>
              <td>
              <Autosuggest
                  inputProps={{ id: 'states-autocomplete',value:this.state.auto_value,onChange:this.onChange}}
                  onSuggestionSelected={this.auto_select}
                  onSuggestionsFetchRequested={this.auto_change}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={(item) => item.name}
                  ref="autocomplete"
                  suggestions={this.state.auto_items}
                  renderSuggestion={(item) => (
                    <span>{item.name}</span>
                  )}
                />
              </td>
            </tr>
            <tr>
              <td><label >新包名称:</label></td>
              <td>
                <input id="nameto" type="text" onChange={this.newnameChange} size="15" value={this.state.newname} maxLength="30" />
              </td>
            </tr>
            <tr>
            <td>
              <div>
                
                <button style={{display:showbutton}} onClick={this.copy_pack}>复制</button>
                <Spinner config={spinCfg} stopped={this.state.stopped} />
              </div>
            </td>
            </tr>
            </tbody>
            </table>
          
          <p>{this.state.error}</p>
          </Modal.Body>
        </Modal>
    );
  }
}
export default DlgCopyPack;