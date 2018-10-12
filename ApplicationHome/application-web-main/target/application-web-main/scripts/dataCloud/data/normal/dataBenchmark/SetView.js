$(function() {
	// 加载表格结构
	setTimeout(findTable, 3000);
	// 加载匹配数据元
	setTimeout(findMatchData, 6000);
	// 加载冗余数据
	setTimeout(redundantData, 6000);
	// 判断是否要创建表
	// judgeTable();
	// changeHeight();
});

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
		var datatype_num = $("#datatype_num").val();
		var data = {
			guid : guid
		}

		// 根据表主键，获取表结构
		$
				.ajax({
					type : "POST",
					url : "findTable",
					data : JSON.stringify(data),
					contentType : 'application/json;charset=UTF-8',
					async : false,
					success : function(d) {
						var table = eval("(" + d + ")");
						tb_engname = table.table_name_en;
						if ($("#datatype_status").val() == "3") {
							datatable_name = tb_engname + "_" + datatype_num;
						}
						if ($("#datatype_status").val() == "4") {
							datatable_name = tb_engname;
						}
						$("#tb" + guid + " tbody").empty();
						var fieldInfos = table.res_info_table_structure;
						var newhtml = "<tr style=\"font-size:20px\"><th colspan=\"11\" style=\"text-align:center\">"
								+ table.table_name_en
								+ " , "
								+ (table.table_type == 0 ? "主表"
										: (table.table_type == 1) ? "从表"
												: "字典表")
								+ "</th></tr><tr><th colspan=\"11\"><div style='float:left;font-size:12px;'><label><input type='radio' name='settype"
								+ guid
								+ "' value='1' id='jg"+guid+"' checked onclick=\"change('1','"
								+ guid
								+ "')\"/>只对结构</label><label><input type='radio' name='settype"
								+ guid
								+ "' value='2' id='nr"+guid+"' onclick=\"change('2','"
								+ guid
								+ "')\"/>只对内容</label><label><input type='radio' name='settype"
								+ guid
								+ "' value='0' id='ts"+guid+"' onclick=\"change('0','"
								+ guid
								+ "')\"/>同时比对</label></div><div>"
								+ ""
								+ "<span id='warn"
								+ guid
								+ "'  style='margin-right:5px;display:none !important;color:red;font-size:16px;'>请更新表！</span>"
								+ ""
								+ "<a id='create"
								+ guid
								+ "' class=\"btn btn-xs btn-warning\" style='margin-right:5px;display:none;' onclick=\"createTable('"
								+ datatable_name
								+ "','"
								+ guid
								+ "')\"><span class='glyphicon glyphicon-plus'></span>创建表</a><a id='update"
								+ guid
								+ "' class=\"btn btn-xs btn-success\" style='margin-right:5px;display:none;' onclick=\"updateTable('"
								+ datatable_name
								+ "','"
								+ guid
								+ "',this)\" uptb=''><span class='glyphicon glyphicon-eject'></span>更新表</span></a><a id='a"
								+ guid
								+ "' class=\"btn btn-xs btn-info\" style='margin-right:5px;' onclick=\"clearMatch('"
								+ guid
								+ "')\"><span class='glyphicon glyphicon-remove'></span>清除冗余数据<span id='sp"
								+ guid
								+ "'></span></a><a class=\"btn btn-xs btn-danger\" onclick=\"clearTable('"
								+ guid
								+ "')\" style=\"float:right\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>清空数据元</a><a class=\"btn btn-xs btn-primary\" onclick=\"autoAll(this,'"
								+ guid
								+ "')\" style=\"float:right;margin-right:5px;\"><span class=\"glyphicon glyphicon-link\" aria-hidden=\"true\"></span>自动匹配</a><a class=\"btn btn-xs btn-success\" onclick=\"exist()\" id='btn"
								+ guid
								+ "' style=\"float:right;margin-right:5px;display:none;\"><span class=\"glyphicon glyphicon-log-out\" aria-hidden=\"true\"></span>退出匹配</a></div></th></tr>"
								+ "<tr><th style=\"text-align:left;\">表描述</th><td colspan=\"10\">"
								+ table.table_description
								+ "<input type=\"hidden\" id=\"table_guid\" value=\""
								+ table.guid
								+ "\"></td>"
								+ "<tr><th colspan=\"2\" style=\"text-align:left;\">字段名</th><th style=\"text-align:left;\">描述</th><th style=\"text-align:left;\">类型</th><th style=\"text-align:left;\">长度</th><th style=\"text-align:left;\">主键</th><th style=\"text-align:left;\">标识</th><th style=\"text-align:left;\">时间戳</th><th style=\"text-align:left;\">外键</th><th style=\"text-align:left;\">数据元</th><th style=\"text-align:left;\">操作</th></tr>";

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
											: "")
									+ "</td>"
									+ "<td><div><span></span><select id='select"
									+ fieldInfos[j].guid
									+ "' style=\"display:none !important;\" class=\"form-control\" onchange=\"select(this,'"
									+ fieldInfos[j].guid
									+ "')\"></select></div></td><td><a class=\"btn btn-xs btn-warning\" onclick=\"lookData(this)\" style=\"margin-right:5px;padding:5px 10px;\" title=\"人工设置\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></a><a class=\"btn btn-xs btn-primary\" onclick=\"autoData(this)\" style=\"padding:5px 10px;\"  title=\"自动匹配\"><span class=\"glyphicon glyphicon-link\" aria-hidden=\"true\"></span></a><a class=\"btn btn-xs btn-default\" onclick=\"cancleAuto(this)\" style=\"padding:5px 10px;display:none;\"  title=\"取消自动匹配\"><span class=\"glyphicon glyphicon-log-out\" aria-hidden=\"true\"></span></a></td>";
							$("#tb" + guid + " tbody").append(html);
						}
						var data2 = {
							datatable_name : datatable_name
						}
						$
								.ajax({
									type : "post",
									url : "judgeTable",
									data : data2,
									async : false,
									success : function(ret) {
										if (ret == "nothave") {
											$("#create" + guid).show();
										} else {
											// 判断对标库表中是否有新增字段
											$
													.post(
															"judge",
															{
																"datatable_guid" : guid,
																"datatable_name" : datatable_name
															},
															function(ret) {
																var list = eval(ret);
																var str = "";
																// 有新增字段
																if (list.length > 0) {
																	$(
																			"#warn"
																					+ guid)
																			.show();
																	if (list.length == "1") {
																		str += list[0].dataitem_name
																				+ "  varchar(60)";
																		datatable_guid = list[0].datatable_guid;
																	} else {
																		str += "(";
																		for (var i = 0; i < list.length; i++) {
																			datatable_guid = list[i].datatable_guid;
																			str += list[i].dataitem_name
																					+ "  varchar(60),";
																		}
																		str = str
																				.substring(
																						0,
																						str.length - 1)
																				+ ")";
																	}
																	$(
																			"#update"
																					+ datatable_guid)
																			.attr(
																					"uptb",
																					""
																							+ str
																							+ "");
																	$(
																			"#update"
																					+ datatable_guid)
																			.show();
																	return;
																}
															})
										}
									}
								})
						$.ajax({
							type : "post",
							url : "judgeBenchmarkPlan",
							data : data,
							async : false,
							success : function(ret) {
								if(ret==0){
									$("#ts"+guid).prop("checked",true);
								}
								if(ret==1){
									$("#jg"+guid).prop("checked",true);
								}
								if(ret==2){
									$("#nr"+guid).prop("checked",true);
								}
							}
						})
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
// 在对标库中创建表
function createTable(datatable_name, datatable_guid) {
	// 创建表之前必须清除冗余字段
	var ry = $("#sp" + datatable_guid).html();
	// 有冗余字段，提示请清空冗余字段
	if (ry != "(0)") {
		dialog = art.dialog({
			title : '消息',
			lock : true,
			okVal : "确定",
			close : true,
			content : "请先清除冗余字段再创建表！",
			window : "top",
			ok : function() {
				// location.reload();
			}
		})
	} else {
		// 显示正在加载时要把之前的表先隐藏掉
		$("#tb" + datatable_guid).html("");
		$.ajax({
			type : "POST",
			url : "createTable",
			data : {
				"datatable_name" : datatable_name,
				"datatable_guid" : datatable_guid
			},
			success : function(ret) {
				if (ret == "ok") {
					dialog = art.dialog({
						title : '消息',
						lock : true,
						okVal : "确定",
						close : true,
						content : "创建成功！",
						window : "top",
						ok : function() {
							location.reload();
						}
					})
				} else {
					dialog = art.dialog({
						title : '消息',
						lock : true,
						okVal : "确定",
						close : true,
						content : "创建失败！",
						window : "top",
						ok : function() {
						}
					})
				}
			},
			beforeSend : function() {
				$("#load" + datatable_guid).show();
			},
			complete : function() {
				$("#load" + datatable_guid).hide();
			}
		});
	}
}
// 在对标库中更新表
function updateTable(datatable_name, datatable_guid, obj) {
	// 显示正在加载时要把之前的表先隐藏掉
	$("#tb" + datatable_guid).html("");
	// 获取str内容
	var str = $(obj).attr("uptb");
	$.ajax({
		type : "POST",
		url : "updateTable",
		data : {
			"datatable_name" : datatable_name,
			"str" : str
		},
		success : function(ret) {
			if (ret == "ok") {
				dialog = art.dialog({
					title : '消息',
					lock : true,
					okVal : "确定",
					close : true,
					content : "更新成功！",
					window : "top",
					ok : function() {
						location.reload();
					}
				})
			} else {
				dialog = art.dialog({
					title : '消息',
					lock : true,
					okVal : "确定",
					close : true,
					content : "更新失败！",
					window : "top",
					ok : function() {
					}
				})
			}
		},
		beforeSend : function() {
			$("#load" + datatable_guid).show();
		},
		complete : function() {
			$("#load" + datatable_guid).hide();
		}
	});
}
// 查询字段匹配数据元
function findMatchData() {
	// 获取表中所有字段主键
	var trs = $("tr[bz='contr']");
	for (var n = 0; n < trs.length; n++) {
		var dataitem_guid = $(trs[n]).attr("id");
		$
				.ajax({
					type : "post",
					url : "findMatchData",
					data : {
						"dataitem_guid" : dataitem_guid
					},
					async : false,
					success : function(ret) {
						if (ret != "null") {
							$($("#" + dataitem_guid).find("span")[0])
									.html(
											ret
													+ "&nbsp;&nbsp;<span class='glyphicon glyphicon-remove btnIcon' onclick=\"clearData(this,'"
													+ dataitem_guid
													+ "')\" style='cursor:pointer;'></span>");
						}

					}
				})
	}
}
// 加载冗余数据
var guidstr = "";
var guids = "";
var totalnum = 0;
var num = 0;
function redundantData() {
	// 获取页面所有表的主键
	var divs = $("div[bz='structure']");
	for (var m = 0; m < divs.length; m++) {
		var guid = $(divs[m]).attr("id");
		$.ajax({
			type : "post",
			url : "redundantData",
			data : {
				"datatable_guid" : guid
			},
			async : false,
			success : function(ret) {
				var datas = eval(ret);
				num = datas.length;

				// var tbhtml =
				// "<table><tr><td>字段名</td><td>数据元</td></tr></table>";
				var html = "";
				for (var n = 0; n < datas.length; n++) {
					html += "字段:" + datas[n].dataitem_name + ",数据元:"
							+ datas[n].data_name + ";";
					guids += "'" + datas[n].dataitem_guid + "',";
					// html+="<tr><td>"+datas[n].dataitem_name+"</td><td>"+datas[n].data_name+"</td></tr>";
				}
				if (guids != "") {
					var guidstr = guids.substring(0, guids.length - 1);
				}
				$("#sp" + guid).html("(" + num + ")");
				$("#a" + guid).attr("title", html);
				$("#inp" + guid).val(guidstr);
			}
		})
	}
	totalnum += num;
	$("#spall").html("(" + totalnum + ")");
}
// 人工设置数据元
var dialog;
var currentId = "";
function lookData(obj) {
	// 获取当前点击的行
	currentId = $(obj).parent().parent().attr("id");
	var guidhtml = "kong";
	var engname = "all";
	dialog = art
			.dialog({
				title : '数据元',
				lock : true,
				close : true,
				width : "55%",
				height : "50%",
				content : "<iframe src=\""
						+ ctx
						+ "/data/childrenData2?data="
						+ guidhtml
						+ "&engname="
						+ engname
						+ "\" style=\"width:100%;height:550px;\" frameborder=\"0\"></iframe>",
				window : "top"
			})
}
// 选择数据元
function chooseData(guid, identifier, name, engname) {
	dialog.close();
	// 保存匹配数据元以及判断是否需要更新表
	// 数据种类、数据项、数据表、数据元的主键和名称;对标方案值
	var datatype_guid = $("#datatype_guid").val();
	var datatype_name = $("#datatype_name").val();
	var datatype_status = $("#datatype_status").val();
	var datatype_num = $("#datatype_num").val();
	var datatable_guid = $("#" + currentId).parent().parent().parent().attr(
			"id");
	var orgtb_name = $("#" + currentId).parent().parent().parent().attr("name");
	var datatable_name = "";
	if (datatype_status == "3") {
		datatable_name = orgtb_name + "_" + datatype_num;
	}
	if (datatype_status == "4") {
		datatable_name = orgtb_name;
	}
	var dataitem_guid = currentId;
	var dataitem_name = $($("#" + currentId).children()[0]).html();
	var nameattr = "settype" + datatable_guid;
	var benchmark_plan = $("#" + datatable_guid).find(
			"input[name='" + nameattr + "']:checked").val();
	var data = {
		datatype_guid : datatype_guid,
		datatype_name : datatype_name,
		datatable_guid : datatable_guid,
		datatable_name : datatable_name,
		dataitem_guid : dataitem_guid,
		dataitem_name : dataitem_name,
		data_guid : guid,
		data_name : name,
		data_engname : engname,
		benchmark_plan : benchmark_plan
	};

	$
			.ajax({
				type : "post",
				url : "matchData",
				data : data,
				async : false,
				success : function(ret) {
					if (ret == "0") {
						dialog = art.dialog({
							title : '消息',
							lock : true,
							okVal : "确定",
							close : true,
							content : "数据元匹配失败，请稍后再试！",
							window : "top",
							ok : function() {
							}
						})
					} else {
						// 页面显示数据元信息
						$($("#" + currentId).find("span")[0])
								.html(
										name
												+ "&nbsp;&nbsp;<span class='glyphicon glyphicon-remove btnIcon' onclick=\"clearData(this,'"
												+ currentId
												+ "')\" style='cursor:pointer;'></span>");
						$
								.ajax({
									type : "post",
									url : "judgeTable",
									data : {
										datatable_name : datatable_name
									},
									async : false,
									success : function(ret) {
										if (ret == "nothave") {
											$("#create" + datatable_guid)
													.show();
										} else {
											// 判断对标库表中是否有新增字段
											$
													.post(
															"judge",
															{
																"datatable_guid" : datatable_guid,
																"datatable_name" : datatable_name
															},
															function(ret) {
																var list = eval(ret);
																var str = "";
																// 有新增字段
																if (list.length > 0) {
																	$(
																			"#warn"
																					+ datatable_guid)
																			.show();
																	if (list.length == "1") {
																		str += list[0].dataitem_name
																				+ "  varchar(60)";
																		datatable_guid = list[0].datatable_guid;
																	} else {
																		str += "(";
																		for (var i = 0; i < list.length; i++) {
																			datatable_guid = list[i].datatable_guid;
																			str += list[i].dataitem_name
																					+ "  varchar(60),";
																		}
																		str = str
																				.substring(
																						0,
																						str.length - 1)
																				+ ")";
																	}
																	$(
																			"#update"
																					+ datatable_guid)
																			.attr(
																					"uptb",
																					""
																							+ str
																							+ "");
																	$(
																			"#update"
																					+ datatable_guid)
																			.show();
																	return;
																}
															})
										}
									}
								})
					}
				}
			})
}
// 自动匹配数据元
function autoData(obj) {
	// 获取当前点击的行
	currentId = $(obj).parent().parent().attr("id");
	// 获取当前行的字段英文名
	var engname = $($(obj).parent().parent().find("td")[0]).html();
	var guidhtml = "kong";
	dialog = art
			.dialog({
				title : '数据元',
				lock : true,
				close : true,
				width : "55%",
				height : "50%",
				content : "<iframe src=\""
						+ ctx
						+ "/data/childrenData2?data="
						+ guidhtml
						+ "&engname="
						+ engname
						+ "\" style=\"width:100%;height:550px;\" frameborder=\"0\"></iframe>",
				window : "top"
			})

}
// 选择某一自动匹配数据元
function select(obj, guid) {
	var id = $(obj).attr("id");
	var name = $("#" + id + " option:selected").text();
	var data_guid = $("#" + id + " option:selected").val();
	var data_engname = $("#" + id + " option:selected").attr("engattr");
	$($("#" + guid).find("span")[0])
			.html(
					name
							+ "&nbsp;&nbsp;<span class='glyphicon glyphicon-remove btnIcon'onclick=\"clearData(this,'"
							+ guid + "')\" style='cursor:pointer;'></span>");
	$($("#" + guid).find("span")[0]).show();
	$(obj).hide();
	// 保存匹配数据元
	// 数据种类、数据项、数据表、数据元主键
	var datatype_guid = $("#datatype_guid").val();
	var datatype_name = $("#datatype_name").val();
	var datatype_num = $("#datatype_num").val();
	var datatype_status = $("#datatype_status").val();
	var datatable_guid = $("#" + guid).parent().parent().parent().attr("id");
	var orgtb_name = $("#" + guid).parent().parent().parent().attr("name");
//	var datatable_name = orgtb_name + "_" + datatype_num;
	var datatable_name = "";
	if (datatype_status == "3") {
		datatable_name = orgtb_name + "_" + datatype_num;
	}
	if (datatype_status == "4") {
		datatable_name = orgtb_name;
	}
	var dataitem_guid = guid;
	var dataitem_name = $($("#" + guid).children()[0]).html();
	var nameattr = "settype" + datatable_guid;
	var benchmark_plan = $("#" + datatable_guid).find(
			"input[name='" + nameattr + "']:checked").val();
	var data = {
		datatype_guid : datatype_guid,
		datatype_name : datatype_name,
		datatable_guid : datatable_guid,
		datatable_name : datatable_name,
		dataitem_guid : dataitem_guid,
		dataitem_name : dataitem_name,
		data_guid : data_guid,
		data_name : name,
		data_engname : data_engname,
		benchmark_plan : benchmark_plan
	};
	$.ajax({
		type : "post",
		url : "matchData",
		data : data,
		async : false,
		success : function(ret) {
			if (ret == "0") {
				dialog = art.dialog({
					title : '消息',
					lock : true,
					okVal : "确定",
					close : true,
					content : "数据元匹配失败，请稍后再试！",
					window : "top",
					ok : function() {
					}
				})
			}
		}
	})
}
// 删除已匹配数据元
function clearData(obj, guid) {
	dialog = art.dialog({
		title : '消息',
		content : "删除该字段已匹配数据元？",
		lock : true,
		okVal : "确定",
		ok : function() {
			// 清空数据元name
			$(obj).parent().html("");
			// 删除字段数据元关系
			$.ajax({
				type : "post",
				url : "delMatchData",
				data : {
					"datatiem_guid" : guid
				},
				async : false,
				success : function(ret) {
					// 刷新页面（假如该字段新配置了数据元，会提示更新表，若还没来得及更新表该字段便删除了则不需要更新表了）
					window.location.reload();
				}
			})
		}
	})
}
// 修改对标类型
function change(num, guid) {
	$.ajax({
		type : "post",
		url : "changeType",
		data : {
			"datatable_guid" : guid,
			"benchmark_plan" : num
		},
		async : false,
		success : function(ret) {
			// if(ret=="0"){
			// alert("对标类型选择失败！");
			// }
		}
	})
}
// 清空表中匹配数据元
function clearTable(guid) {
	dialog = art.dialog({
		title : '消息',
		content : "清空数据表中匹配数据元？",
		lock : true,
		// close : true,
		okVal : "确定",
		cancleVal : "取消",
		cancle : true,
		ok : function() {
			// 清空表中数据元关系
			$.ajax({
				type : "post",
				url : "clearTable",
				data : {
					"datatable_guid" : guid
				},
				async : false,
				success : function(ret) {

				}
			})
			location.reload();
		}
	})
}
// 清除冗余数据
function clearMatch(guid) {
	var guids = $("#inp" + guid).val();
	if (guids != "") {
		$.ajax({
			type : "POST",
			url : "clearMatch",
			data : {
				"guid" : guids
			},
			async : false,
			success : function(ret) {
				dialog = art.dialog({
					title : '消息',
					content : "冗余数据清除成功！",
					lock : true,
					okVal : "确定",
					ok : function() {
						dialog.close();
						location.reload();
					}
				})
			}
		})
	}
}
// //退出自动匹配
// function exist(){
// location.reload();
// }
// 自动匹配表中数据元
function autoAll(obj, guid) {
	// $(obj).hide();
	// $("#btn"+guid).show();
	var trs = $("#tb" + guid).find("tr[bz='contr']");
	for (var j = 0; j < trs.length; j++) {
		var dataitem_guid = $(trs[j]).attr("id");
		var engname = $($(trs[j]).children()[0]).html();
		var html = "<option>请选择匹配数据元</option>";
		// 自动匹配数据元
		var data = {
			engname : engname
		}
		$.ajax({
			type : "POST",
			url : "autoData",
			data : data,
			async : false,
			success : function(ret) {
				var datas = eval(ret);
				if (datas.length != "0") {
					// 让span标签隐藏,slelct控件内容清空,取消自动匹配按钮显示
					$($("#" + dataitem_guid).find("span")[0]).hide();
					$($("#" + dataitem_guid).find("select")[0]).html("");
					// $(obj).hide();
					// $(obj).next().show();
					for (var i = 0; i < datas.length; i++) {
						html += "<option value=" + datas[i].guid + " engattr="
								+ datas[i].eng_name + ">" + datas[i].name
								+ "</option>"
					}
					$($("#" + dataitem_guid).find("select")[0]).append(html);
					$($("#" + dataitem_guid).find("select")[0]).show();
				} else {
					$($("#" + dataitem_guid).find("span")[0]).html("暂无匹配数据元");
				}
			}
		})
	}
}
// // 取消自动匹配
// function cancleAuto(obj) {
// // 获取当前点击的行,让select清空并隐藏,让自动匹配按钮显示,让取消自动匹配按钮隐藏,让span显示
// currentId = $(obj).parent().parent().attr("id");
// $($("#" + currentId).find("select")[0]).html("");
// $($("#" + currentId).find("select")[0]).hide();
// $($("#"+currentId).find("span")[0]).show();
// $(obj).hide();
// $(obj).prev().show();
// }
// 全部自动匹配
// function autoAll(guid) {
// var trs = $("#" + guid).find("tr");
// for (i = 3; i < trs.length; i++) {
//
// }
// }

// 计算高度的方法
function changeHeight() {
	var rightHeight = $("#rightcontent").height();
	// alert(rightHeight);
	if (rightHeight > 600) {
		$("#leftmenu").height(rightHeight);
		$(".body").height(rightHeight);
	} else {
		$(".body").height("543");
	}
	// setLeftMenuHeight();
}