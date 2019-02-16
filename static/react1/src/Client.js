import myglobal from './myglobal';
let Client;
if (myglobal.api === 'models') {
  Client = require('./Client_models').default;
} else if (myglobal.api === 'seq') {
  Client = require('./Client_seq').default;
} else
if (myglobal.api === 'socketio') {
  Client = require('./Client_socketio').default;
}
if (myglobal.api === 'axios') {
  Client = require('./Client_axios').default;
}
export default Client;
