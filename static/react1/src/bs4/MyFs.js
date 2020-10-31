import Client from './Client';
function emit(url, data, cb) {
  Client.get(url, data, cb, null);
}
let v={ emit: emit }
export default v;