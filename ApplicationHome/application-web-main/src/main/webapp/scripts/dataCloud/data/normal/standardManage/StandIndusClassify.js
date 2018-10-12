// 删除标准分类及下级分类
function delSC(guid) {
	art.dialog({
		content : '是否确定删除？',
		ok : function() {
			$.ajax({
				type : "post",
				url : "delSCInfo",
				data : {
					"guid" : guid
				},
				success : function(data) {
					if (data > 0) {
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
