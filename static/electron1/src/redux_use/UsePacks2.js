import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
import React from 'react';
import Client from './Client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import UsePackEditNew from './UsePackEditNew';
import Button from '@material-ui/core/Button';
import Autosuggest from 'react-autosuggest';
function UsePacks2(props) {
  const dispatch = useDispatch();
  var usepacks = useSelector((state) => state.parts.usepacks);
  const [state, setState] = React.useState({
    newPackName: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    release: true,
  });
  const auto_change = (data) => {
    var value = data.value;
    if (value.length > 1) {
      Client.get('/rest/Pack', { search: value, limit: 15 }, (items) => {
        setState({ auto_items: items.data });
      });
    }
  };
  const auto_select = (event, data) => {
    console.log('selected');
    console.log(data);
    addrow(data.suggestion.id);
    //setState({auto_value:value, auto_items: [ item ] })
  };
  const onSuggestionsClearRequested = () => {};
  const bibei = (id) => {
    setState({ auto_value: '必备' });
    console.log(auto1);
    auto1.current.input.click();
    //auto_change(null,"必备");
  };
  const fujia = (id) => {
    setState({ auto_value: '附加' });
    //auto_change(null,"必备");
  };
  const new_pack = (id) => {
    var url = '/rest/UsePackEx';
    var data = { name: state.newPackName, contact: props.contact_id };
    Client.postOrPut(url, data, (res) => {
      var p = res.data;
      const newFoods = state.usepacks.concat(p);
      setState({ usepacks: newFoods });
    });
  };
  const addrow = (pack_id) => {
    var url = '/rest/UsePack';
    var data = { contact: props.contact_id, pack: pack_id };
    Client.postOrPut(url, data, (res) => {
      var p = res.data;
      const newFoods = state.usepacks.concat(p);
      setState({ usepacks: newFoods });
    });
  };
  const newpackChange = (e) => {
    setState({ newPackName: e.target.value });
  };
  const onEditClick = (id) => {};
  const onDeleteClick = (itemIndex) => {
    var url = '/rest/UsePack';
    Client.delete1(url, { id: state.usepacks[itemIndex].id }, (res) => {
      const filteredFoods = state.usepacks.filter(
        (item, idx) => itemIndex !== idx
      );
      setState({ usepacks: filteredFoods });
    });
  };
  const handleEdit = (idx) => {
    //setState({currentIndex:idx,showModal:true});
    console.log(props.store.usepacks[idx]);
    props.store.actions.loadPackItem(props.store.usepacks[idx].pack);
    refs.edit1.open2(idx);
  };
  const getUsers = (input) => {
    console.log('getUsers');
    console.log(input);
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch('/rest/Pack?limit=10&search=' + input, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((json) => {
        var r = { options: json.data };
        console.log(r);
        return r;
      });
  };
  const onChange = (event, { newValue }) => {
    console.log('onChange======================');
    console.log(newValue);
    setState({
      auto_value: newValue,
    });
  };
  const onValueClick = (value) => {
    console.log(value);
  };

  const usepackRows = usepacks.map((usepack, idx) => (
    <TableRow key={idx}>
      <TableCell>{usepack.id}</TableCell>
      <TableCell>{usepack.name}</TableCell>
      <TableCell>
        <Button variant="outlined" onClick={() => handleEdit(idx)}>
          编辑
        </Button>
        <Button
          variant="outlined"
          onClick={() => onDeleteClick(idx)}
          style={{ marginLeft: '10px' }}
        >
          删除
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <UsePackEditNew title="编辑" />
      <Table responsive="true" bordered="true" condensed="true">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>名称</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{usepackRows}</TableBody>
      </Table>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>输入包:</label>
        <Autosuggest
          inputProps={{
            id: 'states-autocomplete',
            value: state.auto_value,
            onChange: onChange,
          }}
          onSuggestionSelected={auto_select}
          onSuggestionsFetchRequested={auto_change}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(item) => item.name}
          suggestions={state.auto_items}
          renderSuggestion={(item) => <span>{item.name}</span>}
        />
        <Button
          variant="outlined"
          style={{ margin: '10px 10px 10px 10px' }}
          className="btn"
          onClick={bibei}
        >
          必备
        </Button>
      </div>

      <div
        style={{
          margin: '10px 10px 10px 0px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <label>新包名称：</label>
        <input
          placeholder="新包"
          value={state.newPackName}
          onChange={newpackChange}
        />
        <Button
          variant="outlined"
          className="btn btn-primary"
          id="id_new_usepack"
          onClick={new_pack}
        >
          新包
        </Button>
      </div>
    </div>
  );
}
export default UsePacks2;
