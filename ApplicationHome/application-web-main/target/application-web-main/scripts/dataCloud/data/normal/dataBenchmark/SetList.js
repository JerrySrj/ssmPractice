$(document).ready(function() {
	J_ToggleItems_click();
	setTimeout(loadData,3000);
	//J_ToggleItems_click();
})
// 选择数据元
function chooseData(guid, identifier, name) {
	$("#data_guid").val(guid);
	$("#data_name").val(name);
	dialog.close();
}
function loadData() {
	var searchStr = $("#condition").val();
	var data = {
		searchStr : searchStr
	};
	$.ajax({
		type : "POST",
		url : "findResource",
		data : JSON.stringify(data),
		contentType : 'application/json;charset=UTF-8',
		success : function(d) {
			var data = eval(d);
			showData(data);
		},
		error : function() {
			alert('服务出错，请稍后重试');
		},
		beforeSend: function(){    
			 $(".loading").show();
        },   
        complete: function(){    
            $(".loading").hide();    
        }
	});
}
function showData(data) {
	$("#showBox").empty();
	for (var i = 0; i < data.length; i++) {
		$("#resourceHidden a[name='link']").prop("href",
				ctx + "/resources/toShowResource?guid=" + data[i].guid);
		$("#resourceHidden a[name='set']").prop("href",
				ctx + "/benchmark/setView?guid=" + data[i].guid);
		$("#resourceHidden a[name='monitor']").prop("href",
				ctx + "/benchmark/monitorView?guid=" + data[i].guid);
		$("#resourceHidden a[name='report']").prop("href",
				ctx + "/benchmark/reportView?guid=" + data[i].guid);
		$("#resourceHidden b[name='res_name']").html(data[i].res_name);
		$("#resourceHidden a[name='res_guid']").html(data[i].guid);
		$("#resourceHidden span[name='res_responsible_party']").html(
				data[i].res_responsible_party);
		
		//统计
		$.ajax({
			type : "post",
			url : "resourceStatistic",
			data : {
				datatype_guid : data[i].guid
			},
			async : false,
			success : function(ret) {
				var data = eval("(" + ret + ")");
				// 统计匹配数据元数量、对标规则状态
				$("#resourceHidden span[name='matchdataNum']").html(
						"共&nbsp;<span class=\"badge\" style=\"background-color:#2288cc;width:60px;\">"
								+ data.matchdataNum + "</span>&nbsp;个");
				if (data.matchdataNum > 0) {
					$("#resourceHidden td[name='benchmarkRole']").html(
							"<div class='span span-blue'>已设置数据元</div>");
				} else {
					$("#resourceHidden td[name='benchmarkRole']").html(
							"<div class='span span-red'>未设置数据元</div>");
				}
				// 统计冗余数据元数量
				if (data.redundantNum > 0) {
					var dtHtml = $("#resourceHidden td[name='benchmarkRole']").html();
					$("#resourceHidden td[name='benchmarkRole']").html(
							dtHtml + "&nbsp;<div class='span span-red'>冗余"
								+ data.redundantNum + "个</div>");
				}
				// 获取对标规则数
				$("#resourceHidden span[name='rangeNum']").html(
						"共&nbsp;<span class=\"badge\" style=\"background-color:#2288cc;width:60px;\">"
								+ data.matchRange + "</span>&nbsp;个");
//				// 已对标行数、待对标行数
//				$("#resourceHidden span[name='finishNum']").html(
//						"共&nbsp;<span class=\"badge\" style=\"background-color:#2288cc;width:60px;\">"
//								+ data.totalHaveNum + "</span>&nbsp;行");
//				$("#resourceHidden span[name='unfinishNum']").html(
//						"共&nbsp;<span class=\"badge\" style=\"background-color:#2288cc;width:60px;\">"
//								+ data.totalNotNum + "</span>&nbsp;行");
			}
		})
		$("#resourceHidden span[name='table_count']").html(
				"共&nbsp;<span class=\"badge\" style=\"background-color:#2288cc;width:60px;\">"
						+ data[i].table_count + "</span>&nbsp;个");
		$("#resourceHidden span[name='structure_count']").html(
				"共&nbsp;<span class=\"badge\" style=\"background-color:#2288cc;width:60px;\">"
						+ data[i].structure_count + "</span>&nbsp;个");
		$("#resourceHidden div.card").clone().appendTo("#showBox");
	}
	$("#data_count").html(data.length);
}
// 选择资源种类、提供部门、接口类型、网络来源查询条件
var searchhtml = "";
var dataTypeValues = "";
var dataTypeHtml = "";
var depValues = "";
var depHtml = "";
var interfaceValues = "";
var interfaceHtml = "";
var netValues = "";
var netHtml = "";
var roleHtml = "";
var cateHtml = "";
var dataHtml = "";
function choose(obj, name) {
	//显示正在加载时要把之前的查询结果清空
	$("#showBox").html("");
	// 当前条件若有复选框选中，则“全部”按钮取消选中
	var checkedck = $("input[name='ck" + name + "']:checked");
	if (checkedck.length > 0) {
		$("#rd" + name).attr("checked", false);
	}
	// 拼接条件
	searchhtml = "";
	if (name == "dataType") {
		dataTypeHtml = "";
		// 若有复选框选中，则拼接条件。若没有复选框选中，则“全部”按钮被选中，同时移除掉条件。
		if ($(obj).prop("checked") == true) {
			var dataTypeValue = $(obj).val();
			dataTypeValues += "'" + dataTypeValue + "',";
		} else {
			dataTypeValues = "";
			var ckdataType = $("input[name='ckdataType']:checked");
			if (ckdataType.length == "0") {
				$("#rddataType").prop("checked", "checked");
			} else {
				for (var i = 0; i < ckdataType.length; i++) {
					dataTypeValues += "'" + $(ckdataType[i]).val() + "',";
				}
			}
		}
		if (dataTypeValues != "") {
			var dataTypeNewvalue = dataTypeValues.substring(0,
					dataTypeValues.length - 1);
			dataTypeHtml += " and a.RES_NAME in (" + dataTypeNewvalue + ")";
		}
	}
	if (name == "dep") {
		depHtml = "";
		// 若有复选框选中，则拼接条件。若没有复选框选中，则“全部”按钮被选中，同时移除掉条件。
		if ($(obj).prop("checked") == true) {
			var depValue = $(obj).val();
			depValues += "'" + depValue + "',";
		} else {
			depValues = "";
			var ckdep = $("input[name='ckdep']:checked");
			if (ckdep.length == "0") {
				$("#rddep").prop("checked", "checked");
			} else {
				for (var j = 0; j < ckdep.length; j++) {
					depValues += "'" + $(ckdep[j]).val() + "',";
				}
			}
		}
		if (depValues != "") {
			var depNewvalue = depValues.substring(0, depValues.length - 1);
//			depHtml += " and a.RES_RESPONSIBLE_PARTY in (" + depNewvalue + ")";
			depHtml += " and a.department_name in (" + depNewvalue + ")";
		}
	}
	if (name == "interface") {
		interfaceHtml = "";
		// 若有复选框选中，则拼接条件。若没有复选框选中，则“全部”按钮被选中，同时移除掉条件。
		if ($(obj).prop("checked") == true) {
			var interfaceValue = $(obj).val();
			interfaceValues += "'" + interfaceValue + "',";
		} else {
			interfaceValues = "";
			var ckinterface = $("input[name='ckinterface']:checked");
			if (ckinterface.length == "0") {
				$("#rdinterface").prop("checked", "checked");
			} else {
				for (var m = 0; m < ckinterface.length; m++) {
					interfaceValues += "'" + $(ckinterface[m]).val() + "',";
				}
			}
		}
		if (interfaceValues != "") {
			var interfaceNewvalue = interfaceValues.substring(0,
					interfaceValues.length - 1);
			interfaceHtml += " and a.DATABASE_TYPE in (" + interfaceNewvalue
					+ ")";
		}
	}
	if (name == "net") {
		netHtml = "";
		// 若有复选框选中，则拼接条件。若没有复选框选中，则“全部”按钮被选中，同时移除掉条件。
		if ($(obj).prop("checked") == true) {
			var netValue = $(obj).val();
			netValues += "'" + netValue + "',";
		} else {
			netValues = "";
			var cknet = $("input[name='cknet']:checked");
			if (cknet.length == "0") {
				$("#rdnet").prop("checked", "checked");
			} else {
				for (var j = 0; j < cknet.length; j++) {
					netValues += "'" + $(cknet[j]).val() + "',";
				}
			}
		}
		if (netValues != "") {
			var netNewvalue = netValues.substring(0, netValues.length - 1);
			netHtml += " and a.DEPLOY_NETWORK in (" + netNewvalue + ")";
		}
	}
	if (name == "已设置") {
		roleHtml = "";
		roleHtml += " and a.GUID in(select datatype_guid from data_criterion_benchmarkset group by datatype_guid)";
	} else if (name == "未设置") {
		roleHtml = "";
		roleHtml += " and a.GUID not in(select datatype_guid from data_criterion_benchmarkset group by datatype_guid)";
	}
	if (name == "内部资源") {
		cateHtml = "";
		cateHtml += " and a.is_inside = 0 and a.data_status >= 3";
	} else if (name == "外部资源") {
		cateHtml = "";
		cateHtml += " and a.is_inside = 1 and a.data_status >= 3";
	}
	if (name == "data") {
		dataHtml = "";
		var data_guid = $("#data_guid").val();
		if (data_guid != "") {
			dataHtml = " and a.GUID in(select datatype_guid from data_criterion_benchmarkset where data_guid='"
					+ data_guid + "' group by datatype_guid)";
		}
	}
	searchhtml += dataTypeHtml + depHtml + interfaceHtml + netHtml + roleHtml+ cateHtml
			+ dataHtml;
	$("#condition").val(searchhtml);
	loadData();
}
// 选择“全部”
function chooseAll(name) {
	//显示正在加载时要把之前的查询结果清空
	$("#showBox").html("");
	// 当前条件若选择全部，则该条件下所有复选框取消选中
	$("input[name='ck" + name + "']").attr("checked", false);
	// 该栏查询条件清空，重新拼接查询条件
	if (name == "dataType") {
		dataTypeHtml = "";
		dataTypeValues = "";
	}
	if (name == "dep") {
		depHtml = "";
		depValues = "";
	}
	if (name == "interface") {
		interfaceHtml = "";
		interfaceValues = "";
	}
	if (name == "net") {
		netHtml = "";
		netValues = "";
	}
	if (name == "role") {
		roleHtml = "";
	}
	if (name == "category") {
		cateHtml = "";
	}
	if (name == "data") {
		dataHtml = "";
	}
	searchhtml = dataTypeHtml + depHtml + interfaceHtml + netHtml + roleHtml+cateHtml
			+ dataHtml;
	$("#condition").val(searchhtml);
	loadData();
}
// 清空(清空内容并直接进行检索)
function clearRela() {
	$("#data_name").val("");
	$("#data_guid").val("");
	dataHtml = "";
	searchhtml = dataTypeHtml + depHtml + interfaceHtml + netHtml + roleHtml+cateHtml;
	$("#condition").val(searchhtml);
	$(".loading").show();
	loadData();
	$(".loading").remove();
}
// // 选择对标规则查询条件的“全部”
// function selectAllRole() {
// roleHtml = "";
// $("#condition").val(searchhtml);
// loadData();
// }
// // 选择对标规则查询条件
// var roleHtml = "";
// function selectRole(name) {
// roleHtml = "";
// if (name == "已设置") {
// roleHtml += "and a.GUID in(select datatype_guid from
// data_criterion_benchmarkset group by datatype_guid) order by a.guid asc";
// } else {
// roleHtml += "and a.GUID not in(select datatype_guid from
// data_criterion_benchmarkset group by datatype_guid) order by a.guid asc";
// }
// newSearchhtml = searchhtml + roleHtml;
// $("#condition").val(newSearchhtml);
// loadData();
// }

// 选择数据元条件
// var dataHtml = "";
function searchRela() {
	dataHtml = "";
	// searchhtml="";
	var data_guid = $("#data_guid").val();
	if (data_guid != "") {
		dataHtml = " and a.GUID in(select datatype_guid from data_criterion_benchmarkset where data_guid='"
				+ data_guid + "' group by datatype_guid)";
	}
	newSearchhtml = dataTypeHtml + depHtml + interfaceHtml + netHtml + roleHtml+cateHtml
			+ dataHtml;
	$("#condition").val(newSearchhtml);
	$(".loading").show();
	loadData();
	$(".loading").remove();
}

