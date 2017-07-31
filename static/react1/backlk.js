const fs = require('fs');
srcpath="node_modules"
ds=fs.readdirSync(srcpath)
var data=""
for(var i in ds){
	one=srcpath+"/"+ds[i];
	console.log(one);
	state=fs.lstatSync(one)
	if (state.isSymbolicLink()==true)
	{
		r=fs.readlinkSync(one);
		data+=one+"\t"+r+"\n"
		console.info(r)
		//break;
	}
}
outf=fs.writeFileSync("out.txt",data)

