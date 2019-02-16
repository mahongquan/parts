import React from 'react';
import ReactDOM from 'react-dom';
import App from './mui/App';
import './autosuggest.css';
import 'react-datetime/css/react-datetime.css';
import myglobal from './myglobal';
// if (myglobal.api === 'models') {
//   let models = require('./data/models').default;
//   models.sequelize.sync().then(() => {
//     ReactDOM.render(<App models={models} />, document.getElementById('root'));
//   });
// }else {
ReactDOM.render(<App />, document.getElementById('root'));
// }
