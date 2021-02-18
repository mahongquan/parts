import React from 'react';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import FormGroup from '@material-ui/core/FormGroup';
// import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles(theme => ({
//   link: {
//     margin: theme.spacing(1),
//   },
// }));
let _ = require('lodash');
export default class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (value) => {
    this.setState({ anchorEl: null });
    // this.props.click_menu(value);
  };

  render() {
    // const classes = useStyles();
    const { anchorEl } = this.state;
    // console.log(this.props.children);
    let cs;
    if (_.isArray(this.props.children)) {
      cs = this.props.children.map((c, idx) => {
        // console.log(c);
        return (
          <MenuItem
            key={idx}
            onClick={() => {
              c.props.onClick();
              this.setState({ anchorEl: null });
            }}
          >
            {c.props.children}
          </MenuItem>
        );
      });
    } else {
      cs = (
        <MenuItem
          onClick={() => {
            this.props.children.props.onClick();
            this.setState({ anchorEl: null });
          }}
        >
          {this.props.children.props.children}
        </MenuItem>
      );
    }
    return (
      <div>
        <div>
          <Link onClick={this.props.click_title}>{this.props.title}</Link>
          <ArrowDropDownIcon onClick={this.handleClick} />
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {cs}
        </Menu>
      </div>
    );
  }
}
