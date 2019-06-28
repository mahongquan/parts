import Client from './Client';
function emit(url, data, cb) {
  Client.get(url, data, cb, null);
}
export default { emit: emit };