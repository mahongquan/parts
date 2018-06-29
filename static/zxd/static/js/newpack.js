$(function(){  
    var todos=["a","b","c"];  
    console.log("newpack.js ready");  
    // function clearall(){  
    //     //$("#one").remove();  
    //     $("[one]").remove();  
    // } 
    function button_select_click(event){  
        console.log("button_select clicked");  
        console.log(event.data);  
        // console.log(event.data.row);  
        // event.data.row.remove();  
        // rowid=event.data.rowid;  
        // todos[rowid]=undefined;//=todos.slice(rowid);
        console.log(event.data.name);
        $("#"+event.data.tochange).val(event.data.name);
        $("#dialog").dialog("close");
    }     
    function showDialog(tochange){
        var start=0;
        var limit=10;
    	$.ajax({ 
    		type:'POST',
            dataType: "json",
    		url: "/rest/view_pack",
            data: {start:start,limit:limit,csrfmiddlewaretoken:$("#csrf_token").attr("value")},
    		//context: document.body,
            complete:function(){

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(errorThrown);
            },
    		success: function(data)
    		{
	        	console.log("ajax done");
	        	console.log(data);
	         	var todolist=$("#dialog");
	         	//data=eval("("+data+")");
	         	console.log(data.data);  
	        	var tbl = $('<table></table>');  
	         	data.data.forEach(function(onerow){  
				    console.log(onerow);  
                	//console.log(i);
                    var one = $('<tr one="true"></tr>');  
                    var rowid = $('<td>'+onerow.name+'</td>');  
                    var newEl = $('<td>'+onerow.id+'</td>');  
                    var btn_select = $('<td><button type="button">选择</button></td>');  
                    //btn.click(button_remove_click);  
                    btn_select.bind("click", { tochange:tochange,name:onerow.name,id:onerow.id},button_select_click );  
                    //var btnedit = $('<td><button type="button">edit</button></td>');  
                    //btnedit.click(button_edit_click);  
                    one.append(rowid);  
                    one.append(newEl);   
                    //one.append(btnedit);  
                    one.append(btn_select);  
                    tbl.append(one);
	            }) 
	            todolist.append(tbl);        
	    	}
		});
    	$("#dialog").dialog({
		    //bgiframe: true,
		    //resizable: false, height: "530",width:"200",
		    //height:140,
		    modal: true,
		    overlay: {
		        backgroundColor: '#000',
		        opacity: 0.5
		    },
		    autoOpen: true,
		    // buttons: {
		    //     Cancel: function() {
		    //         $(this).dialog('close');
		    //     },
		    // }
		}); 
    }
    function buttonfrom_click(event){  
        console.log("buttonfrom clicked"); 
        showDialog("namefrom"); 
          
    }  
    function buttonto_click(event){  
        console.log("buttonto clicked"); 
        showDialog("nameto"); 
        // console.log(event.data);  
        // console.log(event.data.row);  
        // event.data.row.remove();  
        // rowid=event.data.rowid;  
        // todos[rowid]=undefined;//=todos.slice(rowid);  
    }          
    // function showall(){  
    //     clearall();  
    //     var todolist=$("#todo-list");  
    //     for(var i in todos){  
    //         if(todos[i]){  
    //             var one = $('<tr one="true"></tr>');  
    //             var rowid = $('<td>'+i+'</td>');  
    //             var newEl = $('<td>'+todos[i]+'</td>');  
    //             var btn_remove = $('<td><button type="button">remove</button></td>');  
    //             //btn.click(button_remove_click);  
    //             btn_remove.bind("click", { row:one,rowid:i},button_remove_click );  
    //             //var btnedit = $('<td><button type="button">edit</button></td>');  
    //             //btnedit.click(button_edit_click);  
    //             one.append(rowid);  
    //             one.append(newEl);   
    //             //one.append(btnedit);  
    //             one.append(btn_remove);  
    //             todolist.append(one);  
    //         }  
    //     }              
    // }  
    // function button_add_click(){  
    //     console.log("button_add clicked");  
    //     var newtodo=$("#new-todo");  
    //     todos.push(newtodo[0].value);  
    //     showall();  
    // }  
    // function button_clear_click(){  
    //     todos=[];  
    //     clearall();  
    // }          
    //$("#buttonfrom").click(buttonfrom_click);  
    //$("#nameto").val($("#csrf_token").attr("value"));
    // showall();  
}); 
