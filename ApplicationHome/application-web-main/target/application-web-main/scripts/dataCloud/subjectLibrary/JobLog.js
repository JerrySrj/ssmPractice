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
				content += "<tr>"
						+ "<td>"
						+ "<a href='javascript:void(0)' onclick='goJobLogDetail(\"" + list[i].jobName + "\", \"" + list[i].channelId + "\", \"" + $("#frontMachineKey").val() + "\")'>" + list[i].jobName + "</a>"
						+ "</td>"
						+ "<td>" + list[i].jobStatus + "</td>"
						+ "<td>" + (parseInt(list[i].jobId) + 1) + "</td>"
						+ "<td>" + list[i].logDate + "</td>"
						+ "<td>";
				if(list[i].maxDate) {
					if(new Date(list[i].logDate).getTime() > new Date(list[i].maxDate).getTime())
						content += list[i].maxDate + "，有原始日志未结构化分析";
					else
						content += list[i].maxDate;
				} else
					content += "无结构化分析日志，请对原始日志进行结构化分析";
				content	+= "</td>"
						+ "<td>"
						+ "<button class='btn btn-xs btn-info' onclick='goJobLogDetail(\"" + list[i].jobName + "\", \"" + list[i].channelId + "\", \"" + $("#frontMachineKey").val() + "\")'>"
						+ "<i class='glyphicon glyphicon-eye-open'></i> 查看"
						+ "</button>"
						+ "</td>"
						+ "</tr>";
			}
			$("#logGrid table tbody").empty();
			$("#logGrid table tbody").append(content);
