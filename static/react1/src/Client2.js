import queryString from 'querystring';
var _ = require('lodash');
const axios = require('axios');
axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  let regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookie中匹配 csrftoken值
  config.headers['X-CSRFToken'] =
    document.cookie.match(regex) === null
      ? null
      : document.cookie.match(regex)[1];
  return config;
});
let host = '';
if (window.myremote) {
  host = 'http://127.0.0.1:8000';
}

function getRaw(url, cb, err_callback) {
  // return myFetch("GET",url,undefined,cb,undefined,err_callback)
  axios
    .get(host + url)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      if (err_callback) {
        err_callback(error);
      } else {
        alert(error + '\n请检查服务器/刷新网页/登录');
      }
    });
}
function get(url, data, cb, err_callback) {
  url = url + '?' + queryString.stringify(data);
  console.log(url);
  return getRaw(url, cb, err_callback);
}
function delete1(url, data, cb) {
  // var method = 'DELETE';
  // return myFetch(method, url, JSON.stringify(data), cb);
  return delete2(url,data,cb)
}
function post(url, data, cb) {
  axios
    .post(host + url, data)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
        alert(error + '\n请检查服务器/刷新网页/登录');
    });
  // var method="POST"
  // return myFetch(method,url,JSON.stringify(data),cb)
}
function put(url, data, cb) {
  axios
    .put(host + url, data)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      alert(error + '\n请检查服务器/刷新网页/登录');
    });
  // var method="POST"
  // return myFetch(method,url,JSON.stringify(data),cb)
}
function delete2(url, data, cb) {
  axios
    .delete(host + url, {data:data})
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      alert(error + '\n请检查服务器/刷新网页/登录');
    });
  // var method="POST"
  // return myFetch(method,url,JSON.stringify(data),cb)
}

function postOrPut(url, data, cb) {
  if (data.id) {
    return put(url,data,cb)
  }
  else{
    return post(url,data,cb)
  }
}
function postForm(url, data, cb) {
  console.log(data);
  // var body = queryString.stringify(data);
  axios({
    method: 'post',
    url: host+url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      //console.log(error)
      alert(error + '\n请刷新网页/登录');
    });
}
function contacts(data, cb, err_callback) {
  //console.log(data);
  return get('/rest/Contact', data, cb, err_callback);
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
  //post form
  var payload = {
    username: username,
    password: password,
  };
  var body = queryString.stringify(payload);
  // return myFetch("POST","/rest/login",body,cb, {'Content-Type':'application/x-www-form-urlencoded'})
  let url =host+'/rest/login';
  axios({
    method: 'post',
    url: url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: body,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      alert(error + '\n请检查服务器/刷新网页/登录');
    });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
}

function parseJSON(response) {
  console.log(response);
  if (_.isObject(response.data)) {
    return response.data;
  } else {
    return JSON.parse(response.data);
  }
}
const Client = {
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
