var React  = require('react');
var PropTypes = require('prop-types');
class UserDescription  extends React.Component{
  static propTypes={
    user: PropTypes.object.isRequired
  }
  render() {
    return (
      <div>
        <img alt="user img" src={this.props.user.img} />
        <h3>Name</h3>
        {this.props.user.name}
      </div>
    );
  }
}

module.exports = UserDescription;
