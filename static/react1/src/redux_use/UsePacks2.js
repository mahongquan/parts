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
import SelectPack from './SelectPack';
export default function UsePacks2(props) {
  const dispatch = useDispatch();
  var contact = useSelector((state) => state.parts.contact);
  var usepacks = useSelector((state) => state.parts.usepacks);
  const [state, setState] = React.useState({
    newPackName: '',
  });
  const new_pack = (id) => {
    var url = '/rest/UsePackEx';
    var data = { name: state.newPackName, contact: contact.id };
    Client.postOrPut(url, data, (res) => {
      var p = res.data;
      const newFoods = state.usepacks.concat(p);
      setState({ usepacks: newFoods });
    });
  };
  const addrow = (pack_id) => {
    var data = { contact: contact.id, pack: pack_id };
    dispatch(store.addUsePack(data));
  };
  const newpackChange = (e) => {
    setState({ newPackName: e.target.value });
  };
  const usepackRows = usepacks.map((usepack, idx) => {
    console.log(usepack);
    return (<TableRow key={idx}>
      <TableCell>{usepack.id}</TableCell>
      <TableCell>{usepack.name}</TableCell>
      <TableCell>
        <Button variant="outlined" onClick={() =>{
            dispatch(store.editUsePack(idx,usepack.pack));
          }}>
          编辑
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
                dispatch(store.deleteUsePack(idx, usepack.id));
          }}
          style={{ marginLeft: '10px' }}
        >
          删除
        </Button>
      </TableCell>
    </TableRow>);
  });

  return (
    <div>
      <UsePackEditNew title="编辑" 
      open={useSelector((state) => state.parts.show_usepack_edit)} 
      onClose={()=>{
        dispatch(store.actions.SHOW_DLG_EDIT_USEPACK({visible:false}));
      }}/>
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
        <SelectPack onChange={(data) => {
          // console.log('selected');
          if(data!=null)   addrow(data.id);
        }} />
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

