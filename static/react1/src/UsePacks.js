
import React from 'react';
import Client from './Client';
import {Table, TableBody, TableRowColumn,  TableRow, } from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';
import UsePackEdit from "./UsePackEdit_mu";
class UsePacks extends React.Component {
  state = {
    usepacks: [],
    showRemoveIcon: false,
    searchValue: '',
    newPackName: '',
    auto_value: '',
    auto_items:[],
    auto_loading: false,
    release:true,
  };

  componentDidMount=()=> {
    if(this.props.contact_id){
      var self=this;
      Client.UsePacks(this.props.contact_id, (usepacks) => {
        self.setState({
          usepacks: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
        console.log(usepacks);
      });
    }
  };
  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        usepacks: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (usepacks) => {
        this.setState({
          usepacks: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      usepacks: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };
  auto_change=(value)=>{
    console.log("auto_change");
    var self=this;
    if (value.length>1)
    {
      this.setState({ auto_value:value });
      Client.get("/rest/Pack",{search:value} ,(items) => {
          console.log(items.data);
          var r=[]
          for (var i in items.data){
              r.push({text:items.data[i].name,value:items.data[i].id});
          }
          self.setState({ auto_items: r})
      });
    }
    else{
      this.setState({ auto_value:value});
    };
  };
  auto_select=(data) => {
      console.log("selected");
      console.log(data);
      this.addrow(data.value);
      //this.setState({auto_value:data.text)
  }
  bibei= (id) => {
    //this.setState({auto_value:"必备"});
    this.auto_change("必备");
  };
  new_pack= (id) => {
    var url="/rest/UsePackEx";
    var data={"name":this.state.newPackName,contact:this.props.contact_id};
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newusepacks = this.state.usepacks.concat(p);
        this.setState({ usepacks: newusepacks });
    });
  };
  addrow=(pack_id)=>{
    var url="/rest/UsePack";
    var data={contact:this.props.contact_id,pack:pack_id};
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newusepacks = this.state.usepacks.concat(p);
        this.setState({ usepacks: newusepacks });
    });
  };
  newpackChange=(e)=>{
    this.setState({newPackName:e.target.value});
  };
  onEditClick = (id) => {
  };
  onDeleteClick = (itemIndex) => {
    var url="/rest/UsePack";
    Client.delete1(url,{id:this.state.usepacks[itemIndex].id},(res) => {
        const filteredusepacks = this.state.usepacks.filter(
          (item, idx) => itemIndex !== idx,
        );
        this.setState({ usepacks: filteredusepacks });
    });
  };
  render() {
    const { usepacks } = this.state;
    const foodRows = usepacks.map((food, idx) => (
      <TableRow key={idx} onClick={() => this.props.onFoodClick(food)}>
        <TableRowColumn>{food.id}</TableRowColumn>
        <TableRowColumn>{food.name}</TableRowColumn>
        <TableRowColumn>{food.contact}</TableRowColumn>
        <TableRowColumn>{food.pack}</TableRowColumn>
        <TableRowColumn>{food.hetongbh}</TableRowColumn>
        <TableRowColumn>
        <UsePackEdit parent={this} index={idx} title="编辑" />
        <a  onClick={() => this.onDeleteClick(idx)} style={{marginLeft:"10px"}}>删除</a>
        </TableRowColumn>
      </TableRow>
    ));

    return (
      <div>
        <Table>
        <TableBody>
        <TableRow>
          <TableRowColumn>id</TableRowColumn>
          <TableRowColumn>name</TableRowColumn>
          <TableRowColumn>contact</TableRowColumn>
          <TableRowColumn>pack</TableRowColumn>
          <TableRowColumn>hetongbh</TableRowColumn>
          <TableRowColumn>actions</TableRowColumn>
        </TableRow>
        {foodRows}
        </TableBody>
        </Table>
        <div>输入包<AutoComplete id="id1"
          openOnFocus={true}
          searchText={this.state.auto_value}
          onUpdateInput={this.auto_change}
          dataSource={this.state.auto_items}
          onNewRequest={this.auto_select}
        />
          <button  className="btn" onClick={this.bibei}>必备</button>
        </div>
      <div>新包名称：
        <input id="new_pack1"  placeholder="新包" value={this.state.newPackName} onChange={this.newpackChange}/>
        <button className="btn btn-info" id="id_new_usepack" onClick={this.new_pack}>新包</button>
      </div>
      </div>
    );
  }
}
export default UsePacks;
