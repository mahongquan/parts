var page = require('webpage').create();
page.open('http://oa.ncschina.com/', function() {
  page.render('github.png');
  phantom.exit();
});