import React from 'react';
import Client from './Client';
import { Table, Button } from 'react-bootstrap';
import PackItemEditNew from './PackItemEditNew';
import update from 'immutability-helper';
import Autosuggest from 'react-autosuggest';
import myglobal from '../myglobal';
import DlgOkCancel from './DlgOkCancel';
class PackItems extends React.Component {
  state = {
    items: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    release: true,
  };
  close_ok = sure => {
    this.setState({ show_ok: false });
    // if (sure) {
    //   const filteredFoods = data.config.boards.filter(
    //     (item, idx) => this.idx !== idx
    //   );
    //   data.config.boards = filteredFoods;
    //   this.setState({ boards: data.config.boards });
    // }
  };  
  componentDidMount = () => {
    // this.auto_ref.current.input.focus();
    Client.PackItems(this.props.pack_id, items => {
      this.setState({
        items: items.data, //.slice(0, MATCHING_ITEM_LIMIT),
      });
    },(error)=>{
      console.log(error);
      myglobal.app.show_webview(error);
    });
  };
  auto_select = (event, data) => {
    console.log('selected');
    console.log(data);
    this.addrow(data.suggestion.id);
    //this.setState({auto_value:value, auto_items: [ item ] })
  };
  auto_change = data => {
    var value = data.value;
    // console.log("auto_change");
    if (value.length > 1) {
      Client.get('/rest/Item', { query: value, limit: 15 }, items => {
        this.setState({ auto_items: items.data, auto_loading: false });
      });
    }
  };
  /*auto_select=(value, item) => {
      console.log("selected");
      console.log(item);
      this.addrow(item.id);
      //this.setState({auto_value:value, auto_items: [ item ] })
  }
  auto_change=(event, value)=>{
    console.log("auto_change");
    if (value.length>1)
    {
      this.setState({ auto_value:value, auto_loading: true });
      Client.get("/rest/Item",{query:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
    else{
      this.setState({ auto_value:value, auto_loading: false });
    };
  };*/
  new_packitem = id => {
    if(this.state.newPackName===""){
      this.setState({show_ok:true});
      return;
    }
    var url = '/rest/BothPackItem';
    var data = { name: this.state.newPackName, pack: this.props.pack_id };
    console.log(data);
    Client.postOrPut(url, data, res => {
      var p = res.data;
      const newFoods = this.state.items.concat(p);
      this.setState({ items: newFoods });
    });
  };
  handlePackItemChange = (idx, contact) => {
    console.log(idx);
    const contacts2 = update(this.state.items, { [idx]: { $set: contact } });
    console.log(contacts2);
    this.setState({ items: contacts2 });
  };
  addrow = item_id => {
    var url = '/rest/PackItem';
    var data = { pack: this.props.pack_id, itemid: item_id };
    Client.post(url, data, res => {
      var p = res.data;
      const newFoods = this.state.items.concat(p);
      this.setState({ items: newFoods });
    });
  };
  newpackChange = e => {
    this.setState({ newPackName: e.target.value });
  };
  onEditClick = id => {};
  onDeleteClick = itemIndex => {
    var url = '/rest/PackItem';
    Client.delete1(url, { id: this.state.items[itemIndex].id }, res => {
      const filteredFoods = this.state.items.filter(
        (item, idx) => itemIndex !== idx
      );
      this.setState({ items: filteredFoods });
    });
  };
  onChange = (event, { newValue }) => {
    // console.log(newValue);
    this.setState({ auto_value: newValue });
  };
  handleEdit = idx => {
    this.refs.dlg.open2(idx);
  };
  onSuggestionsClearRequested = () => {};
  render() {
    const { items } = this.state;
    const itemRows = items.map((item, idx) => (
      <tr key={idx}>
        <td>{item.itemid}</td>
        <td>{item.name}</td>
        <td>{item.guige}</td>
        <td>{item.ct}{item.danwei}</td>
        <td>{item.bh}</td>
        <td hidden={this.state.release}>{item.pack}</td>
        <td>
          <input
            type="checkbox"
            disabled="disabled"
            name="quehuo"
            checked={item.quehuo}
          />
        </td>
        <td>
          <Button size="sm" variant="light" onClick={() => this.handleEdit(idx)}>
            编辑
          </Button>
          <Button
            variant="warning" size="sm"
            onClick={() => this.onDeleteClick(idx)}
          >
            删除
          </Button>
        </td>
      </tr>
    ));
    return (
      <div>
        <Table responsive bordered condensed="true">
          <thead>
            <tr>
              <td>备件id</td>
              <td>名称</td>
              <td>规格</td>
              <td>数量</td>
              <td>编号</td>
              <td hidden={this.state.release}>pack</td>
              <td>缺货</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>{itemRows}</tbody>
        </Table>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>输入已有备件</label>
          <Autosuggest
            inputProps={{
              value: this.state.auto_value,
              onChange: this.onChange,
              }}
            onSuggestionSelected={this.auto_select}
            onSuggestionsFetchRequested={this.auto_change}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={item => item.name}
            suggestions={this.state.auto_items}
            renderSuggestion={item => (
              <span>
                {item.id + ': ' + item.bh + ' '}
                <b>{item.name}</b>
                {' ' + item.guige}
              </span>
            )}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>新备件名称：</label>
          <input
            id="new_pack1"
            placeholder="新备件"
            value={this.state.newPackName}
            onChange={this.newpackChange}
          />
          <Button
            className="btn btn-info"
            id="id_new_item"
            onClick={this.new_packitem}
          >
            新备件
          </Button>
        </div>
        <div style={{ minHeight: '200px' }} />
        <PackItemEditNew ref="dlg" parent={this} />
        <DlgOkCancel
            description="备件名称编号不能为空"
            showModal={this.state.show_ok}
            closeModal={this.close_ok}
          />
      </div>
    );
  }
}
export default PackItems;
