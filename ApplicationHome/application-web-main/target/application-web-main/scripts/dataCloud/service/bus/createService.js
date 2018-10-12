

function checkServiceCode(){
	var code = $("#service_code").val();
	if(code == ""){
		alert("请填写位置！");
		return;
	}
	$("#checkInfo").empty();
	var data = {
		service_code:$("#service_code").val()
	}
	$.ajax({
 		type: "POST",
		url:"checkServiceCode",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d == ""){
				$("#checkInfo").append("<span style=\"margin-top:10px;text-align:center;font-size:14px;display:block\">总线位置可以使用！</span>");
			}else{
				var data = eval('(' + d + ')')
				$("#check_s_name").html(data.service_name);
				$("#check_s_decription").html(data.decription);
				$("#checkInfo").append($("#infoHidden").html());
			}
		},
		error:function(){
			alert('操作失败');
		}
	});
}

var transactions = [];//会话数组
var tran_reqs = [];//会话与请求方对象数组
function nextStep(index){
	var error = false;
	if(index == 1){
		//检查是否有未填写表格的情况
		$("#transactionBox select[name='table_name']").each(function(){
			if($(this).val() == null){
				alert("有会话未指定表格！");
				error = true;
				return false;
			}
		});
		if(error){
			return;
		}
		$("#tableBox").empty();
		//生成下一步的页面
		var tableGuids = [];
		$("#transactionBox div[class='panel panel-default']").each(function(){
			var This = $(this);
			$("#tableHidden span[name='tran_name']").html(This.find("input[name='tran_name']").val());
			$("#tableHidden span[name='res_name']").html(This.find("select[name='res_name'] option:selected").text());
			$("#tableHidden span[name='table_name']").html(This.find("select[name='table_name'] option:selected").text());
			var tableGuid = This.find("select[name='table_name']").val();
			$("#tableHidden table").prop("id",tableGuid);
			if($.inArray(tableGuid,tableGuids) == -1){
				tableGuids.push(tableGuid);
			}
			tableGuids.push(This.find("select[name='table_name']").val());
			$("#tableBox").append($("#tableHidden").html());
		});
		$("#tableHidden table").prop("id","");
		
		$.ajax({
	 		type: "POST",
			url:"getFields",
			data:JSON.stringify(tableGuids),
			contentType:'application/json;charset=UTF-8',
			success:function(d){
				var data = eval(d);
				for(var i=0;i<data.length;i++){
					var target = $("#" + data[i].table_guid + " tbody");
					for(var j=0;j<data[i].fields.length;j++){
						var f = data[i].fields[j];
						var row = "<tr>" +
								  "<td>" + f.name + "</td>" + 
								  "<td>" + f.type + "</td>" + 
								  "<td>" + f.length + "</td>" + 
								  "<td><input type=\"checkbox\" name=\"opt_query\"></td>" + 
								  "<td><input type=\"checkbox\" name=\"opt_insert\"></td>" + 
								  "<td><input type=\"checkbox\" name=\"opt_update\"></td>" + 
								  "<td><input type=\"checkbox\" name=\"opt_delete\"></td>" + 
								  "</tr>";
						target.append(row);
					}
				}
			},
			error:function(){
				alert('操作失败');
			},
		});
	}else if(index == 2){
		//记录第二步填的数据
		transactions = [];
		$("#tableBox div[class='panel panel-default']").each(function(){
			var This = $(this);
			var tran = {};
			tran.tran_name = This.find("span[name='tran_name']").html();
			tran.res_name = This.find("span[name='res_name']").html();
			tran.table_guid = This.find("table").prop("id");
			tran.table_name = This.find("span[name='table_name']").html();
			tran.request_top = This.find("input[name='requestTotal']").val();
			tran.response_type = This.find("select[name='responseType']").val();
			//查询权限字段
			tran.opt_query = "";
			This.find("input[name='opt_query']:checked").each(function(){
				var t = $(this).parent().parent().find("td:eq(0)");
				tran.opt_query += t.html();
				tran.opt_query += ",";
			});
			if(tran.opt_query.length>0){
				tran.opt_query = tran.opt_query.substr(0,tran.opt_query.length-1);
			}
			//新增权限字段
			tran.opt_insert = "";
			This.find("input[name='opt_insert']:checked").each(function(){
				var t = $(this).parent().parent().find("td:eq(0)");
				tran.opt_insert += t.html();
				tran.opt_insert += ",";
			});
			if(tran.opt_insert.length>0){
				tran.opt_insert = tran.opt_insert.substr(0,tran.opt_insert.length-1);
			}
			//更新权限字段
			tran.opt_update = "";
			This.find("input[name='opt_update']:checked").each(function(){
				var t = $(this).parent().parent().find("td:eq(0)");
				tran.opt_update += t.html();
				tran.opt_update += ",";
			});
			if(tran.opt_update.length>0){
				tran.opt_update = tran.opt_update.substr(0,tran.opt_update.length-1);
			}
			//删除权限字段
			tran.opt_delete= "";
			This.find("input[name='opt_delete']:checked").each(function(){
				var t = $(this).parent().parent().find("td:eq(0)");
				tran.opt_delete += t.html();
				tran.opt_delete += ",";
			});
			if(tran.opt_delete.length>0){
				tran.opt_delete = tran.opt_delete.substr(0,tran.opt_delete.length-1);
			}
			transactions.push(tran);
		});
		var service = {
			guid:$("#service_guid").val(),
			service_name:$("#service_name").val(),
			service_description:$("#service_description").val(),
			transactions:transactions
		}
		//发送给服务器
		
		$.ajax({
	 		type: "POST",
			url:"saveService",
			data:JSON.stringify(service),
			contentType:'application/json;charset=UTF-8',
			success:function(d){
				var data = eval('(' + d +')');
				$("#service_guid").val(data.guid);
				var trans = data.transactions;
				var target = $("#requestorBox");
				target.empty();
				tran_reqs = [];
				for(var i=0;i<trans.length;i++){
					$("#requestorHidden span[name='tran_name']").html(trans[i].tran_name);
					$("#requestorHidden span[name='res_name']").html(trans[i].res_name);
					$("#requestorHidden span[name='table_name']").html(trans[i].table_name);
					$("#requestorHidden input[name='guid']").val(trans[i].guid);
					var t = {tran_guid:trans[i].guid,reqs:[]};
					tran_reqs.push(t);
					target.append($("#requestorHidden").html());
				}
			},
			error:function(){
				alert('操作失败');
			},
			beforeSend: function(){    
	            $("<div class=\"loading\">请稍候</div>").prependTo("#requestorBox");  
	        },   
	        complete: function(){    
	            $(".loading").remove();    
	        }
		});
	}else if(index == 3){
		saveTranReqs();
	}
	$('#myTab li:eq('+index+') a').tab('show');
	eventFun.setStep(index+1);
}

