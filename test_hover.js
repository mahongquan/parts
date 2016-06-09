var casper = require('casper').create({
        //verbose: true,  
        //logLevel: "debug",  
        onError: function(self,m){  
                this.capture("error.png");  
                console.log("FATAL:" + m);  
                self.exit();  
            }  
        }
);
casper.options.viewportSize={width: 1024, height: 768}; 
var mouse = require("mouse").create(casper);
casper.start('http://localhost:8000/static/hover.html');
casper.then(function() {
	var url = 'http://localhost:8000/static/hover.html';
    	this.download(url, 'google_company.html');
    	this.mouse.move("a");//can do
});
casper.run(function() {
	this.captureSelector('exit.png', 'body');
	this.echo("run_exit_func");this.exit();
});