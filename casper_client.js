var casper = require('casper').create({
    //verbose: true,  
    //logLevel: "debug",  
    clientScripts: ["static/jquery-ui-1.11.4.custom/external/jquery/jquery.js"],
    onError: function(self,m){  
        this.capture("error.png");  
        console.log("FATAL:" + m);  
        self.exit();  
    }  
});
casper.options.viewportSize={width: 1024, height: 768}; 
casper.start('http://127.0.0.1:8000/admin/', function() {
    this.echo("start");
    var rt=this.evaluate(function() {
        $("#id_username").val("mahongquan");
        $("#id_password").val("333333");//<input type="submit" value="登录" />
        $("[type='submit']").click();
    });
});
casper.waitFor(function check() {
    var rt=this.evaluate(function() {
        var a=$('.dashboard');
        if(a!=null) return true;
        return false;
    });
    return rt;
}, function then() {
    ///////////////////////////////////////////////////////////////////////////////have login
    this.open('http://127.0.0.1:8000/admin/parts/pack/add/');
});
casper.waitFor(function check() {
    var rt=this.evaluate(function() {
        var a=$('.change-form');
        if(a!=null) return true;
        return false;
    });
    return rt;
}, function then() {
    this.echo("after wait change-form");
    var rt=this.evaluate(function() {
        ////////////////////////////////////////////////////////////////////////////////new pack
        var a=$('.change-form');
        $("#id_name").val("hello_2");
        //return($("input .default"));//.click();//
        document.getElementsByClassName("default")[0].click();
    });
    this.echo(this.getHtml("input .default"))
});
casper.waitFor(function check() {
    var rt=this.evaluate(function() {
        var a=$('.change-list');
        if(a!=null) return true;
        return false;
    });
    return rt;
}, function then() {
    this.echo("after wait change-list");
    var rt=this.evaluate(function() {
        ////////////////////////////////////////////////////////////////////////////////after save
        var a=$('.change-list');
    });
    this.echo(rt);
});
casper.run(function() {
    this.capture("exit.png");
      this.echo("run_exit_func");this.exit();
});