var socket = require('./data/seq2');
function init(models, cb) {
  socket.init(cb);
}
function getRaw(url, cb, err_callback) {
  console.log(url);
  let un_url = unescape(url);
  console.log(un_url);
  let wds = un_url.split('/');
  let paras = wds[2].split('?');
  url = '/get/' + paras[0];
  let ps = paras[1].split('&');
  let data = {};
  for (var i = 0; i < ps.length; i++) {
    let pp = ps[i].split('=');
    data[pp[0]] = pp[1];
  }
  socket.emit(url, data, cb);
}
function get(url, data, cb, err_callback) {
  let wds = url.split('/');
  let paras = wds[2].split('?');
  url = '/get/' + paras[0];
  socket.emit(url, data, cb);
}
function post(url, data, cb, err_callback) {
  let wds = url.split('/');
  let paras = wds[2].split('?');
  url = '/post/' + paras[0];
  socket.emit(url, data, cb);
}
function put(url, data, cb, err_callback) {
  let wds = url.split('/');
  let paras = wds[2].split('?');
  url = '/put/' + paras[0];
  socket.emit(url, data, cb);
}
function sql(cmd, cb) {
  socket.emit('/sql', cmd, cb);
}
function delete1(url, data, cb, err_callback) {
  let wds = url.split('/');
  let paras = wds[2].split('?');
  url = '/delete/' + paras[0];
  socket.emit(url, data, cb);
}
function postOrPut(url, data, cb) {
  var method = 'POST';
  if (data.id) {
    put(url, data, cb);
  } else {
    post(url, data, cb);
  }
}
function postForm(url, data, cb) {
  post(url, data, cb);
}
function contacts(data, cb, err_callback) {
  socket.emit('/get/Contact', data, cb); //,err_callback)
}
function UsePacks(query, cb) {
  var data = { contact: query };
  return get('/rest/UsePack', data, cb);
}
function PackItems(query, cb) {
  var data = { pack: query };
  return get('/rest/PackItem', data, cb);
}
function items(query, cb) {
  var data = { search: query };
  return get('/rest/Item', data, cb);
}
function login_index(cb) {
  return get('/rest/login', undefined, cb);
}
function logout(cb) {
  return get('/rest/logout', undefined, cb);
}
function login(username, password, cb) {
  var payload = {
    username: username,
    password: password,
  };
  return post('/rest/login', payload, cb);
}
const Client = {
  sql,
  init,
  getRaw,
  contacts,
  items,
  login_index,
  login,
  logout,
  UsePacks,
  PackItems,
  get,
  post,
  postOrPut,
  delete1,
  postForm,
};
export default Client;
