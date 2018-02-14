// require('xls').parse('3111726583.xls', function(err, data) {
// 	// xls file parsed into data
// 	console.log(data);
// });
node_xj = require("xls-to-json");
  node_xj({
    input: "3111726583.xls",  // input xls
    output: "output.json", // output json
    sheet: "新的工作表"  // specific sheetname
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });