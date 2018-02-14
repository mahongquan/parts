var {Bar,Table,Modal,Navbar,Nav,NavItem,DropdownButton,MenuItem}=ReactBootstrap;
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
class PackItemEditNew extends React.Component{
  state={ 
      showModal: false,
      packitem:{},
      hiddenPacks:true,
      bg:{},
      date_open:false,
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ showModal: nextProps.showModal });
  //   if (nextProps.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=nextProps.parent;
  //     this.old=this.parent.state.items[nextProps.index];
  //   }
  //   this.setState({packitem:this.old});
  // }
  close=()=>{
    this.setState({ showModal: false });
  }

  open2=(idx)=>{
    this.setState({ showModal: true });
    this.index=idx;
    if (this.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.items[this.index];
    }
    this.setState({packitem:this.old});
  }
  handleSave=(data)=>{
    var url="/PackItem";
    Client.put(url,this.state.packitem,(res) => {
      console.log("/put/PackItem");
      console.log(res);
        this.setState({contact:res.data});
        this.parent.handlePackItemChange(this.index,res.data);
        this.old=res.data;
        this.close();
    });
  }
  quehuoChange=(e)=>{
    var quehuo=this.state.packitem.quehuo;
    quehuo=!quehuo;
    if(this.old.quehuo===quehuo)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{quehuo: {$set:quehuo}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange_item=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old.Item[e.target.name]===e.target.value)
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
    const contact2=update(this.state.packitem,{Item:{[e.target.name]: {$set:e.target.value}}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target);
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
  }
  render=()=>{
    let item={};
    if(this.state.packitem.Item){
      item=this.state.packitem.Item;
    }
    return (
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑备件信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody> 
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.packitem.id} />
                </td>
            </tr>
            <tr >
                <td >
                    ItemID:
                </td>
                <td >
                    <input type="text" id="itemid" name="item_id" readOnly="true"  disabled="disabled"    
                    defaultValue={item.id} />
                </td>
            </tr>
            <tr>
                <td>
                    名称:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.addr}}  type="text" id="addr" name="name" value={item.name}
                     onChange={this.handleChange_item} />
                </td>
            </tr><tr>
                <td>
                    <label>规格:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yiqixinghao}} type="text"  
                    name="guige" value={item.guige}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>编号:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" 
                    id="baoxiang" name="bh" value={item.bh}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>单位:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" 
                    id="danwei" name="danwei" value={item.danwei}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>数量:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.state.bg.ct}}
                    id="yujifahuo_date" name="ct"  value={this.state.packitem.ct} onChange={this.handleChange} />
                </td>
            </tr>  
            <tr>
                <td>
                    <label>缺货:</label>
                </td>
                <td>
                    <input type="checkbox" id="quehuo" name="quehuo" checked={this.state.packitem.quehuo}  onChange={this.quehuoChange} />
                </td>
            </tr>        
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       </div>
                </Modal.Body>
        </Modal>
    );
  }
}
var socket=io();
class Client{
static getRaw=(url,cb)=>{
  socket.emit("/get"+url,{},cb);
}
static get=(url,data,cb)=>{
  console.log("emit")
  console.log(url);
  console.log(data);
  socket.emit("/get"+url,data,cb)
}
static delete1=(url,data,cb)=>{
  socket.emit("/delete"+url,data,cb)
}
static post=(url,data,cb)=>{
  socket.emit("/post"+url,data,cb)
}
static put=(url,data,cb)=>{
  socket.emit("/put"+url,data,cb)
}
static postOrPut=(url,data,cb)=>{
  var method="post"
  if (data.id){
    method="put"
  }
  socket.emit("/"+method+url,data,cb)
}
static postForm=(url,data,cb)=>{
  socket.emit("/post"+url,data,cb)
}
static contacts=(data, cb)=>{
  socket.emit("/get/Contact",data,cb)
}
static UsePacks=(query, cb)=> {
  console.log("UsePacks");
  console.log(query);
  socket.emit("/get/UsePack",{contact_id:query},cb)
}
static PackItems=(query, cb)=> {
  socket.emit("/get/PackItem",{pack_id:query,limit:200},cb)
}
static items=(query, cb)=>{
  socket.emit("/get/Item",{search:query},cb)
}
}
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Easy',
    year: 2012
  }
];
// Teach Autosuggest how to calculate suggestions for any given input value.
class Example extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    return suggestion.name
  }

  // Use your imagination to render suggestions.
  renderSuggestion =(suggestion) => {
    return (<div>
      {suggestion.name}
    </div>);
  }
  onChange = (event, { newValue }) => {
    console.log(newValue);
    this.setState({
      value: newValue
    });
  };
  onSuggestionSelected=(event,data)=>{// { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })
    console.log(data);
  }
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        onSuggestionSelected={this.onSuggestionSelected}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
///////////////////////////////////////////////////////////////////////////////
// Teach Autosuggest how to calculate suggestions for any given input value.
class Example2 extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  getSuggestions = (value) => {
    console.log("getSuggestions===========");
    const inputValue = value;//.trim().toLowerCase();
    const inputLength = inputValue.length;

