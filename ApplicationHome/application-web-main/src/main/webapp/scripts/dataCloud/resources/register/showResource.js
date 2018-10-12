//时间控件
$(function(){
	$("#updateTimePerYear").datetimepicker({
        format : "yyyy-mm-dd hh:ii",
        minView : "hour",
        todayHighlight : true,
        initialDate : new Date(),
        keyboardNavigation : true,
        autoclose : true,
        pickerPosition: "top-right",
        maxView: "year",
        startView : "year"
    });
    
    $("#updateTimePerMonth").datepicker({
    	format:"yyyy-mm-dd",
		language:"zh-CN",
        todayHighlight : true,
        initialDate : new Date(),
        keyboardNavigation : true,
        autoclose : true,
        pickerPosition: "top-right",
    });
    
    $("#updateTimePerDay").clockpicker({
        format : "yyyy-mm-dd hh:ii",
        minView : "hour",
        todayHighlight : true,
        initialDate : new Date(),
        keyboardNavigation : true,
        autoclose : true,
        pickerPosition: "top-right",
        maxView : "day",
        startView : "day"
    });
    
    $("#updateTimePerHour").numberbox({
   	 max : 12,
   	 min : 1,
   	 showmark : 1,
   	 showmodel : 1
    });
    
    $("#updateTimeOnetime").datetimepicker({
        format : "yyyy-mm-dd hh:ii",
        minView : "hour",
        todayHighlight : true,
        initialDate : new Date(),
        keyboardNavigation : true,
        autoclose : true,
        pickerPosition: "top-right",
        maxView: "year",
        startView : "year"
    });
    showUpdate();
    showDataSouceInfo();
    getDepartments();
    
   /* $("#department_province").change(function(){
    	$("#department_city").empty();
    	$("#department_area").empty();
    	setAreaOption("department_city",$("#department_province").val(),function(){
    		setAreaOption("department_area",$("#department_city").val());
    	});
    })
    
    $("#department_city").change(function(){
    	$("#department_area").empty();
    	setAreaOption("department_area",$("#department_city").val());
    })*/
});

function showUpdate(){
	if(update_cycle == "数小时"){
		$("#basicInfo span[name='update']").html("每 " + point + " 小时");
	} else if(update_cycle == "一次性"){
		$("#basicInfo span[name='update']").html("在 " + point + " 一次性导入");
	} else if(update_cycle == "每年"){
		$("#basicInfo span[name='update']").html(update_cycle + point.substr(5,5));
	} else if(update_cycle == "每月"){
		$("#basicInfo span[name='update']").html(update_cycle + point.substr(8,2) + " 日");
	} else {
		$("#basicInfo span[name='update']").html(update_cycle + " " + point);
	}
}

//弹出修改基本信息窗口
function toModifyBasicInfo(){
	$("#basicInfo").hide();
	$("#basicInfoModify input[name='res_name']").val($("#basicInfo span[name='res_name']").html());
	$("#basicInfoModify textarea[name='related_bussiness']").val($("#basicInfo span[name='related_bussiness']").html());
	$("#basicInfoModify input[name='res_responsible_party']").val($("#basicInfo span[name='res_responsible_party']").html());
	$("#basicInfoModify textarea[name='res_description']").val($("#basicInfo span[name='res_description']").html());
	$("#update_cycle option[value='"+update_cycle +"']").prop("selected","true");
	changeUpdateTimeBox();
	if(update_cycle != "一次性"){
		currentTimeInput.val(point);
	}
	$("#basicInfoModify input[name='share_situation']").each(function(){
		$(this).prop("checked",false);
		if($(this).val() == share_situation){
			$(this).prop("checked",true);
		}
	});
	$("#basicInfoModify input[name='is_inside']").each(function(){
		$(this).prop("checked",false);
		if($(this).val() == is_inside){
			$(this).prop("checked",true);
		}
	});
	$("#basicInfoModify textarea[name='remark']").val($("#basicInfo span[name='remark']").html());
	$("#basicInfoModify").show();
	$("#basicInfoModifyButton").hide();
	$("#basicInfoModifyBtns").css('display','inline');
}
//修改基本信息
function modifyBasicInfo(){
	var data = {
		guid:$("#guid").val(),
		res_name:$("#basicInfoModify input[name='res_name']").val(),
		related_bussiness:$("#basicInfoModify textarea[name='related_bussiness']").val(),
		res_responsible_party:$("#basicInfoModify input[name='res_responsible_party']").val(),
		res_description:$("#basicInfoModify textarea[name='res_description']").val(),
		update_cycle:$("#update_cycle").val(),
		share_situation:$("#basicInfoModify input[name='share_situation']:checked").val(),
		is_inside:$("#basicInfoModify input[name='is_inside']:checked").val(),
		remark:$("#basicInfoModify textarea[name='remark']").val()
	};
	if(update_cycle != "一次性"){
		if(update_cycle == "数小时"){
			data.update_time_period = currentTimeInput.val();
		}else{
			data.update_time_point = currentTimeInput.val();
		}
	}
	if(modifyResource(data)){
		alert("成功！");
		//更新页面信息
		update_cycle = data.update_cycle;
    	point = data.update_time_point;
    	period = data.update_time_period;
    	share_situation = data.share_situation;
    	is_inside = data.is_inside;
    	$("#basicInfo span[name='res_name']").html(data.res_name);
		$("#basicInfo span[name='related_bussiness']").html(data.related_bussiness);
		$("#basicInfo span[name='res_responsible_party']").html(data.res_responsible_party);
		$("#basicInfo span[name='res_description']").html(data.res_description);
		var situation;
		switch (share_situation){
			case "0" : situation = "无条件共享";break;
			case "1" : situation = "需管理部门审批";break;
			case "2" : situation = "需提供部门审批";break;
			case "3" : situation = "不共享";
	 	}
		var inside;
		switch (is_inside){
			case "0" : inside = "内部";break;
			case "1" : inside = "外部";
	 	}
		$("#basicInfo span[name='share_situation']").html(situation);
		$("#basicInfo span[name='is_inside']").html(inside);
		$("#basicInfo span[name='remark']").html(data.remark);
		showUpdate();
		cancelModify('basicInfo');
	}
}

