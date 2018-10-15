/////////////
import queryString from 'querystring';
let host=""
if(window.myremote){
  host="http://127.0.0.1:8000"
}
function myFetch(method,url,body,cb,headers2,err_callback) {
  let data;
  let headers;
  if (headers2)
  {
    headers=headers2;
  }
  else{
   headers=  {'Content-Type':'application/json'}
  }
  if(method==="GET")
  {
    data={
      method: method,
      credentials: 'include',
      headers: headers,
    }
  }
  else{
    data={
      method: method,
      credentials: 'include',
      headers: headers,
      body: body
    }
  }
  return fetch(host+url,data
  ).then(checkStatus)
    .then(parseJSON)
    .then(cb).catch((error) => {
      if(err_callback) err_callback(error);
      else
        alert(error+"\n请检查服务器/刷新网页/登录");
    });
}
function getRaw(url,cb,err_callback) {
  return myFetch("GET",url,undefined,cb,undefined,err_callback)
}
function get(url,data,cb,err_callback) {
  url=url+"?"+queryString.stringify(data)
  console.log(url);
  return getRaw(url,cb,err_callback)
}
function delete1(url,data,cb) {
  var method="DELETE";
  return myFetch(method,url,JSON.stringify(data),cb)
}
function post(url,data,cb) {
  var method="POST"
  return myFetch(method,url,JSON.stringify(data),cb)
}
function postOrPut(url,data,cb) {
  var method="POST"
  if (data.id){
    method="PUT"
  }
  return myFetch(method,url,JSON.stringify(data),cb)
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
    .then(cb).catch((error) => {
      //console.log(error)
      alert(error+"\n请刷新网页/登录");
    });
}
function contacts(data, cb,err_callback) {
  //console.log(data);
  return get("/rest/Contact",data,cb,err_callback)
}
function UsePacks(query, cb) {
  var data={contact:query}
  return get("/rest/UsePack",data,cb)
}
function PackItems(query, cb) {
  var data={pack:query}
  return get("/rest/PackItem",data,cb)
}
function items(query, cb) {
  var data={search:query}
  return get("/rest/Item",data,cb)
}
function login_index( cb) {
  return get("/rest/login",undefined,cb) 
}
function logout( cb) {
 return get("/rest/logout",undefined,cb) 
}

function login(username,password,cb) {//post form
  var payload = {
    username: username,
    password: password,
  };
  var body= queryString.stringify( payload )
  return myFetch("POST","/rest/login",body,cb, {'Content-Type':'application/x-www-form-urlencoded'})
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
  //console.log("parse");
  //window.response=response;
  //for var i in response.headers.entries();
  //console.log(response);
  // console.log(response.headers.get("content-type"));
  // if(response.headers.get("content-type")==="text/html; charset=utf-8")
  // {
  //   const error = new Error("无效响应");
  //   //alert("\n请登录")
  //   throw error;
  // }
  // else{
    var r= response.json();
    return r;
  //}
}
const Client = {getRaw,contacts,items,login_index,login,logout,UsePacks,PackItems,get,post,postOrPut,delete1,postForm};
export default Client;
