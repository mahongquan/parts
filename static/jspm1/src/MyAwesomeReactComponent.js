import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class UserComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      logined:false,
      user:"mahongquan",
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton  onTouchTap={this.handleTouchTap}
          label={this.state.user}>
          <span className="caret"> </span>
        </RaisedButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="登录" hidden={this.state.logined} />
            <MenuItem primaryText="注销" hidden={!this.state.logined} />
          </Menu>
        </Popover>
      </div>
    );
  }
}