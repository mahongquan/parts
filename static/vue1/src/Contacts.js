import Client from './Client_fetch.js';
import NullContactEdit from "./ContactEdit.js";
import NUllDlgPacks from "./DlgPacks.js";
var app = new Vue({
  template:`<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">备件</b-navbar-brand>
      <b-navbar-nav >
          <b-nav-item href="/">home</b-nav-item>
          <b-nav-item v-on:click="openDlgPack">包</b-nav-item>
      </b-navbar-nav>
          <b-input  style="max-width:200px" placeholder="合同 or 仪器编号" v-model="search">
          </b-input>
          <b-button   variant="info" v-on:click="go_search" >搜索</b-button>
          <b-button  variant="primary" v-on:click="edit" index="null">新仪器</b-button>
          <b-dropdown variant="light" :text="'包箱:'+baoxiang" >
            <b-dropdown-item v-on:click="baoxiang_change">马红权</b-dropdown-item>
            <b-dropdown-item v-on:click="baoxiang_change">陈旺</b-dropdown-item>
            <b-dropdown-item v-on:click="baoxiang_change">吴振宁</b-dropdown-item>
          </b-dropdown>
    
  </b-navbar>
      <div class="container table-responsive">
        <div id="todoapp">
          <div id="main" style="min-height:200px;">
     <!--          
            <b-button @click="toggleBusy">Toggle Busy State</b-button>
            <b-table :busy="isBusy" striped responsive hover primary-key="id" :items="contacts" :fields="fields" >
              <template slot="table-caption">This is a table caption.</template>
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
      <template slot="yiqibh" slot-scope="data">
      <button v-on:click="edit"  v-bind:index="index">{{ data.item.yiqibh }}</button>
      <b-dropdown id="dropdown-1" class="m-md-2">
            <b-dropdown-item>详细</b-dropdown-item>
          </b-dropdown>
      </template>
            </b-table> !-->
            <table class="table-bordered">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>用户单位</td>
                  <td>客户地址</td>
                  <td>通道配置</td>
                  <td>仪器型号</td>
                  <td>仪器编号</td>
                  <td>包箱</td>
                  <td>审核</td>
                  <td>预计发货时间</td>
                  <td>调试时间</td>
                  <td>合同编号</td>
                  <td>方法</td>
                </tr>
              </thead>
              <tbody id="contact-list">
                <tr v-for="(contact,index) in contacts">
                  <td>{{ contact.id }}</td>
                  <td>{{ contact.yonghu }}</td>
                  <td>{{ contact.addr }}</td>
                  <td>{{ contact.channels }}</td>
                  <td>{{ contact.yiqixinghao }}</td>
                  <td>
                    <button v-on:click="edit"  v-bind:index="index">{{ contact.yiqibh }}</button>
          <b-dropdown id="dropdown-1" class="m-md-2">
            <b-dropdown-item>详细</b-dropdown-item>
          </b-dropdown>
                  </td>
                  <td>{{ contact.baoxiang }}</td>
                  <td>{{ contact.shenhe }}</td>
                  <td>{{ contact.yujifahuo_date }}</td>
                  <td>{{ contact.tiaoshi_date }}</td>
                  <td>{{ contact.hetongbh }}</td>
                  <td><a>{{ contact.method }}</a></td>
                </tr>
              </tbody>
            </table>
            <button v-on:click="prev" id="bt_prev">前一页</button>
            <label id="page">{{start}}/{{total}}</label>
            <button v-on:click="next" id="bt_next">后一页</button>
          </div>
          <contact-edit ref="dlgEdit" v-bind:contact="contact" v-bind:index="currentIndex"/>
          <dlg-packs ref="dlgPacks" />
          <div style="min-height: 300px"></div>
        </div>
      </div></div>
`,
  el: '#app',
  created: function() {
    this.load_data();
  },
  methods: {
    openDlgPack(){
      console.log("openDlgPack");
      console.log(this.$refs.dlgPacks);
      this.$refs.dlgPacks.open();
    },
    toggleBusy() {
        this.isBusy = !this.isBusy
      },
    load_data: function() {
      Client.contacts(
        {
          limit: this.limit,
          start: this.start,
          baoxiang: this.baoxiang,
          search: this.search,
        },
        res => {
          this.contacts = res.data;
          this.total = res.total;
          this.user = res.user;
          // console.log(this.contacts);
        },
        function() {}
      );
    },
    prev: function() {
      this.start = this.start - this.limit;
      if (this.start < 0) {
        this.start = 0;
      }
      this.load_data();
    },
    next: function() {
      this.start = this.start + this.limit;
      if (this.start > this.total - this.limit)
        this.start = this.total - this.limit; //total >limit
      this.load_data();
    },
    go_search: function() {
      this.load_data();
    },
    baoxiang_change: function(e) {
      this.baoxiang = e.target.text;
      this.load_data();
    },
    caozuo_change: function() {
      console.log('xiangxi');
    },
    edit: function(e) {
      let v=parseInt(e.target.attributes.index.value);
      if (isNaN(v)){
        this.currentIndex=null;  
        this.contact={};
      }
      else{
        this.currentIndex=v;   
        this.contact=this.contacts[this.currentIndex]
      }
      this.$refs.dlgEdit.open();
    },
  },
  data: {
    fields: [{key:'id',sortable: true,label: 'ID'},{key:'yonghu',label:"用户"},'addr','channels','yiqixinghao','yiqibh','baoxiang','yujifahuo_date','hetongbh','method'],
    contacts: [],
    contact: {},
    currentIndex:null,
    user: '',
    baoxiang: '',
    search: '',
    total: 0,
    start: 1,
    limit: 7,
    isBusy:false,
  },
});
 // <td>{{ contact.yonghu }}</td>
 //                  <td>{{ contact.addr }}</td>
 //                  <td>{{ contact.channels }}</td>
 //                  <td>{{ contact.yiqixinghao }}</td>
 //                  <td>
 //                    <button v-on:click="edit"  v-bind:index="index">{{ contact.yiqibh }}</button>
 //          <b-dropdown id="dropdown-1" class="m-md-2">
 //            <b-dropdown-item>详细</b-dropdown-item>
 //          </b-dropdown>
 //                  </td>
 //                  <td>{{ contact.baoxiang }}</td>
 //                  <td>{{ contact.shenhe }}</td>
 //                  <td>{{ contact.yujifahuo_date }}</td>
 //                  <td>{{ contact.tiaoshi_date }}</td>
 //                  <td>{{ contact.hetongbh }}</td>
 //                  <td><a>{{ contact.method }}</a></td>