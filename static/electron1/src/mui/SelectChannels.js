import React from 'react';

import CreatableSelect from 'react-select/creatable';
const options = [
  '1O(低氧)',
  '1O(高氧)',
  '1O(低氧)+2N',
  '1C(低碳)+2S',
  '1C(高碳)+2S',
  '2C+1S(低硫)',
  '2C+1S(高硫)',
  '2C+2S',
  '2O+2N',
  '2O',
];

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = options.map((one) => {
  return createOption(one);
});
const components = {
  SingleValue: (props) => {
    const { children, innerProps } = props;
    // console.log(props);
    return (
      <div style={props.selectProps.style} {...innerProps}>
        {children}
      </div>
    );
  },
};
export default class CreatableAdvanced extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: false,
      options: defaultOptions,
      value: props.value,
    };
  }
  handleChange = (newValue, actionMeta) => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
    this.setState({ value: newValue });
    if (newValue) this.props.onChange(newValue.label);
    else this.props.onChange(newValue);
  };
  handleCreate = (inputValue) => {
    this.setState({ isLoading: true });
    // console.group('Option created');
    // console.log('Wait a moment...');
    // setTimeout(() => {
    const { options } = this.state;
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    this.setState(
      {
        isLoading: false,
        options: [...options, newOption],
        value: newOption.label,
      },
      () => {
        this.handleChange(newOption, null);
      }
    );
    // }, 1000);
  };
  render() {
    const { isLoading, options, value } = this.state;
    return (
      <CreatableSelect
        components={components}
        style={this.props.style}
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={options}
        placeholder={value}
        value={value}
      />
    );
  }
}
