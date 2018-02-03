import  React   from 'react';
import Items from './Items';
import ItemEdit from './ItemEdit';
export default class App extends React.Component {
	render=()=>{
		return(<div><ItemEdit ref="dlg" parent={this} /><Items /></div>);
	}
}