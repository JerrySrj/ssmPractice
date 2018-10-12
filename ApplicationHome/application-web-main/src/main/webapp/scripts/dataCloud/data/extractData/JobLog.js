/*
 * 删除原始日志
 */
function cleanOriginalLog() {
	var param = {
			"jobName": $("#jobName").val(),
			"frontMachineKey": $("#frontMachineKey").val(),
			"batchId": ''
	};
	$.post(ctx + "/extractDataJob/deleteOriginalLog", param, function(data, status) {
		if(status == "success" && data >= 0)
			showInfoMsg("清理完成。", null);
		else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

/*
 * 原始日志分页操作
 */
function changePage(flag) {
	var param = {
			"jobName": $("#jobName").val(),
			"frontMachineKey": $("#frontMachineKey").val(),
			"pageSize": $("#pageSize").val()
	};
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
	$.post(ctx + "/extractDataJob/changeLogPage", param, function(data, status) {
		if(status == "success") {
			var obj = $.parseJSON(data);
			$("#currentPage").text(obj.currentPage);
			$("#totalPage").text(obj.totalPageCount);
			$("#totalRow").text(obj.totalRowCount);
			$("#pageSize").val(obj.pageSize);
			var list = obj.jobLogList;
			var content = "";
			for(var i = 0; i < list.length; i++) {
				content += "<tr><td>"
						+ "<div style='display: inline-block; height: 50px;width:15%; vertical-align: top'>"
						+ "<p style='font-family: \"黑体\"'>" + list[i].jobName + "</p>"
						+ "<span><i class='glyphicon glyphicon-search' style=''></i>" + (parseInt(list[i].jobId) + 1) + "</span>"
						+ "<span><i class='glyphicon glyphicon-search'></i>" + list[i].jobStatus + "</span>"
						+ "</div>"
						+ "<div class='freelist-row-div' style='width:30%;'><span>"
						+ "<p style='font-family: \"黑体\"'>原始日记记录时间：" + list[i].logDate + "</p>"
						+ "</span></div>"
						+ "<div class='freelist-row-div' style='width:40%;'>"
						+ "<p style='font-family:  \"黑体\"'>日志结构化时间：";
				if(list[i].maxDate) {
					if(new Date(list[i].logDate).getTime() > new Date(list[i].maxDate).getTime())
						content += list[i].maxDate + "，有原始日志未结构化分析";
					else
						content += list[i].maxDate;
				} else
					content += "无结构化分析日志，请对原始日志进行结构化分析";
				content += "</p></div>"
						+ "<div class='freelist-row-div' style='text-align: right;'>"
						+ "<button class='btn btn-classical btn-info btn-sm' onclick='goJobLogDetail(\"" + list[i].jobName + "\", \"" + list[i].channelId + "\", \"" + $("#frontMachineKey").val() + "\")'>"
						+ "<i class='glyphicon glyphicon-eye-open'></i> 查看</button>"
						+ "</div></td></tr>";
			}
			$("#logFreeList").empty();
			$("#logFreeList").append(content);
//				content += "<tr>"
//						+ "<td>"
//						+ "<a href='javascript:void(0)' onclick='goJobLogDetail(\"" + list[i].jobName + "\", \"" + list[i].channelId + "\", \"" + $("#frontMachineKey").val() + "\")'>" + list[i].jobName + "</a>"
//						+ "</td>"
//						+ "<td>" + list[i].jobStatus + "</td>"
//						+ "<td>" + (parseInt(list[i].jobId) + 1) + "</td>"
//						+ "<td>" + list[i].logDate + "</td>"
//						+ "<td>";
//				if(list[i].maxDate) {
//					if(new Date(list[i].logDate).getTime() > new Date(list[i].maxDate).getTime())
//						content += list[i].maxDate + "，有原始日志未结构化分析";
//					else
//						content += list[i].maxDate;
//				} else
//					content += "无结构化分析日志，请对原始日志进行结构化分析";
//				content	+= "</td>"
//						+ "<td>"
//						+ "<button class='btn btn-xs btn-info' onclick='goJobLogDetail(\"" + list[i].jobName + "\", \"" + list[i].channelId + "\", \"" + $("#frontMachineKey").val() + "\")'>"
//						+ "<i class='glyphicon glyphicon-eye-open'></i> 查看"
//						+ "</button>"
//						+ "</td>"
//						+ "</tr>";
//			}
//			$("#logGrid table tbody").empty();
//			$("#logGrid table tbody").append(content);
		} else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

function goJobLogDetail(jobName, batchId, frontMachineKey) {
	window.location.href = ctx + "/extractDataJob/jobLogDetail?jobName=" + jobName + "&frontMachineKey=" + frontMachineKey + "&batchId=" + batchId;
}