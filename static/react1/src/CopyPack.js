import React from 'react';
import Client from './Client';
import Autosuggest from 'react-autosuggest';

class CopyPack  extends React.Component{
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
    }
  newnameChange=(event)=>{
    this.setState({newname:event.target.value});
  }
  copy_pack=()=>{
    console.log(this.src_id+" "+this.state.newname);
    var self=this;
    var data1=new FormData();
    data1.append("oldid",this.src_id);
    data1.append("newname",this.state.newname);
    Client.postForm("/rest/copypack/",data1,(result) => {
          self.setState({ error:result.message})
    });
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
  }
  auto_select=(value, item)=>{
      console.log("selected");
      console.log(item);
      //todo this.addrow(item.id);
      this.src_id=item.id;
      this.setState({auto_value:value, auto_items: [ item ] })
  }
  close=()=>{
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true });
   this.src_id=null;
  }
  render=()=>{
    return (
          <div>
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
              <td><label>新包名称:</label></td>
              <td>
                <input id="nameto" type="text" onChange={this.newnameChange} size="15" value={this.state.newname} maxLength="30" />
              </td>
            </tr>
            </tbody>
            </table>
          <button onClick={this.copy_pack}>复制</button>
          <p>{this.state.error}</p>
          </div>
    );
  }
}
export default CopyPack;