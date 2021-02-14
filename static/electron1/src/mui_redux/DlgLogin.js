import React from 'react';
// import LoginFormComponent from './LoginFormComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// import Button from '@material-ui/core/Button';

class DlgLogin extends React.Component {
  state = {
    showModal: false,
    name: '马红权',
    pwd: '333333',
  };
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlePwdChange = (e) => {
    this.setState({
      pwd: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var data = {};
    data['username'] = this.state.name;
    data['password'] = this.state.pwd;
    this.props.onLoginSubmit(data);
    this.props.handleClose();
  };
  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };
  // onLoginSubmit=(data)=>  {
  //   this.props.onLoginSubmit(data);
  // }
  render() {
    return (
      <Dialog open={this.props.showModal} onClose={this.props.handleClose}>
        <DialogTitle>{this.props.title || ' '}</DialogTitle>
        <DialogContent>
          <table className="table-condensed">
            <tbody>
              <tr>
                <td>
                  <label>用户名:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="username"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>密码:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="password"
                    value={this.state.pwd}
                    onChange={this.handlePwdChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <button onClick={this.handleSubmit}>确定</button>
          <button onClick={this.props.handleClose}>取消</button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default DlgLogin;
