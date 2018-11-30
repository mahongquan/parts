import React from 'react';
export default class CKEditor extends React.Component {
  constructor(props) {
    super(props);
    this.elementName = 'editor_' + this.props.id;
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    return <textarea name={this.elementName} defaultValue={this.props.value} />;
  }

  componentDidMount() {
    let configuration = {
      toolbar: 'Basic',
    };
    console.log(this.elementName);
    window.CKEDITOR.replace(this.elementName, configuration);
    console.log(window.CKEDITOR.instances[this.elementName]);
    window.CKEDITOR.instances[this.elementName].on(
      'change',
      function() {
        console('CKEditor change==');
        let data = window.CKEDITOR.instances[this.elementName].getData();
        this.props.onChange(data);
      }.bind(this)
    );
  }
  getdata = () => {
    return window.CKEDITOR.instances[this.elementName].getData();
  };
}