//弹出修改数据源窗口
function toModifyDataSource(){
	$("#dataSource").hide();
	//将原始数据读入input
	$("#dataSourceModify input[name='source']").each(function(){
		$(this).prop("checked",false);
		if($(this).val() == dataSourceInfo.source){
			$(this).prop("checked",true);
			changeSourceInfo(this);
		}
	});
	$("#dataSourceModify select.database_type option").each(function(){
		$(this).prop("selected",false);
		if($(this).val() == dataSourceInfo.database_type){
			$(this).prop("selected",true);
		}
	});
	$("#dataSourceModify input.host").val(dataSourceInfo.host);
	$("#dataSourceModify input.port").val(dataSourceInfo.port);
	$("#dataSourceModify input.db_name").val(dataSourceInfo.db_name);
	$("#dataSourceModify input.system").val(dataSourceInfo.system);
	$("#dataSourceModify select.deploy_network option").each(function(){
		$(this).prop("selected",false);
		if($(this).val() == dataSourceInfo.deploy_network){
			$(this).prop("selected",true);
		}
	});
	$("#dataSourceModify input.account").val(dataSourceInfo.account);
	$("#dataSourceModify input.password").val(dataSourceInfo.password);
	$("#dataSourceModify input[name='is_telnet']").each(function(){
		$(this).prop("checked",false);
		if($(this).val() == dataSourceInfo.is_telnet){
			$(this).prop("checked",true);
		}
	});
	$("#dataSourceModify input[name='is_file_output']").each(function(){
		$(this).prop("checked",false);
		if($(this).val() == dataSourceInfo.is_file_output){
			$(this).prop("checked",true);
		}
	});
	$("#dataSourceModify input.url").val(dataSourceInfo.url);
	$("#dataSourceModify").show();
	$("#dataSourceModifyButton").hide();
	$("#dataSourceModifyBtns").css('display','inline');
}
//确认修改数据源信息
function modifyDataSource(){
	var data = {
		guid:$("#guid").val(),
		host : $("#dataSourceModify input.host").val(),
		port : $("#dataSourceModify input.port").val(),
        source: $("#dataSourceModify input[name='source']:checked").val(),
        database_type : $("#dataSourceModify select.database_type").val(),
        db_name : $("#dataSourceModify input.db_name").val(),
        system: $("#dataSourceModify input.system").val(),
        deploy_network: $("#dataSourceModify select.deploy_network").val(),
        is_telnet: $("#dataSourceModify input[name='is_telnet']:checked").val(),
        is_file_output: $("#dataSourceModify input[name='is_file_output']:checked").val(),   
        account: $("#dataSourceModify input.account").val(),
        password: $("#dataSourceModify input.password").val()
	}
	if(data.source == "数据库"){
		data.database_type = $("#dataSourceModify select.database_type").val();
		data.port = $("#dataSourceModify input.port").val();
		data.db_name = $("#dataSourceModify input.db_name").val();
		data.url = $("#dataSourceModify input.url").val();
	}
	if(modifyResource(data)){
		alert("修改成功！");
		//更新页面信息
		dataSourceInfo = data;
		showDataSouceInfo();
		cancelModify('dataSource');
	}
}
//显示数据源信息
function showDataSouceInfo(){
	var source = "";
	if(dataSourceInfo.source == "数据库"){
		source = "数据库类型：" +  dataSourceInfo.database_type
			     + " 主机：" + dataSourceInfo.host + " 端口：" + dataSourceInfo.port + " 数据库名： " + dataSourceInfo.db_name + "<br>";
	}else{
		source = "服务地址：" + dataSourceInfo.host + "<br>";
	}
	var sourceInfo = "数据源类型：" + dataSourceInfo.source + "<br>"
				   + source
			       + "服务器系统：" + dataSourceInfo.system + " 部署网络："+ dataSourceInfo.deploy_network + "<br>"
			       + "远程登陆：" + (dataSourceInfo.is_telnet==0?"允许":"不允许") + " 文件传输：" + (dataSourceInfo.is_file_output==0?"允许":"不允许") + "<br>"
			       + "用户名：" + dataSourceInfo.account + "<br>"
			       + "密码：" + dataSourceInfo.password + "<br>";
	$("#dataSource span[name='sourceInfo']").html(sourceInfo);
}

