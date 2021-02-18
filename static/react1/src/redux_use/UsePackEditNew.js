import React, { Component } from 'react';
import PackItems from './PackItems';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
export default function  UsePackEditNew(props){
  var usepack = useSelector((state) => state.parts.usepack);
    return (
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>编辑包</DialogTitle>
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
                    value={usepack.pack||""}
                  />
                </td>
                <td>
                  <label>名称:</label>
                </td>
                <td>
                  <label>{usepack.name||""}</label>
                </td>
              </tr>
            </tbody>
          </table>
          <PackItems/>
          <div style={{ minHeight: '200px' }} />
        </DialogContent>
      </Dialog>
    );
}
