import React from 'react';
import Creatable from 'react-select/creatable';
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
let options2=options.map((one)=>{
  return{label:one};
});
export default class App extends React.Component {
  constructor(){
    super();
    this.state={inputValue:"ON-4000"};
  }
  handleChange = selectedOption => {
    console.log(selectedOption);
    this.setState({inputValue:selectedOption.label});
  };
  render() {
    return (
      <Creatable
        isClearable
        inputValue={this.state.inputValue}
        onChange={this.handleChange}
        options={options2}
      />
    );
  }
}