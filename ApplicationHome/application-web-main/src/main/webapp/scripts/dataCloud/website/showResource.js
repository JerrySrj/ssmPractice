//时间控件
$(function() {
	showUpdate();
	// showDataSouceInfo();
	// 加载表格结构
	findTable();
	//setTimeout(findTable, 3000);
});

function showUpdate() {
	if (update_cycle == "数小时") {
		$("#basicInfo td[name='update']").html("每 " + point + " 小时");
	} else if (update_cycle == "一次性") {
		$("#basicInfo td[name='update']").html("在 " + point + " 一次性导入");
	} else if (update_cycle == "每年") {
		$("#basicInfo td[name='update']").html(
				update_cycle + point.substr(5, 5));
	} else if (update_cycle == "每月") {
		$("#basicInfo td[name='update']").html(
				update_cycle + point.substr(3, 2) + " 日");
	} else {
		$("#basicInfo td[name='update']").html(update_cycle + " " + point);
	}
}
// //显示数据源信息
// function showDataSouceInfo(){
// var source = "";
// //alert(dataSourceInfo);
// if(dataSourceInfo.source == "数据库"){
// source = "数据库类型：" + dataSourceInfo.database_type
// + " 主机：" + dataSourceInfo.host + " 端口：" + dataSourceInfo.port + " 数据库名： " +
// dataSourceInfo.db_name + "<br>";
// }else{
// source = "服务地址：" + dataSourceInfo.host + "<br>";
// }
// var sourceInfo = "数据源类型：" + dataSourceInfo.source + "<br>"
// + source
// + "服务器系统：" + dataSourceInfo.system + " 部署网络："+ dataSourceInfo.deploy_network
// + "<br>"
// + "远程登陆：" + (dataSourceInfo.is_telnet==0?"允许":"不允许") + " 文件传输：" +
// (dataSourceInfo.is_file_output==0?"允许":"不允许") + "<br>"
// + "用户名：" + dataSourceInfo.account + "<br>"
// + "密码：" + dataSourceInfo.password + "<br>";
// $("#dataSource td[name='sourceInfo']").html(sourceInfo);
// }
// 查看表格结构方法
function findTable() {
	var html = "";
	var tb_engname = "";
	var datatable_name = "";
	// 获取页面所有表的主键
	var divs = $("div[bz='structure']");
	for (var m = 0; m < divs.length; m++) {
		var guid = $(divs[m]).attr("id");
		$("#tb" + guid + " tbody").empty();
		// var datatype_num = $("#datatype_num").val();
		var data = {
			guid : guid
		}
		// 根据表主键，获取表结构
		$.ajax({
					type : "POST",
					url : path+"/index/findTable",
					data : JSON.stringify(data),
//					data : {guid : guid},
					contentType : 'application/json;charset=UTF-8',
					async : false,
					success : function(d) {
						var table = eval("(" + d + ")");
						tb_engname = table.table_name_en;
						// if ($("#datatype_status").val() == "3") {
						// datatable_name = tb_engname + "_" + datatype_num;
						// }
						// if ($("#datatype_status").val() == "4") {
						// datatable_name = tb_engname;
						// }
						$("#tb" + guid + " tbody").empty();
						var fieldInfos = table.res_info_table_structure;
						var newhtml = "<tr style=\"font-size:20px\"><th colspan=\"11\" style=\"text-align:center\">"
								+ table.table_name_en
								+ " , "
								+ (table.table_type == 0 ? "主表"
										: (table.table_type == 1) ? "从表"
												: "字典表")
								+ "<tr><th style=\"text-align:left;\">表描述</th><td colspan=\"10\">"
								+ table.table_description
								+ "<input type=\"hidden\" id=\"table_guid\" value=\""
								+ table.guid
								+ "\"></td>"
								+ "<tr><th colspan=\"2\" style=\"text-align:left;\">字段名</th><th style=\"text-align:left;\">描述</th><th style=\"text-align:left;\">类型</th><th style=\"text-align:left;\">长度</th><th style=\"text-align:left;\">主键</th><th style=\"text-align:left;\">标识</th><th style=\"text-align:left;\">时间戳</th><th style=\"text-align:left;\">外键</th></tr>";

						$("#tb" + guid + " tbody").append(newhtml);
						for (var j = 0; j < fieldInfos.length; j++) {
							html = "<tr id="
									+ fieldInfos[j].guid
									+ " bz='contr'>"
									+ "<td colspan=\"2\" name=\"name\">"
									+ fieldInfos[j].name
									+ "</td><td name=\"description\">"
									+ fieldInfos[j].description
									+ "</td>"
									+ "<td name=\"type\">"
									+ fieldInfos[j].type
									+ "</td><td name=\"length\">"
									+ fieldInfos[j].length
									+ "</td>"
									+ "<td name=\"is_primary_key\">"
									+ (fieldInfos[j].is_primary_key == 1 ? "是"
											: "")
									+ "</td><td name=\"is_mark\">"
									+ (fieldInfos[j].is_mark == 1 ? "是" : "")
									+ "</td>"
									+ "<td name=\"is_time_stamp\">"
									+ (fieldInfos[j].is_time_stamp == 1 ? "是"
											: "")
									+ "</td><td name=\"is_foreign_key\">"
									+ (fieldInfos[j].is_foreign_key == 1 ? "是"
											: "") + "</td>";
							$("#tb" + guid + " tbody").append(html);
						}
						changeHeight();
					},
					error : function() {
						alert('操作失败');
					},
					beforeSend : function() {
						$(".loading").show();
					},
					complete : function() {
						$(".loading").hide();
					}
				});
	}
}
//计算高度的方法
function changeHeight() {
	var rightHeight = $("#rightcontent").height();
	// alert(rightHeight);
	if (rightHeight > 600) {
		$("#leftmenu").height(rightHeight);
		$(".body").height(rightHeight);
	} else {
		$(".body").height("543");
	}
	setLeftMenuHeight();
}
