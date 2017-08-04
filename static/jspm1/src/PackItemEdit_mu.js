import React from 'react';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';
import Client from './Client';
var createReactClass = require('create-react-class');
const PackItemEdit = createReactClass({
  getInitialState() {
    return { 
      open: false,
      packitem:{},
      hiddenPacks:true,
      bg:{},
      date_open:false,
    };
  },

  handleClose  () {
    this.setState({open: false});
  },
  handleOpen() {
    this.setState({ open: true });
    console.log("packitemedit open");
    console.log(this.props.index);
    if (this.props.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.items[this.props.index];
    }
    this.setState({packitem:this.old});
  },
  handleSave (data) {
    var url="/rest/BothPackItem";
    var self=this;
    Client.postOrPut(url,this.state.packitem,(res) => {
        console.log("post");
        console.log(self.props.index);
        console.log(res.data);
        self.setState({contact:res.data});
        self.parent.handlePackItemChange(self.props.index,res.data);
        self.old=res.data;
        self.handleClose();
    });
  },
  handleChange(e){
    console.log("change");
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({packitem:contact2});
  },
  render() {
     const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
    };
    return (
        <a onTouchTap={this.handleOpen}>{this.props.title}
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
            <table id="table_input" className="table-condensed" >
            <tbody> 
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.packitem.id} />
                </td>
            </tr><tr>
                <td>
                    名称:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.addr}}  type="text" id="addr" name="name" value={this.state.packitem.name} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>规格:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yiqixinghao}} type="text"  name="guige" value={this.state.packitem.guige}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>编号:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" id="baoxiang" name="bh" value={this.state.packitem.bh}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>数量:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.state.bg.ct}}
                    id="yujifahuo_date" name="ct"  value={this.state.packitem.ct} onChange={this.handleChange} />
                </td>
            </tr>        
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       </div>
        </Dialog>
        </a>
    );
  }
});
export default PackItemEdit;