import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../../constants/TodoFilters';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  button: {
    margin: theme.spacing(1.5),
  },
  input: {
    display: 'none',
  },
  padding: {
    padding: `0 ${theme.spacing(2)}px`,
  },
});
const FILTER_TITLES = {
  [SHOW_ALL]: '全部',
  [SHOW_ACTIVE]: '未办',
  [SHOW_COMPLETED]: '已办',
};
class Footer extends Component {
  state = {
    value: 0,
  };
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
  };

  renderTodoCount() {
    const { activeCount } = this.props;
    // const itemWord = activeCount === 1 ? '待办事项' : '待办事项'
    return (
      <Badge
        className={this.props.classes.margin}
        badgeContent={activeCount}
        color={activeCount > 0 ? 'secondary' : 'primary'}
      >
        <Typography className={this.props.classes.padding}>待办事项</Typography>
      </Badge>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { onShow } = this.props;

    return (
      <Button
        variant="outlined"
        className={this.props.classes.button}
        style={{ cursor: 'pointer' }}
        onClick={() => onShow(filter)}
      >
        {title}
      </Button>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <Button
          className={this.props.classes.button}
          variant="outlined"
          onClick={onClearCompleted}
        >
          清除已完成
        </Button>
      );
    }
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        {this.renderTodoCount()}
        {
          //   [ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
          //   <span key={filter}>
          //     {this.renderFilterLink(filter)}
          //   </span>
          // )
        }
        {this.renderClearButton()}
      </div>
    );
  }
}
export default withStyles(styles)(Footer);
