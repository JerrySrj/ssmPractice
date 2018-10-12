$(function(){
	initDynamicTable();
})

/*
 * 保存前置机信息
 */
function saveFrontMachine() {
	if(validate()) {
		$.ajax({
			cache: true,
			type: "post",
			url: ctx + "/extractDataJob/saveFrontMachine",
			data: $("#frontMachineForm").serialize(),
			error: function() {
				showErrorMsg("保存失败！");
			},
			success: function(data) {
				if(data > 0)
					showInfoMsg("保存成功！", gotoFrontMachineList);
				else
					showErrorMsg("保存失败！");
			}
		});
	}
}

function gotoFrontMachineList() {
	window.location.href = ctx + "/extractDataJob/frontMachineList";
}