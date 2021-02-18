import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
class DlgDetail extends React.Component {
  mapfunc = (contact, idx) => {
    if (contact.leijia) {
      return (
        <tr key={idx}>
          <td>
            <u>
              <b>{contact.id}</b>
            </u>
          </td>
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
          <td>{contact.id}</td>
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
    if (this.props.store.detail === null) {
      return <div></div>;
    }
    const contactRows = this.props.store.detail.items.map(this.mapfunc);
    let contactRows2, quehuo;
    if (this.props.store.detail.items2.length > 0) {
      contactRows2 = this.props.store.detail.items2.map(this.mapfunc);

      quehuo = (
        <div>
          <h2>缺货清单</h2>
          <table responsive bordered condensed>
            <thead>
              <tr>
                <td>ID</td>
                <td>编号</td>
                <td>名称</td>
                <td>规格</td>
                <td>数量</td>
              </tr>
            </thead>
            <tbody id="contact-list">{contactRows2}</tbody>
          </table>
        </div>
      );
    }
    return (
      <Dialog open={this.props.showModal} onClose={this.props.handleClose}>
        <DialogTitle>详细</DialogTitle>
        <DialogContent>
          <table border={1} id="table_input" className="table-condensed">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{this.props.store.detail.contact.id}</td>
                <td>
                  <label>用户单位:</label>
                </td>
                <td>{this.props.store.detail.contact.yonghu}</td>
              </tr>
              <tr>
                <td>客户地址:</td>
                <td>{this.props.store.detail.contact.addr}</td>
                <td>通道配置:</td>
                <td>{this.props.store.detail.contact.channels} </td>
              </tr>
              <tr>
                <td>
                  <label>仪器型号:</label>
                </td>
                <td>{this.props.store.detail.contact.yiqixinghao}</td>
                <td>
                  <label>仪器编号:</label>
                </td>
                <td>{this.props.store.detail.contact.yiqibh}</td>
              </tr>
              <tr>
                <td>
                  <label>包箱:</label>
                </td>
                <td>{this.props.store.detail.contact.baoxiang}</td>
                <td>审核:</td>
                <td>{this.props.store.detail.contact.shenhe}</td>
              </tr>
              <tr>
                <td>
                  <label>入库时间:</label>
                </td>
                <td>{this.props.store.detail.contact.yujifahuo_date}</td>
                <td>调试时间:</td>
                <td>{this.props.store.detail.contact.tiaoshi_date}</td>
              </tr>
              <tr>
                <td>
                  <label>合同编号:</label>
                </td>
                <td>{this.props.store.detail.contact.hetongbh}</td>
                <td>方法:</td>
                <td>{this.props.store.detail.contact.method}</td>
              </tr>
            </tbody>
          </table>
          <h2>备件清单</h2>
          <table border={1} responsive="true" bordered="true" condensed="true">
            <thead>
              <tr>
                <td>ID</td>
                <td>编号</td>
                <td>名称</td>
                <td>规格</td>
                <td>数量</td>
              </tr>
            </thead>
            <tbody id="contact-list">{contactRows}</tbody>
          </table>
          <p>
            共{this.props.store.detail.totalid}项
            {this.props.store.detail.totalct}个。
          </p>
          {quehuo}
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgDetail;
