var casper = require('casper').create();
casper.options.viewportSize={width: 1024, height: 768}; 
var links=[];
function getLinks() {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}
casper.start('http://oa.ncschina.com/', function() {
	this.echo("start");
	this.fill('form#login_form', {
	        'login_username':    'mahongquan',
	        'login_password':    'mhq730208'
	        //'attachment': '/Users/chuck/roundhousekick.doc'
	    }, true);
});
casper.then(function() {
    this.echo(this.getTitle());
    this.captureSelector('exit.png', 'body');
});
casper.run(function() {
      this.echo("run_exit_func");this.exit();
});