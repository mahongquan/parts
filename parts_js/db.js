console.log("load db.js");
let db;
function myDateStr(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var s_month=""+month;
    if (s_month.length<2) s_month="0"+s_month;
    var day = date.getDate();
    var s_day=""+day;
    if (s_day.length<2) s_day="0"+s_day;
    return year + "-" + s_month + "-" + s_day ;
}
var socket={
  init:function(argument) {
    var sqlite3 = require('sqlite3').verbose();
    const path = require('path')
    var app_root=path.resolve(".");
    db = new sqlite3.Database(app_root+'/cs/data.db');
    // body...
  },
  importstandard:function(res){
    console.log(res);
  },
  emit:function(url,data,callback){
    console.log(url);
    console.log(data);
    if(!data){data={};}
    if (data.limit)
            ;
    else
        data.limit=1000
    if (data.start)
        ;
    else
        data.start=0
    if (url=="/folder"){
        console.log(data);
        const modalPath = path.join(__dirname, './');
          // Open a local file in the default app
        console.log(modalPath);
        console.log(shell);
        if (fs.existsSync(modalPath)){
        }
        else{
            fs.mkdirSync(modalPath);
        }
        shell.openItem(modalPath);
    }
    else if (url=="/fs/children"){
      console.log(data);
      callback(children(data.path));
    }
    else if (url=="/fs/parent"){
      console.log(data);
      callback(parent(data.path));
    }
    else if (url=="/get/Contact"){
      	var where=" where 2>1"
      	if (data.search)
        {
      		where+=" and  SampleName like '%"+data.search+"%'";
        }
        where+=" and  SampleId between '"+data.begin+"' and '"+data.end+"'";
        console.log(where);
        
        db.serialize(function(){
            var res={};
            db.all("SELECT count(*) as total FROM result"+where, function(err, row) {
                res.total=row[0].total;
            });
            db.all("SELECT * FROM result"+where+" ORDER BY sampleid DESC limit "+data.limit+" offset "+data.start, function(err, row) {
                 res.error=err;
                 res.data=row;
                 callback(res);
            });
        });
    }
    else if (url=="/get/Pack"){
        db.serialize(function(){
            var res={};
            db.all("SELECT count(*) as total FROM parts_pack where name like '%"+data.search+"%'", function(err, row) {
                res.total=row[0].total;
            });
            db.all("SELECT * FROM parts_pack where name like '%"+data.search+"%' limit "+data.limit+" offset "+data.start, function(err, row) {
                 res.error=err;
                 res.data=row;
                 callback(res);
            });
        });
    }
    else if (url=="/get/Item"){
        db.serialize(function(){
            var res={};
            db.all("SELECT count(*) as total FROM parts_item where name like '%"+data.search+"%'", function(err, row) {
                res.total=row[0].total;
            });
            db.all("SELECT * FROM parts_item where name like '%"+data.search+"%' limit "+data.limit+" offset "+data.start, function(err, row) {
                    res.error=err;
                 res.data=row;
                 callback(res);
            });
        });
    }
    else if (url=="/get/UsePack"){
        var cmd="SELECT a.id,b.name,b.id as pack_id FROM parts_usepack as a,parts_pack as b where a.pack_id=b.id and a.contact_id="+data.contact_id+" limit "+data.limit+" offset "+data.start;
        console.log(cmd);
        db.all(cmd, function(err, row) {
             var res={};
             res.error=err;
             res.data=row;
             callback(res);
        });
    }
    else if (url=="/get/PackItem"){
    	var cmd="SELECT a.id,a.ct,a.quehuo,b.name,b.guige,b.bh,b.id as item_id FROM parts_packitem as a,parts_item as b where a.item_id=b.id and  a.pack_id="+data.pack_id+" limit "+data.limit+" offset "+data.start;
    	console.log(cmd);
        db.all(cmd, function(err, row) {
             var res={};
             res.error=err;
             res.data=row;
             callback(res);
        });
    }///post/UsePack
    else if (url=="/post/UsePack"){
        console.log(data);
        var cmd="insert into  parts_usepack(contact_id,pack_id) values("+data.contact_id+","+data.pack_id+")";
        console.log(cmd);
        db.serialize(function() {
            db.run(cmd);
            db.all("SELECT a.id,b.name,b.id as pack_id FROM parts_usepack as a,parts_pack as b where a.pack_id=b.id and a.contact_id="+data.contact_id+" and a.pack_id="+data.pack_id, function(err, row) {
                     var res={};
                     res.error=err;
                     res.data=row[0];
                     console.log(res);
                     callback(res);
            });
        });
    }
    else if (url=="/post/PackItem"){
        console.log(data);
        var cmd="insert into  parts_packitem(pack_id,item_id,ct,quehuo) values("+data.pack_id+","+data.item_id+",1,0)";
        console.log(cmd);
        db.serialize(function() {
            db.run(cmd);
            db.all("SELECT a.id,a.quehuo,a.ct,b.name,b.guige,b.bh,b.id as item_id FROM parts_packitem as a,parts_item as b where a.item_id=b.id and a.pack_id="+data.pack_id+" and a.item_id="+data.item_id, function(err, row) {
                     var res={};
                     res.error=err;
                     res.data=row[0];
                     console.log(res);
                     callback(res);
            });
        });
    }
    ///delete/UsePack
    else if (url=="/delete/UsePack"){
        console.log(data);
        db.serialize(function() {
            var cmd="delete from  parts_usepack where id="+data.id;
            db.run(cmd);
             var res={};
             res.success=true;
             res.message="ok";
             console.log(res);
             callback(res);
        });
    }
    else if (url=="/delete/PackItem"){
        console.log(data);
        db.serialize(function() {
            var cmd="delete from  parts_packitem where id="+data.id;
            db.run(cmd);
             var res={};
             res.success=true;
             res.message="ok";
             console.log(res);
             callback(res);
        });
    }///put/PackItem
    else if (url=="/put/PackItem"){//todo
        console.log(data);
        db.serialize(function() {
            var cmd="delete from  parts_packitem where id="+data.id;
            db.run(cmd);
             var res={};
             res.success=true;
             res.message="ok";
             console.log(res);
             callback(res);
        });
    }///get/month12
    else if (url=="/get/month12"){//todo
        console.log(data);
        var baoxiang=data.baoxiang
        var end_date=new Date()
        var start_date=new Date(end_date.getFullYear()-1,1,1);
        var start_date_s=myDateStr(start_date)
        var end_date_s=myDateStr(end_date)
        let cmd;
        if (!baoxiang)
            cmd="select strftime('%Y-%m',tiaoshi_date) as month,count(id) as total from parts_contact  where tiaoshi_date between '"+start_date_s+"' and '"+end_date_s+"' group by month"
        else
            cmd="select strftime('%Y-%m',tiaoshi_date) as month,count(id) as total from parts_contact  where baoxiang like '"+baoxiang+"'  and tiaoshi_date between '"+start_date_s+"' and '"+end_date_s+"' group by month"            
        console.info(cmd)
        db.all(cmd,function(err,row){
            console.log(row);
            var lbls=[]
            var values=[]
            for(var i  in row){
                console.log(i);
                var one=row[i]
                console.log(one)
                lbls.push(one.month+"月")
                values.push(one.total)
            }
            var res={"success":true, "lbls":lbls,"values":values}
            callback(res);
        })    //执行sql语句
    }//if
  }//function;
};//socket
//db.serialize(function() {

    // db.all("SELECT * FROM parts_item", function(err, row) {
    //         console.log(row);
    // });
 //    socket.emit("/get/Contact",{},(res)=>{
	// 	console.log(res);
	// });
	// socket.emit("/get/Item",{limit:2,start:10,search:"2011"},(res)=>{
	// 	console.log(res);
	// });
	// socket.emit("/get/PackItem",{pack_id:9,limit:2,start:0},(res)=>{
	// 	console.log(res);
	// });
    // socket.emit("/post/UsePack",{pack_id:82,contact_id:1},(res)=>{
    //   console.log(res);
    // });
    // socket.emit("/delete/UsePack",{id:1082},(res)=>{
    //   console.log(res);
    // });
    // socket.emit("/get/month12",{contact_id:1},(res)=>{
    //   console.log(res);
    // });
//});
module.exports=socket;