//弹出修改
function toModifyManageDepartment(){
	$("#manageDepartment").hide();
	//将原始数据读入input
	$("#department option").each(function(){
		$(this).prop("selected",false);
		if($(this).val() == deptInfo.department_guid){
			$(this).prop("selected",true);
		}
	});
	$("#admin_name").val(deptInfo.admin_name);
	$("#admin_duty").val(deptInfo.admin_duty);
	$("#admin_phone").val(deptInfo.admin_phone);
	
	$("#manageDepartmentModify").show();
	$("#manageDepartmentModifyButton").hide();
	$("#manageDepartmentModifyBtns").css('display','inline');
}
//确认修改管理部门信息
function modifyManageDepartment(){
	var data = {
			guid:$("#guid").val(),
			department_guid : $("#department").val(),
			department_name : $("#department option:selected").text(),
			admin_name : $("#admin_name").val(),
			admin_duty : $("#admin_duty").val(),
			admin_phone : $("#admin_phone").val()
		}
		if(modifyResource(data)){
			alert("修改成功！");
			//更新页面信息
			deptInfo = data;
	    	var newAdmin = "管理单位：" + data.department_name + "<br>" + 
   	       				   "管理员：" + data.admin_name + "&nbsp;&nbsp;职务：" + data.admin_duty +
   	       				   "&nbsp;&nbsp;手机号：" + data.admin_phone;
	    	$("#manageDepartment span[class='manage']").html(newAdmin);
			cancelModify('manageDepartment');
		}
	
}

