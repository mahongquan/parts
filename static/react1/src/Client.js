/* eslint-disable no-undef */
// function myFetch(url) {
//   return fetch(url).then(res => {
//     if (res.ok) {
//       return res.json();
//     } else {      
//       throw `${res.status}, ${res.statusText}`;
//     }
//   })
//   .then(json => {
//     return json;
//   })
//   .catch(err => {
//     throw err;
//   });
// }
// 调用 myFetch 代码

// meFetch(url)
// .then((data) => {
//   // 处理正确返回的数据
// })
// .catch((error) => {
//   // 处理错误
// });
// 也可以用 Promise 包装下 fetch，代码看起来可能更简单点：

// function myFetch(url) {
//   return new Promise((resolve, reject) => {
//     fetch(url).then(res => {
//       if (res.ok) {
//         return res.json();
//       } else {      
//         throw `${res.status}, ${res.statusText}`;
//       }
//     })
//     .then(json => {
//       resolve(json);
//     })
//     .catch(err => {
//       reject(err);
//     });
//   });
// }
/////////////
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
function failFetch(){
  console.log("failFetch");
}

function contacts(data, cb) {
  var query=queryString.stringify(data)
  return fetch(`/rest/Contact?${query}`, {
    credentials: 'include',
    'Content-Type': 'application/json',
    accept: 'application/json',
  }).then(checkStatus2,failFetch)
    .then(parseJSON2)
    .then(cb);
}
function checkStatus2(response){
  try{
    return checkStatus(response);
  }
  catch(e){
    alert(e);
  } 
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
  // console.log(error); // eslint-disable-line no-console
  //alert("请刷新网页")
  throw error;
}

function parseJSON(response) {
  console.log("parse");
  //window.response=response;
  //for var i in response.headers.entries();
  console.log(response);
  console.log(response.headers.get("content-type"));
  if(response.headers.get("content-type")==="text/html; charset=utf-8")
  {
    const error = new Error("无效响应");
    alert("\n请登录")
    throw error;
  }
  else{
    var r= response.json();
    return r;
  }
}
function parseJSON2(response) {
  try{
    return parseJSON(response);
  }
  catch(e){

  }
}

const Client = {getRaw,contacts,items,login_index,login,logout,UsePacks,PackItems,get,post,postOrPut,delete1,postForm};
export default Client;
