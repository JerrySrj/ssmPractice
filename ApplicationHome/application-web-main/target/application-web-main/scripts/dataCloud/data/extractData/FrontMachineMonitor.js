$(function(){
	initJobSurveyChart();
	initJobFaultChart('week');
	initDateYearRange();
	initFaultRateChart('week');
//	initJobFaultTopChart();
});

function createJobTableHtml(list) {
	var dataHtml = "";
	if(list.length > 0) {
		for(var i = 0; i < list.length; i++) {
			dataHtml += "<tr>"
				+ "<td>" + list[i].jobName + "</td>"
				+ "<td>" + list[i].jobType + "</td>"
	//			+ "<td>" + "" + "</td>"
				+ "<td>" + list[i].excuteStrategy + "</td>"
				+ "<td>" + list[i].resName + "</td>"
				+ "<td>" + list[i].responsibleParty + "</td>"
				+ "<td>" + list[i].netWork + "</td>"
				+ "<td>" + list[i].source + "</td>"
				+ "</tr>";
		}
	} else {
		dataHtml += "<tr>"
				 + "<td colspan='7' style='color:red;'>无数据</td>"
	}
	return dataHtml;
}

function showJobInfoPop(titlePreFix, list) {
	art.dialog({
        title: titlePreFix + "作业列表",
        content: document.getElementById("jobInfoPop"),
        lock: true,
        window: "top",
        okVal: "确定",
        cancelVal: false,
        top:"105px",
        init: function () {
        	var dataHtml = createJobTableHtml(list);
        	$("#tbJobInfo tbody").empty();
        	$("#tbJobInfo tbody").append(dataHtml);
        },
        ok: function () {
        	return true;
        }
    });
}

/*
 * 初始化作业概况chart
 */
