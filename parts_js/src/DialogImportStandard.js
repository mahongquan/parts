import React from 'react';
import Dialog from '@material-ui/core/Dialog';
//import FlatButton from 'material-ui/FlatButton';
import Button from '@material-ui/core/Button';
import LoginFormComponent from "./LoginFormComponent";
//import MenuItem from 'material-ui/MenuItem';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogImportStandard extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  onLoginSubmit= (data) => {
    this.props.onLoginSubmit(data);
  };
  render() {
    // const actions = [
    //   <FlatButton
    //     label="Cancel"
    //     primary={true}
    //     onTouchTap={this.handleClose}
    //   />,
    //   <FlatButton
    //     label="Submit"
    //     primary={true}
    //     keyboardFocused={true}
    //     onTouchTap={this.handleClose}
    //   />,
    // ];

    return (
      <div>
        <Button  onClick={this.handleOpen} >{this.props.title}</Button>
        <Dialog
          title={this.props.title}
          modal={"false"}
          open={this.state.open}
        >
          <LoginFormComponent onLoginSubmit={this.onLoginSubmit} dlgclose={this.handleClose}/>
        </Dialog>
      </div>
    );
  }
}