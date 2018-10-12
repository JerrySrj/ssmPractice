$(function(){
	initJobItemRelationChart();
})

/*
 * 清除日志提示框
 */
function cleanItemLogConfirm(jobName, itemName, frontMachineKey) {
	var param = {"jobName": jobName, "itemName": itemName, "frontMachineKey": frontMachineKey};
	showConfirm("确定清理改作业日志？", cleanItemLog, param);
	
}

/*
 * 清除日志操作
 */
function cleanItemLog(param) {
	$.post(ctx + "/extractDataJob/cleanJobItemLog", param, function(data, status) {
		if(status == "success") 
			if(data >= 0) showInfoMsg("清理完成！");
		else
			showErrorMsg("系统异常，请联系系统管理员！");
	});
}


/*
 * 初始化做作业项关系图
 */
function initJobItemRelationChart() {
	var myChart = echarts.init(document.getElementById('jobItemRelationChart'), 'macarons');
	myChart.showLoading();
	var param = {
			"jobId": $("#jobId").val(), 
			"frontMachineKey": $("#frontMachineKey").val()
	}
	$.post(ctx + "/extractDataJob/getJobItemRelationChartData", param, function(data, status) {
		if(status == "success") {
			var list = $.parseJSON(data);
			
			var pointSymbol = "";
			var series = [];
			
			var pointList = list.pointList;
			var lineList = list.lineList;
			var itemList = list.lsItem;
			for(var i = 0; i < pointList.length; i++) {
				var itemName = "";
				if(pointList[i].CODE == "TRANS") 
					itemName = pointList[i].itemName + "(" + pointList[i].subTransName + ")";
				if(pointList[i].CODE == "JOB") 
					itemName = pointList[i].itemName + "(" + pointList[i].subJobName + ")";
				var pointObj = {
					name : itemName,
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
					symbolSize : [ 40, 40 ],
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
			if(list.status == '启动' || list.status == '挂起') {
				effect = {
					show : true,
					period : 4,
					trailLength : 0,
					color : '#a6c84c',
					symbolSize : 8
				};
			}
//			var statusCode = "";
//			if(list.status == '启动') statusCode = "start";
//			if(list.status == '挂起') statusCode = "running";
//			if(list.status == '停止') statusCode = "stop";
//			if(list.status == '结束') statusCode = "end";
//			$("#jobStatus").val();
			for(var i = 0; i < lineList.length; i++) {
				var lineObj = {
					name : lineList[i].fromEntryName + '-' + lineList[i].toEntryName,
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
						coords : [ [ lineList[i].fromXaxis + 8, lineList[i].fromYaxis ], [ lineList[i].toXaxis - 12, lineList[i].toYaxis ] ]
					} ]
				}
				series.push(lineObj);
			}
			var chartTitleStatus = list.status;
			if(list.status == "null") chartTitleStatus = "未启动";
			$("#tuopuTitle").text($("#jobName").val() + '拓扑图(' + chartTitleStatus + ')');
			var option = {
//					backgroundColor : '#292b37',
					title : {
						text : $("#jobName").val() + '拓扑图(' + list.status + ')',
						left : 'center',
						textStyle : {
							color : 'black'
						}
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
	myChart.on('click', function (params) {
		var frontMachineKey = $("#frontMachineKey").val();
		var entryTypeName = params.seriesName.substring(0, params.seriesName.indexOf("("));
		var entryName = params.seriesName.substring(params.seriesName.indexOf("(") + 1, params.seriesName.indexOf(")"));  
		var param = {
				"jobId": $("#jobId").val(), 
				"frontMachineKey": frontMachineKey,
				"entryName": entryTypeName
		}
		$.post(ctx + "/extractDataJob/getJobEntryParam", param, function(data, status) {
			if(status == "success") {
				var jobEntryParam = $.parseJSON(data);
				var urlParam = {
						frontMachineKey: frontMachineKey,
						jobStatus: $("#jobStatus").val()
				};
				if(jobEntryParam.entryType == "TRANS") {
					var subTransList = jobEntryParam.subTransInfo;
					for(var i = 0; i < subTransList.length; i++) {
						if(subTransList[i].subTransName == entryName) {
							urlParam.transId = subTransList[i].subTransId;
							urlParam.transName = subTransList[i].subTransName;
						}
					}
					window.location.href = ctx + "/extractDataJob/transDetail?" + $.param(urlParam);
				}
				if(jobEntryParam.entryType == "JOB") {
					var subJobList = jobEntryParam.subJobInfo;
					for(var i = 0; i < subJobList.length; i++) {
						if(subJobList[i].subJobName == entryName) {
							urlParam.jobId = subJobList[i].subJobId;
							urlParam.jobName = subJobList[i].subJobName;
						}
					}
					window.location.href = ctx + "/extractDataJob/jobDetail?" + $.param(urlParam);
				}
			} else
				showErrorMsg("系统异常，请联系系统管理员！");
		});
	});}

/*
 * 跳转到作业可视化监控页面
 */
function jobMonitorPage() {
	var urlParam = {
			"frontMachineKey": $("#frontMachineKey").val(),
			"jobId": $("#jobId").val(),
			"jobName": $("#jobName").val()
	};
	window.location.href = ctx + "/extractDataJob/jobMonitor?" + $.param(urlParam);
}