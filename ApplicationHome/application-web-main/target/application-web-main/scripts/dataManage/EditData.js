// 选择相关标准
function chooseStandard(guid, code) {
	$("#standard_guid").val(guid);
	$("#standardnum").val(code);
	dialog.close();
}
// 选择基数据元
function chooseData(guid, identifier, name) {
	$("#base_guid").val(guid);
	$("#base_identifier").val(identifier);
	$("#base_name").val(name);
	//查询基数据元信息并显示
	$.ajax({
		type : "post",
		url : "getDataDetail",
		data : {
			"guid" : guid
		},
		success : function(ret) {
			var data=eval("("+ret+")");
			$("#standardnum").val(data.standardnum);
			$("#code").val(data.code);
			$("#name").val(data.name);
			$("#eng_name").val(data.eng_name);
			$("#identifier").val(data.identifier);
			$("#standsample_value").val(data.standsample_value);
			$("#whole_name").val(data.whole_name);
			$("#range_statement").val(data.range_statement);
			$("#data_minlen").val(data.data_minlen);
			$("#data_maxlen").val(data.data_maxlen);
			$("#statement").val(data.statement);
			$("#publishorg").val(data.publishorg);
			$("#publishdate").val(data.publishdate);
			$("#contact").val(data.contact);
			$("#tel").val(data.tel);
			//值域
			if(data.range!=null&&data.range!=""){
				var range=eval(data.range);
				$("#rangecode_guid").val(range.guid);
				$("#zhiyu").html("<div class=\"clo-md-12\" id=\"zhiyudiv\"><div class=\"pro\" style=\"margin-right: 0px;\" id=\"zydiv\"><a  style=\"text-decoration: none\" href=\"viewRange?userType=1&guid="+range.guid+"\">"+range.code+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+range.name+"</a></div><div class=\"pro\" style=\"margin-left: 0px;\"><span class=\"glyphicon glyphicon-remove btnIcon\" onclick=\"delRange(this)\"></span></div><br></div>");
			}
			//版本、状态、数据类型
			$("input[type=radio][name='version'][value='"+data.version+"']").attr("checked",'checked'); 
			$("input[type=radio][name='status'][value='"+data.status+"']").attr("checked",'checked'); 
			$("#data_type").find("option[value = '"+data.data_type+"']").attr("selected","selected");
			//同义词(label和弹框)
			var html="";
			var synhtml="";
			if(data.synonymList!=null&&data.synonymList!=""){
				var synonymList=eval(data.synonymList);
				for(var i=0;i<synonymList.length;i++){
					var synvalue=synonymList[i].synonym;
					if(synvalue!=null&&synvalue!=""){
						html+="<div class=\"col-md-3\" style=\"padding-left: 0px; margin-top: 5px; margin-bottom: 5px;\"><span class=\"label label-primary\" style=\"padding-top: 5px; font-weight: initial;\">"+synvalue+"</span></div>";
						synhtml+="<tr role=\"row\" class=\"odd\"><td style=\"text-align: center\"><input type=\"checkbox\" name=\"ck\" bz=\"tbelement\"/></td><td class=\"\"><input type=\"text\" value=\""+synvalue+"\" bz=\"tbelement\"/></td></tr>";
					}
				}
				$("#tongyici").append(html);
				$($("#DemoTableBody").find("tr")[1]).remove();
				$("#DemoTableBody").append(synhtml);
			}
		}
	})
	dialog.close();
}

// 删除值域
function delRange(obj) {
	$(obj).parent().parent().remove();
	$("#rangecode_guid").val("");
}
$(function() {
 
	// 发布日期控件初始化
	$('#publishdate').css("cursor", "pointer")
	 $('#publishdate').datetimepicker({
		minView : "month",
		format : 'yyyy-mm-dd',
		todayHighlight : true,
		initialDate : new Date(),
		autoclose : true,
		pickerPosition:"top-right",
	}); 
	// 全选
	$("#AllCk").click(function() {
		if ($(this).is(":checked")) {
			$('[name=ck]:checkbox').prop("checked", true);
		} else {
			$('[type=checkbox]:checkbox').prop('checked', false);
		}
	})
})
// 增加行
function addRows() {
	// 克隆隐藏行
	var $tr = $("#DemoTable tr").eq(0).clone(true);
	// 给新增行第一个单元格添加名字
	$($tr.find("input")[1]).attr("name", "cl_lysj");
	// 去掉克隆行隐藏属性
	$("#DemoTable tr:last").after($tr.css({
		"display" : ""
	}));
}
// 删除行
function delRows() {
	var ckbs = $("input[name=ck]:checked");
	if (ckbs.size() == 0) {
		alert("要删除指定行，需选中要删除的行！");
		return;
	}
	ckbs.each(function() {
		var l = $("#DemoTableBody").children().length;
		if (l == 2) {
			$("#DemoTableBody").find("input").val("");
			return;
		}
		$(this).parent().parent().remove();
	});
}

