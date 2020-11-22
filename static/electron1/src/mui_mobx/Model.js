import { decorate, observable, action, autorun } from 'mobx';
import update from 'immutability-helper';
import Client from './Client';
import RichTextEditor from 'react-rte';
var _ = require('underscore');
var moment = require('moment');
let StateModel={
      @observable connect_error:false,
      @observable target: null,  //context filter not ok
      @observable showcontext: false,//context filter
      @observable contacts: [],
      currentIndex:null,

      limit: 10,
      @observable user: 'AnonymousUser',
      start: 0,
      total: 0,
      @observable search: '',
      @observable start_input: 1,
      
      @observable baoxiang: '',
      @observable showDlgImport: false,
      @observable showDlgEdit: false,
      @observable showDlgDetail: false,
      @observable showDlgTodos: false,
      @observable showDlgStat2: false,
      @observable showDlgItem: false,
      @observable showDlgWorkMonth: false,
      @observable showDlgLogin: false,
}
export default class Store {
  @action setState = newState => {
    _.extend(this.state, newState);
  };
  constructor() {
    this.state = StateModel;
    Client.init(null, () => {
      this.load_data();
    });
  }
  handleContactChange = (idx, contact) => {
    let contacts2;
    if (idx != null) {
      contacts2 = update(this.state.contacts, {
        [idx]: { $set: contact },
      });
      console.log(contacts2);
    } else {
      contacts2 = update(this.state.contacts, {
        $unshift: [contact],
      });
    }
    this.setState({ contacts: contacts2 });
  };
  handleLogout = () => {
    console.log('logout');
    Client.logout(data => {
      console.log('logout' + data);
      this.setState({
        logined: false,
        user: 'AnonymousUser',
        total: 0,
        start: 0,
      });
      this.handleUserChange(this.state.user);
    });
  };
  handleUserChange = user => {
    if (user === 'AnonymousUser') {
      this.setState({
        logined: false,
      });
    } else {
      this.setState({
        logined: true,
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.load_data();
  };
  onLoginSubmit = data => {
    // console.log(data);
    Client.login(data.username, data.password, res => {
      if (res.success) {
        this.setState({
          logined: true,
        });
        this.setState({
          user: data.username,
        });
        this.handleUserChange(this.state.user);
      }
    });
  };
  load_data = () => {
    Client.contacts(
      {
        start: this.state.start,
        limit: this.state.limit,
        search: this.state.search,
        baoxiang: this.state.baoxiang,
      },
      contacts => {
        var user = contacts.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: contacts.total,
        });
      },
      error => {
        console.log(error);
        if (error instanceof SyntaxError) {
          this.openDlgLogin();
        } else {
          this.setState({ connect_error: true });
        }
      }
    );
  };
  ///////////////////////////
  open2=(idx)=>{
    this.setState({ showModal: true });
    this.setState({ bg: {} });
    this.index = idx;
    if (this.index == null) {
      this.old = new Contact();
      this.setState({ hiddenPacks: true });
    } else {
      this.old = this.state.contacts[this.index];
      this.setState({ hiddenPacks: false });
    }
    this.old.dianqi = this.old.dianqi || '';
    this.old.jixie = this.old.jixie || '';
    this.old.redao = this.old.redao || '';
    this.old.hongwai = this.old.hongwai || '';
    this.old.channels = this.old.channels || '';
    this.old.detail = this.old.detail || '';
    this.old.addr = this.old.addr || '';
    var val1 = RichTextEditor.createValueFromString(this.old.detail, 'html');
    this.setState({ rich: val1 });
    this.setState({ contact: this.old });
  }
}
