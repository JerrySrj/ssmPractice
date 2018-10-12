$(function() {
	setTimeout(loadData, 3000);
})
var str = "";
// 加载数据对标进度
function loadData() {
	// 数据对标模块中的资源种类，根据主键取数据
	var types = $("tr[flag='db']");
	for (var i = 0; i < types.length; i++) {
		var datatype_guid = $($(types[i]).find("a")[0]).attr("id");
		$.ajax({
			type : "post",
			url : path + "/index/loadData",
			data : {
				"datatype_guid" : datatype_guid,
				"i" : i
			},
			async : true,
			success : function(ret) {
				var data = eval("(" + ret + ")");
				var i = data.i;
				$($(types[i]).find("div[class='news-num']")[0]).html(
						"<div class='news-num-1'>" + data.totalTbNum
								+ "</div><div class='news-num-2'>"
								+ data.totalHaveNum
								+ "</div><div class='news-num-3'>"
								+ data.result + "</div>");
			},
			error : function() {
				alert('服务出错，请稍后重试');
			}
		})
	}
}
// 切换内部资源、外部资源
function tab(obj, type) {
	if (type == "nbzy") {
		$("#nbzy").show();
		$("#nbtab").addClass("active");
		$("#wbzy").hide();
		$("#wbtab").removeClass("active");
	}
	if (type == "wbzy") {
		$("#wbzy").show();
		$("#wbtab").addClass("active");
		$("#nbzy").hide();
		$("#nbtab").removeClass("active");
	}
}
// 切换内部资源统计、外部资源统计
function change(obj, type) {
	if (type == "nbchart") {
		$("#nbchart").show();
		$("#nb").addClass("active");
		$("#wbchart").hide();
		$("#wb").removeClass("active");
	}
	if (type == "wbchart") {
		$("#wbchart").show();
		$("#wb").addClass("active");
		$("#nbchart").hide();
		$("#nb").removeClass("active");
	}
}
// 切换资源统计、资源概况
function changeTitle(num) {
	if (num == 1) {
		$("#title1").show();
		$("#t1").addClass("active");
		$("#title2").hide();
		$("#t2").removeClass("active");
	}
	if (num == 2) {
		$("#title1").hide();
		$("#t1").removeClass("active");
		$("#title2").show();
		$("#t2").addClass("active");
	}
}
/** *******************************资源种类(内部)************************************ */
function loadZyNbChart() {
	// 路径配置
	require.config({
		paths : {
			echarts : 'plugins/ECharts/dist'
		}
	});
	// 使用
	require([ 'echarts', 'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('ziyuanzhongleinb'));
		option = {
			calculable : true,
			title : {
				text : '各部门数据总量统计图',
				x : 'center',
				y : 'top',
			},
			series : [ {
				name : '半径模式',
				type : 'pie',
				radius : [ 20, 60 ],
				// center : ['25%', 200],
				roseType : 'radius',
				width : '60%', // for funnel
				max : 60, // for funnel
				data : zyDataNb
			} ]
		};
		// 为echarts对象加载数据
		myChart.setOption(option);
	});
}
/** *******************************资源种类(外部)************************************ */
function loadZyWbChart() {
	// 路径配置
	require.config({
		paths : {
			echarts : 'plugins/ECharts/dist'
		}
	});
	// 使用
	require([ 'echarts', 'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('ziyuanzhongleiwb'));
		option = {
			calculable : true,
			series : [ {
				name : '半径模式',
				type : 'pie',
				radius : [ 20, 60 ],
				// center : ['25%', 200],
				roseType : 'radius',
				width : '40%', // for funnel
				max : 40, // for funnel
				data : zyDataWb
			} ]
		};
		// 为echarts对象加载数据
		myChart.setOption(option);
	});
}

