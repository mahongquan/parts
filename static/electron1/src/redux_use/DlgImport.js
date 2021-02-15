import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Client from './Client';
import update from 'immutability-helper';
export default function DlgImport(props) {
  // const dispatch = useDispatch();
  const ref = React.useRef();
  const [error, set_error] = React.useState('');
  const [info, set_info] = React.useState('');
  const [alert, set_alert] = React.useState(false);
  let packs = useSelector((state) => state.parts.packs);
  const contactRows = packs.map((pack, idx) => (
    <tr key={idx}>
      <td>{pack.id}</td>
      <td>{pack.name}</td>
    </tr>
  ));
  return (
    <Dialog open={props.showModal} onClose={props.handleClose}>
      <DialogTitle>导入标样</DialogTitle>
      <DialogContent>
        <form encType="multipart/form-data">
          <input
            style={{ margin: '10px 10px 10px 10px' }}
            id="file"
            accept="application/vnd.ms-excel"
            type="file"
            name="file"
            ref={ref}
            onChange={() => {
              set_alert(false);
            }}
          />
          <Button
            style={{ margin: '10px 10px 10px 10px' }}
            variant="outlined"
            onClick={() => {
              console.log(ref.current);
              const file = ref.current.files[0];
              console.log(file);
              var data1 = new FormData();
              data1.append('file', file);
              //console.log(data1)
              Client.postForm(
                '/rest/standard',
                data1,
                (res) => {
                  if (res.result.length > 0) {
                    console.log(res.result);
                  }
                  set_alert(true);
                  set_info('导入了' + res.result.length + '个合同的标钢。');
                },
                (err) => {
                  console.log(err);
                  set_error('' + err);
                }
              );
            }}
          >
            上传
          </Button>
        </form>
        <div style={{ minHeight: '200px' }}>
          <table border={1}>
            <thead>
              <tr>
                <td>ID</td>
                <td>名称</td>
              </tr>
            </thead>
            <tbody>{contactRows}</tbody>
          </table>
        </div>
        <div>
          {alert}
          {info}
          {error}
        </div>
      </DialogContent>
    </Dialog>
  );
}
