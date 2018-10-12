$(function(){
	initFrontMachineOtherInfo();
	$('[data-toggle="tooltip"]').tooltip()
})

function addFrontMachine() {
	window.location.href = ctx + "/extractDataJob/addFrontMachine";
}

function chooseCk(obj, key) {
	var isChecked = false;
	$("input[name='ck" + key + "']").each(function() {
		if($(this).prop("checked")) {
			isChecked = true;
			if($("#" + key).val()) {
				if($("#" + key).val().indexOf($(this).val()) == -1)
					$("#" + key).val($("#" + key).val() + "," + $(this).val());
			} else $("#" + key).val($(this).val());
		} else {
			var chooseVal = $("#" + key).val();
			var arChooseVal = chooseVal.split(",");
			if(arChooseVal.indexOf($(this).val()) != -1)
				arChooseVal = arChooseVal.splice(arChooseVal.indexOf($(this).val()) + 1, 1);
			$("#" + key).val(arChooseVal.join(","));
		}
	});
	if(isChecked)
		$("#rd" + key).prop("checked", false);
	else
		$("#rd" + key).prop("checked", true);
		
}

function chooseAll(key) {
	$("input[name='ck" + key + "']").each(function() {
		$(this).prop("checked", false);
	});
	$("#" + key).val('');
}

/*
 * 根据条件搜索前置机操作
 */
function searchByCondition() {
	var param = {
			"netType": $("#netType").val(),
			"os": $("#os").val(),
			"hostName": $("#hostName").val(),
			"ip": $("#ip").val()
	};
	$.ajax({
		url: ctx + "/extractDataJob/searchFrontMachine",
		data: param,
		type: "post",
		error: function() {
			showErrorMsg("查询发生错误！");
		},
		success: function(data) {
			var list = $.parseJSON(data);
			var listHtml = '';
			$("#frontMachineListDiv").empty();
			for(var i = 0; i < list.length; i++) {
				listHtml += "<div class='col-sm-3 col-md-3' name='frontMachineListDiv'>"
						+ "<div class='panel panel-primary'>"
						+ "<div class='panel-heading'>"
						+ "<input type='hidden' name='guid' value='" + list[i].guid + "'/>"
						+ "<input type='hidden' name='ip' value='" + list[i].ip + "'/>"
						+ "<h3 class='panel-title'>"
						+ "主机名称：<a href='" +  ctx + "'/extractDataJob/frontMachineDetail?guid=" + list[i].guid + "'>" + list[i].hostName + "</a>"
						+ "</h3>"
						+ "<h3 class='panel-title'>"
						+ "IP地址：" + list[i].ip
						+ "</h3>"
						+ "<h3 class='panel-title'>"
						+ "网络：" + list[i].netType
						+ "</h3>"
						+ "<h3 class='panel-title'>"
						+ "操作系统：" + list[i].os
						+ "</h3>"
						+ "<h3 class='panel-title'>"
						+ "服务器状态：";
				if(list[i].connectState == '0')
					listHtml += "<span class='text-success'>连线 " 
							+ "<i class='glyphicon glyphicon-retweet' aria-hidden='true'></i>" 
							+ "</span>";
				else
					listHtml += "<span class='text-success'>连线 " 
							+ "<i class='glyphicon glyphicon-alert' aria-hidden='true'></i>" 
							+ "</span>";
				listHtml += "</h3></div>"
						+ "<div class='panel-body'>"
						+ "<div><label name='jobCount'>作业总数：</label><span>" + list[i].totalCount + "</span></div>"
						+ "<div><label name='jobCount'>采集作业数：</label><span>" + list[i].collectCount + "</span></div>"
						+ "<div><label name='jobCount'>开放作业数：</label><span>" + list[i].openCount + "</span></div>"
						+ "<div><label name='jobCount'>未分配作业数：</label><span>" + list[i].emptyCount + "</span></div>"
						+ "<div><label name='eventTip'>事件提醒：</label></div>"
						+ "<div><label name='resCount'>资源种类总数：</label><span>" + list[i].resCountCount + "</span></div>"
						+ "</div></div></div>";
			}
			$("#frontMachineListDiv").append(listHtml);
		}
	});
}

/*
 * 初始化前置机其他信息
 */
function initFrontMachineOtherInfo() {
	$("div[name='frontMachineListDiv']").each(function() {
		var guid = $(this).find("input[name='guid']").val();
	});
}

/*
 * 初始化运行作业数信息
 */
function getRunningJobCount(guid) {
	var nCount = 0;
	$.ajax({
		url: ctx + "/extractDataJob/getRunningJob",
		async: false,
		data: {"guid": guid},
		success: function(data) {
			nCount = data;
		},
		error: function() {
			showErrorMsg("获取运行作业数发生系统异常，请联系系统管理员！");
		}
	});
	return nCount;
}