//将修改内容发送给服务器
function modifyResource(data){
	var result = false;
	$.ajax({
 		type: "POST",
		url:"modifyResource",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		async: false,
		success:function(d){
			result = true;
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
	return result;
}

function getDepartments(){
	var data = {
		is_inside:$("input[name='is_inside']:checked").val()
	}
	$.ajax({
 		type: "POST",
		url:"getDepartments",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var deps = eval('(' + d +')');
			$("#department").empty();
			for(var i=0;i<deps.length;i++){
				var html = "<option value='" + deps[i].department_guid + "'>" +  deps[i].department_name + "</option>";
				$("#department").append(html);
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

//修改取消
function cancelModify(id){
	$("#"+id).show();
    $("#"+id+"Modify").hide();
    $("#"+id+"ModifyButton").show();
    $("#"+id+"ModifyBtns").hide();
}

//更换时间输入框
var currentTimeInput;
function changeUpdateTimeBox(){
    $("#updateTimeBox").children("div").css("display","none");
    //清空已经填写的时间
    $("#updateTimePerYear").val("");
    $("#updateTimePerMonth").val("");
    $("#updateTimePerDay").val("");
    $("#updateTimePerHour").val("");
    $("#updateTimeOnetime").val("");
    var type = $("#update_cycle").val();
    if(type == "每年"){
		$("#perYearBox").css("display","");
		currentTimeInput = $("#updateTimePerYear");
	}else if(type == "每月"){
		$("#perMonthBox").css("display","");
		currentTimeInput = $("#updateTimePerMonth");
	}else if(type == "每日"){
        $("#perDayBox").css("display","");
        currentTimeInput = $("#updateTimePerDay");
    }else if(type == "数小时"){
    	$("#perHourBox").css("display","");
    	currentTimeInput = $("#updateTimePerHour");
    }else if(type == "一次性"){
    	$("#onetimeBox").css("display","");
    	currentTimeInput = $("#updateTimeOnetime");
    }
}
//------------------------表格修改方法--------------
function toModifyTable(guid,obj){
	var row = $(obj).parent().parent();
	var name = row.find("td[name='table_name_en']").text();
	var description = row.find("td[name='table_description']").text();
	var type = $.trim(row.find("td[name='table_type']").text());
	row.hide();
	modifyRow = "<tr>" +
				"<td><input style=\"width:80%\" name=\"table_name_en\" value=\"" + name +"\"></td>" +
				"<td><input style=\"width:80%\" name=\"table_description\" value=\"" + description +"\"></td>";
	if(type == "主表"){
		modifyRow += "<td>主表</td>";
	}else if(type == "从表"){
		modifyRow += "<td>" +
					 "<select style=\"width:80%\" name=\"table_type\">" +
					 "<option value=\"1\" selected>从表" +
					 "<option value=\"2\">字典表" +
				     "</select></td>";
	}else{
		modifyRow += "<td>" +
					 "<select style=\"width:80%\" name=\"table_type\">" +
					 "<option value=\"1\">从表" +
					 "<option value=\"2\" selected>字典表" +
				     "</select></td>";
	}
    modifyRow += "<td style=\"text-align: left;\">"+
        		 "<button class=\"btn btn-classical btn-xs btn-warning\" onclick=\"modifyTable('" + guid + "',this)\">" +
                 "保存 </button> " +
                 "<button type=\"button\" class=\"btn btn-classical btn-default btn-xs\" onclick=\"backToShowTable(this)\">" +
                 "取消</button>" +
                 "</td>" +
                 "</tr>";
    row.after(modifyRow);
}

function modifyTable(guid,obj){
	var target = $(obj).parent().parent();
	var type= target.find("select[name='table_type']").val();
	var data = {
		guid:guid,
		type_guid:type_guid,
		table_name_en:target.find("input[name='table_name_en']").val(),
		table_description:target.find("input[name='table_description']").val(),
		table_type:type?type:0,
		data_status:data_status
	}
	$.ajax({
 		type: "POST",
		url:"modifyTable",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d != "ok"){
				alert(d);
				return;
			}
			target.prev().find("td[name='table_name_en']").text(data.table_name_en);
			target.prev().find("td[name='table_description']").text(data.table_description);
			target.prev().find("td[name='table_type']").text(data.table_type==0?"主表":data.table_type==1?"从表":"字典表");
			backToShowTable(obj);
		},
		error:function(){
			alert('操作失败');
		}
	});
}

function backToShowTable(obj){
	$(obj).parent().parent().prev().show();
	$(obj).parent().parent().remove();
}

//------------------------表新增方法--------------
function toAddTable(){
	art.dialog({
		title: '新增表格',
	    content: document.getElementById('tableAddBox'),
	    lock: true,
	    background: 'gray', // 背景色
	    opacity: 0.87,  // 透明度
	    id: '1'
	})
}

function saveAdd(guid){
	var error = false;
	var message= "";
	//检查表名录入情况
	$("#fieldBox input[name='name']").each(function(){
		var fieldName = $(this).val();
		$(this).css("border-color","#ccc")
		if(fieldName =='' || fieldName == null){
			$(this).css("border-color","red");
			error = true;
			message = "必须填写所有字段名";
		}
	});
	if(error){
		alert(message);
		return;
	}
	var fieldInfos = [];
	var fieldNames = [];
	$("#fieldBox tr[class='dataRow']").each(function(){
		var fieldInfo = {};
		var name = $(this).find("input[name='name']").val();
		if($.inArray(name,fieldNames) != -1){
			error = true;
			message = "同表中字段名不能重复！";
			return false;
		}
		fieldNames.push(name);
		fieldInfo.name = name;
		fieldInfo.description = $(this).find("input[name='description']").val();
		fieldInfo.type = $(this).find("select[name='type']").val();
		fieldInfo.length = $(this).find("input[name='length']").val();
		fieldInfo.is_primary_key = $(this).find("input[name='is_primary_key']:checked").val()==1?1:0;
		fieldInfo.is_mark = $(this).find("input[name='is_mark']:checked").val()==1?1:0;
		fieldInfo.is_time_stamp = $(this).find("input[name='is_time_stamp']:checked").val()==1?1:0;
		fieldInfo.is_foreign_key = $(this).find("input[name='is_foreign_key']:checked").val()==1?1:0;
		fieldInfos.push(fieldInfo);
	});
	if(error){
		alert(message);
		return;
	}
	var data = {
			type_guid : guid,
			table_name_en : $("#tableAddBox input[name='table_name_en']").val(),
			table_description : $("#tableAddBox input[name='table_description']").val(),
			table_type : $("#tableAddBox select[name='table_type']").val(),
			res_info_table_structure : fieldInfos,
			data_status:data_status
	}
	
	$.ajax({
 		type: "POST",
		url:"addTable",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var tables = eval(d);
			if(tables == null){
				alert("表名已经存在！");
				return;
			}
			//更新显示的信息
			$("#tableInfo tbody").empty();
			for(var i=0;i<tables.length;i++){
				var html = "<tr>" +
				               "<td style=\"text-align: left;\" name=\"table_name_en\">" + tables[i].table_name_en + "</td>" +
				               "<td style=\"text-align: left;\" name=\"table_description\">" + tables[i].table_description + "</td>" +
				               "<td style=\"text-align: left;\" name=\"table_type\">" + 
				                   (tables[i].table_type==0?"主表":tables[i].table_type==1?"从表":"字典表") + 
				               "</td>" +
				               "<td style=\"text-align: left;\">" +
				                   "<button class=\"btn btn-xs btn-warning\" onclick=\"toModifyTable('" + tables[i].guid + "',this)\">" +
				                       "<span class=\"glyphicon glyphicon-edit\"></span>修改" +
				                   "</button> " +
				                   "<button class=\"btn btn-xs btn-info\" onclick=\"toShowTable('" + tables[i].guid + "')\">" +
	                                   "<span class=\"glyphicon glyphicon-eye-open\"></span>查看" +
	                               "</button> ";
				if(tables[i].table_type==0){
					html += "</td></tr>";
				}else{
					html += 	   "<button type=\"button\" class=\"btn btn-danger btn-xs\" onclick=\"deleteTable('" + tables[i].guid + "',this)\">" +
			                    	   "<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>删除" +
				                   "</button>" +
				               "</td>"  +
				           "</tr>";
				}
				$("#tableInfo tbody").append(html);
			}
			//关闭窗口
			closeAdd();
			//清除填写的信息
			$("#tableAddBox input[name='table_name_en']").val("");
			$("#tableAddBox input[name='table_description']").val("");
			$("#tableAddBox select[name='table_type']").val("");
			var first = true;
			$("#fieldBox tr[class='dataRow']").each(function(){
				if(first){
					$(this).find("input[name='name']").val("");
					$(this).find("input[name='description']").val("");
					$(this).find("select[name='type']").val("");
					$(this).find("input[name='length']").val("");
					$(this).find("input[name='is_primary_key']:checked").prop("checked",false);
					$(this).find("input[name='is_mark']:checked").prop("checked",false);
					$(this).find("input[name='is_time_stamp']:checked").prop("checked",false);
					$(this).find("input[name='is_foreign_key']:checked").prop("checked",false);
					first = false; 
				}else{
					$(this).remove();
				}
			});
		},
		error:function(){
			alert('操作失败');
		}
	});
}

function closeAdd(){
	art.dialog.list['1'].close();
}

function addFieldInAddTable(obj){
    $(obj).parent().parent().find("table tbody").append($("#fieldsAddBoxHidden tr").clone());
}

function delField(opp) {
    $(opp).parent().parent().remove();//移除当前行
}

//------------------------查看表格结构方法------------------
function toShowTable(guid){
	var data= {
			guid : guid
	}
	$.ajax({
 		type: "POST",
		url:"findTable",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var table = eval("("+ d +")");
			$("#tableModifyBox tbody").empty();
			var fieldInfos = table.res_info_table_structure;
			console.log(fieldInfos);
			$("#tableModifyBox tbody").append("<tr style=\"font-size:20px\"><th colspan=\"10\" style=\"text-align:center\">" + table.table_name_en + " , " + 
										  (table.table_type==0?"主表":(table.table_type==1)?"从表":"字典表") + 
										  "<button type=\"button\" class=\"btn btn-sm btn-primary\" onclick=\"toAddField(this)\" style=\"float:right\">添加字段</button></th></tr>" +
										 "<tr><th>表描述</th><td colspan=\"9\">" + table.table_description + "<input type=\"hidden\" id=\"table_guid\" value=\"" + table.guid  + "\"></td>" +
									     "<tr><th colspan=\"2\">字段名</th><th>描述</th><th>类型</th><th>长度</th><th>主键</th><th>标识</th><th>时间戳</th><th>外键</th><th>操作</th></tr>");
			for(var j=0;j<fieldInfos.length;j++){
				var html = "<tr class='fieldRow'>" +
							 "<input type=\"hidden\" name=\"guid\" value=\"" + fieldInfos[j].guid + "\">" +
							 "<td colspan=\"2\" name=\"name\">" + fieldInfos[j].name +"</td><td name=\"description\">" + fieldInfos[j].description + "</td>" + 
			                 "<td name=\"type\">" + fieldInfos[j].type +"</td><td name=\"length\">" + fieldInfos[j].length + "</td>" +
			                 "<td name=\"is_primary_key\">" + (fieldInfos[j].is_primary_key==1?"是":"") + "</td><td name=\"is_mark\">" + (fieldInfos[j].is_mark==1?"是":"") + "</td>" +
			                 "<td name=\"is_time_stamp\">" + (fieldInfos[j].is_time_stamp==1?"是":"") + "</td><td name=\"is_foreign_key\">" + (fieldInfos[j].is_foreign_key==1?"是":"") + "</td>" +
			                 "<td name=\"btn_cell\">";
			    if(table.table_type == 0 && fieldInfos[j].is_primary_key == 1){
			    	html += "<button type=\"button\" class=\"btn btn-sm btn-warning\" onclick=\"toModifyField('" + fieldInfos[j].guid + "',this,true)\">" +
		                    "<span class=\"glyphicon glyphicon-edit\" style=\"top:0\" aria-hidden=\"true\"></span>" +
		                    "</button> " +
		                    "<button type=\"button\" class=\"btn-syc btn btn-sm btn-info\" style=\"display:none\" onclick=\"sycField('" + fieldInfos[j].guid + "',this)\">" +
		                       "<span class=\"glyphicon glyphicon-retweet\" style=\"top:0\" aria-hidden=\"true\"></span>" +
		                    "</button>" +
		                    "</td>" +
		                    "</tr>";
			    }else{
			    	html += "<button type=\"button\" class=\"btn btn-sm btn-warning\" onclick=\"toModifyField('" + fieldInfos[j].guid + "',this,false)\">" +
		                    "<span class=\"glyphicon glyphicon-edit\" style=\"top:0\" aria-hidden=\"true\"></span>" +
		                    "</button> " + 
		                    "<button type=\"button\" class=\"btn btn-sm btn-danger\" onclick=\"deleteField('" + fieldInfos[j].guid + "',this)\">" +
		                       "<span class=\"glyphicon glyphicon-trash\" style=\"top:0\" aria-hidden=\"true\"></span>" +
		                    "</button> " +
		                    "<button type=\"button\" class=\"btn-syc btn btn-sm btn-info\" style=\"display:none\" onclick=\"sycField('" + fieldInfos[j].guid + "',this)\">" +
		                       "<span class=\"glyphicon glyphicon-retweet\" style=\"top:0\" aria-hidden=\"true\"></span>" +
		                    "</button>" +
		                    "</td>" +
		                    "</tr>";
			    }
				$("#tableModifyBox tbody").append(html);
			}
			//如果已经入库则需要对比字段
			if(data_status >= 3){
				toCompareStructure(guid);
			}
		},
		error:function(){
			alert('操作失败');
		},
		beforeSend: function(){    
            $("<div class=\"loading\">连接中</div>").prependTo("#tableModifyBox");  
        },   
        complete: function(){    
            $(".loading").remove();    
        }
	});
	
	
	art.dialog({
		title: '查看表结构',
	    content: document.getElementById('tableModifyBox'),
	    lock: true,
	    background: 'gray', // 背景色
	    opacity: 0.87,  // 透明度
	    id: '2'
	})
}
//------------------表结构对比 ---------------------------
function toCompareStructure(guid){
	//1.从资源库找出对应字段信息表
	var data= {
			guid : guid
	}
	$.ajax({
 		type: "POST",
		url:"findTableField",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var fields = eval("("+ d +")");
			$("#tableModifyBox tbody").find("tr[class='fieldRow']").each(function(){
				var This = $(this);
				var name = This.find("td[name='name']").html();
				var description = This.find("td[name='description']").html();
				var type = This.find("td[name='type']").html();
				var length = This.find("td[name='length']").html();
				var is_primary_key = This.find("td[name='is_primary_key']").html() == '是'?1:0;
				for(var i=0;i<fields.length;i++){
					//匹配表名
					if(name == fields[i].name){
						if(description != (fields[i].description==null?"":fields[i].description)){
							This.find("td[name='description']").addClass("glyphicon-warning-sign");
							This.find("button.btn-syc").show();
						}
						if(type != (fields[i].type==null?"":fields[i].type)){
							This.find("td[name='type']").addClass("glyphicon-warning-sign");
							This.find("button.btn-syc").show();
						}
						if(length != (fields[i].length==null?"":fields[i].length)){
							This.find("td[name='length']").addClass("glyphicon-warning-sign");
							This.find("button.btn-syc").show();
						}
						if(is_primary_key != (fields[i].is_primary_key==null?"":fields[i].is_primary_key)){
							This.find("td[name='is_primary_key']").addClass("glyphicon-warning-sign");
							This.find("button.btn-syc").show();
						}
						//匹配上之后在数组中删除该元素
						fields.splice(i,1);
						return true;
					}
				}
				//如果没有匹配上说明 资源库中此字段已经改名或者删除
				This.find("td[name='name']").addClass("glyphicon-warning-sign");
			});
			//如果有字段没有匹配上说明字段是改名 或者 新增的
			if(fields.length > 0){
				for(var i=0;i<fields.length;i++){
					var html = "<tr class='fieldRow'>" +
								 "<td colspan=\"2\" name=\"name\">" + fields[i].name +"</td><td name=\"description\">" + fields[i].description + "</td>" + 
				                 "<td name=\"type\">" + fields[i].type +"</td><td name=\"length\">" + fields[i].length + "</td>" +
				                 "<td name=\"is_primary_key\">" + (fields[i].is_primary_key==1?"是":"") + "</td><td name=\"is_mark\">" + (fields[i].is_mark==1?"是":"") + "</td>" +
				                 "<td name=\"is_time_stamp\">" + (fields[i].is_time_stamp==1?"是":"") + "</td><td name=\"is_foreign_key\">" + (fields[i].is_foreign_key==1?"是":"") + "</td>" +
				                 "<td name=\"btn_cell\">";
				    	html += "<button type=\"button\" class=\"btn-syc btn btn-sm btn-info\" onclick=\"advanceSyc(this)\">" +
			                       "<span class=\"glyphicon glyphicon-retweet\" style=\"top:0\" aria-hidden=\"true\"></span>" +
			                    "</button>" +
			                    "</td>" +
			                    "</tr>";
					$("#tableModifyBox tbody").append(html);
				}
			}
		},
		error:function(){
			alert('与资源库对比失败');
		}
	});
}

//同步字段信息
function sycField(guid,obj){
	var target = $(obj).parent().parent();
	var data = {
			guid:guid,
			res_number:res_number,
			data_status:data_status
	}
	$.ajax({
 		type: "POST",
		url:"sycField",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d == null){
				alert('同步失败，请重试');
				return;
			}
			var field = eval('('+ d +')');
			target.find("td[name='name']").html(field.name);
			target.find("td[name='description']").html(field.description);
			target.find("td[name='type']").html(field.type);
			target.find("td[name='length']").html(field.length);
			target.find("td[name='is_primary_key']").html(field.is_primary_key==1?'是':'');
			target.find("td").removeClass("glyphicon-warning-sign");
			target.find("button.btn-syc").hide();
		},
		error:function(){
			alert('同步错误');
		}
	});
}

