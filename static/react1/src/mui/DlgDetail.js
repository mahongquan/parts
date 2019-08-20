import React from 'react';
// import DropdownButton from './DropdownButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
// import DialogActions from '@material-ui/core/DialogActions';
// import Button from '@material-ui/core/Button';
import Client from './Client';
// import update from 'immutability-helper';
import myglobal from '../myglobal';
var _ = require('lodash');
class DlgDetail extends React.Component {
  state = {
    error: '',
    packs: [],
    info: '',
    contact: {},
    items: [],
    items2: [],
    totalct: 0,
    totalid: 0,
  };

  loaddata = contactid => {
    if (!contactid) return;
    var data1 = { id: contactid };
    // console.log(data1);
    Client.get('/rest/showcontact', data1, res => {
      console.log(res);
      if (!res.items2) res.items2 = [];
      this.setState({
        contact: res.contact,
        items: res.items,
        items2: res.items2,
        totalid: res.totalid,
        totalct: res.totalct,
      });
    },(error)=>{
      myglobal.app.show_webview(error.response.url);
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props.showModal, nextProps.showModal)) {
      // console.log(this.props);
      // console.log(nextProps);
      // console.log('props not eq');
      return true;
    }
    if (!_.isEqual(this.state, nextState)) {
      // console.log('state not eq');
      return true;
    }
    return false;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.onShow(nextProps.contactid);
    } else if (this.props.showModal && !nextProps.showModal) {
      this.onHide();
    }
  }
  onShow = contactid => {
    this.open(contactid);
  };
  onHide = () => {};
  open = contactid => {
    this.loaddata(contactid);
  };
  handleDismiss = () => {
    this.setState({ showalert: false });
  };
  inputChange = () => {
    this.setState({ showalert: false });
  };
  mapfunc = (contact, idx) => {
    if (contact.leijia) {
      return (
        <tr key={idx}>
          <td>
            <u>{contact.bh}</u>
          </td>
          <td>
            <u>{contact.name}</u>
          </td>
          <td>
            <u>{contact.guige}</u>
          </td>
          <td>
            <u>
              {contact.ct}
              {contact.danwei}
            </u>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={idx}>
          <td>{contact.bh}</td>
          <td>{contact.name}</td>
          <td>{contact.guige}</td>
          <td>
            {contact.ct}
            {contact.danwei}
          </td>
        </tr>
      );
    }
  };

  render = () => {
    const contactRows = this.state.items.map(this.mapfunc);
    let contactRows2, quehuo;
    if (this.state.items2.length > 0) {
      contactRows2 = this.state.items2.map(this.mapfunc);

      quehuo = (
        <div>
          <h2>缺货清单</h2>
          <table border="1">
            <thead>
              <tr>
                <td>编号</td>
                <td>名称</td>
                <td>规格</td>
                <td>数量</td>
              </tr>
            </thead>
            <tbody>{contactRows2}</tbody>
          </table>
        </div>
      );
    }
    return (
      <Dialog open={this.props.showModal} onClose={this.props.handleClose}>
        <DialogTitle>详细</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={3}>
                  ID:
            </Grid>
            <Grid item xs={3}>
                  {this.state.contact.id}
            </Grid>
            <Grid item xs={3}>
                  用户单位:
            </Grid>
            <Grid item xs={3}>
                 {this.state.contact.yonghu}
            </Grid>
            <Grid item xs={3}>
                  客户地址:
            </Grid>
            <Grid item xs={3}>
                  {this.state.contact.addr}
            </Grid>
            <Grid item xs={3}>
                  通道配置:
            </Grid>
            <Grid item xs={3}>
                 {this.state.contact.channels}
            </Grid>
            <Grid item xs={3}>
                  仪器型号:
            </Grid>
            <Grid item xs={3}>
                  {this.state.contact.yiqixinghao}
            </Grid>
            <Grid item xs={3}>
                  仪器编号:
            </Grid>
            <Grid item xs={3}>
                 {this.state.contact.yiqibh}
            </Grid>
            <Grid item xs={3}>
                  包箱:
            </Grid>
            <Grid item xs={3}>
                  {this.state.contact.baoxiang}
            </Grid>
            <Grid item xs={3}>
                  审核:
            </Grid>
            <Grid item xs={3}>
                 {this.state.contact.shenhe}
            </Grid>
             <Grid item xs={3}>
                  入库时间:
            </Grid>
            <Grid item xs={3}>
                 {this.state.contact.yujifahuo_date}
            </Grid>
            <Grid item xs={3}>
                  调试时间:
            </Grid>
            <Grid item xs={3}>
                 {this.state.contact.tiaoshi_date}
            </Grid>
            <Grid item xs={3}>
                  合同编号:
            </Grid>
            <Grid item xs={3}>
                 {this.state.contact.hetongbh}
            </Grid>
            <Grid item xs={3}>
                 方法:
            </Grid>
            <Grid item xs={3}>
                 {this.state.contact.method}
            </Grid>
        </Grid>
        <h2>备件清单</h2>
          <table border="1">
            <thead>
              <tr>
                <td>编号</td>
                <td>名称</td>
                <td>规格</td>
                <td>数量</td>
              </tr>
            </thead>
            <tbody>
            {contactRows}
            </tbody>
          </table>
          <p>
            共{this.state.totalid}项{this.state.totalct}个。
          </p>
          {quehuo}
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgDetail;
