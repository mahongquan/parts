$(function() {
		//$( "#jieshou" ).datetimepicker({
		//});
        //    $("#jieshou").datetimepicker('option', $.datepicker.regional['zh-CN']);
        //    $("#jieshou").datetimepicker('option', 'dateFormat','yy-mm-dd');//set dateFormat
		//$("#shenqing").datepicker({});
        //$("#shenqing").datepicker('option', 'dateFormat','yy-mm-dd');//set dateFormat
        $("input.datepicker").datetimepicker();
        $("input.datepicker").datetimepicker('option', 'dateFormat', 'yy-mm-dd');
        //$("input.datepicker").datetimepicker('option', 'timeFormat', 'HH:mm');

        $("input.datepicker").each(
            function() {
                var arr=this.defaultValue.split(" ");
                console.log(arr.length);
                console.log(arr[0]);
                $(this).datetimepicker('setDate', arr[0]);
            }
        );
	});