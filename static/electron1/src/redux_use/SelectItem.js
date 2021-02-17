import React from 'react';
import Client from './Client';
import AsyncSelect from 'react-select/async';
const styles = {
  container: (provided, state) => {
    return {
      ...provided,
      minWidth: '200px',
      maxWidth: '300px',
    };
  },
};
const components = {
  Option: (props) => {
    // console.log(props);
    return (
      <div
        {...props.innerProps}
        style={{ backgroundColor: props.isFocused ? '#ddd' : '#fff' }}
      >
        {props.data.name}
        {props.children}
      </div>
    );
  },
  SingleValue: (props) => {
    const { children, innerProps } = props;
    return (
      <div {...innerProps}>
        {props.data.name} {children}
      </div>
    );
  },
};
const loadOptions = (inputValue, callback) => {
  console.log(inputValue);
  Client.get(
    '/rest/Item',
    {
      start: 0,
      limit: 20,
      query: inputValue,
    },
    (res) => {
      console.log(res);
      callback(res.data);
    },
    (error) => {
      console.log(error);
    }
  );
};

export default class WithCallbacks extends React.Component {
  render() {
    return (
      <AsyncSelect
        components={components}
        styles={styles}
        placeholder="Select item"
        loadOptions={loadOptions}
        onChange={this.props.onChange}
        isClearable
      />
    );
  }
}
