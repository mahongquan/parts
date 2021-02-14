import React from 'react';
import Client from './Client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PackItemEditNew from './PackItemEditNew';
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import DropdownButton from './DropdownButton';
// import Autosuggest from 'react-autosuggest';
import SelectItem from './SelectItem';
import MenuItem from '@material-ui/core/MenuItem';
import myglobal from '../myglobal';
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
  componentDidMount = () => {
    Client.PackItems(
      this.props.pack_id,
      (items) => {
        this.setState({
          items: items.data, //.slice(0, MATCHING_ITEM_LIMIT),
        });
      },
      (error) => {
        myglobal.app.show_webview(error.response.url);
      }
    );
  };
  auto_select = (data) => {
    console.log('selected');
    console.log(data);
    this.addrow(data.id);
  };
  auto_change = (data) => {
    var value = data.value;
    // console.log("auto_change");
    if (value.length > 1) {
      Client.get('/rest/Item', { query: value, limit: 15 }, (items) => {
        this.setState({ auto_items: items.data, auto_loading: false });
      });
    }
  };
  new_packitem = (id) => {
    var url = '/rest/BothPackItem';
    var data = { name: this.state.newPackName, pack: this.props.pack_id };
    console.log(data);
    Client.postOrPut(url, data, (res) => {
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
  addrow = (item_id) => {
    var url = '/rest/PackItem/';
    var data = { pack: this.props.pack_id, itemid: item_id };
    Client.post(url, data, (res) => {
      var p = res.data;
      const newFoods = this.state.items.concat(p);
      this.setState({ items: newFoods });
    });
  };
  newpackChange = (e) => {
    this.setState({ newPackName: e.target.value });
  };
  onEditClick = (id) => {};
  onDeleteClick = (itemIndex) => {
    var url = '/rest/PackItem/';
    Client.delete1(url, { id: this.state.items[itemIndex].id }, (res) => {
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
  handleEdit = (idx) => {
    this.refs.dlg.open2(idx);
  };
  onSuggestionsClearRequested = () => {};
  render() {
    const { items } = this.state;
    const itemRows = items.map((item, idx) => {
      let ng = item.name + '/' + (item.guige === null ? '' : item.guige);
      return (
        <TableRow key={idx}>
          <TableCell>
            {item.quehuo ? <del>{ng}</del> : ng}
            <DropdownButton title="" id="id_dropdown3">
              <MenuItem onClick={() => this.handleEdit(idx)}>编辑</MenuItem>
              <MenuItem onClick={() => this.onDeleteClick(idx)}>删除</MenuItem>
            </DropdownButton>
          </TableCell>
          <TableCell>{item.bh}</TableCell>
          <TableCell>
            {item.ct}
            {item.danwei}
          </TableCell>
        </TableRow>
      );
    });
    return (
      <div>
        <Table responsive="true" bordered="true" condensed="true">
          <TableHead>
            <TableRow>
              <TableCell>名称/规格</TableCell>
              <TableCell>编号</TableCell>
              <TableCell>数量</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{itemRows}</TableBody>
        </Table>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>输入备件</label>
          <SelectItem onChange={this.auto_select} />
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
            variant="outlined"
            className="btn btn-info"
            id="id_new_item"
            onClick={this.new_packitem}
          >
            新备件
          </Button>
        </div>
        <div style={{ minHeight: '200px' }}></div>
        <PackItemEditNew ref="dlg" parent={this} />
      </div>
    );
  }
}
export default PackItems;
