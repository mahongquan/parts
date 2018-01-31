import React from 'react';
import TextField from 'material-ui/TextField';
export default class MyTextField extends TextField {
  constructor(props) {
        super(props);
        this.onChangeCallback=props.onChange;
        this.initValue=props.value;
        this.state = {
            value:props.value,
            bxbg:'#ffffff',
        };
  }
  handleChange = (e) => {
    var bg=null;
    if (e.target.value===this.initValue){
        bg='#ffffff';
    }
    else{
        bg='#8888ff'
    }
    this.setState({bxbg:bg,value:e.target.value});
    this.onChangeCallback(e);
  }
  render() {
    //console.log(contact);
    return (
        <TextField  value={this.state.value} name={this.props.name} id={this.props.id} onChange={this.handleChange}
            style={{
                      backgroundColor: this.state.bxbg,
                    }}
         />
    );
  }
}