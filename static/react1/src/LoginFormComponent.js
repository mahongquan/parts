import React from 'react';
var createReactClass = require('create-react-class');
var LoginFormComponent = createReactClass({
  getInitialState: function() {
    return {
      name: "mahongquan",
      pwd: "333333"
    };
  },
  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },
  handlePwdChange: function(e) {
    this.setState({
      pwd: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var data = {};
    data["username"] = this.state.name;
    data["password"] = this.state.pwd;
    this.props.onLoginSubmit(data);
    this.props.dlgclose();
  },
  handleCandel: function(e) {
    this.props.dlgclose();
  },
  render: function() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
      <table className="table-condensed">
        <tbody>
          <tr>
                <td>
                    <label>用户名:</label>
                </td>
                <td>
                    <input type="text" id="username"  value={this.state.name}
      onChange={this.handleNameChange}
      ></input>
                </td>
          </tr>
          <tr>
                <td>
                    <label>密码:</label>
                </td>
                <td>
                    <input type="text" id="password"  value={this.state.pwd}
      onChange={this.handlePwdChange}
      ></input>
                </td>
          </tr>
          <tr>
                <td>
                    <input type="submit" value="确定" />
                </td>
                <td>
                    <button onClick={this.handleCandel}>取消</button>
                </td>
          </tr>
        </tbody>
        </table>
        
      </form>
    );
  }
});

export default LoginFormComponent;