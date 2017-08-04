import React from 'react';
import PackItems from "./PackItems_mu";
import Dialog from 'material-ui/Dialog';
var createReactClass = require('create-react-class');
const UsePackEdit = createReactClass({
  getInitialState() {
    return { 
      open: false,
      usepack:{},
      bg:{},
    };
  },

  handleClose  ()  {
    this.setState({open: false});
  },
  handleChange(){
    
  },
  handleOpen  () {
    this.setState({ open: true });
    if (this.props.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.usepacks[this.props.index];
      this.setState({hiddenusepacks:false});
    }
    this.setState({usepack:this.old});
  },
  render() {
    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
      height: '100%',
      maxHeight: 'none',
    };
    return (
        <a onTouchTap={this.handleOpen} >{this.props.title}
        <Dialog modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.usepack.pack} />
                </td>
                <td>
                    <label>名称:</label>
                </td>
                <td>
                    <label>{this.state.usepack.name}</label>
                </td>
            </tr></tbody>
            </table>
        <div id="id_useusepacks">
        <PackItems  pack_id={this.state.usepack.pack}/>
        </div>
        </Dialog>
        </a>
    );
  }
});
export default UsePackEdit;