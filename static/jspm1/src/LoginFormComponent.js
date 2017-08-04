import React from 'react';
class LoginFormComponent extends React.Component{
  constructor() {
    super();
    this.state={
        name: "mahongquan",
        pwd: "333333"
    }
  }
  handleNameChange(e){
    this.setState({
      name: e.target.value
    });
  }
  handlePwdChange(e){
    this.setState({
      pwd: e.target.value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    var data = {};
    data["username"] = this.state.name;
    data["password"] = this.state.pwd;
    this.props.onLoginSubmit(data);
    this.props.dlgclose();
  }
  handleCandel(e){
    e.preventDefault();
    //console.log(e);
    //console.log(this.props.dlgclose)
    this.props.dlgclose();
  }
  render(){
    return (
      <form className="loginForm" onSubmit={(e)=>this.handleSubmit(e)}>
      <table className="table-condensed">
        <tbody>
          <tr>
                <td>
                    <label>用户名:</label>
                </td>
                <td>
                    <input type="text" id="username"  value={this.state.name}
      onChange={(e)=>this.handleNameChange(e)}
      ></input>
                </td>
          </tr>
          <tr>
                <td>
                    <label>密码:</label>
                </td>
                <td>
                    <input type="text" id="password"  value={this.state.pwd}
      onChange={(e)=>this.handlePwdChange(e)}
      ></input>
                </td>
          </tr>
          <tr>
                <td>
                    <input type="submit" value="确定" />
                </td>
                <td>
                    <button onClick={(e)=>this.handleCandel(e)}>取消</button>
                </td>
          </tr>
        </tbody>
        </table>
        
      </form>
    );
  }
}
export default LoginFormComponent;