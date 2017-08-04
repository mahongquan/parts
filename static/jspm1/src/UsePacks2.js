
import React from 'react';
import Client from './Client';
import {Table} from "react-bootstrap";
import UsePackEditNew from "./UsePackEditNew";
import Autocomplete from './Autocomplete'
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}
class UsePacks2 extends React.Component {
  constructor() {
    super();
    this.state = {
    usepacks: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items:[],
    auto_loading: false,
    release:true,
    }
  }
   componentWillReceiveProps(nextProps) {
    if(nextProps.contact_id){
      this.load_data(nextProps.contact_id);
    }
  }
  load_data(contact_id){
      Client.UsePacks(contact_id, (usepacks) => {
        this.setState({
          usepacks: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
  }
  componentDidMount() {
    if(this.props.contact_id){
      this.load_data(this.props.contact_id);
    }
  };
  auto_change(event, value){
    console.log("auto_change");
    if (value.length>1)
    {
      this.setState({ auto_value:value, auto_loading: true });
      Client.get("/rest/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
    else{
      this.setState({ auto_value:value, auto_loading: false });
    };
  };
  auto_select(value, item)  {
      console.log("selected");
      console.log(item);
      this.addrow(item.id);
      //this.setState({auto_value:value, auto_items: [ item ] })
  }
  bibei (id)  {
    //this.setState({auto_value:"必备"});
    this.auto_change(null,"必备");
  };
  new_pack (id)  {
    var url="/rest/UsePackEx";
    var data={"name":this.state.newPackName,contact:this.props.contact_id};
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newFoods = this.state.usepacks.concat(p);
        this.setState({ usepacks: newFoods });
    });
  };
  addrow(pack_id){
    var url="/rest/UsePack";
    var data={contact:this.props.contact_id,pack:pack_id};
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newFoods = this.state.usepacks.concat(p);
        this.setState({ usepacks: newFoods });
    });
  };
  newpackChange(e){
    this.setState({newPackName:e.target.value});
  };
  onEditClick  (id) {
  };
  onDeleteClick  (itemIndex)  {
    var url="/rest/UsePack";
    Client.delete1(url,{id:this.state.usepacks[itemIndex].id},(res) => {
        const filteredFoods = this.state.usepacks.filter(
          (item, idx) => itemIndex !== idx,
        );
        this.setState({ usepacks: filteredFoods });
    });
  };
   handleEdit(idx){
    //this.setState({currentIndex:idx,showModal:true});
    this.refs.edit1.open2(idx);
  }
  getUsers(input) {
    console.log("getUsers");
    console.log(input)
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch("/rest/Pack?limit=10&search="+input,{credentials: 'include'})
    .then((response) => response.json())
    .then((json) => {
      var r={ options: json.data};
      console.log(r);
      return r;
    });
  }
  onChange(value){
    this.setState({
      auto_value: value,
    });
  }
  onValueClick(value){
    console.log(value);
  }
  render() {
    const { usepacks } = this.state;
    const usepackRows = usepacks.map((usepack, idx) => (
      <tr
        key={idx}
      >
        <td >{usepack.id}</td>
        <td >{usepack.name}</td>
        <td hidden={this.state.release}>{usepack.contact}</td>
        <td hidden={this.state.release} >{usepack.pack}</td>
        <td hidden={this.state.release} >{usepack.hetongbh}</td>
        <td>
        <a onClick={()=>this.handleEdit(idx)}>编辑</a>
        <a  onClick={() => this.onDeleteClick(idx)} style={{marginLeft:"10px"}}>删除</a>
        </td>
      </tr>
    ));

    return (
    <div>
        <UsePackEditNew ref="edit1" parent={this} index={this.state.currentIndex} title="编辑"  />
        <Table  responsive bordered condensed>
          <thead>
             <tr>
              <td>id</td>
              <td>名称</td>
              <td hidden={this.state.release}>contact</td>
              <td hidden={this.state.release}>pack</td>
              <td hidden={this.state.release}>hetongbh</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {usepackRows}
          </tbody>
        </Table>
        <div>
        输入包
        {
          // <Select.Async multi={false} 
          // value={this.state.auto_value} 
          // onChange={this.onChange} 
          // onValueClick={this.onValueClick} 
          // valueKey="id" labelKey="name" 
          // loadOptions={this.getUsers}
          // />
        }
        <Autocomplete
          inputProps={{ id: 'states-autocomplete' }}
          ref="autocomplete"
          value={this.state.auto_value}
          items={this.state.auto_items}
          getItemValue={(item) => item.name}
          onSelect={this.auto_select}
          onChange={this.auto_change}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.id}
              id={item.id}
            >{item.name}</div>
          )}
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
export default UsePacks2;