var cfg = [];
var tempReqs = [];//当前请求方信息数组
var index = 0;//当前会话索引（tran_reqs中）
var showBox;//当前显示请求方的div
function setRequestor(obj){
	var guid = $(obj).parent().parent().find("input[name='guid']").val();
	showBox = $(obj).parent().parent().find("div[class='requestors']");
	cfg.connectionName = "";
	cfg.connectionString = "";
	cfg.providerName = "";
	cfg.tableName = "RequestorMapper";
	cfg.sortName = "create_time";
	cfg.order = "asc";
	cfg.pageCount = 10;
	cfg.pageSelect = [ 50, 100, 200 ];
	cfg.where = "";
	cfg.condition = "";
	cfg.ajaxUrl = ctx + "/grid/get";
	cfg.width = "98%";
	cfg.height = "";
	cfg.request = "ajax";

	cfg.render = function(value, rowsData, key) {
		return value;
	}

	cfg.columns = [ {
		field : "guid",
		checkbox:true,
		name : "guid",
		width : "10%",
		align : "left",
	},{
		field : "req_name",
		name : "请求方名称",
		width : "45%",
		align : "left",
		render : cfg.render,
		order : true
	}, {
		field : "req_code",
		name : "请求方代码",
		width : "45%",
		align : "left",
		render : cfg.render,
		order : true
	}];
			 
	search();
	
	//将之前添加的请求方 默认添加
	$("#reqChose").empty();
	//找出对应reqs数组
	for(var i=0;i<tran_reqs.length;i++){
		if(tran_reqs[i].tran_guid == guid){
			tempReqs = [].concat(tran_reqs[i].reqs);//复制一份
			index = i;
			break;
		}
	}
	for(var i=0;i<tempReqs.length;i++){
		var html = "<span class=\"label label-info\" style=\"font-size:14px;margin-right:5px\">"+ tempReqs[i].req_name + 
				   "<span style=\"cursor:pointer;\" onclick=\"delReq(this,'"+ tempReqs[i].req_guid +"')\" class=\"glyphicon glyphicon-minus\"></span></span>"
		$("#reqChose").append(html);
	}
	//弹窗显示
	art.dialog({
        title: '选择请求方',
        content: document.getElementById('requestorListHidden'),
        lock: true,
        background: 'gray', // 背景色
        opacity: 0.87,  // 透明度
        id: '1',
	});
}

function addReq(){
	$("#grid tbody input:checkbox").each(function(){
		if($(this).prop("checked")==true){
			var t = $(this);
			//判断此人员是否已经添加
			for(var i=0;i<tempReqs.length;i++){
				if(tempReqs[i].req_guid == t.val()){
					return;
				}
			}
			var req = {
					req_guid : t.val(),
					req_name : t.parent().siblings(":eq(0)").html(),
			}
			tempReqs.push(req);
		}
	})
	$("#reqChose").empty();
	for(var i=0;i<tempReqs.length;i++){
		var html = "<span class=\"label label-info\" style=\"font-size:14px;margin-right:5px\">"+ tempReqs[i].req_name + 
				   "<span style=\"cursor:pointer;\" onclick=\"delReq(this,'"+ tempReqs[i].req_guid +"')\" class=\"glyphicon glyphicon-minus\"></span></span>"
		$("#reqChose").append(html);
	}
}

