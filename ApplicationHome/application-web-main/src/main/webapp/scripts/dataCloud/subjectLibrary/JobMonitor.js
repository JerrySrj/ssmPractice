$(function(){
	initDateYearRange();
	initJobHandleLinesChart('week');
	initTransFaultTopChart('week');
});

function initJobHandleLinesChart(flag) {
	var jobHandleChart = echarts.init(document.getElementById('jobHandleLinesChart'), 'macarons');
	jobHandleChart.showLoading();
	var param = {
			"frontMachineKey": $("#frontMachineKey").val(), 
			"jobId": $("#jobId").val(),
			"flag": flag
		}
	$.post(ctx + "/extractDataJob/getJobHandleLines", param, function(data, status) {
		if(status == "success") {
			var chartData = $.parseJSON(data);
			var readLineList = chartData.read;
			var writeLineList = chartData.write;
			var inputLineList = chartData.input;
			var ouputLineList = chartData.output;
			var updatedLineList = chartData.updated;
			var rejectedLineList = chartData.rejected;
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
				        text: $("#jobName").val() + '处理数据行数统计',
				        left: 'center'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['读取行数','写入行数','输入行数','输出行数','更新行数','拒绝行数'],
				        left: 'right',
				        top: '5%'
				    },
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: xAxisData
				    },
				    yAxis: {
				        type: 'value',
//				        axisLabel: {
//				            formatter: '{value} °C'
//				        }
				    }, 
				    dataZoom: [{
				        type: 'inside',
				        start: 0,
				        end: 100
				    }, {
				        start: 0,
				        end: 10,
				        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				        handleSize: '80%',
				        handleStyle: {
				            color: '#fff',
				            shadowBlur: 3,
				            shadowColor: 'rgba(0, 0, 0, 0.6)',
				            shadowOffsetX: 2,
				            shadowOffsetY: 2
				        }
				    }],
				    series: [
				        {
				            name:'读取行数',
				            type:'line',
				            data: readLineList,
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
				            name:'写入行数',
				            type:'line',
				            data:writeLineList,
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
				            name:'输入行数',
				            type:'line',
				            data:inputLineList,
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
				            name:'输出行数',
				            type:'line',
				            data:ouputLineList,
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
				            name:'更新行数',
				            type:'line',
				            data:updatedLineList,
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
				            name:'拒绝行数',
				            type:'line',
				            data:rejectedLineList,
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
		 // 使用刚指定的配置项和数据显示图表。
		jobHandleChart.hideLoading();
		jobHandleChart.setOption(option);
	});
}

/*
 * 切换统计范围(本周、本月、本年)
 */
function changeChartFlag(flag) {
	initjobHandleChart(flag);
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

function searchFaultRateChart() {
	$("input[name='analysisType']").each(function() {
		if($(this).prop("checked"))
			initTransFaultTopChart($(this).val());
	});
}

function initTransFaultTopChart(flag) {
	var transFaultTopChart =  echarts.init(document.getElementById('transFaultTopChart'), 'macarons');
	transFaultTopChart.showLoading();
	var param = {
			"frontMachineKey": $("#frontMachineKey").val(), 
			"jobId": $("#jobId").val(),
			"flag": flag,
			"year": $("#beginYear").val(),
			"typeVal": $("#typeVal").val()
		}
	$.post(ctx + "/extractDataJob/getTransFaultTopChart", param
			, function(data, status) {
		var chartData = $.parseJSON(data);
		if(chartData.length == 0) {
			$("#transFaultTopChart").empty();
			$("#transFaultTopChart").append("<label style='color:red'>暂无数据</label>");
			$("#transFaultTopChart").css("text-align", "center");
		} else {
			var xAxisData = new Array();
			var seriesData = new Array();
			for(var i = 0; i < chartData.length; i++) {
				xAxisData.push(chartData[i].transName);
				seriesData.push(chartData[i].faultCount);
			}
			option = {
				title: {
			        text: '受影响作业排名',
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
			transFaultTopChart.hideLoading();
			transFaultTopChart.setOption(option);
		}
	});
}