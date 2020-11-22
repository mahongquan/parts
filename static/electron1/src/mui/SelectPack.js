import React  from 'react';
import Client from './Client';
import AsyncSelect from 'react-select/async';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
        limit: 20,
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

export default class SelectItem extends React.Component{
  constructor(props){
    super();
    this.state={
      inputValue:""
      ,menuIsOpen:false
      ,colourOptions:[]
    }
  }
  onClick=()=>{
    this.setState({inputValue:"必备",menuIsOpen:true})
    Client.get(
      '/rest/Pack',
      {
        start: 0,
        limit: 20,
        search: "必备",
      },
      res => {
        if(res.success){
          this.setState({colourOptions:res.data});
        }
      }
    ,(error)=>{
      console.log(error);
    });
  }
  render() {
    return (
  <Grid container  spacing={1} style={{maxWidth:"400px"}}>      
    <Grid item xs={9}>
        <AsyncSelect  
              components={components}
              styles={styles}
              placeholder="Select Pack"
              defaultOptions={this.state.colourOptions}
              loadOptions={loadOptions}
              inputValue={this.state.inputValue}
              onInputChange={(inputValue,meta) => {
                console.log(inputValue);
                console.log(meta);
                this.setState({ inputValue:inputValue });
              }}
              menuIsOpen={this.state.menuIsOpen}
              onMenuOpen={() => this.setState({ menuIsOpen: true })}
              onMenuClose={() => this.setState({ menuIsOpen: false })}
              onChange={this.props.onChange}
        />
    </Grid>
    <Grid item xs={3}>
        <Button onClick={this.onClick} variant="outlined">必备</Button>
    </Grid>
</Grid>
    );
  }
}