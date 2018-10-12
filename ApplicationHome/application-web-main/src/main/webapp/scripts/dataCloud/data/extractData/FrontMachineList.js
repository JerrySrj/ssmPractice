$(function(){
	initFrontMachineOtherInfo();
//	$('[data-toggle="tooltip"]').tooltip();
	initSearchResouce();
//	scrollData.init(scrollData.PageSize); 
})

function addFrontMachine() {
	window.location.href = ctx + "/extractDataJob/addFrontMachine";
}

function initSearchResouce() {
	$("#frontMachineResSearch").keyup(function(event) { 
		//TODO 判断键值，功能键不需要进行查询
		$.post(ctx + "/resources/searchResource", {"keyWord": $("#frontMachineResSearch").val()}, function(data) {
			var list = $.parseJSON(data);
			var liHtml = "";
			for(var i = 0; i < list.length; i++) {
				liHtml += "<li value=" + list[i].resNum + ">"
					   + list[i].resName
					   + "</li>";
			}
			$("#resDropDown").empty();
			$("#resDropDown").append(liHtml);
			$("#resDropDown").show();
			initResouceEvent();
		});
	});
}

//TODO del
function initResouceEvent() {
	$("#resDropDown li").mouseover(function() {
		$(this).addClass("complete-hover");
	});
	$("#resDropDown li").mouseout(function() {
		$(this).removeClass("complete-hover");
	});
	$("#resDropDown li").click(function() {
		$("#resNumber").val($(this).attr("value"));
		$("#frontMachineResSearch").val($(this).text());
		$("#resDropDown").hide();
	});
}

function filterFrontMachine(id, text) {
	$("#" + id).val(text);
	if(id == "netType") $("#os").val('');
	else $("#netType").val('');
	searchByCondition();
}

//TODO del
function chooseCk(obj, key) {
	var isChecked = false;
	$("input[name='ck" + key + "']").each(function() {
		if($(this).prop("checked")) {
			isChecked = true;
			if($("#" + key).val()) {
				if($("#" + key).val().indexOf($(this).val()) == -1)
					$("#" + key).val($("#" + key).val() + "," + $(this).val());
			} else $("#" + key).val($(this).val());
		} else {
			var chooseVal = $("#" + key).val();
			var arChooseVal = chooseVal.split(",");
			if(arChooseVal.indexOf($(this).val()) != -1)
				arChooseVal = arChooseVal.splice(arChooseVal.indexOf($(this).val()) + 1, 1);
			$("#" + key).val(arChooseVal.join(","));
		}
	});
	if(isChecked)
		$("#rd" + key).prop("checked", false);
	else
		$("#rd" + key).prop("checked", true);
		
}

function chooseAll(key) {
	$("input[name='ck" + key + "']").each(function() {
		$(this).prop("checked", false);
	});
	$("#" + key).val('');
}

/*
 * 根据条件搜索前置机操作
 */
function searchByCondition() {
	var param = {
			"netType": $("#netType").val(),
			"os": $("#os").val(),
			"hostName": $("#hostName").val()
	};
	$.ajax({
		url: ctx + "/extractDataJob/searchFrontMachine",
		data: param,
		type: "post",
		error: function() {
			showErrorMsg("查询发生错误！");
		},
		success: function(data) {
			var list = $.parseJSON(data);
			var listHtml = '';
			if(list.length == 0)
				listHtml += "<div class='no-frontmachine-data'>无前置机数据</div>";
			else {
				for(var i = 0; i < list.length; i++) {
					listHtml += "<div class='card'>"
							+ "<div class='card-title ellipsis-text'>"
							+ "<i class='fa fa-desktop'></i>"
							+ "<a href='" + ctx + "/extractDataJob/frontMachineDetail?guid=" + list[i].guid + "' style='color:#FFFFFF;' title='" + list[i].hostName + "'>" + list[i].hostName + "</a>"
							+ "</div><div class='card-content'>"
					listHtml += "<table style='width: 100%;table-layout: fixed;'>"
							+ "<colgroup><col style='width: 75px;'><col style='width: 125px;'></colgroup>"
							+ "<tr><td colspan='2' style='padding: 7px; text-align: center;'>";
					if(list[i].totalCount == 0)
						listHtml += "<div class='span span-blue span-padding'>无作业</div>";
					if(list[i].runningCount != 0)
						listHtml += "<div class='span span-blue span-padding'>运行作业</div>";
					if(list[i].stopCount != 0)
						listHtml += "<div class='span span-blue span-padding'>中止作业</div>";
					if(parseInt(list[i].totalCount) - parseInt(list[i].runningCount) - parseInt(list[i].stopCount) != 0)
						listHtml += "<div class='span span-blue span-padding'>未激活作业</div>";
					listHtml += "</td></tr>"
							+ "<tr><td class='card-label'>操作系统：</td>"
							+ "<td class='card-content'>" + list[i].os + "</td></tr>"
							+ "<tr><td class='card-label'>IP&nbsp;&nbsp;地址：</td>"
							+ "<td class='card-content ellipsis-text'>" + list[i].ip + "</td></tr>"
							+ "<tr><td class='card-label'>网络状态：</td>";
					if(list[i].connectState)
						listHtml += "<td class='card-content'>连接</td></tr>";
					else
						listHtml += "<td class='card-content'>断开</td></tr>";
					listHtml += "<tr><td class='card-label'>网络类型：</td>"
							+ "<td class='card-content'>" + list[i].netType + "</td></tr>"
							+ "<tr><td class='card-label'>作业总数：</td>";
					if(list[i].totalCount == 0)
						listHtml += "<td class='card-content'>无</td></tr>";
					else
						listHtml += "<td class='card-content'>" + list[i].totalCount + "</td></tr>";
					listHtml += "<tr><td class='card-label'>资源种类：</td>";
					if(list[i].resTypeCount == 0)
						listHtml += "<td class='card-content'>无</td></tr>";
					else
						listHtml += "<td class='card-content'>" + list[i].resTypeCount + "</td></tr>";
					listHtml += "</table></div></div>";
				}
			}
			$("#cardContent").empty();
			$("#cardContent").append(listHtml);
		}
	});
}