//-----------名称未匹配字段同步---------------------------
function advanceSyc(obj){
	//生成select框内容
	var target = $("#sycTarget").empty();
	var noUnmatch = true;
	$("#tableModifyBox tbody").find("tr[class='fieldRow']").each(function(){
		var This = $(this).find("td[name='name']");
		if(This.hasClass("glyphicon-warning-sign")){
			noUnmatch = false;
			var name = This.html();
			var option = "<option value='" + $(this).find("input[name='guid']").val() + "'>" + name + "</option>";
			target.append(option);
		}
	});
	if(noUnmatch){
		target.append("<option value=\"\">无未匹配字段</option>");
		$("#sycType_1").prop("checked",false);
		$("#sycType_1").prop("disabled",true);
		$("#sycType_0").prop("checked",true);
	}else{
		$("#sycType_0").prop("checked",false);
		$("#sycType_1").prop("disabled",false);
		$("#sycType_1").prop("checked",true);
	}
	changeSycType();
	art.dialog({
		title: '请选择同步方式',
	    content: document.getElementById('advanceSyc'),
	    lock: true,
	    background: 'gray', // 背景色
	    opacity: 0.87,  // 透明度
	    id: '9',
	    ok:function(){
	    	var sycType = $("input[name='sycType']:checked").val();
	    	var url;
	    	if(sycType == 0){
	    		url = "advanceSyc/new";
	    	}else if(sycType == 1){
	    		url = "advanceSyc/update";
	    	}
	    	var target = $(obj).parent().parent();
	    	var data = {
	    			guid:$("#sycTarget").val(),
	    			table_guid:$("#table_guid").val(),
	    			name:target.find("td[name='name']").html(),
	    			description:target.find("td[name='description']").html(),
	    			type:target.find("td[name='type']").html(),
	    			length:target.find("td[name='length']").html(),
	    			is_primary_key:target.find("td[name='is_primary_key']").html()=="是"?'1':'0'
	    	}
	    	$.ajax({
	     		type: "POST",
	    		url:url,
	    		data:JSON.stringify(data),
	    		contentType:'application/json;charset=UTF-8',
	    		success:function(d){
	    			art.dialog.list['2'].close();
	    			toShowTable(d);
	    		},
	    		error:function(){
	    			alert('同步错误');
	    		}
	    	});
	    	return true;
	    }
	})
}

