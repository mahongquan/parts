var LoginFormComponent = React.createClass({
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
    data["csrfmiddlewaretoken"] = {
      csrf_token
    };
    this.props.onLoginSubmit(data);
  },
  render: function() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
      <table class="table-condensed">
        <tbody>
        <tr >
                <td>
                    <label>csrfmiddlewaretoken:</label>
                </td>
                <td>
                    <input type="text" id="csrfmiddlewaretoken"  defaultValue={csrf_token}
      ></input>
                </td>
          </tr>
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
        </tbody>
        </table>
        <input type="submit" value="save" />
      </form>
    );
  }
});