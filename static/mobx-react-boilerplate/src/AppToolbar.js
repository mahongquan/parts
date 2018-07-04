import React, { Component } from 'react';
import DlgTodos from './DlgTodos';
import {Navbar,Nav,NavItem,MenuItem,DropdownButton,Tooltip,Overlay} from "react-bootstrap";
import update from 'immutability-helper';
import DlgStat from './DlgStat';
import DlgCopyPack from './DlgCopyPack';
import DlgItems from './DlgItems';
import DlgPacks from './DlgPacks';
class App extends Component {
   state = {
    search2:"",
    search2tip:"",
    target:null,
    showDlgTodos:false,
  }
  constructor(props) {
    super(props);
    this.dlgitems=React.createRef();
    this.dlgcopypack=React.createRef();
    this.dlgstat=React.createRef();
    this.dlgpacks=React.createRef();
  }
  handleClickFilter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({target:event.target,showcontext:true});
  }
  componentDidMount=() => {
  }
  openDlgItems=()=>{
    this.dlgitems.current.open();
  }
  openDlgPacks=()=>{
    this.dlgpacks.current.open();
  }
  openDlgCopyPack=()=>{
    this.dlgcopypack.current.open();
  }
  openDlgStat=()=>{
    this.dlgstat.current.open();
  }
  render() {
    return (
<div id="todoapp" className="table-responsive">
    <DlgItems ref={this.dlgitems} />
    <DlgPacks ref={this.dlgpacks} />
    <DlgCopyPack ref={this.dlgcopypack} />
    <DlgStat ref={this.dlgstat} />
    <DlgTodos showModal={this.state.showDlgTodos} close={()=>{
      this.setState({showDlgTodos:false});
    }}/> 
    <Navbar className="navbar-inverse">
    <Navbar.Header>
      <Navbar.Brand>
        <a>装箱单</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">合同</NavItem>
      <NavItem eventKey={2} href="#" onClick={this.openDlgPacks}>包</NavItem>
      <NavItem eventKey={3} href="#" onClick={this.openDlgItems}>备件</NavItem>
      <NavItem eventKey={4} href="#" onClick={this.openDlgCopyPack}>复制包</NavItem>
      <NavItem eventKey={5} href="#" onClick={this.openDlgStat}>统计</NavItem>
      <NavItem eventKey={5} href="#" onClick={()=>{
        this.setState({showDlgTodos:true});
      }}>待办</NavItem>
    </Nav>
  </Navbar>
  </div>
    );
  }
}
export default App;
