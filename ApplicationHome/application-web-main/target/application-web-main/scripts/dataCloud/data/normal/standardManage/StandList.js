

// 全选、反选
function checkAll(obj, cName) {
	var checkBoxs = document.getElementsByName(cName);
	for (var i = 0; i < checkBoxs.length; i += 1) {
		checkBoxs[i].checked = obj.checked;
	}
}

// 选择某一分类要执行的各种操作
function chooseSC(obj,guid, name, num) {
	// 获取全部标志，看看前一步是不是点击了全部
	var flag = $("#div1").attr("biaozhi");
	$("#div1").removeAttr("biaozhi");
	// 判断是否已存在同级分类
	var array = $("#position").find("a[num='" + num + "']");
	// 已存在同级分类
	if (array.length != "0") {
		// 替换当前位置中的同级分类
		$("#" + num)
				.html(
						"<a  class=\"pro\"  num="
								+ num
								+ " guid="
								+ guid
								+ "><font>"
								+ name
								+ "</font><span style=\"cursor:pointer;border-left:1px solid red;margin-left:5px;font-size:14px\" onclick=\"selectSC(this,'"
								+ guid + "','" + name + "','" + num
								+ "')\">×</span></a>");
		// 选中的分类蓝色显示
		divstyle(name);
		
		// 修改下级分类
		$
				.ajax({
					type : "post",
					url : "${ctx}/policestand/childrenSC",
					data : {
						"guid" : guid
					},
					async : false,
					success : function(data) {
						var nextnum = parseInt(num) + 1;
						var html = "<a class=\"item item-active\" title=\"全部\" onclick=\"selectAll(this)\" num='"
								+ nextnum
								+ "'><span class=\"type-choose active\">全部</span></a>";
						var dataSC = eval(data);
						// 无下级
						if (dataSC.length == "0") {
							$("#div2")
									.html(
											"<a href=\"#\" class=\"item\" title=\"无\"><span class=\"type-choose\">无</span></a>");
						}
						// 有下级
						// 遍历下级分类信息
						else {
							for (var i = 0; i < dataSC.length; i++) {
								var guidSC = dataSC[i].guid;
								var nameSC = dataSC[i].name;
								html += "<a onclick=\"chooseSC(this,'"
										+ guidSC
										+ "','"
										+ nameSC
										+ "','"
										+ nextnum
										+ "')\" class=\"item\" flag=\"true\" num='"
										+ nextnum
										+ "'><span class=\"type-choose\">"
										+ nameSC
										+ "</span><span class=\"type-choose\" style=\"display:none !important;\" flag=\"spguid\">"
										+ guidSC + "</span></a>";
							}
							$("#div2").html(html);
						}
					}
				})
		// 加载完数据再次判断更多按钮是否显示
		// J_ToggleItems_click();
	}
	// 无同级分类
	else {
		var nextnum = parseInt(num) + 1;
		var poshtml = "";
		// 修改当前位置
		poshtml += "<div id=\"all"
				+ num
				+ "\"><div id="
				+ num
				+ "><a class=\"pro\"  num="
				+ num
				+ " guid="
				+ guid
				+ "><font>"
				+ name
				+ "</font><span style=\"cursor:pointer;border-left:1px solid red;margin-left:5px;font-size:14px\" onclick=\"selectSC(this,'"
				+ guid + "','" + name + "','" + num
				+ "')\">×</span></a></div></div>";
		$("#position").append(poshtml);
		// 修改同级、下级分类
		$
				.ajax({
					type : "post",
					url : "${ctx}/policestand/childrenSC",
					data : {
						"guid" : guid
					},
					async : false,
					success : function(data) {
						var html = "<a class=\"item item-active\" title=\"全部\" onclick=\"selectAll(this)\" num='"
								+ nextnum
								+ "'><span class=\"type-choose\">全部</span></a>";
						var dataSC = eval(data);
						// 无下级
						if (dataSC.length == "0") {
							// 若为第一级则同级分类不动,下级分类变为无
							if (num == "1" || flag == "chooseAll") {
								$("#div2")
										.html(
												"<a href=\"#\" class=\"item\" title=\"全部\"><span class=\"type-choose\">无</span></a>");
								divstyle(name);
							}
							// 若不为第一级，则同级分类、下级分类变更
							if (num != "1" && flag != "chooseAll") {
								// 将第二行内容给第一行
								var thishtml = $("#div2").html();
								$("#div1").html(thishtml);
								// 选中的分类红色显示
								divstyle(name);
								// 下级分类变为无
								$("#div2")
										.html(
												"<a href=\"#\" class=\"item\" title=\"全部\"><span class=\"type-choose\">无</span></a>");
							}
						}
						// 有下级
						// 遍历下级分类信息
						else {
							for (var i = 0; i < dataSC.length; i++) {
								var guidSC = dataSC[i].guid;
								var nameSC = dataSC[i].name;
								html += "<a onclick=\"chooseSC(this,'"
										+ guidSC
										+ "','"
										+ nameSC
										+ "','"
										+ nextnum
										+ "')\" class=\"item\" flag=\"true\" num='"
										+ nextnum
										+ "'><span class=\"type-choose\">"
										+ nameSC
										+ "</span><span class=\"type-choose\" style=\"display:none !important;\" flag=\"spguid\">"
										+ guidSC + "</span></a>"
							}
							// 若为第一级则同级分类不动,显示相应下级分类
							if (num == "1" || flag == "chooseAll") {
								$("#div2").html(html);
								divstyle(name);
							}
							// 若不为第一级，则同级分类、下级分类内容替变换
							if (num != "1" && flag != "chooseAll") {
								var thishtml = $("#div2").html();
								//var thisfoot=$("#div2").parent().parent().next().html();
								$("#div1").html(thishtml);
								//$("#div1").parent().parent().height($("#div2").height());
								//$("#div1").parent().parent().next().html(thisfoot);
								//$("#div1").parent().parent().next().show();
								//$("#div1").parent().parent().height(thisheight);
								divstyle(name);
								$("#div2").html(html);
								$("#div2").parent().parent().height($("#div2").height());
							}
						}
					}
				})
	}
	// 显示下级分类
	$("#nextSC").show();
	// 加载完数据再次判断更多按钮是否显示
//	var divid=$(obj).parent().attr("id");
//	if(divid=="div1"){
//		J_ToggleItems_click();
//	}

	J_ToggleItems_click();
	// 查询
	choose();
}
// 选择当前位置中的某一分类执行的操作
function selectSC(obj, guid, name, num) {
	// var prenum = parseInt(num) - 1;
	// 若选择关闭根级分类，则页面重新加载即可
	if (num == 1) {
		location.reload();
	}
	// 若选择的是分类，则修改当前位置、同级分类、下级分类
	else {
		// 当前位置（移除自己下级分类）
		for (var m = num; m < 6; m++) {
			$("#all" + m).remove();
		}
		delChildren(num);
	}
	// 下级分类显示
	$("#nextSC").show();
	// 加载完数据再次判断更多按钮是否显示
	J_ToggleItems_click();
	// 查询
	choose();
}
// 删除的是子分类执行的操作
function delChildren(num) {
	var prenum = parseInt(num) - 1;
	var preguid = $("#" + prenum).children().attr("guid");
	// 修改下级分类
	$
			.ajax({
				type : "post",
				url : "${ctx}/policestand/childrenSC",
				data : {
					"guid" : preguid
				},
				async : false,
				success : function(data) {
					var html = "<a class=\"item item-active\" title=\"全部\" onclick=\"selectAll(this)\" num='"
							+ num
							+ "'><span class=\"type-choose\">全部</span></a>";
					var dataSC = eval(data);
					if (dataSC.length == "0") {
						$("#div2")
								.html(
										"<a href=\"#\" class=\"item\" title=\"全部\"><span class=\"type-choose\">无</span></a>");
					} else {
						for (var i = 0; i < dataSC.length; i++) {
							var guidSC = dataSC[i].guid;
							var nameSC = dataSC[i].name;
							html += "<a onclick=\"chooseSC(this,'"
									+ guidSC
									+ "','"
									+ nameSC
									+ "','"
									+ num
									+ "')\" class=\"item\" flag=\"true\" num='"
									+ num
									+ "'><span class=\"type-choose\">"
									+ nameSC
									+ "</span><span class=\"type-choose\" style=\"display:none !important;\" flag=\"spguid\">"
									+ guidSC + "</span></a>"
						}
						$("#div2").html(html);
					}

				}
			})
	// 查询同级分类
	$
			.ajax({
				type : "post",
				url : "${ctx}/policestand/sameLevelSC",
				data : {
					"guid" : preguid
				},
				async : false,
				success : function(data) {
					var slhtml = "<a class=\"item item-active\" title=\"全部\"  onclick=\"selectAll(this)\" num='"
							+ prenum
							+ "'><span class=\"type-choose\">全部</span></a>";
					var slSC = eval(data);
					for (var i = 0; i < slSC.length; i++) {
						var slguidSC = slSC[i].guid;
						var slnameSC = slSC[i].name;
						slhtml += "<a onclick=\"chooseSC(this,'"
								+ slguidSC
								+ "','"
								+ slnameSC
								+ "','"
								+ prenum
								+ "')\" class=\"item\" flag=\"true\" num='"
								+ prenum
								+ "'><span class=\"type-choose\">"
								+ slnameSC
								+ "</span><span class=\"type-choose\" style=\"display:none !important;\" flag=\"spguid\">"
								+ slguidSC + "</span></a>"
					}
					$("#div1").html(slhtml);
					divstyle(name);
				}
			})
	// 当前位置中最后一级显示选中状态
	var sps = $("#firstSC").find("span[flag='spguid']");
	for (var m = 0; m < sps.length; m++) {
		if ($(sps[m]).html() == preguid) {
			$(sps[m]).prev().addClass("active");
		}
	}
	// 加载完数据再次判断更多按钮是否显示
	J_ToggleItems_click();
}
// 点击搜索框中的全部
// 按理点击全部应该显示所有分类的子分类集合，我现在做的是点击全部，如果不选则不能展示下级效果1，故点击全部的时候隐藏下级或者跳回到上级的效果2
function selectAll(obj) {
	// 判断该全部为第一行还是第二行，若为第二行中的全部，则不执行任何操作；若为第一行中的全部，则执行以下操作
	var divid = $(obj).parent().attr("id");
	var objs = $(obj).parent().find("span[flag='spguid']");
	//lev表明当前行中是否存在“中国国家标准”，即是否为根级，若为根级则刷新页面，不为根级则做相应修改
	var lev = "";
	for (var i = 0; i < objs.length; i++) {
		if ($(objs[i]).html() == "1A7733A7339244578B4C3FB524D62D71") {
			lev = "1";
		}
	}
	if (divid == "div1" && lev == "") {
		// 添加一个标志，标明点击了全部
		$("#div1").attr("biaozhi", "chooseAll");
		// 第一行中“全部”按钮变为蓝色
		$("#div1").find("span").removeClass("active");
		$("#div1").find("a[title='全部']").addClass("item-active");
		// 修改当前位置
		var num = $(obj).attr("num");
		$("#all" + num).remove();
		// 效果2
		delChildren(num);
		// 下级分类显示
		$("#nextSC").show();
		// 效果1
		// 去掉delChildren(num);设置$("#nextSC").hide();
		// 加载完数据再次判断更多按钮是否显示
		J_ToggleItems_click();
		// 查询
		choose();
	} else if (divid == "div1" && lev == "1") {
		window.location.reload();
	}
	// else{
	// window.location.reload();
	// }
	// 查询
	// choose();
}
// div1中选中的分类变成蓝色
function divstyle(name) {
	$("#div1").find("a").removeClass("item-active");
	$("#div1").find("span").removeClass("active");
	var slarrspan = $("#div1").find("span");
	for (var j = 0; j < slarrspan.length; j++) {
		var slspanname = $(slarrspan[j]).html();
		if (slspanname == name) {
			$(slarrspan[j]).addClass("active");
		}
	}
}
