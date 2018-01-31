var fs = require('fs');
var esformatter = require('esformatter');
//register plugin manually
esformatter.register(require('esformatter-jsx'));

var str = fs.readFileSync('App.js').toString();
var output = esformatter.format(str);
console.log(output);