function changeSycType(){
	var type = $("input[name='sycType']:checked").val();
	if(type == 0){
		$("#sycTarget").prop("disabled",true);
	}else{
		$("#sycTarget").prop("disabled",false);
	}
}

//------------------修改表结构的方法 ----------------------
function toModifyField(guid,obj,flag){
	var row = $(obj).parent().parent();
	var name = row.find("td[name='name']").text();
	var description = row.find("td[name='description']").text();
	var type = row.find("td[name='type']").text();
	var length = row.find("td[name='length']").text();
	var is_primary_key = row.find("td[name='is_primary_key']").text()=="是"?1:0;
	var is_mark = row.find("td[name='is_mark']").text()=="是"?1:0;
	var is_time_stamp = row.find("td[name='is_time_stamp']").text()=="是"?1:0;
	var is_foreign_key = row.find("td[name='is_foreign_key']").text()=="是"?1:0;
	var options = $("#fieldBox select[name='type']").html();
	row.hide();
	modifyRow = "<tr>" +
				 "<td colspan=\"2\"><input class=\"form-control input-sm\" name=\"name\" value=\"" + name +"\"></td>" +
				 "<td><input class=\"form-control input-sm\" name=\"description\" value=\"" + description +"\"></td>" +
			     "<td><select class=\"form-control input-sm\" name=\"type\">" + options + "</select></td>" +
			     "<td><input class=\"form-control input-sm\" name=\"length\" value=\"" + length +"\"></td>" +
			     "<td><input type=\"checkbox\" class=\"form-control input-sm\" name=\"is_primary_key\" value=\"1\"" + (is_primary_key==1?"checked":"") + (flag?" disabled":"") + "></td>" +
			     "<td><input type=\"checkbox\" class=\"form-control input-sm\" name=\"is_mark\" value=\"1\"" + (is_mark==1?"checked":"") + "></td>" +
			     "<td><input type=\"checkbox\" class=\"form-control input-sm\" name=\"is_time_stamp\" value=\"1\"" + (is_time_stamp==1?"checked":"") + "></td>" +
			     "<td><input type=\"checkbox\" class=\"form-control input-sm\" name=\"is_foreign_key\" value=\"1\"" + (is_foreign_key==1?"checked":"") + "></td>" +
				 "<td><button type=\"button\" class=\"btn btn-sm btn-success\" onclick=\"modifyField('" + guid + "',this)\">" +
				    "<span class=\"glyphicon glyphicon-floppy-saved\" style=\"top:0\" aria-hidden=\"true\"></span>" +
				    "</button> " + 
				    "<button type=\"button\" class=\"btn btn-sm btn-default\" onclick=\"backToShowField(this)\">" +
				       "<span class=\"glyphicon glyphicon-log-out\" style=\"top:0\" aria-hidden=\"true\"></span>" +
				    "</button>" +
				    "</td>" +
				    "</tr>";
    row.after(modifyRow);
    row.next().find("option").each(function(){
    	if($(this).val() == type){
    		$(this).prop("selected",true);
    	}
    });
}

