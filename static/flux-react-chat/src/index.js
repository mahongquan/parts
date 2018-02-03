import ReactDOM from 'react-dom';
import  Items     from './Items';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import  React   from 'react';
import ItemEdit from './ItemEdit';
class App extends React.Component {
	render=()=>{
		return(<div><ItemEdit ref="dlg" parent={this} /><Items /><Items /></div>);
	}
}
ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
