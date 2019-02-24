/////////////
let host = '';

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

function queryString_stringify(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).filter(Boolean).join(sep);

  }

  if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
};

function myFetch(method, url, body, cb, headers2, err_callback) {
  let data;
  let headers;
  if (headers2) {
    headers = headers2;
  } else {
    headers = { 'Content-Type': 'application/json' };
  }
  if (method === 'GET') {
    data = {
      method: method,
      credentials: 'include',
      headers: headers,
    };
  } else {
    data = {
      method: method,
      credentials: 'include',
      headers: headers,
      body: body,
    };
  }
  return fetch(host + url, data)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => {
      if (err_callback) err_callback(error);
      else alert(error + '\n请检查服务器/刷新网页/登录');
    });
}
function getRaw(url, cb, err_callback) {
  return myFetch('GET', url, undefined, cb, undefined, err_callback);
}
function get(url, data, cb, err_callback) {
  url = url + '?' + queryString_stringify(data);
  console.log(url);
  return getRaw(url, cb, err_callback);
}
function delete1(url, data, cb) {
  var method = 'DELETE';
  return myFetch(method, url, JSON.stringify(data), cb);
}
function post(url, data, cb) {
  var method = 'POST';
  return myFetch(method, url, JSON.stringify(data), cb);
}
function postOrPut(url, data, cb) {
  var method = 'POST';
  if (data.id) {
    method = 'PUT';
  }
  return myFetch(method, url, JSON.stringify(data), cb);
}
function postForm(url, data, cb) {
  var method = 'POST';
  return fetch(url, {
    method: method,
    credentials: 'include',
    body: data,
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
  return myFetch('POST', '/rest/login', body, cb, {
    'Content-Type': 'application/x-www-form-urlencoded',
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
  var r = response.json();
  return r;
}
const Client = {
  init: (m, callback) => {
    callback();
  },
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