    if(inputLength >0) {
      Client.get("/Item",{search:value} ,(items) => {
          this.setState({ suggestions: items.data});
      });
    }
    return this.state.suggestions;
  }
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    return suggestion.name
  }

  // Use your imagination to render suggestions.
  renderSuggestion =(suggestion) => {
    return (<div>
      {suggestion.name}
    </div>);
  }
  onChange = (event, { newValue }) => {
    console.log(newValue);
    this.setState({
      value: newValue
    });
  };
  onSuggestionSelected=(event,data)=>{// { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })
    console.log(data);
  }
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = (data) => {
     console.log(data);
     this.getSuggestions(data.value)
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        onSuggestionSelected={this.onSuggestionSelected}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
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
    console.log(this.props.pack_id);
      Client.PackItems(this.props.pack_id, (items) => {
        console.log("PackItems componentDidMount");
        console.log(items);
        this.setState({
          items: items.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
  };
  auto_select=(event,data) => {
      console.log("selected");
      console.log(data)
      this.addrow(data.suggestion.id);
      //this.setState({auto_value:value, auto_items: [ item ] })
  }
  auto_change=(data)=>{
    var value=data.value;
    console.log("auto_change");
    if (value.length>1)
    {
      Client.get("/Item",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
  };
  new_packitem= (id) => {
    var url="/PackItemEx";
    var data={danwei:"",bh:"",guige:"",ct:0,name:this.state.newPackName,pack_id:this.props.pack_id};
    console.log(data);
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newFoods = this.state.items.concat(p);
        this.setState({ items: newFoods });
    });
  };
  handlePackItemChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.items,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({items:contacts2});
  };
  addrow=(item_id)=>{
    var url="/PackItem";
    var data={pack_id:this.props.pack_id,item_id:item_id,ct:1,quehuo:false};
    Client.post(url,data,(res) => {
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
    var url="/PackItem";
    Client.delete1(url,{id:this.state.items[itemIndex].id},(res) => {
        const filteredFoods = this.state.items.filter(
          (item, idx) => itemIndex !== idx,
        );
        this.setState({ items: filteredFoods });
    });
  };
  handleEdit=(idx)=>{
    this.refs.dlg.open2(idx);
  }
  onChange=(event, { newValue })=>{
    console.log(newValue);
    this.setState({auto_value:newValue});
  }
  render() {
    console.log("render");
    console.log(this.state);
    const { items } = this.state;
    const itemRows = items.map((item, idx) => (
      <tr key={idx}>
        <td >{item.id}</td>
        <td >{item.Item.name}</td>
        <td>{item.Item.guige}</td>
        <td>{item.ct}</td>
        <td>{item.Item.bh}</td>
        <td  hidden={this.state.release}>{item.pack}</td>
        <td><input type="checkbox" disabled="disabled" name="quehuo" checked={item.quehuo}  /></td>
        <td>
        <a onClick={()=>this.handleEdit(idx)}>编辑</a>
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
              <td>缺货</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {itemRows}
          </tbody>
        </Table>
        输入备件<Autosuggest
          inputProps={{ id: 'states-autocomplete',value:this.state.auto_value,onChange:this.onChange}}
          onSuggestionSelected={this.auto_select}
          onSuggestionsFetchRequested={this.auto_change}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={(item) => item.name}
          ref="autocomplete"
          suggestions={this.state.auto_items}
          renderSuggestion={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.id}
              id={item.id}
            >{item.bh+"_"+item.name+"_"+item.guige}</div>
          )}
        />
      <p>新备件名称：
        <input id="new_pack1"  placeholder="新备件" value={this.state.newPackName} onChange={this.newpackChange}/>
        <button className="btn btn-info" id="id_new_item" onClick={this.new_packitem}>新备件</button>
      </p>
      <PackItemEditNew ref="dlg" parent={this} />
      </div>
    );
  }
}
class App extends React.Component {
  render() {
    return (
      <div><Example /><Example2 /><PackItems pack_id={308} />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
