import React from 'react';
import Client from './Client';
import {
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
class LoginFormComponent extends React.Component {
  state = {
    users: [],
    pwd: '333333',
  };
  componentDidMount = () => {
    Client.cache_users((res)=>{
            this.setState({users:res});
    });
  };
  render = () => {
    const userMenu = this.state.users.map((user, idx) => (
      <Dropdown.Item  key={idx}
        onSelect={() =>{ this.props.onSelect(user.name);}}
      >
        {user.name}
      </Dropdown.Item>
    ));
    return (
      <DropdownButton
        variant="light"
        title={this.props.title||""}
        onClick={
          (e)=>{e.stopPropagation();}
        }
      >
        <Dropdown.Item onSelect={() => {this.props.onSelect("");}}>
          *
        </Dropdown.Item>
        {
          userMenu
        }
      </DropdownButton>
    );
  };
}
export default LoginFormComponent;