function delReq(obj,guid){
	$(obj).parent().remove();
	for(var i=0;i<tempReqs.length;i++){
		if(tempReqs[i].req_guid == guid){
			tempReqs.splice(i,1);
			return;
		}
	}
}

function checkReq(){
	//清空显示位置
	showBox.empty();
	//将选择结果显示到表格中
	for(var i=0;i<tempReqs.length;i++){
		var html = "<span class=\"label label-info\" style=\"font-size:14px;margin-right:5px\">"+ tempReqs[i].req_name + "</span>";
		showBox.append(html);
	}
	tran_reqs[index].reqs = tempReqs;
	tempReqs = [];
	//关闭对话框
	art.dialog.list['1'].close();
}

//转到第四步时保存请求方配置
function saveTranReqs(){
	$.ajax({
 		type: "POST",
		url:"saveTranReqs",
		data:JSON.stringify(tran_reqs),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d != "ok"){
				alert("未知错误！");
			}
		},
		error:function(){
			alert('操作失败');
		},
	});
}

//完成，保存配置的请求方信息
function finish(){
	$("#finish").prop("disabled",true);
	$.ajax({
 		type: "POST",
		url:"saveTranReqs",
		data:JSON.stringify(tran_reqs),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d == "ok"){
				location.href='toListService';
			}
		},
		error:function(){
			$("#finish").prop("disabled",false);
			alert('操作失败');
		},
	});
}

//完成2 保存接入信息
function finish2(){
	var code = $("#service_code").val();
	if(code == ""){
		alert("请填写位置！");
		return;
	}
	$("#checkInfo").empty();
	var data = {
		service_code:code,
		guid:$("#service_guid").val()
	}
	$.ajax({
 		type: "POST",
		url:"saveServiceCode",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d == ""){
				location.href='toListService';
			}else{
				var data = eval('(' + d + ')')
				$("#check_s_name").html(data.service_name);
				$("#check_s_decription").html(data.decription);
				$("#checkInfo").append($("#infoHidden").html());
			}
		},
		error:function(){
			alert('操作失败');
		}
	});
}

function lastStep(index){
	$('#myTab li:eq('+index+') a').tab('show');
	eventFun.setStep(index+1);
}

function addTran(){
	var html = $("#transactionHidden").html();
	$("#transactionBox").append(html);
}

function delTran(obj){
	$(obj).parent().parent().parent().remove()
}

//根据资源资源id查询表名
function getTableNames(obj){
	var self = $(obj);
	var target = self.parent().parent().parent().find("select[name='table_name']");
	target.empty();
	if(self.val() == 0){
		target.prop("disabled",true);
		return;
	}
	var data = {
			guid:self.val()
	}
	$.ajax({
 		type: "POST",
		url:"getTableNames",
		data:{guid:self.val()},
		contentType:'application/x-www-form-urlencoded',
		success:function(d){
			var data = eval('('+ d +')');
			for(var i=0;i<data.length;i++){
				var html = "<option value='" + data[i].guid + "'>" + data[i].table_name_en + "</option>";
				target.append(html);
			}
			target.prop("disabled",false);
		},
		error:function(){
			alert('操作失败');
		}
	});
}

//查询代码		
function search() {
	//清空cfg.where
	cfg.where="";
	if ($("input[flag='search']")) {
		$("input[flag='search']").each(function() {	
			//判断不为空的查询条件
				if ($(this).val() != ""){
					//调用解析方法，拼接where条件
					cfg.where += analysis(this);
			}												
		})
	}
	if ($("select[flag='search']")) {
		$("select[flag='search']").each(function() {
			//判断不为空的查询条件
			if ($(this).val() != ""){
				//调用解析方法，拼接where条件
			cfg.where += analysis(this);
			}
				})
	}
	 cfg.where = getResult(cfg.where);
	$("#grid").Grid(cfg);
}
function analysis(data) {
	//取得id和value，id包括运算符flag和列名id
	var id = $(data).attr("id");
	var val = $(data).val();
	var flag = id.split('_')[0];
	var index = id.indexOf("_");
	var id = id.substr(index+1);
	var sql = "";
	//通过判断，来拼写不同的sql语句
	switch (flag) {
	case "th": sql = "and " + id + " >= '" + val + "' "; break;
	case "ls": sql = "and " + id + " <= '" + val + "' "; break;
	case "eq": sql = "and " + id + " = '" + val + "' "; break;
	case "lk": sql = "and " + id + "  like  '%" + val + "%' "; break;
	case "ueq": sql = "and " + id + " != '" + val + "%' "; break;
	}
	return sql;
}
function getResult(data){
    //第一个参数必须；第二个、第三个参数可选
    var key1 = "1";  
    var key2 = "2"; 
    var key3 = "3"; 
    //加密方法        
    var  enResult = strEnc(data,key1,key2,key3);            		            
    //展示结果
   // alert(enResult);
    return enResult;
}