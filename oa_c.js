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
casper.start('http://oa.ncschina.com/');
casper.thenEvaluate(function() {
    	$("#login_username").val("mahongquan");
	$("#login_password").val("mhq730208");
	$("#login_button").click();
});
var showTodo=function(argument) {
	menus=$(".main_menu_a")
	co=menus[0]
	actions=ActionChains(browser)
	actions.move_to_element(co)
	actions.click()
	actions.perform()
	items=browser.find_elements_by_class_name("second_menu_item")
	//browser.get_screenshot_as_file("before daiban click.png")
	//print(len(items))
	items[4].click()#dai ban
}
casper.waitFor(function check() {
    var rt=this.evaluate(function() {
        return $('#menuUL').length;
    });
    this.echo(rt);
    return rt>0;
}, function then() {
    this.mouse.move("");
    this.evaluate(showTodo);
    this.captureSelector('main.png', '#main');
});

casper.run(function() {
      this.echo("run_exit_func");this.exit();
});