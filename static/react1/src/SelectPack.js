import React, { Component } from 'react';
import Client from './Client';
import AsyncSelect from 'react-select/async';
const styles={
 container:(provided,state)=>{
  return{
    ...provided,
    minWidth:"200px",
    maxWidth:"300px",
  }
 },
};
const components={
  Option: (props) => {
    // console.log(props);
    return (
      <div {...props.innerProps} style={{ backgroundColor:props.isFocused?"#ddd":"#fff"}}>
        {props.data.name}{props.children}
      </div>
    );
  },
  SingleValue:(props)=>{
    const { children, innerProps } = props;
    return (
      <div {...innerProps}>
        {props.data.name} {children}
      </div>
    );    
  }
};
const loadOptions = (inputValue, callback) => {
  Client.get(
      '/rest/Pack',
      {
        start: 0,
        limit: 10,
        search: inputValue,
      },
      res => {
        if(res.success){
          callback(res.data);  
        }
      }
    ,(error)=>{
      console.log(error);
    });
};

export default class SelectItem extends Component{
  render() {
    return (
        <AsyncSelect  
              components={components}
              styles={styles}
              placeholder="Select Pack"
              loadOptions={loadOptions}
              clearable={false}
              onChange={this.props.onChange}
            />
    );
  }
}