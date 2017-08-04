import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
import React, { Component } from 'react';
var Konva = require('konva');
class MyRect extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        color: 'green',
        x:10,
        y:10,
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    }
    handleDragend(){
      console.log("onMouseover");
      console.info(this.refs.rect.x());
      this.setState({x:this.refs.rect.x(),y:this.refs.rect.y()});
    }
    render() {
        return (
            <Rect
                ref="rect"
                x={this.state.x} y={this.state.y} width={500} height={500}
                fill={this.state.color}
                shadowBlur={10}
                onClick={this.handleClick}
                onDragend={()=>this.handleDragend(this)}
                draggable={true}
                stroke='black'
                strokeWidth={8}
            />
        );
    }
}
class App extends Component {
    render(){
      return(
      <Stage width={900} height={900}>
        <Layer>
            <MyRect/>
        </Layer>
      </Stage>
    );
  }
}
export default App;