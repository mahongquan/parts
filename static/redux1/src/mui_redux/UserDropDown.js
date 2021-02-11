import React from 'react';
// import Client from './Client';
import DropdownButton from './DropdownButton.js';
class LoginFormComponent extends React.Component {
  // state = {
  //   users: [],
  //   pwd: '333333',
  // };
  // componentDidMount = () => {
  //   Client.users((res)=>{
  //         // console.log(res);
  //         if(res.success){
  //           // console.log("set users");
  //           // console.log(this.state);
  //           this.setState({users:res.data});
  //         }
  //         else{
  //           console.log("not success")
  //         }
  //       });
  // };
  render = () => {
    console.log("userdropdown render")
    console.log(this.props);
    let userMenu;
    if(this.props.store.users.length>0){
      userMenu = this.props.store.users.map((user, idx) => (
        <span  key={idx}
          onClick={() =>{ this.props.onSelect(user.name);}}
        >
          {user.name}
        </span>
      ));
      userMenu.push(<span onClick={() => {this.props.onSelect("");}}>
          *
        </span>);
    }else
    {
      userMenu=<span onClick={() => {this.props.onSelect("");}}>
          *
        </span>;
    }
    return (
      <DropdownButton
        variant="light"
        title={this.props.title||""}
        onClick={
          (e)=>{e.stopPropagation();}
        }
      >
        {
          userMenu
        }
      </DropdownButton>
    );
  };
}
export default LoginFormComponent;
