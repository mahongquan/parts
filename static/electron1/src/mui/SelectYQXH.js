import React from 'react';

import CreatableSelect from 'react-select/creatable';
const options = [
  'CS-1011C',
  'CS-2800',
  'CS-3000',
  'CS-3000G',
  'HD-5',
  'N-3000',
  'O-3000',
  'OH-3000',
  'ON-3000',
  'ON-4000',
  'ONH-3000',
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
    this.setState({ value: newValue });
    if (newValue) this.props.onChange(newValue.label);
    else this.props.onChange(newValue);
  };
  handleCreate = (inputValue) => {
    this.setState({ isLoading: true });
    console.group('Option created');
    console.log('Wait a moment...');
    // setTimeout(() => {
    const { options } = this.state;
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    this.setState(
      {
        isLoading: false,
        options: [...options, newOption],
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
