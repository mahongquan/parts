import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import update from 'immutability-helper';
import Client from './Client';
import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
export default function PackItemEditNew(props) {
  const dispatch = useDispatch();
  console.log(props);
  const handleSave = () => {
    // dispatch(store.actions.PackItemEdit_SAVE());
    dispatch(store.savePackItemEdit(props.packitem));
  };
  const quehuoChange = (e) => {
    dispatch(
      store.actions.PackItemEdit_QUE_CHANGE({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };
  const handleChange = (e) => {
    dispatch(
      store.actions.PackItemEdit_CHANGE({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>编辑备件信息</DialogTitle>
      <DialogContent>
        <table id="table_input" className="table-condensed">
          <tbody>
            <tr>
              <td>ID:</td>
              <td>
                <input
                  type="text"
                  id="id"
                  name="id"
                  readOnly={true}
                  disabled="disabled"
                  value={props.packitem.id || ''}
                />
              </td>
            </tr>
            <tr>
              <td>名称:</td>
              <td>
                <input
                  style={{ backgroundColor: props.bg.name }}
                  type="text"
                  id="name"
                  name="name"
                  value={props.packitem.name || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>规格:</label>
              </td>
              <td>
                <input
                  style={{ backgroundColor: props.bg.guige }}
                  type="text"
                  name="guige"
                  value={props.packitem.guige || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>编号:</label>
              </td>
              <td>
                <input
                  style={{ backgroundColor: props.bg.bh }}
                  type="text"
                  id="bh"
                  name="bh"
                  value={props.packitem.bh || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>数量:</label>
              </td>
              <td>
                <input
                  type="text"
                  style={{ backgroundColor: props.bg.ct }}
                  id="ct"
                  name="ct"
                  value={props.packitem.ct || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>单位:</label>
              </td>
              <td>
                <input
                  type="text"
                  style={{ backgroundColor: props.bg.danwei }}
                  id="danwei"
                  name="danwei"
                  value={props.packitem.danwei || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>缺货:</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  id="quehuo"
                  name="quehuo"
                  checked={props.packitem.quehuo || ''}
                  onChange={quehuoChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <Button
            variant="outlined"
            color="primary"
            id="bt_save"
            onClick={handleSave}
          >
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
