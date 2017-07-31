/* eslint-disable no-undef */
import queryString from 'query-string';
function getRaw(url,cb) {
  var method="GET";
  return fetch(url,
  {
      method: method,
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function get(url,data,cb) {
  var method="GET";
  url=url+"?"+queryString.stringify(data)
  return fetch(url,
  {
      method: method,
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function delete1(url,data,cb) {
  var method="DELETE";
  return fetch(url,
  {
      method: method,
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function post(url,data,cb) {
  var method="POST"
  return fetch(url,
  {
      method: method,
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function postOrPut(url,data,cb) {
  var method="POST"
  if (data.id){
    method="PUT"
  }
  return fetch(url,
  {
      method: method,
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function postForm(url,data,cb) {
  var method="POST"
  return fetch(url,
  {
      method: method,
      credentials: 'include',
      body: data
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function contacts(data, cb) {
  var query=queryString.stringify(data)
  return fetch(`/rest/Contact?${query}`, {
    credentials: 'include',
    'Content-Type': 'application/json',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function UsePacks(query, cb) {
  return fetch(`/rest/UsePack?contact=${query}`, {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function PackItems(query, cb) {
  return fetch(`/rest/PackItem?pack=${query}&limit=200`, {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function items(query, cb) {
  return fetch(`/rest/Item?search=${query}`, {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function login_index( cb) {
  return fetch('/rest/login_index', {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function logout( cb) {
  return fetch('/rest/logout', {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function login(username,password,cb) {
  var payload = {
    username: username,
    password: password,
  };
  return fetch("/rest/login",
  {
      method: "POST",
      credentials: 'include',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify( payload )
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  console.log("parse");
  console.log(response.body);
  var r= response.json();
  return r;
}

const Client = {getRaw,contacts,items,login_index,login,logout,UsePacks,PackItems,get,post,postOrPut,delete1,postForm};
export default Client;
