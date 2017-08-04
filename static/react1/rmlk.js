var prompt = require('prompt');
const { spawn } = require('child_process')
function pause(){
	prompt.start();
	prompt.get(['username'], function (err, result) {
	    console.log('Command-line input received:');
	    console.log('  username: ' + result.username);
	});
}
function rmlinks(){
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
		cmd="rmdir "+onearr[0];
		console.log(cmd)
		const bat = spawn('cmd.exe', ["/C",cmd]);
		// bat.stdin.write('Y\n');   // 写入数据
		// bat.stdin.end();  
		bat.stdout.on('data', (data) => {
		  console.log("bat stdout=================");
		  console.log(data.toString());
		  //bat.stdin.write('Y\n');   // 写入数据
		  //bat.stdin.end();  
		});

		bat.stderr.on('data', (data) => {
		  console.log("bat stderr================");
		  console.log(data.toString());
		});

		bat.on('exit', (code) => {
		  console.log(`子进程退出码：${code}`);
		});
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
//rmlinks()
//console.log("agb/cc".replace("/","\\"))
function testmk(){
	cmd="mklink /J public_2 public";
	console.log(cmd)
	const bat = spawn('cmd.exe', ["/C",cmd]);
	bat.stdin.write('Y\n');   // 写入数据
	bat.stdin.end();  
	bat.stdout.on('data', (data) => {
	  console.log("bat stdout=================");
	  console.log(data.toString());
	  //bat.stdin.write('Y\n');   // 写入数据
	  //bat.stdin.end();  
	});
}
function testrm(){
	cmd="rmdir public_2";
	console.log(cmd)
	const bat = spawn('cmd.exe', ["/C",cmd]);
	bat.stdin.write('Y\n');   // 写入数据
	//bat.stdin.end();  
	bat.stdout.on('data', (data) => {
	  console.log("bat stdout=================");
	  console.log(data.toString());
	  //bat.stdin.write('Y\n');   // 写入数据
	  //bat.stdin.end();  
	});
}
//testmk();
//testrm();
rmlinks();