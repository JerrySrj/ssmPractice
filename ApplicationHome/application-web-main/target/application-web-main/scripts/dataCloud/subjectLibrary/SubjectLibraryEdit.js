$(function(){
	initDynamicTable();
	$("#frontMachineInfoDiv").InitForm();
})

/*
 * 保存前置机信息
 */
function saveFrontMachine() {
	$.ajax({
		cache: true,
		type: "post",
		url: ctx + "/extractDataJob/saveFrontMachine",
		data: $("#frontMachineForm").serialize(),
		error: function() {
			showErrorMsg("保存失败！");
		},
		success: function() {
			showInfoMsg("保存成功！", gotoFrontMachineList);
		}
	});
}

function gotoFrontMachineList() {
	window.location.href = ctx + "/extractDataJob/frontMachineList";
}