/*
 * 初始化前置机其他信息
 */
function initFrontMachineOtherInfo() {
	$("div[name='frontMachineListDiv']").each(function() {
		var guid = $(this).find("input[name='guid']").val();
	});
}

/*
 * 初始化运行作业数信息
 */
function getRunningJobCount(guid) {
	var nCount = 0;
	$.ajax({
		url: ctx + "/extractDataJob/getRunningJob",
		async: false,
		data: {"guid": guid},
		success: function(data) {
			nCount = data;
		},
		error: function() {
			showErrorMsg("获取运行作业数发生系统异常，请联系系统管理员！");
		}
	});
	return nCount;
}

//(function(){
//	scrollData = {
//			PageCount : 1,
//			PageSize : 8,
//			IsCompleted : false,
//			init : function(rows) { // 初始化，载入第一页数据
//				$("#cardContent").empty();
//				scrollData.IsCompleted = false;
//				scrollData.load(1, rows);
//			},
//			setPage : function() { // 数据载入成功，设置下一页索引
//				var $page = $("#PageIndex");
//				var index = parseInt($page.val()) + 1;
//				$page.val(index);
//			},
//			scroll : function(page, rows) { // 滚动到底部加载数据
//				if (scrollData.IsCompleted) {
//					return false;
//				}
//				var top = $(window).scrollTop();
//				var win = $(window).height();
//				var doc = $(document).height();
//				if ((top + win) >= doc) {
//					scrollData.load(page, rows);
//				}
//			},
//			load : function(page, rows) { // 载入数据方法
//				$("#PageIndex").val(page);
//				var param = {
//					"pageNum" : page,
//					"pageSize" : rows
//				};
//
//				var $msg = $('.load-btn');
//				$msg.removeClass('load-more').text('正在载入数据...');
//				$.ajax({
//					url : ctx + "/extractDataJob/getFrontMachineList",
//					type : "POST",
//					data : param,
//					success : function(jsonStr) {
//						var json = $.parseJSON(jsonStr);
//						scrollData.PageCount = json.pageCount;
//						var data = json.List;
//						if (data != null && data.length > 0) {
//							scrollData.append(data);
//							if (scrollData.PageCount == page) {
//								scrollData.IsCompleted = true;
//								$msg.removeClass('load-more').text('已加载全部数据！');
//								return true;
//							}
//							scrollData.setPage();
//							$msg.addClass('load-more').text('查看更多');
//							return true;
//						}
//						$msg.removeClass('load-more').text('已加载全部数据！');
//						return false;
//					},
//					error : function() {
//						$msg.removeClass('load-more').text('数据加载失败！点击重试。');
//					}
//				});
//				return false;
//			},
//			append : function(json) { // 构造html，并填充
//				var $container = $("#cardContent");
//				$.each(json, function(i) {
//					var html = $("#cardContent").tmpl(json[i]);
//					html.appendTo($container);
//				});
//			}
//		};
//})(); 