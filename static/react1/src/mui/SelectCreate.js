import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
const components={
  SingleValue:(props)=>{
    const { children, innerProps } = props;
    return (
      <div style={props.selectProps.style} {...innerProps}>
        {children}
      </div>
    );    
  }
};
export default class CreatableAdvanced extends Component{
  constructor(props){
    super();
    this.state={
      isLoading: false,
      options: defaultOptions,
      value: props.value,
    }
  }
  handleChange = (newValue, actionMeta) => {
    this.setState({ value: newValue });
    if(newValue) this.props.onChange(newValue.label);
    else this.props.onChange(newValue)
  };
  handleCreate = (inputValue) => {
    this.setState({ isLoading: true });
      const { options } = this.state;
      const newOption = createOption(inputValue);
      this.setState({
        isLoading: false,
        options: [...options, newOption],
      },()=>{
        this.handleChange(newOption,null);
      });
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
        options={this.props.options}
        placeholder={value}
        value={value}
      />
    );
  }
}