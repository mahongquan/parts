import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PackItemEditNew from './PackItemEditNew';
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import DropdownButton from './DropdownButton';
import Autosuggest from 'react-autosuggest';
import MenuItem from '@material-ui/core/MenuItem';
import Client from './Client.js';
import { useSelector, useDispatch } from 'react-redux';
export default function PackItems(props){
  const dispatch = useDispatch();
  const auto_select = (event, data) => {
    console.log('selected');
    console.log(data);
    addrow(data.suggestion.id);
};
const auto_change = data => {
    var value = data.value;
    // console.log("auto_change");
    if (value.length > 1) {
      Client.get('/rest/Item', { query: value, limit: 15 }, items => {
        set_state({ auto_items: items.data, auto_loading: false });
      });
    }
  };
const new_packitem = id => {
    var url = '/rest/BothPackItem';
    var data = { name: state.newPackName, pack: props.pack_id };
    console.log(data);
    Client.postOrPut(url, data, res => {
      var p = res.data;
      const newFoods = state.items.concat(p);
      set_state({ items: newFoods });
    });
  };
const handlePackItemChange = (idx, contact) => {
    console.log(idx);
    const contacts2 = update(state.items, { [idx]: { $set: contact } });
    console.log(contacts2);
    set_state({ items: contacts2 });
  };
  const addrow = item_id => {
    var url = '/rest/PackItem';
    var data = { pack: props.pack_id, itemid: item_id };
    Client.post(url, data, res => {
      var p = res.data;
      const newFoods = state.items.concat(p);
      set_state({ items: newFoods });
    });
  };
  const [state, set_state] = React.useState(
    {
    items: [],
    showRemoveIcon: false,
    newPackName: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    release: true,
  });
    const  items  = useSelector((state) => state.parts.packitems);//props.store.packitems;
    const itemRows = items.map((item, idx) => {
      let ng = item.name + '/' + (item.guige === null ? '' : item.guige);
      return (
        <TableRow key={idx}>
          <TableCell>
            {item.quehuo ? <del>{ng}</del> : ng}
            <DropdownButton title="" id="id_dropdown3">
              <MenuItem onClick={(idx) =>{
                console.log(idx);
                dispatch(props.store.editPackItem(idx));
              }}>编辑</MenuItem>
              <MenuItem onClick={(idx)=>{
                var url = '/rest/PackItem';
                Client.delete1(url, { id: state.items[idx].id }, res => {
                  const filteredFoods = state.items.filter(
                    (item, idx1) => idx !== idx1
                  );
                  set_state({ items: filteredFoods });
                });
              }}>删除</MenuItem>
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
          <Autosuggest
            inputProps={{
              id: 'states-autocomplete',
              value: state.auto_value,
              onChange: (event, { newValue })=>{
                set_state({ auto_value: newValue });
              },
            }}
            onSuggestionSelected={auto_select}
            onSuggestionsFetchRequested={auto_change}
            onSuggestionsClearRequested={()=>{}}
            getSuggestionValue={item => item.name}
            suggestions={state.auto_items}
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
            value={state.newPackName}
            onChange={(e)=>{
              set_state({ newPackName: e.target.value });
            }}
          />
          <Button
            variant="outlined"
            className="btn btn-info"
            id="id_new_item"
            onClick={new_packitem}
          >
            新备件
          </Button>
        </div>
        <PackItemEditNew open={useSelector((state) => {
          console.log(state);
          return state.parts.show_packitem_edit
        })} 
        onClose={()=>{
          dispatch(props.store.actions.SHOW_DLG_EDIT_PACKITEM(false))
        }} store={props.store} />
      </div>
    );
}

