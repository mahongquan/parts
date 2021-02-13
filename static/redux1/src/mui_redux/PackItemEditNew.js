import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import update from 'immutability-helper';
import Client from './Client';
import { useSelector, useDispatch } from 'react-redux';
var old={};
var parent=null;
var index=null;
export default function PackItemEditNew(props){
  console.log("PackItemEditNew==================");
  console.log(props);
  const [state, set_state] = React.useState({
    showModal: false,
    packitem: {},
    hiddenPacks: true,
    bg: {},
    date_open: false,
  });
  const close = () => {
    set_state({ showModal: false });
  };
  // var old={};
  // var index=null;
  // const open2 = idx => {
  //   set_state({ showModal: true, bg: {} });
  //   index = idx;
  //   if (index == null) {
  //     old = {};
  //   } else {
  //     old = useSelector((state) => state.parts.packitems)[index];
  //   }
  //   set_state({ packitem: old });
  // };
  const handleSave = data => {
    var url = '/rest/BothPackItem';
    console.log(state.packitem);
    Client.postOrPut(url, state.packitem, res => {
      console.log(res);
      set_state({ contact: res.data });
      parent.handlePackItemChange(index, res.data);
      old = res.data;
      close();
    });
  };
  const quehuoChange = e => {
    var quehuo = state.packitem.quehuo;
    quehuo = !quehuo;
    if (old.quehuo === quehuo) {
      const bg2 = update(state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      set_state({ bg: bg2 });
    } else {
      const bg2 = update(state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      set_state({ bg: bg2 });
    }
    const contact2 = update(state.packitem, { quehuo: { $set: quehuo } });
    console.log(contact2);
    set_state({ packitem: contact2 });
  };
  const handleChange = e => {
    console.log('change');
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    if (old[e.target.name] === e.target.value) {
      const bg2 = update(state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      //state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      set_state({ bg: bg2 });
    } else {
      const bg2 = update(state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      //state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      set_state({ bg: bg2 });
    }
    const contact2 = update(state.packitem, {
      [e.target.name]: { $set: e.target.value },
    });
    console.log(contact2);
    set_state({ packitem: contact2 });
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
                    defaultValue={state.packitem.id}
                  />
                </td>
              </tr>
              <tr>
                <td>名称:</td>
                <td>
                  <input
                    style={{ backgroundColor: state.bg.name }}
                    type="text"
                    id="name"
                    name="name"
                    value={state.packitem.name}
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
                    style={{ backgroundColor: state.bg.guige }}
                    type="text"
                    name="guige"
                    value={state.packitem.guige}
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
                    style={{ backgroundColor: state.bg.bh }}
                    type="text"
                    id="bh"
                    name="bh"
                    value={state.packitem.bh}
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
                    style={{ backgroundColor: state.bg.ct }}
                    id="ct"
                    name="ct"
                    value={state.packitem.ct}
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
                    style={{ backgroundColor: state.bg.danwei }}
                    id="danwei"
                    name="danwei"
                    value={state.packitem.danwei}
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
                    checked={state.packitem.quehuo}
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