//				var maxLogdate = list[i].maxLogDate ? new Date(list[i].maxLogDate).format("yyyy-MM-dd hh:mm:ss") : "";
//				content += "<input type='hidden' id='maxDate_" + i + "' value='" + maxLogdate + "'/>"
//						+ "<input type='hidden' id='batchId_" + i + "' value='" + list[i].channelId  + "'/>"
//						+ "<div class='panel panel-default' style='margin-top:5px;'>"
//						+ "<div class='panel-heading' role='tab' id='headingOne'>"
//						+ "	<h4 class='panel-title'>"
//						+ "<a role='button' data-toggle='collapse' style='text-decoration: underline;color: #337ab7;'"
//						+ "data-parent='#accordion' href='#collapse_" + i + "' aria-expanded='true' "
//						+ " aria-controls='collapse_" + i + "' onclick='showLogField(\"" + i + "\")'>"
//						+ $("#jobName").val() + " 第" + (list[i].idJob + 1) + "次执行"
//						+ "，原始日志更新时间：" + new Date(list[i].logdate).format("yyyy-MM-dd hh:mm:ss") + "，"
//						+ "<span id='structuredDateInfo_" + i + "'>";
//				var maxLogDateStr = "";
//				if (maxLogdate == "")
//					maxLogDateStr = "无结构化分析日志，请对原始日志进行结构化分析";
//				else {
//					maxLogDateStr = "最后一次结构化分析日志时间：" + new Date(maxLogdate).format("yyyy-MM-dd hh:mm:ss");
//					var lastLogDate = new Date(maxLogdate);
//					var originalLogDate = new Date(list[i].logdate);
//					var dateDuration = originalLogDate.getTime() - lastLogDate.getTime();
//					var dayDuration = Math.floor(dateDuration/(24*3600*1000));
//					if(dayDuration >= 3)
//						maxLogDateStr += "有" + dayDuration + "天日志未结构化分析"
//				}
//				content += maxLogDateStr + "</span>"
//						+ "</a>"
//						+ "</h4>"
//						+ "</div>"
//						+ "<div id='collapse_" + i + "' class='panel-collapse collapse'"
//						+ " role='tabpane_" + i + "' aria-labelledby='headingOne'>"
//						+ "<div class='panel-body'>"
//						+ "<div class='subtitle subtitle-primary'>"
//						+ "<span class='glyphicon glyphicon-hand-right'></span>原始日志"
//						+ "</div>"
//						+ "<div class='clearfix'>"
//						+ "<button class='btn btn-success btn-xs pull-right' style='margin-left:5px;' onclick='structured(\"" + i + "\")'>"
//						+ "<i class='glyphicon glyphicon-list-alt'></i> 结构化分析"
//						+ "</button>"
//						+ "</div>"
//						+ "<div style='margin-bottom:20px;'>"
//						+ "<textarea id='logContent_" + i + "' class='form-control' style='resize:none;margin-top:10px;' readonly rows='10' cols=''></textarea>"
//						+ "</div>"
//						+ "<div class='subtitle subtitle-primary'>"
//						+ "<span class='glyphicon glyphicon-hand-right'></span>结构化分析日志"
//						+ "</div>"
//						+ "<div class='clearfix' style='margin-bottom:10px;'>"
//						+ "<button class='btn btn-primary btn-xs pull-right' style='margin-left:5px;' onclick='exportLog()'>"
//						+ "<i class='glyphicon glyphicon-floppy-save'></i> 导出"
//						+ "</button>"
//						+ "<button class='btn btn-warning btn-xs pull-right' onclick='cleanLogConfirm(\"" + i + "\")'>"
//						+ "<i class='glyphicon glyphicon-trash'></i> 清理"
//						+ "</button>"
//						+ "</div>"
//						+ "<div id='catalogueDiv'>"
//						+ "<div class='item-group'>"
//						+ "<div class='item-row'>"
//						+ "<div class='item-head'>"
//						+ "<h5>"
//						+ "<span title=''>执行结果</span>："
//						+ "</h5>"
//						+ "</div>"
//						+ "<div class='item-body'>"
//						+ "<div class='items'>"
//						+ "<div class='items-inner clearfix' id='div1'>"
//						+ "<a class='item item-active' title='全部' onclick='selectResult(\"\", \"" + i + "\")'>"
//						+ "<span class='type-choose'>全部</span>"
//						+ "</a>"
//						+ "<a class='item' title='成功' onclick='selectResult(\"1\", \"" + i + "\")'>"
//						+ "<span class='type-choose'>成功</span>"
//						+ "</a>"
//						+ "<a class='item' title='失败' onclick='selectResult(\"0\", \"" + i + "\")'>"
//						+ "<span class='type-choose'>失败</span>"
//						+ "</a></div></div></div></div></div></div>"
//						+ "<div class='grid'>"
//						+ "<table class='table table-striped table-hover gridtable' id='structuredLogTb_" + i + "'>"
//						+ "<thead><tr>" 
//						+ "<th>作业名称</th><th>执行开始时间</th>"
//						+ "<th>执行结束时间</th>"
//						+ "<th>执行时长</th>"
//						+ "<th>执行结果</th>"
//						+ "<th>错误环节</th>"
//						+ "<th>操作</th>"
//						+ "</tr>"
//						+ "</thead>"
//						+ "<tbody></tbody>"
//						+ "</table>"
//						+ "<div class='gridfooter col-md-12' style='margin-top:10px;'>"
//						+ "	<div class='pagecheck' style='line-height: 30px; float: left; width: 120px;'>每页&nbsp;"
//						+ "<select id='structuredPageSize_" + i + "' onchange='structuredChangePage(\"" + i + "\")'>"
//						+ "<option>10</option>"
//						+ "<option>50</option>"
//						+ "<option>100</option>"
//						+ "<option>200</option>"
//						+ "</select>&nbsp;行</div>"
//						+ "<div style='float: left; line-height: 30px;'>"
//						+ "<div class='pagecheck' id='structuredtotalRow_" + i + "'>共<span id='structuredTotalRowCount_" + i + "'></span>条</div>"
//						+ "<div class='pagecheck'><span id='structuredCurrentPage_" + i + "'></span>/<span id='totalPage_" + i + "'></span></div>"
//						+ "<div class='pagecheck' onclick='structuredChangePage(\"" + i + "\", \"first\")'>首页</div>"
//						+ "<div class='pagecheck' onclick='structuredChangePage(\"" + i + "\", \"previous\")'>上一页</div>"
//						+ "<div class='pagecheck' onclick='structuredChangePage(\"" + i + "\", \"next\")'>下一页</div>"
//						+ "<div class='pagecheck' onclick='structuredChangePage(\"" + i + "\", \"last\")'>末页</div>"
//						+ "<div class='pagecheck'>"
//						+ "<input class='pageText' id='structuredGoPage_" + i + "' style='width: 60px; height: 29px; position: relative;'>"
//						+ "</div>"
//						+ "<div class='pagecheck' onclick='structuredChangePage(\"" + i + "\")'>跳转</div>"
//						+ "</div></div>"
//						+ "</div>"
//						+ "</div>"
//						+ "</div>"
//						+ "</div>";
//			}
//			$("#accordion").empty();
//			$("#accordion").append(content);
		} else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

function goJobLogDetail(jobName, batchId, frontMachineKey) {
	window.location.href = ctx + "/extractDataJob/jobLogDetail?jobName=" + jobName + "&frontMachineKey=" + frontMachineKey + "&batchId=" + batchId;
}