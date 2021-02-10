import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: '全部',
  [SHOW_ACTIVE]: '未完成',
  [SHOW_COMPLETED]: '已完成',
};

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
  };

  renderTodoCount() {
    const { activeCount } = this.props;
    // const itemWord = activeCount === 1 ? '' : ''

    return (
      <span className="todo-count">
        <strong>{activeCount + '件' || '无'}</strong>待办
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <Button
        className={classnames({ selected: filter === selectedFilter })}
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
        <Button className="clear-completed" onClick={onClearCompleted}>
          清除已完成
        </Button>
      );
    }
  }

  render() {
    return (
      <div>
        <style jsx="true">{`
          .footer {
            color: #777;
            padding: 10px 15px;
            height: 20px;
            text-align: center;
            border-top: 1px solid #e6e6e6;
          }

          .footer:before {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 50px;
            overflow: hidden;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
              0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
              0 17px 2px -6px rgba(0, 0, 0, 0.2);
          }
          .todo-count {
            float: left;
            text-align: left;
          }

          .todo-count strong {
            font-weight: 300;
          }

          .filters {
            margin: 0;
            padding: 0;
            list-style: none;
            position: absolute;
            right: 0;
            left: 0;
          }

          .filters li {
            display: inline;
          }

          .filters li a {
            color: inherit;
            margin: 3px;
            padding: 3px 7px;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 3px;
          }

          .filters li a:hover {
            border-color: rgba(175, 47, 47, 0.1);
          }

          .filters li a.selected {
            border-color: rgba(175, 47, 47, 0.2);
          }

          .clear-completed,
          html .clear-completed:active {
            float: right;
            position: relative;
            line-height: 20px;
            text-decoration: none;
            cursor: pointer;
          }

          .clear-completed:hover {
            text-decoration: underline;
          }
        `}</style>
        <footer className="footer">
          {this.renderTodoCount()}
          <ul className="filters">
            {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter => (
              <li key={filter}>{this.renderFilterLink(filter)}</li>
            ))}
          </ul>
          {this.renderClearButton()}
        </footer>
      </div>
    );
  }
}