function modifyField(guid,obj){
	var target = $(obj).parent().parent();
	var data = {
		guid:guid,
		table_guid:$("#table_guid").val(),
		name:target.find("input[name='name']").val(),
		description:target.find("input[name='description']").val(),
		type:target.find("select[name='type']").val(),
		length:target.find("input[name='length']").val(),
		is_primary_key:target.find("input[name='is_primary_key']:checked").val()==1?1:0,
		is_mark:target.find("input[name='is_mark']:checked").val()==1?1:0,
		is_time_stamp:target.find("input[name='is_time_stamp']:checked").val()==1?1:0,
		is_foreign_key:target.find("input[name='is_foreign_key']:checked").val()==1?1:0,
		data_status:data_status
	}
	$.ajax({
 		type: "POST",
		url:"modifyField",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d != "ok"){
				alert(d);
				return;
			}
			target.prev().find("td[name='name']").text(data.name);
			target.prev().find("td[name='description']").text(data.description);
			target.prev().find("td[name='type']").text(data.type);
			target.prev().find("td[name='length']").text(data.length);
			target.prev().find("td[name='is_primary_key']").text(data.is_primary_key==1?"是":"");
			target.prev().find("td[name='is_mark']").text(data.is_mark==1?"是":"");
			target.prev().find("td[name='is_time_stamp']").text(data.is_time_stamp==1?"是":"");
			target.prev().find("td[name='is_foreign_key']").text(data.is_foreign_key==1?"是":"");
			backToShowField(obj);
		},
		error:function(){
			alert('操作失败');
		}
	});
}

function backToShowField(obj){
	$(obj).parent().parent().prev().show();
	$(obj).parent().parent().remove();
}

