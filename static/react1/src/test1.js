// var update=require('immutability-helper').newContext();
// const state1 = {x:1};
// const state2 = update(state1, {y:{$set:2}}); 
// console.log(state1);
// console.log(state2);
// var a=[1,2,3,4,5]
// console.log(a);
// const a2 = update(a, {$push:[5]}); 
// console.log(a2);
function t1(){
	var a="2017/06/03"
	console.log(a);
	console.log(a.split("/").join("-"))
}
var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// toLocaleString without arguments depends on the implementation,
// the default locale, and the default time zone
//console.log(new Intl.DateTimeFormat().format(date));
//console.log(new Intl.DateTimeFormat('zh-Hans').format(date));
// → "12/20/2012" if run in en-US locale with time zone America/Los_Angeles
console.log(date)
for(var i in date){
	console.info(i)
}