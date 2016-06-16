phantom.outputEncoding="GBK";
var casper = require('casper').create({
    viewportSize:{width:800, height: 600},
    onError: function(self,m){  
            this.capture("error.png");  
            console.log("FATAL:" + m);  
            self.exit();  
        }  
    }
);
casper.echo("开始");
casper.start('http://oa.ncschina.com/');
casper.thenEvaluate(function() {
   	$("#login_username").val("mahongquan");
	$("#login_password").val("mhq730208");
	$("#login_button").click();
});
var hoverXietong=function(argument) {
	var menus=$(".main_menu_a");///////////////////////////////////////////////
	var co=menus[0];
    $(co).trigger("mouseenter");
    return co.text;
}
casper.waitFor(function check() {
    var rt=this.evaluate(function() {
        return $('#menuUL').length;////////////////////////////////////////////
    });
    this.echo("menuU length:"+rt);
    return rt>0;
}, function then() {
    var rt=this.evaluate(hoverXietong);
    this.echo(rt);
});
casper.then(function check() {
    var rt=this.evaluate(function() {
        var a=$('.second_menu_item');///////////////////////////////////////////////////////
        var daiban=a[4];
        $(daiban.children[0]).trigger("click");
        return daiban.children[0].attributes["onclick"].value;
    });
    this.echo("onclick:"+rt)
    this.capture("second_menu_item.png");
});//
casper.waitFor(function check() {
    var rt=this.evaluate(function() {
        //return $(document.getElementById('main').contentWindow.document.body).html();
        var r=$("#main").contents().find(".common_search");/////////////////////////////////////////
        if(r!=null){
            return true;
        }
        else{
            return false;
        }
    });
    this.echo("common_search:"+rt);
    return rt;
});//$("#objid",document.frames('iframename').document)
casper.then(function check() {
    var rt=this.evaluate(function() {
        //return $(document.getElementById('main').contentWindow.document.body).html();
        $('#main')[0].contentWindow.$('.common_drop_list_text').trigger('mouseenter');
        //items=search.find_elements_by_class_name("text_overflow")
        var items=$("#main").contents().find(".text_overflow");
        
        $('#main')[0].contentWindow.$(items[1]).trigger('click');//title
        $("#main").contents().find(".search_input").val("通知");

        $('#main')[0].contentWindow.$(".search_btn").trigger("click");//$("#main").contents().find(".search_btn").trigger("click");
        return $("#main").contents().find(".search_input").val();
    });
    this.echo("search_input val:"+rt);
});//$("#objid",document.frames('iframename').document)
casper.run(function() {
    this.capture("exit.png");
    this.echo("run_exit_func");this.exit();
});