logResources = false;
function printArgs() {
    var i, ilen;
    for (i = 0, ilen = arguments.length; i < ilen; ++i) {
        console.log("    arguments[" + i + "] = " + JSON.stringify(arguments[i]));
    }
    console.log("");
}
var page = require('webpage').create();page.viewportSize = { width: 1024, height: 768 };
// page.onInitialized = function() {
//     console.log("page.onInitialized");
//     printArgs.apply(this, arguments);
// };
// page.onLoadStarted = function() {
//     console.log("page.onLoadStarted");
//     printArgs.apply(this, arguments);
// };
// page.onLoadFinished = function() {
//     console.log("page.onLoadFinished");
//     printArgs.apply(this, arguments);
// };
// page.onUrlChanged = function() {
//     console.log("page.onUrlChanged");
//     printArgs.apply(this, arguments);
// };
// page.onNavigationRequested = function() {
//     console.log("page.onNavigationRequested");
//     printArgs.apply(this, arguments);
// };
// // page.onRepaintRequested = function() {
// //     console.log("page.onRepaintRequested");
// //     printArgs.apply(this, arguments);
// // };

// if (logResources === true) {
//     page.onResourceRequested = function() {
//         console.log("page.onResourceRequested");
//         printArgs.apply(this, arguments);
//     };
//     page.onResourceReceived = function() {
//         console.log("page.onResourceReceived");
//         printArgs.apply(this, arguments);
//     };
// }

// page.onClosing = function() {
//     console.log("page.onClosing");
//     printArgs.apply(this, arguments);
// };

// // window.console.log(msg);
// page.onConsoleMessage = function() {
//     console.log("page.onConsoleMessage");
//     printArgs.apply(this, arguments);
// };

// // window.alert(msg);
// page.onAlert = function() {
//     console.log("page.onAlert");
//     printArgs.apply(this, arguments);
// };
// // var confirmed = window.confirm(msg);
// page.onConfirm = function() {
//     console.log("page.onConfirm");
//     printArgs.apply(this, arguments);
// };
// // var user_value = window.prompt(msg, default_value);
// page.onPrompt = function() {
//     console.log("page.onPrompt");
//     printArgs.apply(this, arguments);
// };
var getfirstContact=function(){//run in brower contex
	var td=$("tbody").children()[0].children[0];
	//return td.firstChild.attributes["href"].value;
	td.firstChild.click();
}
var loginAdmin=function(){//run in brower contex
	var admin_link=$("#navbar li")[1].children[0];
	admin_link.click();
}
var myexit=function(){
	setTimeout(exit_func,1000);
}
var exit_func=function(){
	page.render('exit.png');
	phantom.exit();
}
var openF=function(status)
{
	if (status !== 'success') {	
	}
	else{
		console.log("opened");
		//if(page.injectJs("static/jquery-ui-1.11.4.custom/external/jquery/jquery.js"))
		{
		 	var rt=page.evaluate(loginAdmin);
		 	console.log(rt);
		 	myexit();
		}
	}
}
page.open('http://127.0.0.1:8000/', openF);