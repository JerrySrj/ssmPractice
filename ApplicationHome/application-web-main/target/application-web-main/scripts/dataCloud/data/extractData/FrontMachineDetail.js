/*
 * 编辑前置机
 */
function modifyFrontMachine() {
	window.location.href = ctx + "/extractDataJob/editFrontMachine?guid=" + $("#guid").val();
}

/*
 * 删除确认
 */
function deleteConfirm() {
	showConfirm("确定删除该前置机？", deleteFrontMachine);
}

/*
 * 删除前置机操作
 */
function deleteFrontMachine() {
	$.post(ctx + "/extractDataJob/deleteFrontMachine", 
			{"guid" : $("#guid").val(), "updateUser": $("#updateUser").val()}, 
			function(data, status) {
				if(status == "success" && data > 0)
					showInfoMsg("删除成功！", gotoFrontMachineList);
				else 
					showErrorMsg("删除失败，请联系管理员！");
			});
}

function changeJobType(obj, jobId, frontMachineKey) {
	var param = {
			"jobType": $(obj).val(),
			"jobId": jobId,
			"frontMachineKey": frontMachineKey
	};
	$.post(ctx + "/extractDataJob/updateJobType", param, function(data, status) {
		if(status == "error") showErrorMsg("系统异常，请联系系统管理员！");
	});
}

/*
 * 显示明文密码
 */
function showPwd(obj) {
	$(obj).parent().addClass("hide");
	$(obj).parent().next().removeClass("hide");
}

/*
 * 隐藏明文密码
 */
function hidePwd(obj) {
	$(obj).parent().addClass("hide");
	$(obj).parent().prev().removeClass("hide");
}

/*
 * 显示日志
 */
function showJobLog(jobName, frontMachineKey) {
	window.location.href = ctx + "/extractDataJob/jobLogPage?jobName=" + jobName + "&frontMachineKey=" + frontMachineKey;
}

/*
 * 可视化监控
 */
function frontMachineMonitorPage(frontMachineKey, frontMachineName) {
	window.location.href = ctx + "/extractDataJob/frontMachineMonitorPage?frontMachineKey=" + frontMachineKey + "&frontMachineName=" + frontMachineName;
}