/** *******************************内部资源统计（资源种类）************************************ */
function nbzyzl() {
	// 路径配置
	require.config({
		paths : {
			echarts : 'plugins/ECharts/dist'
		}
	});
	// 使用
	require([ 'echarts', 'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
	],
			function(ec) {
				// 基于准备好的dom，初始化echarts图表
				var myChart = ec.init(document.getElementById('nbzyzl'));
				option = {
					title : {
						x : 'center',
						text : '各部门资源种类统计图',
					},
					tooltip : {
						trigger : 'item'
					},
					calculable : true,
					grid : {
						borderWidth : 0,
						y : 80,
						y2 : 60
					},
					xAxis : [ {
						type : 'category',
						show : false,
						data : zyDataNbName
					} ],
					yAxis : [ {
						type : 'value',
						show : false
					} ],
					series : [ {
						name : '资源种类统计',
						type : 'bar',
						itemStyle : {
							normal : {
								color : function(params) {
									// build a color map as your need.
									var colorList = [ '#C1232B', '#B5C334',
											'#FCCE10', '#E87C25', '#27727B',
											'#FE8463', '#9BCA63', '#FAD860',
											'#F3A43B', '#60C0DD', '#D7504B',
											'#C6E579', '#F4E001', '#F0805A',
											'#26C0C0' ];
									return colorList[params.dataIndex]
								},
								label : {
									show : true,
									position : 'top',
									formatter : '{b}\n{c}'
								}
							}
						},
						data : zyDataNbValue,
					} ]
				};
				// 为echarts对象加载数据
				myChart.setOption(option);
			});
}

/** *******************************内部资源统计（数据总量）************************************ */
function nbzysjzl() {
	// 路径配置
	require.config({
		paths : {
			echarts : 'plugins/ECharts/dist'
		}
	});
	// 使用
	require([ 'echarts', 'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('nbzysjzl'));
		option = {
			title : {
				text : '各部门数据总量统计图',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			calculable : true,
			series : [ {
				name : '数据总量',
				type : 'pie',
				radius : [ 20, 60 ],
				// center : ['25%', 200],
				roseType : 'radius',
				width : '40%', // for funnel
				max : 40, // for funnel
				data : zyDataNb
			} ]
		};
		// 为echarts对象加载数据
		myChart.setOption(option);
	});
}
/** *******************************外资源统计（资源种类）************************************ */
function wbzyzl() {
	// 路径配置
	require.config({
		paths : {
			echarts : 'plugins/ECharts/dist'
		}
	});
	// 使用
	require([ 'echarts', 'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
	],
			function(ec) {
				// 基于准备好的dom，初始化echarts图表
				var myChart = ec.init(document.getElementById('wbzyzl'));
				option = {
					title : {
						x : 'center',
						text : '各部门资源种类统计图',
					},
					tooltip : {
						trigger : 'item'
					},
					calculable : true,
					grid : {
						borderWidth : 0,
						y : 80,
						y2 : 60
					},
					xAxis : [ {
						type : 'category',
						show : false,
						data : zyDataWbName
					} ],
					yAxis : [ {
						type : 'value',
						show : false
					} ],
					series : [ {
						name : '资源种类统计',
						type : 'bar',
						itemStyle : {
							normal : {
								color : function(params) {
									// build a color map as your need.
									var colorList = [ '#C1232B', '#B5C334',
											'#FCCE10', '#E87C25', '#27727B',
											'#FE8463', '#9BCA63', '#FAD860',
											'#F3A43B', '#60C0DD', '#D7504B',
											'#C6E579', '#F4E001', '#F0805A',
											'#26C0C0' ];
									return colorList[params.dataIndex]
								},
								label : {
									show : true,
									position : 'top',
									formatter : '{b}\n{c}'
								}
							}
						},
						data : zyDataWbValue,
					} ]
				};
				// 为echarts对象加载数据
				myChart.setOption(option);
			});
}

/** *******************************外部资源统计（数据总量）************************************ */
function wbzysjzl() {
	// 路径配置
	require.config({
		paths : {
			echarts : 'plugins/ECharts/dist'
		}
	});
	// 使用
	require([ 'echarts', 'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('wbzysjzl'));
		option = {
			title : {
				text : '各部门数据总量统计图',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			calculable : true,
			series : [ {
				name : '数据总量',
				type : 'pie',
				radius : [ 20, 60 ],
				// center : ['25%', 200],
				roseType : 'radius',
				width : '40%', // for funnel
				max : 40, // for funnel
				data : zyDataWb
			} ]
		};
		// 为echarts对象加载数据
		myChart.setOption(option);
	});
}