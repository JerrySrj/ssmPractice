//复选框全选 反选
function checkAll(obj, cName) {
	var checkboxs = document.getElementsByName(cName);
	for (var i = 0; i < checkboxs.length; i += 1) {
		checkboxs[i].checked = obj.checked;
	}
}