function initJobSurveyChart() {
	var jobSurvetChart = echarts.init(document.getElementById('jobSurveyChart'), 'macarons');
	jobSurvetChart.showLoading();
	$.post(ctx + "/extractDataJob/getJobSurveyChartData", 
			{"frontMachineKey" : $("#frontMachineKey").val()}, function(data, status) {
		if(status == "success") {
			var chartData = $.parseJSON(data);
			var seriesData = new Array();
			var totalCount = chartData["totalCount"];
			for(var chart in chartData){
				if(chart != "totalCount") {
					var obj = {};
					if(chart == "stopCount") {
						obj.value = chartData["stopCount"];
						obj.name = "已停止";
					}
					if(chart == "notRunCount") {
						obj.value = chartData["notRunCount"];
						obj.name = "未启动";
					}
					if(chart == "runningCount") {
						obj.value = chartData["runningCount"];
						obj.name = "正在运行";
					}
					if(chart == "errorCount") {
						obj.value = chartData["errorCount"];
						obj.name = "异常";
					}
					seriesData.push(obj);
				}
			}
			var option = {
				    title : {
				    	show: false,
				        text: $("#frontMachineName").val() + '作业概况',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)<br/>总数：" + totalCount
				    },
				    legend: {
				    	textStyle: {color: ['#ffffff']},
				        orient: 'vertical',
				        left: 'left',
				        data: ['未启动','正在运行','已停止','异常']
				    },
				    series : [
				        {
				            name: '作业概况 ',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data: seriesData,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};
			jobSurvetChart.on('click', function (params) {
				var param = {
						"frontMachineKey": $("#frontMachineKey").val()
				};
				if(params.name == "未启动")
					param.flag = "notRun";
				if(params.name == "正在运行")
					param.flag = "running";
				if(params.name == "已停止")
					param.flag = "stop";
				if(params.name == "异常")
					param.flag = "error";
				$.post(ctx + "/extractDataJob/getJobInfoByStatus", param, function(data, status) {
					if(status == "success") {
						var list = $.parseJSON(data);
						showJobInfoPop(params.name, list);
					} else 
						showErrorMsg("系统异常，请联系管理员！");
				});
			});
			 // 使用刚指定的配置项和数据显示图表。
			jobSurvetChart.hideLoading();
			jobSurvetChart.setOption(option);
		}
	});
}

function initJobFaultChart(flag) {
	var jobFaultChart = echarts.init(document.getElementById('jobFaultChart'), 'macarons');
	jobFaultChart.showLoading();
	$.post(ctx + "/extractDataJob/getJobFaultChartData", 
			{"frontMachineKey": $("#frontMachineKey").val(), "flag": flag},
			function(data, status) {
		if(status == "success") {
			var chartData = $.parseJSON(data);
			var faultCountList = chartData.faultCountList;
			var recoverCountList = chartData.recoverCountList;
			var seriesData = new Array();
			var xAxisData = [];
			if(flag == "week") 
				xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
			if(flag == "month")
				xAxisData = chartData.xAxisData;
			if(flag == "year")
				xAxisData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
			
			option = {
				    title: {
				    	show: false,
				        text: $("#frontMachineName").val() + '故障作业情况',
				        left: 'center'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid:{
				    	show: true,
				    	backgroundColor: '#fff'
				    },
				    legend: {
				    	textStyle: {
				    		color:'#ffffff',
				    		fontSize: '14px'
				    	},
				        data:['故障数量','恢复数量'],
				        left: 'right'
				    },
				    xAxis:  {
				        type: 'category',
				        name: '时间 ',
				        nameTextStyle:{
				        	color:'#fff',
				        	fontSize: '14px'
		        		},
				        boundaryGap: false,
				        data: xAxisData,
				        axisLine:{
				        	lineStyle:{color:'#fff'}
				        },
				        axisLabel:{
				        	textStyle:{color:'#fff'}
				        }
				    },
				    yAxis: {
				        type: 'value',
				        nameTextStyle:{
				        	color:'#fff',
				        	fontSize: '14px'
				        },
				        name: '数量',
				        axisLine:{
				        	lineStyle:{color:'#fff'}
				        },
				        axisLabel:{
				        	textStyle:{color:'#fff'}
				        }
//				        axisLabel: {
//				            formatter: '{value} °C'
//				        }
				    }, 
//				    dataZoom: [{
//				        type: 'inside',
//				        backgroundColor:'#ffffff',
//				        start: 0,
//				        end: 100
//				    }, {
//				        start: 0,
//				        end: 10,
//				        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//				        handleSize: '80%',
//				        handleStyle: {
//				            color: '#fff',
//				            shadowBlur: 3,
//				            shadowColor: 'rgba(0, 0, 0, 0.6)',
//				            shadowOffsetX: 2,
//				            shadowOffsetY: 2
//				        }
//				    }],
				    series: [
				        {
				            name:'故障数量',
				            type:'line',
				            data: faultCountList,
				            markPoint: {
				                data: [
				                    {type: 'max', name: '最大值'},
				                    {type: 'min', name: '最小值'}
				                ]
				            },
				            markLine: {
				                data: [
				                    {type: 'average', name: '平均值'}
				                ]
				            }
				        },
				        {
				            name:'恢复数量',
				            type:'line',
				            data:recoverCountList,
				            markPoint: {
				                data: [
				                    {type: 'max', name: '最大值'},
				                    {type: 'min', name: '最小值'}
				                ]
				            },
				            markLine: {
				            	data: [
					                    {type: 'average', name: '平均值'}
					                ]
				            }
				        }
				    ]
				};
		}
		jobFaultChart.on('click', function (params) {
			if(params.componentType == "series"){
				var param = {
						"frontMachineKey": $("#frontMachineKey").val(), 
						"flag": flag,
						"type": params.seriesName == "恢复数量" ? "recover" : "fault",
						"dateIndex": params.dataIndex
				}
				$.post(ctx + "/extractDataJob/getJobInfoByDate", param, function(data, status){
					if(status == "success") {
						var list = $.parseJSON(data);
						showJobInfoPop(params.name + params.seriesName, list);
					} else 
						showErrorMsg("系统异常，请联系管理员！");
				});
			}
		});
		 // 使用刚指定的配置项和数据显示图表。
		jobFaultChart.hideLoading();
		jobFaultChart.setOption(option);
	});
}

/*
 * 切换统计范围(本周、本月、本年)
 */
function changeChartFlag(flag) {
	initJobFaultChart(flag);
}

/*
 * 初始化年份选择
 */
function initDateYearRange() {
	var now = new Date();
	$("#beginYear").val(now.getFullYear());
	$("#beginYear").datetimepicker({
		format: "yyyy",
		startView: 4,
		minView: 4,
		todayHighlight: true,
		initialDate: new Date(now.getFullYear()),
		keyboardNavigation: true,
		autoclose:true
	});
//	var nextYear = now.getFullYear() + 1;
//	$("#endYear").val(nextYear);
//	$("#endYear").datetimepicker({
//		format: "yyyy",
//		startView: 4,
//		minView: 4,
//		todayHighlight: true,
//		initialDate: new Date(nextYear),
//		keyboardNavigation: true,
//		autoclose:true
//	});
}

function changeAnalysisType(flag, obj) {
	if("year" == flag) {
//		$("#fillTypeValDiv").hide();
		$("#typeVal").attr("readonly", "readonly");
		$("#typeVal").val('');
	} else {
		$("#typeVal").removeAttr("readonly");
		if("week" == flag)
			$("#type").text("周");
		if("month" == flag)
			$("#type").text("月");
	}
}

/*
 * 故障作业数量
 */
function initFaultRateChart(flag) {
	var faultRateChart =  echarts.init(document.getElementById('jobFaultRateChart'), 'macarons');
	faultRateChart.showLoading();
	var param = {
			"frontMachineKey": $("#frontMachineKey").val(), 
			"flag": flag,
			"year": $("#beginYear").val(),
			"typeVal": $("#typeVal").val()
	};
	$.post(ctx + "/extractDataJob/getFaultRateChartData", param, function(data, status) {
		if(status == "success") {
			var chartData = $.parseJSON(data);
			option = {
					title : {
						show: false,
						text: $("#frontMachineName").val() + '故障作业数量',
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						textStyle: {color: ['#ffffff']},
						orient: 'vertical',
						left: 'left',
						data: ['故障数','正常数']
					},
					series : [
					          {
					        	  name: '故障作业',
					        	  type: 'pie',
					        	  radius : '55%',
					        	  center: ['50%', '60%'],
					        	  data:[
					        	        {value:chartData.faultCount, name:'故障数'},
					        	        {value:chartData.normalCount, name:'正常数'}
					        	        ],
				        	      itemStyle: {
				        	    	  emphasis: {
				        	    		  shadowBlur: 10,
				        	    		  shadowOffsetX: 0,
				        	    		  shadowColor: 'rgba(0, 0, 0, 0.5)'
				        	        	}
				        	        }
					          }
					          ]
			};
			faultRateChart.on('click', function (params) {
				console.info(params);
				if(params.componentType == "series"){
					var param = {
							"frontMachineKey": $("#frontMachineKey").val(), 
							"flag": flag,
							"type": params.name == "正常数" ? "normal" : "error",
							"year": $("#beginYear").val(),
							"typeVal": $("#typeVal").val()
					}
					$.post(ctx + "/extractDataJob/getJobInfoByResult", param, function(data, status){
						if(status == "success") {
							var list = $.parseJSON(data);
							showJobInfoPop(params.name, list);
						} else 
							showErrorMsg("系统异常，请联系管理员！");
					});
				}
			});
			 // 使用刚指定的配置项和数据显示图表。
			faultRateChart.hideLoading();
			faultRateChart.setOption(option);
		}
	});
}

/*
 * 切换统计方式后搜索
 */
function searchFaultRateChart() {
	$("input[name='analysisType']").each(function() {
		if($(this).prop("checked"))
			initFaultRateChart($(this).val());
	});
}

/*
 * 受影响作业排名
 */
//function initJobFaultTopChart() {
//	var jobFaultTopChart =  echarts.init(document.getElementById('jobFaultTopChart'), 'macarons');
//	jobFaultTopChart.showLoading();
//	$.post(ctx + "/extractDataJob/getJobFaultTopChart", {"frontMachineKey": $("#frontMachineKey").val()}
//			, function(data, status) {
//		var chartData = $.parseJSON(data);
//		var xAxisData = new Array();
//		var seriesData = new Array();
//		for(var i = 0; i < chartData.length; i++) {
//			xAxisData.push(chartData[i].jobName);
//			seriesData.push(chartData[i].jobCount);
//		}
//		option = {
//			title: {
//		        text: '受影响作业排名',
//		        left: 'center'
//		    },
//		    color: ['#3398DB'],
//		    tooltip : {
//		        trigger: 'axis',
//		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//		        }
//		    },
//		    xAxis : [
//		        {
//		            type : 'category',
//		            data : xAxisData,
//		            axisTick: {
//		                alignWithLabel: true
//		            }
//		        }
//		    ],
//		    yAxis : [
//		        {
//		            type : 'value',
//		            splitLine:{show:false}
//		        }
//		    ],
//		    series : [
//		        {
//		            name:'故障次数',
//		            type:'bar',
//		            barWidth: '60%',
//		            data:seriesData
//		        }
//		    ]
//		};
//		jobFaultTopChart.hideLoading();
//		jobFaultTopChart.setOption(option);
//	});
//}

/*
 * 作业故障次数前十名
 */
function showFaultCountChartPop() {
	art.dialog({
        title: "作业故障次数前十名",
        content: document.getElementById("faultCountChartPop"),
        lock: true,
        window: "top",
        okVal: "确定",
        cancelVal: false,
        top:"105px",
        init: function () {
        	initJobFaultCoutTopChart();
        },
        ok: function () {
        	return true;
        }
    });
}

function showFaultDurationChartPop() {
	art.dialog({
        title: "作业故障时长前十名",
        content: document.getElementById("faultDurationChartPop"),
        lock: true,
        window: "top",
        okVal: "确定",
        cancelVal: false,
        top:"105px",
        init: function () {
        	initFaultDurationTopChart();
        },
        ok: function () {
        	return true;
        }
    });
}

function initJobFaultCoutTopChart() {
	var jobCountTopChart =  echarts.init(document.getElementById('jobCountTopChart'), 'macarons');
	jobCountTopChart.showLoading();
	$.post(ctx + "/extractDataJob/getJobFaultTopChart", {"frontMachineKey": $("#frontMachineKey").val()}
			, function(data, status) {
		var chartData = $.parseJSON(data);
		var xAxisData = new Array();
		var seriesData = new Array();
		for(var i = 0; i < chartData.length; i++) {
			xAxisData.push(chartData[i].jobName);
			seriesData.push(chartData[i].jobCount);
		}
		option = {
			title: {
		        text: '作业故障次数前十名',
		        left: 'center'
		    },
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : xAxisData,
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine:{show:false}
		        }
		    ],
		    series : [
		        {
		            name:'故障次数',
		            type:'bar',
		            barWidth: '60%',
		            data:seriesData
		        }
		    ]
		};
		jobCountTopChart.hideLoading();
		jobCountTopChart.setOption(option);
	});
}

function initFaultDurationTopChart() {
	var faultDurationTopChart =  echarts.init(document.getElementById('faultDurationTopChart'), 'macarons');
	faultDurationTopChart.showLoading();
	$.post(ctx + "/extractDataJob/getFaultDurationTop", {"frontMachineKey": $("#frontMachineKey").val()}
				, function(data, status) {
			var chartData = $.parseJSON(data);
			var xAxisData = new Array();
			var seriesData = new Array();
			for(var i = 0; i < chartData.length; i++) {
				xAxisData.push(chartData[i].jobName);
				seriesData.push(chartData[i].faultDuration);
			}
			option = {
				title: {
			        text: '作业故障时长前十名',
			        left: 'center'
			    },
			    color: ['#3398DB'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : xAxisData,
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine:{show:false}
			        }
			    ],
			    series : [
			        {
			            name:'故障次数',
			            type:'bar',
			            barWidth: '60%',
			            data:seriesData
			        }
			    ]
			};
			faultDurationTopChart.hideLoading();
			faultDurationTopChart.setOption(option);	
	});
}