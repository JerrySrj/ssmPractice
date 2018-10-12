$(function(){
	initDatetimePicker('beginDate');
	var now = new Date();
	now.setDate(now.getDate() + 30);
	initDatetimePicker('endDate', now);
})
/*
 * 清除结构化日志确认框
 */
function cleanLogConfirm() {
	var param = {
			"jobName": $("#jobName").val(), 
			"frontMachineKey": $("#frontMachineKey").val(), 
			"batchId" : $("#batchId").val(),
			"result": '',
			"currentPage": $("#currentPage").text(),
			"pageSize": $("#pageSize").val()
	};
	showConfirm("确定清理改作业日志？", cleanLog, param);
}

/*
 * 清除结构化日志
 */
function cleanLog(param) {
	$.post(ctx + "/extractDataJob/cleanJobLog", param, function(data, status) {
		if(status == "success") {
			if(data >= 0) {
				getStructuredLog(param);
				showInfoMsg("清理完成！");
				$("#maxDate").val('');
			}
		} else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

/*
 * 结构化日志操作
 */
function structured() {
	var structuredLogList = new Array();
	structuredLogList = createStructuredLogList(structuredLogList);
	if(structuredLogList.length == 0) {
		showInfoMsg("所有原始日志已经结构化分析", null);
		return;
	}
	$.ajax({
		url: ctx + "/extractDataJob/structuredLog",
		"type": "post",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(structuredLogList),
		dataType: "text",
		success: function(data) {
			if(data || data == "") {
				if(data) $("#maxDate").val(data);
				getStructuredLog();
				showInfoMsg("结构化分析完成");
			} else showErrorMsg("系统错误，请联系管理员！");
		}, 
		error: function() {
			showErrorMsg("系统错误，请联系管理员！");
		}
	});
}

/*
 * 生成结构日志记录list
 */
function createStructuredLogList(structuredLogList) {
	var jobName = $("#jobName").val();
	var regex = new RegExp("\\d{4}/\\d{2}/\\d{2} \\d{2}\\:\\d{2}\\:\\d{2} - " + jobName + " - " + jobName + "\\n[\\s\\S]*?\\d{4}/\\d{2}/\\d{2} \\d{2}\\:\\d{2}\\:\\d{2} - " + jobName + " - 完成作业项\\[[\\s\\S]*?\\] \\(结果=\\[[\\s\\S]*?\\]\\)", "g");
	var maxLogDate = $("#maxDate").val();
	var logContent = $("#logContent").val();
	
	var result;
	var arContent = new Array();
	while ((result = regex.exec(logContent)) != null)  {
		arContent.push(result[0]);
	}
	for (var i = 0; i < arContent.length; i++) {
		var timeRegex = new RegExp("\\d{4}/\\d{2}/\\d{2} \\d{2}\\:\\d{2}\\:\\d{2}", "g");
		var arRunTime = new Array();
		var arTime;
		while ((arTime = timeRegex.exec(arContent[i])) != null)  {
			arRunTime.push(arTime[0]);
		}
		//按行将日志分割
		var arLogLines = arContent[i].split("\n");
		//取得最后一行日志
		var lastLogLine = arLogLines[arLogLines.length - 1];
		//取得最后记录日志时间
		var lastLogDate = arRunTime[arRunTime.length - 1];
		if(!maxLogDate || (new Date(lastLogDate) > new Date(maxLogDate))) {
			var result = 1;
			if(lastLogLine.indexOf("false") > 0)
				result = 0
			var param = {
					"jobName": jobName,
					"frontMachineKey": $("#frontMachineKey").val(),
					"batchId": $("#batchId").val(),
					"beginDate": arRunTime[0],
					"endDate": lastLogDate,
					"result": result,
					"faultPosition": result ? "" : lastLogLine.substring(lastLogLine.indexOf("[") + 1, lastLogLine.indexOf("]")),
					"executionLog": arContent[i]
			}
			structuredLogList.push(param);
		}
	}
	return structuredLogList;
}

/*
 * 获取结构化日志
 */
function getStructuredLog(param) {
	var condition = {};
	if(!param) {
		condition = {
				"jobName": $("#jobName").val(),
				"frontMachineKey": $("#frontMachineKey").val(),
				"batchId": $("#batchId").val(),
				"result": '',
				"currentPage": $("#currentPage").text(),
				"pageSize": $("#pageSize").val()
		};
	} else condition = param;
	$.post(ctx + "/extractDataJob/getStructuredLog", condition, function(data, status) {
		if(status == "success") {
			var dataTr = "";
			var mpData = $.parseJSON(data);
			var structuredLogList = mpData.structuredLogList;
			$("#pageSize").val(mpData.structuredPageSize);
			$("#totalRowCount").text(mpData.structuredTotalRowCount);
			$("#currentPage").text(mpData.structuredCurrentPage);
			$("#totalPage").text(mpData.structuredTotalPageCount);
			if(structuredLogList.length > 0) {
				for(var i = 0; i < structuredLogList.length; i++) {
					dataTr += "<tr>";
					dataTr += "<td>" + structuredLogList[i].jobName + "</td>";
					dataTr += "<td>" + new Date(structuredLogList[i].structuredDate).format("yyyy-MM-dd hh:mm:ss") + "</td>";
					dataTr += "<td>" + new Date(structuredLogList[i].beginDate).format("yyyy-MM-dd hh:mm:ss") + "</td>";
					dataTr += "<td>" + new Date(structuredLogList[i].endDate).format("yyyy-MM-dd hh:mm:ss") + "</td>";
					dataTr += "<td>" + structuredLogList[i].executionDuration + "秒</td>";
					var result = structuredLogList[i].result == '1' ? '成功' : '失败';
					dataTr += "<td>" + result + "</td>";
					var faultPosition = structuredLogList[i].faultPosition ? structuredLogList[i].faultPosition : "无";
					dataTr += "<td>" + faultPosition + "</td>";
					dataTr += "<td><button class='btn btn-xs btn-info' onclick='showErrorLogPop(\"" + structuredLogList[i].guid + "\")'>显示日志</button></td>";
					dataTr += "</tr>";
				}
			} else {
				dataTr += "<tr><td colspan='8' class='no-structrued-text'>无结构化日志</td></tr>";
			}
			
			$("#structuredLogGrid table tbody").empty();
			$("#structuredLogGrid table tbody").append(dataTr);
		} else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

/*
 * 显示日志pop
 */
function showJobItemLogPop(jobName, itemName, frontMachineKey) {
	var param = {"jobName": jobName, "itemName": itemName, "frontMachineKey": frontMachineKey};
	pop("作业日志", "jobLogPopDiv", showJobItemLog, null, param);
}

/*
 * 显示日志
 */
function showJobItemLog(param) {
	$.post(ctx + "/extractDataJob/getJobItemLogField", param, function(data, status) {
		if(status == "success") 
			var list = $.parseJSON(data);
		$("#jobItemLogDiv").empty();
		if(list.length == 0) $("#jobItemLogDiv").append("<label>无日志数据</label>");
		else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

/*
 * 结构化日志筛选结构
 */
function selectResult(result) {
	$("#result").val(result);
	var param = {
			"jobName": $("#jobName").val(),
			"frontMachineKey": $("#frontMachineKey").val(),
			"batchId": $("#batchId").val(),
			"result": result,
			"currentPage": $("#currentPage" ).text(),
			"pageSize": $("#pageSize").val(),
			"beginDate": '',
			"endDate": ''
	};
	getStructuredLog(param);
}

function searchLog(flag) {
	var param = {
			"jobName": $("#jobName").val(),
			"frontMachineKey": $("#frontMachineKey").val(),
			"batchId": $("#batchId").val(),
			"result": $("#result").val(),
			"currentPage": $("#currentPage" ).text(),
			"pageSize": $("#pageSize").val()
	};
	if("all" == flag) {
		param.beginDate =  '';
		param.endDate = '';
	} else {
		$("#structuredDateFilter").removeClass("item-active");
		param.beginDate =  new Date($("#beginDate").val() + " 00:00:00").format("yyyy-MM-dd hh:mm:ss");
		param.endDate = new Date($("#endDate").val() + " 23:59:59").format("yyyy-MM-dd hh:mm:ss");
	}
	getStructuredLog(param);
}

/*
 * 结构化日志分页操作
 */
function structuredChangePage(flag) {
	var param = {
			"jobName": $("#jobName").val(),
			"frontMachineKey": $("#frontMachineKey").val(),
			"batchId": $("#batchId").val(),
			"result": "",
			"pageSize": $("pageSize").val()
	}
	switch (flag) {
	case 'first':
		param.currentPage = 1;
		break;
	case 'next':
		param.currentPage = parseInt($("#currentPage").text()) + 1;
		break;
	case 'previous':
		param.currentPage = parseInt($("#currentPage").text()) - 1 < 0 ? 1 : parseInt($("#currentPage").text()) - 1;
		break;
	case 'last':
		param.currentPage = $("#totalPage").text();
		break;
	default:
		param.currentPage = $("#goPage").val() > parseInt($("#totalPage").text()) ? $("#totalPage").text() : $("#goPage").val();
		break;
	}
	getStructuredLog(param);
}

/*
 * 显示错误日志pop
 */
function showErrorLogPop(guid) {
	var param = {
			"jobName": $("#jobName").val(),
			"frontMachineKey": $("#frontMachineKey").val(),
			"batchId": $("#batchId").val(),
			"guid": guid
	}
	var dialog = art.dialog({
	    title: '执行日志',
	    content: document.getElementById('logFieldPopDiv'),
	    init: function(){
	    	getErrorLog(param);
	    },
	    ok: function(){
	        return true;
	    }
	});
}

/*
 * 获取错误日志
 */
function getErrorLog(param) {
	$.post(ctx + "/extractDataJob/getErrorLog", param, function(data, status) {
		if(status == "success") {
			$("#errorLog").val(data);
		} else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

/*
 * 清理原始日志
 */
function cleanOriginalLog(batchId) {
	var param = {
			"jobName": $("#jobName").val(),
			"frontMachineKey": $("#frontMachineKey").val(),
			"batchId": $("#batchId").val()
	};
	$.post(ctx + "/extractDataJob/deleteOriginalLog", param, function(data, status) {
		if(status == "success" && data >= 0)
			showInfoMsg("清理完成。", null);
		else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

function exportLog() {
	var beginDate = $("#beginDate" ).val();
	var endDate = $("#endDate").val();
	var begin = new Date(beginDate);
	begin.setDate(begin.getDate() + 30);
	if(begin <= new Date(endDate)) {
		showErrorMsg("日志导出时间不能超过30天！");
		return;
	}
	var param = {
			"jobName": $("#jobName").val(),
			"frontMachineKey": $("#frontMachineKey").val(),
			"batchId": $("#batchId").val(),
			"result": $("#result").val(),
			"currentPage": $("#currentPage" ).text(),
			"pageSize": $("#pageSize").val(),
			"beginDate": new Date($("#beginDate").val() + " 00:00:00").format("yyyy-MM-dd hh:mm:ss"),
			"endDate": new Date($("#endDate").val() + " 23:59:59").format("yyyy-MM-dd hh:mm:ss")
	};
	location.href = ctx + "/extractDataJob/exportStructuredLog?" + $.param(param);
}