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
import * as store from './reducers/partsSlice';
var _=require("lodash");
export default function PackItems(props){
  const dispatch = useDispatch();
  const [state, set_state] = React.useState(
    {items: [],
    newPackName: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    release: true,}
  );
  var pack_id=useSelector((state) => state.parts.pack_id);
  const new_packitem = id => {
    var url = '/rest/BothPackItem';
    var data = { name: state.newPackName, pack:pack_id };
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
  const addrow = (pack_id,item_id) => {
    var data = { pack: pack_id, itemid: item_id };
    dispatch(store.addPackItem(data));
  };
    const  items  = useSelector((state) => state.parts.packitems);//props.store.packitems;
    const itemRows = items.map((item, idx) => {
      let ng = item.name + '/' + (item.guige === null ? '' : item.guige);
      console.log("state========================")
      console.log(state);
      
      return (
        <TableRow key={idx}>
          <TableCell>
            {item.quehuo ? <del>{ng}</del> : ng}
            <DropdownButton title="" id="id_dropdown3">
              <MenuItem onClick={() =>{
                dispatch(store.editPackItem(idx));
              }}>编辑</MenuItem>
              <MenuItem onClick={()=>{
                dispatch(store.deletePackItem(idx,item.id));
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
        <div>id:{pack_id}</div>
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
                set_state((prev)=>{
                  var new_state=_.clone(prev);
                  new_state.auto_value= newValue;
                  return new_state;
                });
              },
            }}
            onSuggestionSelected={ (event, data) =>{
              addrow(pack_id,data.suggestion.id);
            }}
            onSuggestionsFetchRequested={
              (data)=>{
                var value = data.value;
                if (value.length > 1) {
                  Client.get('/rest/Item', { query: value, limit: 15 }, items => {
                    set_state((prev)=>{
                      var new_state=_.clone(prev);
                      new_state.auto_items=items.data;
                      new_state.auto_loading=false;
                      return new_state;
                    });
                  });
                }
              }
            }
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
        <PackItemEditNew open={useSelector((state) => state.parts.show_packitem_edit )} 
        packitem={useSelector((state) => state.parts.packitem)}
        bg={useSelector((state) => state.parts.bg)}
        onClose={()=>{
          dispatch(store.actions.SHOW_DLG_EDIT_PACKITEM({visible:false}))
        }} />
      </div>
    );
}

