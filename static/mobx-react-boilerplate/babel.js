console.log("node babel.js [js file name]")
require("babel-register");
require("babel-polyfill");
const path=require("path")
require(path.resolve(process.argv[2]));