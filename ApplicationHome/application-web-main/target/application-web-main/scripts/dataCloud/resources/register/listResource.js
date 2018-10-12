$(document).ready(
	function (){
		loadData();
	}		
)

function loadData(){
	var data = {
			searchStr:createSearchStr(),
			page:$("#page").val()
		};
	$.ajax({
 		type: "POST",
		url:"findResource",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval('('+d+')');
			showData(data);
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function showData(d){
	var data = d.types;
	$("#dataTable tbody").empty();
	for(var i=0;i<data.length;i++){
		$("#resourceHidden a[name='link']").prop("href",ctx+"/resources/toShowResource?guid="+data[i].guid);
		$("#resourceHidden span[name='res_name']").html(data[i].res_name);
		if(data[i].update_cycle == "数小时"){
			$("#resourceHidden span[name='update']").html("更新周期：每 " + data[i].update_time_point + " 小时");
		} else if(data[i].update_cycle == "一次性"){
			$("#resourceHidden span[name='update']").html("更新周期：在 " + data[i].update_time_point + " 一次性导入");
		} else if(data[i].update_cycle == "每年"){
			$("#resourceHidden span[name='update']").html("更新周期：" + data[i].update_cycle + " " + (data[i].update_time_point?data[i].update_time_point:"").substr(5,5));
		} else if(data[i].update_cycle == "每月"){
			$("#resourceHidden span[name='update']").html("更新周期：" + data[i].update_cycle + " " + (data[i].update_time_point?data[i].update_time_point:"").substr(3,2) + " 日");
		} else {
			$("#resourceHidden span[name='update']").html("更新周期：" + data[i].update_cycle + " " + data[i].update_time_point);
		}
		$("#resourceHidden span[name='source']").html("数据源："+data[i].source);
		$("#resourceHidden span[name='departmentInfo']").html(data[i].department_name);
		$("#resourceHidden span[name='admin_name']").html(data[i].admin_name);
		$("#resourceHidden span[name='admin_phone']").html(data[i].admin_phone);
		var status;
		var btn;
		if(data[i].data_status == 0){
			status = "未提交审核"
			btn = "<button type=\"button\" class=\"btn btn-classical btn-info\" style=\"float:right\" onclick=\"toExam('" + data[i].guid + "')\">提交</button>";
		}else if(data[i].data_status == 1){
			status = "审核中"
			btn = "<button type=\"button\" class=\"btn btn-classical btn-danger\" style=\"float:right\" onclick=\"toDenyExam('" + data[i].guid + "')\">退回</button>" +
				"<button type=\"button\" class=\"btn btn-classical btn-success\" style=\"float:right;margin-right:3px\" onclick=\"toFinishExam('" + data[i].guid + "')\">审结</button>";
				  
		}else if(data[i].data_status == 2){
			status = "审核通过"
			btn = "<button type=\"button\" class=\"btn btn-classical btn-info\" style=\"float:right\" onclick=\"toStroage('" + data[i].guid + "')\">入库</button>";
		}else if(data[i].data_status == 3){
			status = "已入库"
			btn = "";
		}else if(data[i].data_status == -1){
			status = "驳回"
			btn = "<button type=\"button\" class=\"btn btn-classical btn-info\" style=\"float:right\" onclick=\"toExam('" + data[i].guid + "')\">提交</button>";
		}
		$("#resourceHidden span[name='data_status']").html(status);
		$("#resourceHidden span[name='table_count']").html(data[i].table_count);
		$("#resourceHidden span[name='structure_count']").html(data[i].structure_count);
		$("#resourceHidden div[name='btnBox']").empty().append(btn);
		$("#resourceHidden tr").clone().appendTo("#dataTable tbody");
	}
	$("#data_count").html(d.total);
	$("#page").val(d.currentPage);
	$("#total").html(d.total);
	$("#pages").html(d.currentPage + "/" + d.pages);
	if(d.currentPage == 1){
		$("#prev").prop("disabled",true);
	}else{
		$("#prev").prop("disabled",false);
	}
	if(d.currentPage == d.pages){
		$("#next").prop("disabled",true);
	}else{
		$("#next").prop("disabled",false);
	}
}

function prev(){
	var oldval = $("#page").val();
	$("#page").val(parseInt(oldval)-1);
	loadData();
}
function next(){
	var oldval = $("#page").val();
	$("#page").val(parseInt(oldval)+1);
	loadData();
}

function toStroage(guid,obj){
	$(obj).hide();
	var data = {
			guid:guid,
			searchStr:createSearchStr(),
			page:$("#page").val()
		};
	$.ajax({
 		type: "POST",
		url:"toStroage",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval('('+d+')');
			showData(data);
		},
		error:function(){
			alert('服务出错，请稍后重试');
			$(obj).show();
		}
	});
}

function toFinishExam(guid){
	var data = {
			guid:guid,
			searchStr:createSearchStr(),
			page:$("#page").val()
		};
	$.ajax({
 		type: "POST",
		url:"toFinishExam",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval('('+d+')');
			showData(data);
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function toExam(guid){
	var data = {
			guid:guid,
			searchStr:createSearchStr(),
			page:$("#page").val()
		};
	$.ajax({
 		type: "POST",
		url:"toExam",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval('('+d+')');
			showData(data);
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function toDenyExam(guid){
	var data = {
			guid:guid,
			searchStr:createSearchStr(),
			page:$("#page").val()
		};
	$.ajax({
 		type: "POST",
		url:"toDenyExam",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval('('+d+')');
			showData(data);
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}
//查询方式对应的查询表达式
var like = " like ",
	eq	 = " = ",
	gt	 = " > ";
	lt	 = " < ",
	gteq = " >= ",
	lteq = " <= ",
	and	 = " and ",
	yearlike = " like ";

function changeSearchData(id,obj){
	var v = $(obj).val();
	$("#"+id).val(v);
	loadData();
}
function createSearchStr() {
	var searchStr = "";
	$("input.searchInput").each(function() {
		if(!$(this).val()) return;
		var searchCol = $(this).attr("data-for");
		if(!searchCol) return;
		var searchType = $(this).attr("search-type");
		if(!searchType) searchType = eq;
		var searchVal = $(this).val();
		switch(searchType) {
			case "like":
				searchStr += and + "a."+ searchCol + like + "'%" + searchVal + "%'";
				break;
			case "eq":
				searchStr += and + "a."+ searchCol + eq + "'" + searchVal + "'";
				break;
			case "gt":
				searchStr += and + "a."+ searchCol + gt + "'" + searchVal + "'";
				break;
			case "lt":
				searchStr += and + "a."+ searchCol + lt + "'" + searchVal + "'";
				break;
			case "gteq":
				searchStr += and + "a."+ searchCol + gteq + "'" + searchVal + "'";
				break;
			case "lteq":
				searchStr += and + "a."+ searchCol + lteq + "'" + searchVal + "'";
				break;
			case "yearlike":
				searchStr += and + "to_char(" + "a."+ searchCol + ", 'yyyy')" + yearlike + "'%'||" + "'" + searchVal + "'" + "||'%'";
				break;
			default:
				break;
		}
	});
	return searchStr;
}

var temp1="<b>表格数</b>";
var temp2="<b>字段数</b>";
var temp3="<b>资源描述 ：</b></br>户籍情况相关资源资源资源资源资源资源资源资源资源资源"
var temp4="<b>服务器系统：</b>windows</br><b>部署网络：</b>因特网</br><b>远程登陆：</b>允许</br><b>文件传输：</b>允许</br>"
function infoshow(obj,width,height,temp){
    var top=$(obj).offset().top;
    var left=$(obj).offset().left;
    var div=$('<div id="info"/>').addClass("textview").css({"left":left+10,"top":top+10,"position":"absolute","width":width,"height":height}).html(temp);
    $("body").append(div);
    $("#info").hide();
    $("#info").slideDown();
}
function inforemove(){
    $("#info").slideUp();
    setTimeout("$('.textview').remove()",100);
}