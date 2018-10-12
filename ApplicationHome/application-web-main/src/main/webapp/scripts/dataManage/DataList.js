// 复选框全选 反选
function checkAll(obj, cName) {
	var checkboxs = document.getElementsByName(cName);
	for (var i = 0; i < checkboxs.length; i += 1) {
		checkboxs[i].checked = obj.checked;
	}
}
// 删除数据元
function del(guid) {
	art.dialog({
		content : '是否确定删除？',
		ok : function() {
			$.ajax({
				type : "post",
				url : "delData",
				data : {
					"guid" : guid
				},
				success : function(data) {
					if (parseInt(data) > 0) {
						location.reload();
					} else {
						alert("删除失败，请联系管理员！");
					}
				}
			})
		},
		cancelVal : '取消',
		cancel : true
	});
}
function downloadBatch(){
	var guid="";
//	var checkBoxs = document.getElementsByName("check");
//	for(var i=0;i<checkBoxs.length;i++){
//		if(checkBoxs[i].checked){
//			guid+=checkBoxs[i].value+",";
//		}
//	}
	// 读取数组中的值,拼接guid
	for (var m = 0; m < array.length; m++) {
		var ckguid = array[m];
		guid += ckguid + ",";
	}
	if(guid!=""){
		guid=guid.substring(0,guid.length-1);
		window.location.href="downloadBatch?guid="+guid;
	}else{
		art.dialog({
			content : '请选择下载内容',
			ok : function() {
			},
			cancelVal : '取消',
			cancel : true
		});
	}
	
}