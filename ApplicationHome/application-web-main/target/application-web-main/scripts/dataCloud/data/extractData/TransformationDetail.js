$(function(){
	initJobItemRelationChart();
})

/*
 * 初始化做作业项关系图
 */
function initJobItemRelationChart() {
	var myChart = echarts.init(document.getElementById('transItemRelationChart'), 'macarons');
	myChart.showLoading();
	var param = {
			"transId": $("#transId").val(), 
			"frontMachineKey": $("#frontMachineKey").val()
	}
	$.post(ctx + "/extractDataJob/getTransItemRelationChartData", param, function(data, status) {
		if(status == "success") {
			var list = $.parseJSON(data);
			var pointSymbol = "";
			var series = [];
			
			var pointList = list.pointList;
			var lineList = list.lineList;
			var itemList = list.lsItem;
			for(var i = 0; i < pointList.length; i++) {
				var pointObj = {
					name : pointList[i].stepName,
					type : 'effectScatter',
					coordinateSystem : 'cartesian2d',
					zlevel : 2,
					rippleEffect : {
						brushType : 'stroke',
						scale : 1.1
					},
					label : {
						normal : {
							show : true,
							position : 'top',
							formatter : '{a}',
							textStyle : {
								color : '#000000'
							}
						}
					},
					symbol : 'image://' + ctx + '/images/kettleImg/' + pointList[i].CODE + '.png',
					symbolSize : [ 30, 30 ],
					markPoint : {
						symbolRotate : 90
					},
					itemStyle : {
						normal : {
							color : '#46bee9'
						}
					},
					data : [ [ pointList[i].xAxis, pointList[i].yAxis ] ]
				}
				series.push(pointObj);
			}
			var effect = {};
			var jobStatus = $("#jobStatus").val();
			if(jobStatus == '启动' || jobStatus == '挂起') {
				effect = {
					show : true,
					period : 4,
					trailLength : 0,
					color : '#a6c84c',
					symbolSize : 8
				};
			}
			for(var i = 0; i < lineList.length; i++) {
				var lineObj = {
					name : lineList[i].fromName + '-' + lineList[i].toName,
					type : 'lines',
					coordinateSystem : 'cartesian2d',
					zlevel : 1,
					symbol : [ '', 'arrow' ],
					effect : effect,
					lineStyle : {
						normal : {
							color : lineList[i].lineEnabled ? '#000000' : '#b1b1b1',
							width : 2,
							curveness : 0
						}
					},
					data : [ {
						coords : [ [ lineList[i].fromxAxis + 8, lineList[i].fromyAxis ], [ lineList[i].toxAxis - 8, lineList[i].toyAxis ] ]
					} ]
				}
				series.push(lineObj);
			}
			var option = {
					backgroundColor : '#fff',
					title : {
						text : $("#transName").val() + "拓扑图(" + $("#jobStatus").val() + ")",
						left : 'center',
						textStyle : {
							color : 'black'
						}
					},
					legend:{
						show: true,
						zLevel: 99,
						z:99,
						selectedMode: false,
						data: [{
							name: '运行'
						},{
							name: '停止'
						}]
					},
					tooltip : {
						trigger : 'item',
						formatter : '{a}'
					},
					xAxis : {
						type : 'value',
						position: 'top',
						axisLine : true,
						splitLine : {
							show : false
						},
						axisLabel : {
							show : false
						},
						min : 0
					},
					yAxis : {
						type : 'value',
						axisLine : true,
						splitLine : {
							show : false,
						},
						axisLabel : {
							show : false
						},
						min : 0,
					},
					series : series
			};
			myChart.hideLoading();
			myChart.setOption(option, true);
		} else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}

function TransMonitorPage() {
	var urlParam = {
			"frontMachineKey": $("#frontMachineKey").val(),
			"transName": $("#transName").val()
	};
	window.location.href = ctx + "/extractDataJob/transMonitor?" + $.param(urlParam);
}