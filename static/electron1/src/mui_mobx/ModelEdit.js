import { decorate, observable, action, autorun } from 'mobx';
import Client from './Client';
import RichTextEditor from 'react-rte';
var _ = require('underscore');
var moment = require('moment');
export default class Store {
  @action setState = newState => {
    _.extend(this.state, newState);
    console.log(this.state);
  };  
  constructor(contactStore) {
    this.contactStore=contactStore;
    this.state = {
      @observable openCollapse: false,
      @observable showModal: false,
      @observable contact: {
        @observable yujifahuo_date: moment(),
        @observable tiaoshi_date: moment(),
        @observable addr: '',
        @observable channels: '',
        @observable baoxiang: '',
        @observable hetongbh: '',
        @observable shenhe: '',
        @observable yonghu: '',
        @observable yiqibh: '',
        @observable yiqixinghao: '',
      },
      @observable hiddenPacks: true,
      @observable bg: {},
      @observable date_open: false,
      @observable editRich: false,
      @observable rich: RichTextEditor.createEmptyValue(),
    };
    autorun(()=>{
      console.log(this.state);
    });
  }
}
