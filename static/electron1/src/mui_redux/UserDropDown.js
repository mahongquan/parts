import React from 'react';
import Client from './Client';
import { DropdownButton } from './DropdownButton';
class LoginFormComponent extends React.Component {
  state = {
    users: [],
    pwd: '333333',
  };
  componentDidMount = () => {
    Client.users((res) => {
      // console.log(res);
      if (res.success) {
        // console.log("set users");
        // console.log(this.state);
        this.setState({ users: res.data });
      } else {
        console.log('not success');
      }
    });
  };
  render = () => {
    const userMenu = this.state.users.map((user, idx) => (
      <span
        key={idx}
        onSelect={() => {
          this.props.onSelect(user.name);
        }}
      >
        {user.name}
      </span>
    ));
    return (
      <DropdownButton
        variant="light"
        title={this.props.title || ''}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span
          onSelect={() => {
            this.props.onSelect('');
          }}
        >
          *
        </span>
        {userMenu}
      </DropdownButton>
    );
  };
}
export default LoginFormComponent;
