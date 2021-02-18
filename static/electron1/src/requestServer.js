const request1 = require('request');
var request = request1.defaults({ jar: true });
const host = 'http://127.0.0.1:8000';
var root_response = null;
export function runServer(response) {
  root_response = response;
}
function myrespond(req, res, body) {
  if (root_response != null && req.url === root_response.url) {
    res.writeHead(root_response.statusCode, root_response.headers);
    res.write(root_response.body);
    res.end();
    return;
  }
  let headers2 = req.headers;
  headers2.host = headers2.host.replace(/8001/, '8000');
  if (headers2.referer)
    headers2.referer = headers2.referer.replace(/8001/, '8000');

  request(
    {
      method: req.method,
      url: host + req.url,
      body: body,
      headers: headers2,
      followRedirect: false,
    },
    function (error, response, body) {
      if (error) {
        res.writeHead(404);
        res.write('' + error);
        res.end();
      } else {
        res.writeHead(response.statusCode, response.headers);
        res.write(response.body);
        res.end();
      }
    }
  );
}
var server = require('http')
  .createServer(function (req, res) {
    console.log('req:' + req.url);
    console.log(req);
    let body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      myrespond(req, res, body);
    });
  })
  .listen(8001);