//---------------添加字段方法----------------------
function toAddField(obj){
	var options = $("#fieldBox select[name='type']").html();
	var addRow = "<tr>" +
					 "<td colspan=\"2\"><input class=\"form-control input-sm\" name=\"name\"></td>" +
					 "<td><input class=\"form-control input-sm\" name=\"description\"></td>" +
				    "<td><select class=\"form-control input-sm\" name=\"type\">" + options + "</select></td>" +
				    "<td><input class=\"form-control input-sm\" name=\"length\"></td>" +
				    "<td><input type=\"checkbox\" class=\"form-control input-sm\" name=\"is_primary_key\" value=\"1\"></td>" +
				    "<td><input type=\"checkbox\" class=\"form-control input-sm\" name=\"is_mark\" value=\"1\"></td>" +
				    "<td><input type=\"checkbox\" class=\"form-control input-sm\" name=\"is_time_stamp\" value=\"1\"></td>" +
				    "<td><input type=\"checkbox\" class=\"form-control input-sm\" name=\"is_foreign_key\" value=\"1\"></td>" +
					 "<td><button type=\"button\" class=\"btn btn-sm btn-success\" onclick=\"addField(this)\">" +
					    "<span class=\"glyphicon glyphicon-floppy-saved\" style=\"top:0\" aria-hidden=\"true\"></span>" +
					    "</button> " + 
					    "<button type=\"button\" class=\"btn btn-sm btn-default\" onclick=\"cancelAddField(this)\">" +
					       "<span class=\"glyphicon glyphicon-log-out\" style=\"top:0\" aria-hidden=\"true\"></span>" +
					    "</button>" +
					    "</td>" +
					    "</tr>";
	$(obj).parent().parent().parent().append(addRow);
}

function addField(obj){
	var target = $(obj).parent().parent();
	var data = {
		table_guid:$("#table_guid").val(),
		name:target.find("input[name='name']").val(),
		description:target.find("input[name='description']").val(),
		type:target.find("select[name='type']").val(),
		length:target.find("input[name='length']").val(),
		is_primary_key:target.find("input[name='is_primary_key']:checked").val()==1?1:0,
		is_mark:target.find("input[name='is_mark']:checked").val()==1?1:0,
		is_time_stamp:target.find("input[name='is_time_stamp']:checked").val()==1?1:0,
		is_foreign_key:target.find("input[name='is_foreign_key']:checked").val()==1?1:0,
		data_status:data_status
	}
	$.ajax({
 		type: "POST",
		url:"addField",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d.length != 36){
				alert(d);
				return;
			}
			var newRow = "<tr>" +
						 "<td colspan=\"2\" name=\"name\">" + data.name +"</td><td name=\"description\">" + data.description + "</td>" + 
			             "<td name=\"type\">" + data.type +"</td><td name=\"length\">" + data.length + "</td>" +
			             "<td name=\"is_primary_key\">" + (data.is_primary_key==1?"是":"") + "</td><td name=\"is_mark\">" + (data.is_mark==1?"是":"") + "</td>" +
			             "<td name=\"is_time_stamp\">" + (data.is_time_stamp==1?"是":"") + "</td><td name=\"is_foreign_key\">" + (data.is_foreign_key==1?"是":"") + "</td>" +
			             "<td><button type=\"button\" class=\"btn btn-sm btn-warning\" onclick=\"toModifyField('" + d + "',this,false)\">" +
				             "<span class=\"glyphicon glyphicon-edit\" style=\"top:0\" aria-hidden=\"true\"></span>" +
				             "</button> " + 
				             "<button type=\"button\" class=\"btn btn-sm btn-danger\" onclick=\"deleteField('" + d + "',this)\">" +
				               "<span class=\"glyphicon glyphicon-trash\" style=\"top:0\" aria-hidden=\"true\"></span>" +
				             "</button>" +
				            "</td>" +
			            "</tr>";
			target.parent().append(newRow);
			cancelAddField(obj);
		},
		error:function(){
			alert('操作失败');
		}
	});
}

function deleteField(guid,obj){
	if(!window.confirm("确定要删除此字段？")){
		return;
	}
	var data = {
			guid:guid,
			data_status:data_status
		}
	$.ajax({
 		type: "POST",
		url:"deleteField",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(!eval(d)){
				alert("操作失败,可能是所删除的字段中有数据");
				return;
			}
			cancelAddField(obj);
		},
		error:function(){
			alert('操作失败');
		}
	});
}

function cancelAddField(obj){
	$(obj).parent().parent().remove();
}

//------------------------表格删除方法--------------
function deleteTable(guid,obj){
	if(!window.confirm("确定要删除？")){
		return;
	}
	var data= {
		guid : guid,
		data_status : data_status
	}
	$.ajax({
 		type: "POST",
		url:"deleteTable",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			$(obj).parent().parent().remove();
		},
		error:function(){
			alert('操作失败');
		}
	});
}

//数据源类型切换
function changeSourceInfo(obj){
	var id = $(obj).val();
	if(id == "数据库"){
		$("div.databaseInfo").show();
	}else{
		$("div.databaseInfo").hide();
	}
}

function getUrl(){
	var type = $("select.database_type").val();
	var url;
	if(type == "MySQL"){
		url = "jdbc:mysql://"+$("input.host").val()+":"+$("input.port").val()+"/"+$("input.db_name").val();
	}else if(type == "Oracle"){
		url = "jdbc:oracle:thin:@"+$("input.host").val()+":"+$("input.port").val()+":"+$("input.db_name").val();
	}else if(type == "SQLServer"){
		url = "jdbc:sqlserver://"+$("input.host").val()+":"+$("input.port").val()+";databaseName="+$("input.db_name").val();
	}
	$("input.url").val(url);
}

function toFlow(){
    location.href="${ctx }/flowchart/flowShow?flag=1&guid=";
}

