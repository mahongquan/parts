import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Client from './Client';
import DialogExampleSimple from "./DialogExampleSimple"
import DialogImportStandard from "./DialogImportStandard"
import ContactEdit from "./ContactEdit"
import update from 'immutability-helper';
injectTapEventPlugin();
//var user = "";
class App extends Component {
  state = {
    contacts: [],
    showRemoveIcon: false,
    searchValue: '',
    open: false,
    logined: false,
    user: "AnonymousUser",
    selected:null,
    test_input:"",
  //csrf_token:"",
  }

  componentDidMount=() => {
    Client.contacts("", (contacts) => {
      var user=contacts.user;
      if(user===undefined){
        user="AnonymousUser"
      }
      this.setState({
        contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
        user: user,
      });
      if (user === "AnonymousUser") {
        this.setState({
          logined: false
        });
      } else {
        this.setState({
          logined: true
        });
      }
    });
  };
  // removeFoodItem = (itemIndex) => {
  //   const filteredFoods = this.state.selectedFoods.filter(
  //     (item, idx) => itemIndex !== idx,
  //   );
  //   this.setState({ selectedFoods: filteredFoods });
  // }

  // addFood = (food) => {
  //   const newFoods = this.state.selectedFoods.concat(food);
  //   this.setState({ selectedFoods: newFoods });
  // }
  handleTest = () => {
    //const contact2=update(this.state.contacts[this.state.selected],{baoxiang: {$set: "test"}});
    // console.log("handleTest");
    //console.log(contact2);
    //var one=this.state.contacts[this.state.selected];
    var idx=this.state.selected;
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {baoxiang:{$set:"test111"}}});
    console.log(contacts2);
    //this.state.contacts[this.state.selected].baoxiang="test";
    this.setState({contacts:contacts2});
    //this.forceUpdate();
  };
  handleContactChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({contacts:contacts2});
  };
  oncontactClick=(key) => {
    console.log("click row");
    console.log(key);
    this.setState({selected:key});
  };
  handleImportStandard=() => {
    console.log("import row");
  };
  handleUserChange = (user) => {
    if (user === "AnonymousUser") {
      this.setState({
        logined: false
      });
    } else {
      this.setState({
        logined: true
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.componentDidMount();
  };
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };
  showlogin = () => {
    console.log("showlogin");
    var data = {
      username: "mahongquan",
      password: "333333"
    };
    this.onLoginSubmit(data);
  };
  handleLogin = () => {
    console.log("login");
    Client.login_index((data) => {
      //console.log(data.csrf_token);
      // const cookies = new Cookies();

      // cookies.set('csrftoken', this.state.csrf_token, { path: '/' });
      this.showlogin();
    });

  };
  handleLogout = () => {
    console.log("logout");
    Client.logout((data) => {
      console.log("logout" + data);
      this.setState({
        logined: false,
        user: "AnonymousUser",
      });
      this.handleUserChange(this.state.user);
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        contacts: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.contacts(value, (contacts) => {
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };
  onLoginSubmit= (data) => {
    console.log(data);
    Client.login(data.username, data.password, (res) => {
      if (res.success) {
        this.setState({
          logined: true,
        });
        this.setState({
          user: data.username
        });
        this.handleUserChange(this.state.user);
      }
    });
  };
  inputChange=(e)=>{
    console.log(this.refs.input);
    console.log(this.refs.style);
    var style=getComputedStyle(this.refs.input, null)
    console.log(style);
    this.setState({test_input:e.target.value});
  };
  render() {
    const contactRows = this.state.contacts.map((contact, idx) => (
      <TableRow      key={idx}      onTouchTap={() => this.oncontactClick(idx)}>
        <TableRowColumn>{contact.id}</TableRowColumn>
        <TableRowColumn>{contact.hetongbh}</TableRowColumn>
        <TableRowColumn>{contact.yonghu}</TableRowColumn>
        <TableRowColumn>{contact.baoxiang}</TableRowColumn>
        <TableRowColumn>{contact.yiqixinghao}</TableRowColumn>
      </TableRow>
    ));
    return (
      <div className="App">
        <input onChange={this.inputChange} ref="input" value={this.state.test_input}></input>
        <MuiThemeProvider>
        <div>
         <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="仪器信息" />
          <TextField
      id="id_search"
      type='text'
      placeholder='Search instrument...'
      value={this.state.searchValue}
      onChange={this.handleSearchChange}
      >
          </TextField>
         <div>
         <DialogImportStandard title="导入标样" disabled={this.state.logined}  onLoginSubmit={this.onLoginSubmit} />
         </div>
         <div>
         <ContactEdit  title="编辑仪器信息" contact={this.state.selected} parent={this}/>
         </div>
          <div>
          <RaisedButton  onTouchTap={this.handleTest}
            label="test" >
        </RaisedButton>
        <RaisedButton  onTouchTap={this.handleTouchTap}
      label={this.state.user}>
        </RaisedButton>
        <Popover
      open={this.state.open}
      anchorEl={this.state.anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      targetOrigin={{
        horizontal: 'left',
        vertical: 'top'
      }}
      onRequestClose={this.handleRequestClose}
      >
          <Menu>
            <MenuItem primaryText="注销" disabled={!this.state.logined} onTouchTap={this.handleLogout} />
          </Menu>

        </Popover>
       </div>
        </ToolbarGroup>
        <ToolbarGroup>
                <DialogExampleSimple title="登录" disabled={this.state.logined}  onLoginSubmit={this.onLoginSubmit}>
                </DialogExampleSimple>
        </ToolbarGroup>
      </Toolbar>
        <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>id</TableHeaderColumn>
        <TableHeaderColumn>合同编号</TableHeaderColumn>
        <TableHeaderColumn>用户单位</TableHeaderColumn>
        <TableHeaderColumn>包箱</TableHeaderColumn>
        <TableHeaderColumn>仪器型号</TableHeaderColumn>
      </TableRow>
    </TableHeader>
         <TableBody>
            {contactRows}
          </TableBody>
        </Table>
        </div>
      </MuiThemeProvider>
      </div>
    );
  }
}
export default App;
