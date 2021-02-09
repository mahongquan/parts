import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
const options = ['CS-1011C',
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

const defaultOptions=options.map((one)=>{
  return createOption(one);
});
export default class CreatableAdvanced extends Component{
  state = {
    isLoading: false,
    options: defaultOptions,
    value: "CS-2800",
  };
  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value: newValue });
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
      this.setState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption,
      });
    // }, 1000);
  };
  render() {
    const { isLoading, options, value } = this.state;
    return (
      <CreatableSelect
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