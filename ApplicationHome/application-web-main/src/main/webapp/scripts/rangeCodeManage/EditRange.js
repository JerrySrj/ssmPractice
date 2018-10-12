$(function() {
	/*$("form").formvalidate();*/
	// 绑定标签页事件
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		if ($(e.target).attr('href') == "#step3") {
			showInfo();
		}
		// 当标签页显示时，重新计算页面高度
		//changeHeight();
	});
})

//// 计算高度的方法
//function changeHeight() {
//	var rightHeight = $("#rightcontent").height();
//	// alert(rightHeight);
//	if (rightHeight > 543) {
//		$("#leftmenu").height(rightHeight);
//		$(".body").height(rightHeight);
//	} else {
//		$(".body").height("543");
//	}
//	setLeftMenuHeight();
//}
// 选择相关标准
function chooseStandard(guid, code) {
	$("#standard_guid").val(guid);
	$("#standardnum").val(code);
	dialog.close();
}
// 全选、反选
function checkAll(obj, cName) {
	var checkboxs = document.getElementsByName(cName);
	for (var i = 0; i < checkboxs.length; i += 1) {
		checkboxs[i].checked = obj.checked;
	}
}
// 选择数据元
// 确认与提交页面数据元显示样式
// function chooseData(checkboxs) {
function chooseData(array) {
	$("#shujuyuan").html("");
	$("#viewsjy").html("");
	for (var i = 0; i < array.length; i += 1) {
		var str = array[i].split(",");
		var guid = str[0];
		var name = str[1];
		var html = "";
		var htmlview = "";
		html += "<div flag='divdata' guid='"
				+ guid
				+ "' class='col-md-3' style='margin:2px 0 2px 0;padding-left:0px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'><div class='pro'><a style='text-decoration:none;' title='"
				+ name
				+ "' href='viewData?userType=1&guid='"
				+ guid
				+ "''>"
				+ name
				+ "</a></div><div class='pro'><span class='glyphicon glyphicon-remove btnIcon' style='cursor:pointer;' onclick='delData(this)'></span></div><br/></div>"
		htmlview += "<div class='col-md-3' style='padding-left:0px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'><a style='margin-right: 20px;' href='viewData?userType=1&guid='"
				+ guid + "''  title='" + name + "'>" + name + "</a></div>"
		$("#shujuyuan").append(html);
		$("#viewsjy").append(htmlview);
	}
	dialog.close();
}
// 删除数据元
function delData(obj) {
	$(obj).parent().parent().remove();
}
var instance;
$(function() {
	// 发布日期控件初始化
	$('#publishdate').css("cursor", "pointer")
	$('#publishdate').datetimepicker({
		minView : "month",
		format : 'yyyy-mm-dd',
		todayHighlight : true,
		initialDate : new Date(),
		autoclose : true
	});
	/*$('#tel').numberbox({
		showMark : 1,
		showModel : 1,
	});*/
})
// 保存值域
function saveRange() {
	$.ajax({
		type : "post",
		url : "torange/saveRange",
		data : JSON.stringify(range_info),
		contentType : 'application/json;charset=UTF-8',
		success : function(d) {
			// alert("保存成功！");
			//location.href = "rangeCodeList";
			pageGoBack();
		},
		error : function() {
			alert('服务出错，请稍后重试');
		}
	});
}
// 动态框json获取，放到隐藏域
function info() {
	var Item = "";
	var Info = "";
	var divs = $("#shujuyuan").children();
	for (var i = 0; i < divs.length; i++) {
		Item = "guid:" + $(divs[i]).attr("guid");
		Info += "{" + Item + "},";
	}
	if (Info != "" && Info != null) {
		Info = Info.substring(0, Info.length - 1);
		Info = "[" + Info + "]";
		$("#ck").val(Info);
	} else {
		$("#ck").val("[]");
	}
}
// 保存值域代码集
function saveRangeSet() {
	var rangeset_code = $("#rangeset_code").val();
	var rangesetname = $("#rangesetname").val();
	var rangeset_statement = $("#rangeset_statement").val();
	var rangeset_classify_cname = $("#rangeset_classify_cname").val();
	var rangecode_guid = $("#rangecode_guid").val();
	var rangeset_guid = $("#rangeset_guid").val();
	var rangeset_rowid = $("#rangeset_rowid").val();
	var data = {
		"rangeset_code" : rangeset_code,
		"rangesetname" : rangesetname,
		"rangeset_statement" : rangeset_statement,
		"rangeset_classify_cname" : rangeset_classify_cname,
		"rangecode_guid" : rangecode_guid,
		"rangeset_guid" : rangeset_guid,
		"rangeset_rowid" : rangeset_rowid
	};
	$
			.post(
					"saveRangeSet",
					data,
					function(ret) {
						if (ret == "1") {
							// 保存成功，判断刚刚执行的是新增还是修改，执行不同的操作
							var bz = $("#bz").val();
							// 执行新增操作，则将该条数据追加到表中
							if (bz == "add") {
								var num = parseInt($("#ts").html()) + 1;
								$("#ts").html(num);
								var html = "";
								html += "<tr id='"
										+ rangeset_guid
										+ "' class='' num='"
										+ num
										+ "'>"
										+ "<td style='width: 20%; text-align: left;'>"
										+ rangeset_code
										+ "</td>"
										+ "<td style='width: 20%; text-align: left;'>"
										+ rangesetname
										+ "</td>"
										+ "<td style='width: 20%; text-align: left;'>"
										+ rangeset_statement
										+ "</td>"
										+ "<td style='width: 20%; text-align: left;'>"
										+ rangeset_classify_cname
										+ "</td>"
										+ "<td style='width: 20%; text-align: left;'><a style='cursor:pointer;' onclick=\"edit('"
										+ rangeset_guid
										+ "')\"><i class='glyphicon glyphicon-edit'></i></a>"
										+ "<a style='cursor:pointer;margin-right:10px;' onclick=del('"
										+ rangeset_guid
										+ "')><i class='glyphicon glyphicon-remove-circle'></i></a></td></tr>";
								$("#rangeset").append(html);
								$("#divRS").show();
							}
							// 执行修改操作，则该条数据替换表格中数据
							else {
								$(
										$("tr[id='" + rangeset_guid + "']")
												.children()[0]).html(
										rangeset_code);
								$(
										$("tr[id='" + rangeset_guid + "']")
												.children()[1]).html(
										rangesetname);
								$(
										$("tr[id='" + rangeset_guid + "']")
												.children()[2]).html(
										rangeset_statement);
								$(
										$("tr[id='" + rangeset_guid + "']")
												.children()[3]).html(
										rangeset_classify_cname);
								$("#divRS").show();
							}
							closeTab();
							$("#range").find("input").val("");
						}
					});
}

