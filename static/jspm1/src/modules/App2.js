import React from 'react'
import App  from './App'
import About from './About'
import Repos from './Repos'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)
class App2 extends React.Component {
	render=()=>{
		// return (
		//   <Router>
		//     <Route path="/" component={App}/>
		//     <Route path="/repos" component={Repos}/>
		//     <Route path="/about" component={About}/>
		//   </Router>
		// );
		return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
            <li><Link to="/repos">repos</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
          <Route path="/repos" component={Repos}/>
        </div>
      </Router>
    );
	}
}
export default App2;
