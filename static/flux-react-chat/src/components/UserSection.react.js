var React           = require('react');
var UserStore       = require('../stores/UserStore');
var UserDescription = require('./UserDescription.react');
var userDescription = function(user) {
  return (
    <UserDescription
      user={user}
    />
  );
};

var getStateFromStores = function() {
  return {
    user: UserStore.getCurrentUser()
  };
};

class UserSection extends React.Component{
  state= getStateFromStores()

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }
  
  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <div className='panel-title'>User</div>
        </div>
        <div className='panel-body list-group'>
          {userDescription(this.state.user)}
        </div>
      </div>
    );
  }

  _onChange=()=>{
    this.setState(getStateFromStores());
  }
}

module.exports = UserSection;