function edit(guid) {
	$("#divInfo").find("input").val("");
	$("#btnQX").show();
	// 修改：取值，页面显示
	if (guid != "") {
		$.post("selectRangeSet", {
			"guid" : guid
		}, function(ret) {
			var data = eval('(' + ret + ')');
			var code = data.rangeset_code;
			var name = data.rangesetname;
			var statement = data.rangeset_statement;
			var classify = data.rangeset_classify_cname;
			var guid = data.rangeset_guid;
			var rowid = data.rangeset_rowid;
			$("#rangeset_code").val(code);
			$("#rangesetname").val(name);
			$("#rangeset_statement").val(statement);
			$("#rangeset_classify_cname").val(classify);
			$("#rangeset_guid").val(guid);
			$("#rangeset_rowid").val(rowid);
			showTab();
			$("#bz").val("edit");
		})
	}
	// 新增：生成主键
	else {
		$.post("addRS", function(ret) {
			$("#rangeset_guid").val(ret);
		})
		showTab();
		$("#bz").val("add");
	}
}
function closeTab() {
	$("#divInfo").hide(500);
	$("#btnQX").hide();
}
function showTab() {
	$("#divInfo").show(500);
}
// 删除值域代码集
function del(guid) {
	art.dialog({
		content : '是否确定删除？',
		ok : function() {
			$.ajax({
				type : "post",
				url : "delRangeSet",
				data : {
					"guid" : guid
				},
				success : function(data) {
					if (data > 0) {
						$("tr[id='" + guid + "']").remove();
						// $(obj).parent().parent().remove();
						var num = parseInt($("#ts").html()) - 1;
						$("#ts").html(num);
						if (num == "0") {
							$("#divRS").hide();
							showTab();
							// 生成主键
							$.post("addRS", function(ret) {
								$("#rangeset_guid").val(ret);
							})
							// 标志为新增
							$("#bz").val("add");
						}
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
function choose(obj, name) {
	var flag = $(obj).prop("checked");
	if (flag == true) {
		$("#" + name).show();
		// 启用值域代码
		if (name == "range") {
			// 生成主键
			$.post("addRS", function(ret) {
				$("#rangeset_guid").val(ret);
			})
			// 标志为新增
			$("#bz").val("add");
		}
	} else {
		$("#" + name).hide();
		// 禁用值域规则
		if (name == "role") {
			$("#roles_content").val("");
		}
		// 禁用校验
		if (name == "check") {
			$("#check_plugin").val("");
		}
		// 禁用值域代码
		if (name == "range") {
			var num = $("#ts").html();
			$("#rangeset_code").val("");
			$("#rangesetname").val("");
			$("#rangeset_statement").val("");
			$("#rangeset_classify_cname").val("");
			if (num != "0") {
				// 标志为新增
				$("#bz").val("");
				$("#ts").html("0");
				showTab();
				$("#divRS").hide();
				$("#rangeset")
						.html(
								"<tr><th style=\"width: 20%;\">代码</th><th style=\"width: 20%;\">名称</th><th style=\"width: 20%;\">说明</th><th style=\"width: 20%;\">分类</th><th style=\"width: 20%;\">操作</th></tr>");
				// 清空该值域的值域代码集
				var guid = $("#rangecode_guid").val();
				$.post("clearRS", {
					"guid" : guid
				}, function(ret) {
				})
			}
		}
	}
}
function lastStep(index) {
	if (index == "1") {
		$("#divrole").hide();
		$("#divcheck").hide();
		$("#divrs").hide();
	}
	$('#myTab li:eq(' + index + ') a').tab('show');
	eventFun.setStep(index + 1);
}
function judge(obj) {
	if ($(obj).val() != "") {
		$(obj).css("border-color", "#ccc");
	}
}
var range_info = {};
function nextStep(index) {
	
	//原型需要
	$('#myTab li:eq(' + index + ') a').tab('show');
	eventFun.setStep(index + 1);
	//end
	if (index == "1") {
		if(validate()){
			range_info.guid = $("#guid").val();
			range_info.standard_guid = $("#standard_guid").val();
			range_info.standardnum = $("#standardnum").val();
			range_info.code = $("#code").val();
			range_info.name = $("#name").val();
			range_info.version = $("input[name='version']:checked").val();
			range_info.status = $("input[name='status']:checked").val();
			range_info.statement = $("#statement").val();
			range_info.rela_data = $("#viewsjy").html();
			// range_info.code_method=$("#editor").html();
			range_info.publishorg = $("#publishorg").val();
			range_info.publishdate = $("#publishdate").val();
			range_info.contact = $("#contact").val();
			range_info.tel = $("#tel").val();
			range_info.rowid = $("#rowid").val();
			// 相关数据元
			info();
			range_info.jsonc = $("#ck").val();
		}
	}
	if (index == "2") {
		range_info.roles_content = $("#roles_content").val();
		range_info.check_plugin = $("#check_plugin").val();
		range_info.tbhtml = $("#rangeset").html();
		range_info.ts = $("#ts").text();
		if ($("#roles_switch").prop("checked")) {
			range_info.roles_switch = "1";
			if (range_info.roles_content == null
					|| range_info.roles_content == "") {
				alert("请输入值域规则");
				return;
			}
		} else {
			range_info.roles_switch = "0";
		}
		if ($("#check_switch").prop("checked")) {
			range_info.check_switch = "1";
			if (range_info.check_plugin == null
					|| range_info.check_plugin == "") {
				alert("请输入值域验证");
				return;
			}
		} else {
			range_info.check_switch = "0";
		}
		if ($("#range_switch").prop("checked")) {
			range_info.range_switch = "1";
			if (range_info.ts == "0") {
				alert("请输入值域代码");
				return;
			}
		} else {
			range_info.range_switch = "0";
		}
	}
	if(validate()){
		$('#myTab li:eq(' + index + ') a').tab('show');
		eventFun.setStep(index + 1);
	}
	
}
