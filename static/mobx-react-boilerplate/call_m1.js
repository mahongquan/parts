console.log(process.argv)
console.log("node call.js m1.js")
require("babel-register");
require("babel-polyfill");
require(process.argv[2]);