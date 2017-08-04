import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Client from './Client';
export default class UserComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            logined: false,
            user: "mahongquan",
            csrf_token: "",
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
    showlogin = () => {
        console.log("showlogin");
        Client.login("mahongquan", "333333", this.state.csrf_token, (data) => {
            this.setState({
                logined: true,
            });
            this.props.handleUserChange(this.state.user);
        });
    };
    handleLogin = () => {
        console.log("login");
        Client.login_index((data) => {
            console.log(data.csrf_token);
            this.setState({
                csrf_token: data.csrf_token, //.slice(0, MATCHING_ITEM_LIMIT),
            });
            const cookies = new Cookies();

            cookies.set('csrftoken', this.state.csrf_token, { path: '/' });
            this.showlogin();
        });

    };
    handleLogout = () => {
        console.log("logout");
        Client.logout((data) => {;
        });
        this.setState({
            logined: false,
        });
        this.props.handleUserChange(this.state.user);
    };
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return ( < div >
            < RaisedButton onTouchTap = { this.handleTouchTap }
            label = { this.state.user } >
            < span className = "caret" > < /span> < /RaisedButton> < Popover open = { this.state.open }
            anchorEl = { this.state.anchorEl }
            anchorOrigin = {
                { horizontal: 'left', vertical: 'bottom' } }
            targetOrigin = {
                { horizontal: 'left', vertical: 'top' } }
            onRequestClose = { this.handleRequestClose } >
            < Menu >
            < MenuItem primaryText = "登录"
            disabled = { this.state.logined }
            onTouchTap = { this.handleLogin }
            /> < MenuItem primaryText = "注销"
            disabled = {!this.state.logined }
            onTouchTap = { this.handleLogout }
            /> < /Menu> < /Popover> < /div>
        );
    }
}
export default UserComponent;