// 保存数据元
function saveDataInfo() {
	if ($("#metadatatype").val() == "2") {
		// 检查基数据元是否为空
		if ($("#base_name").val() == "") {
			$("#base_name").css("border-color", "red");
			alert("请选择基数据元");
			return;
		}
		// 检查限定词中文名称是否为空
		if ($("#deter_name").val() == "") {
			$("#deter_name").css("border-color", "red");
			alert("请填写限定词中文名称");
			return;
		}
		// 检查限定词英文名称是否为空
		if ($("#deter_engname").val() == "") {
			$("#deter_engname").css("border-color", "red");
			alert("请填写限定词英文名称");
			return;
		}
	}
	// 获取同义词
	info("ck");
	if(validate()){
//		// 检查长度
//		if ($("#data_maxlen").val() <= $("#data_minlen").val()) {
//			$("#data_minlen").css("border-color", "red");
//			$("#data_maxlen").css("border-color", "red");
//			alert("最大值要大于最小值");
//			return;
//		}
		$('form')[0].submit();
	}
}
// 动态框json获取，放到隐藏域
function info(ck) {
	var Items, Item = "";
	Info = "";
	$('[name=' + ck + ']:checkbox').each(
			function() {
				Items = $(this).parent().parent();
				for (var i = 1; i < Items.children().length; i++) {
					if (Items.children().eq(i).find("input").val() != "") {
						Item += "'val" + i + "':'"
								+ Items.children().eq(i).find("input").val()
								+ "';";
					} else {
						Item = "";
						break;
					}
				}
				if (Item != "") {
					Info += "{" + Item + "},";
				}
				Item = "";
			})
	if (Info != "" && Info != null) {
		Info = Info.substring(0, Info.length - 1);
		Info = "[" + Info + "]";
		$("#" + ck + "").val(Info);
	}
}
// 一级数据元
function first() {
//	// 必填项隐藏
//	$("#imptr").hide();
//	var items = $("#listTable").find("td").children();
//	for (var i = 0; i < items.length; i++) {
//		$(items[i]).val("");
//	}
//	// 清空表格
//	cleartb();
//	// 表格可编辑
//	opeShow();
//	$("#name").val("");
//	$("#identifier").val("");
//	$("#name").removeAttr("readonly");
//	$("#identifier").removeAttr("readonly");
//	$("#metadatatype").val("1");
	window.location.reload();
}
// 二级数据元
function second() {
	// 清空必填项
//	$("#base_name").val("");
//	$("#base_guid").val("");
//	$("#base_identifier").val("");
//	$("#deter_name").val("");
//	$("#deter_engname").val("");
	// 清空表格
	cleartb();
	// 必填项显示
	$("#imptr").show();
	// 表格不可编辑
//	opeHide();
	$("#metadatatype").val("2");
}
// 判断必填信息是否已填写
function judge() {
	var base = $("#base_name").val();
	var name = $("#deter_name").val();
	var identifier = $("#deter_engname").val();
	// 若均填写
	if (base != "" && name != "" && identifier != "") {
		opeShow();
		var dataname = $("#deter_name").val() + "_" + $("#base_name").val();
		var dataidentifier = $("#deter_engname").val() + "_"
				+ $("#base_identifier").val();
		$("#name").val(dataname);
		$("#name").attr("readonly", "true");
		$("#identifier").val(dataidentifier);
		$("#identifier").attr("readonly", "true");
		$("#base_name").css("border-color", "#ccc");
		$("#deter_name").css("border-color", "#ccc");
		$("#deter_engname").css("border-color", "#ccc");
	}
	// 若有信息未填写
	else {
		opeHide();
		$("#name").val("");
		$("#identifier").val("");
		$("#base_name").css("border-color", "red");
		$("#deter_name").css("border-color", "red");
		$("#deter_engname").css("border-color", "red");
	}
}
// 表格不可编辑
function opeHide() {
//	//$("#tyc").removeAttr("data-target");
//	$("#tyc").attr("data-target","");
//	//$("#zy").removeAttr("onclick");
//	$("#zy").attr("onclick","");
//	//$("#zy").unbind("onclick");
//	$("input[bz='tbelement']").attr("disabled", "true");
//	$("textarea[bz='tbelement']").attr("disabled", "true");
//	$("select[bz='tbelement']").attr("disabled", "true");
}
// 表格可编辑
function opeShow() {
//	$("#tyc").attr("data-target", "#myModal");
//	$("#zy").attr("onclick", "lookRange()");
//	$("input[bz='tbelement']").removeAttr("disabled");
//	$("textarea[bz='tbelement']").removeAttr("disabled");
//	$("select[bz='tbelement']").removeAttr("disabled");
}
// 清空表格
function cleartb() {
	$("input[bz='tbelement']").val("");
	$("textarea[bz='tbelement']").val("");
	$("#tongyici").html("");
	$("#synonym").val("");
	//$("#myModal").find("input").val("");
	$("#zhiyu").html("");
}
function blur(obj) {
	if ($(obj).val() != "") {
		$(obj).css("border-color", "#ccc");
	}
}
