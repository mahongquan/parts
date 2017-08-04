
import React from 'react';
import Client from './Client';
import {Table} from "react-bootstrap";
import PackItemEdit from './PackItemEdit_mu';
import update from 'immutability-helper';
import AutoComplete from 'material-ui/AutoComplete';
class PackItems extends React.Component {
  state = {
    items: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items:[],
    auto_loading: false,
    release:true,
  };
  componentDidMount=()=> {
      Client.PackItems(this.props.pack_id, (items) => {
        this.setState({
          items: items.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
  };
  auto_select=(data) => {
      console.log("selected");
      this.addrow(data.value);
      this.setState({auto_value:data.text})
  }
  auto_change=(value)=>{
    console.log("auto_change");
    if (value.length>1)
    {
      this.setState({ auto_value:value, auto_loading: true });
      Client.get("/rest/Item",{query:value} ,(items) => {
          var r=[]
          for (var i in items.data){
              r.push({text:items.data[i].name,value:items.data[i].id});
          }
          this.setState({ auto_items: r, auto_loading: false })
      });
    }
    else{
      this.setState({ auto_value:value, auto_loading: false });
    };
  };
  new_packitem= (id) => {
    var url="/rest/BothPackItem";
    var data={"name":this.state.newPackName,"pack":this.props.pack_id};
    console.log(data);
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newFoods = this.state.items.concat(p);
        this.setState({ items: newFoods });
    });
  };
  handlePackItemChange = (idx,contact) => {
    console.log(idx);
    console.log(contact);
    const contacts2=update(this.state.items,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({items:contacts2});
  };
  addrow=(item_id)=>{
    var url="/rest/PackItem";
    var data={pack:this.props.pack_id,itemid:item_id};
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newFoods = this.state.items.concat(p);
        this.setState({ items: newFoods });
    });
  };
  newpackChange=(e)=>{
    this.setState({newPackName:e.target.value});
  };
  onEditClick = (id) => {
  };
  onDeleteClick = (itemIndex) => {
    var url="/rest/PackItem";
    Client.delete1(url,{id:this.state.items[itemIndex].id},(res) => {
        const filteredFoods = this.state.items.filter(
          (item, idx) => itemIndex !== idx,
        );
        this.setState({ items: filteredFoods });
    });
  };
  render() {
    const { items } = this.state;
    const itemRows = items.map((item, idx) => (
      <tr
        key={idx}
      >
        <td >{item.id}</td>
        <td >{item.name}</td>
        <td>{item.guige}</td>
        <td>{item.ct}</td>
        <td>{item.bh}</td>
        <td  hidden={this.state.release}>{item.pack}</td>
        <td>
        <PackItemEdit parent={this} index={idx} title="编辑" />
        <a style={{marginLeft:"10px"}} onClick={() => this.onDeleteClick(idx)}>删除</a>
        </td>
      </tr>
    ));

    return (
    <div>
        <Table  responsive bordered condensed>
          <thead>
             <tr>
              <td>id</td>
              <td>名称</td>
              <td>规格</td>
              <td>数量</td>
              <td>编号</td>
              <td  hidden={this.state.release}>pack</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {itemRows}
          </tbody>
        </Table>
        输入备件<AutoComplete id="id2"
          openOnFocus={true}
          searchText={this.state.auto_value}
          onUpdateInput={this.auto_change}
          dataSource={this.state.auto_items}
          onNewRequest={this.auto_select}
        />
      <p>新备件名称：
        <input id="new_pack1"  placeholder="新备件" value={this.state.newPackName} onChange={this.newpackChange}/>
        <button className="btn btn-info" id="id_new_item" onClick={this.new_packitem}>新备件</button>
      </p>
      </div>
    );
  }
}
export default PackItems;
