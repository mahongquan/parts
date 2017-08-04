//var prompt = require('prompt');
const  spawn = require('child_process').spawn;
const  exec = require('child_process').exec;
const  spawnSync = require('child_process').spawnSync;
function pause(){
	prompt.start();
	prompt.get(['username'], function (err, result) {
	    console.log('Command-line input received:');
	    console.log('  username: ' + result.username);
	});
}
function genlinks(){
	const fs = require('fs');
	var data=fs.readFileSync("out.txt")
	var datastr=data.toString()
	var dataarr=datastr.split("\n")
	function callback(e){
		console.log(e);
		pause();
	}
	function treatOne(one){
		console.log("=====")
		console.log(one)
		onearr=one.split("\t")
		console.log(onearr[0],onearr[1])
		onearr[0]=onearr[0].replace("/","\\");
		cmd="mklink /J "+onearr[0]+" "+onearr[1];
		console.log(cmd)
		var r= spawnSync('cmd.exe', ["/C",cmd]);
		//var waiting=true;
		console.log(r.stdout.toString());
		// bat.stdout.on('data', (data) => {
		//   console.log("bat stdout=================");
		//   console.log(data.toString());
		//   //bat.stdin.write('Y\n');   // 写入数据
		//   //bat.stdin.end();  
		// });

		// bat.stderr.on('data', (data) => {
		//   console.log("bat stderr================");
		//   console.log(data.toString());
		// });

		// bat.on('exit', (code) => {
		//   console.log(`子进程退出码：${code}`);
		//   waiting=false;
		// });
		// bat.on('close', (code) => {
		//   console.log(`close`);
		//   waiting=false;
		// });
		// for(var i in bat){
		// 	console.log(i);
		// }
		// while(waiting){
		// 	//console.log("waiting");
		// }
	}
	for(var i in dataarr){
		one=dataarr[i];
		if (one!="")
		{
			treatOne(one);
			//break;
		}
	}
}
genlinks()
//console.log("agb/cc".replace("/","\\"))
