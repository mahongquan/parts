import myglobal from './myglobal';
// if(window.require){
//   var runServer=require('./requestServer').runServer
// }
var queryString=require('querystring');
const request1 = require('request');
var request = request1.defaults({jar: true})
let cookies={};
let host = '';
let response_html="";
host = 'http://127.0.0.1:8000';
function myFetch(method, url, body, cb, headers2, err_callback) {
  let data;
  let headers;
  if (headers2) {
    headers = headers2;
  } else {
    headers = { 'Content-Type': 'application/json' };
  }
  console.log("==================================================="+url);
  console.log(headers);
  request(
    { method: method
    , url: host+url
    ,body:body
    }
  , function (error, response,body) {
      if(error){
        if(err_callback){err_callback(error)}
        else{ console.log(error)}
      }
      else{
        my_checkStatus(response,cb,err_callback);
      }
    }
  )
}
function my_checkStatus(response,cb,err_callback) {
 
  console.log(response)
  if(!response){
    let err2={}
    if(err_callback){
      err_callback(err2);
    }
    else{ 
      console.log("no response");
    }
    return ;
  }
  if (response.statusCode>= 200 && response.statusCode < 300) {
    try {
      let json=JSON.parse(response.body)
      cb(json);
    } 
    catch (error) {
      err_callback(error);
      // if(window.require){
      //   response.url=response.req.path;
      //   runServer(response);
      //   myglobal.app.show_webview("http://127.0.0.1:8001"+response.url)
      // }
    }
  }else{
    err_callback("statusCode error");
    // response.url=response.req.path;
    // runServer(response);
    // myglobal.app.show_webview("http://127.0.0.1:8001"+response.url)
  }
}

function getRaw(url, cb, err_callback) {
  return myFetch('GET', url, undefined, cb, undefined, err_callback);
}
function get(url, data, cb, err_callback) {
  url = url + '?' + queryString.stringify(data);
  console.log(url);
  return getRaw(url, cb, err_callback);
}
function delete1(url, data, cb,err_callback) {
  var method = 'DELETE';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function post(url, data, cb,err_callback) {
  var method = 'POST';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postOrPut(url, data, cb,err_callback) {
  var method = 'POST';
  if (data.id) {
    method = 'PUT';
  }
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postForm(url, data, cb,err_callback) {
    let method="POST"
    request(
    { method: method
    , url: host+url
    ,formData:data
    }
  , function (error, response,body) {
      if(error){
        if(err_callback){err_callback(error)}
        else{ console.log(error)}
      }
      else{
        my_checkStatus(response,cb,err_callback);
      }
    }
  )
  return;
  // var formData = {
  //   // Pass a simple key-value pair
  //   my_field: 'my_value',
  //   // Pass data via Buffers
  //   my_buffer: Buffer.from([1, 2, 3]),
  //   // Pass data via Streams
  //   my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
  //   // Pass multiple values /w an Array
  //   attachments: [
  //     fs.createReadStream(__dirname + '/attachment1.jpg'),
  //     fs.createReadStream(__dirname + '/attachment2.jpg')
  //   ],
  //   // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
  //   // Use case: for some types of streams, you'll need to provide "file"-related information manually.
  //   // See the `form-data` README for more information about options: https://github.com/form-data/form-data
  //   custom_file: {
  //     value:  fs.createReadStream('/dev/urandom'),
  //     options: {
  //       filename: 'topsecret.jpg',
  //       contentType: 'image/jpeg'
  //     }
  //   }
  // };
  // request.post({url:host+url, formData: data}, 
  //   function optionalCallback(error, response, body) {
  //   if(error){
  //       if(err_callback){err_callback(error)}
  //       else{ console.log(error)}
  //     }
  //     else{
  //       my_checkStatus(response,cb,err_callback);
  //     }
  // });
}
function contacts(data, cb, err_callback) {
  return get('/rest/Contact/', data, cb, err_callback);
}
function UsePacks(query, cb,err_callback) {
  var data = { contact: query };
  return get('/rest/UsePack/', data, cb,err_callback);
}
function PackItems(query, cb) {
  var data = { pack: query };
  return get('/rest/PackItem/', data, cb);
}
function items(query, cb) {
  var data = { search: query };
  return get('/rest/Item/', data, cb);
}
function sql(query, cb) {
  var data = { query: query };
  return get('/sql/', data, cb);
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
  // var data1 = new FormData();
  // for(var i in payload){
  //  data1.append(i, payload[i]); 
  // }
  // var data2=queryString.stringify(data1);
  // //method, url, body, cb, headers2, err_callback
  // return myFetch('POST','/rest/login',data2,cb,{
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },undefined);
  return postForm('/rest/login',payload,cb,undefined)
}
const Client = {
  sql,
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
export default Client;
