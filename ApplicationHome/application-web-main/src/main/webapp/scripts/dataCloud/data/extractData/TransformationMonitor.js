$(function(){
	initTransHandleLinesChart('week');
});

function initTransHandleLinesChart(flag) {
	var readChart = echarts.init(document.getElementById('transReadLinesChart'), 'macarons');
	var writeChart = echarts.init(document.getElementById('transWrieteLinesChart'), 'macarons');
	var inputChart = echarts.init(document.getElementById('transInputLinesChart'), 'macarons');
	var outputChart = echarts.init(document.getElementById('transOutputLinesChart'), 'macarons');
	var updateChart = echarts.init(document.getElementById('transUpdateLinesChart'), 'macarons');
	var rejectedChart = echarts.init(document.getElementById('transRejectedLinesChart'), 'macarons');
	readChart.showLoading();
	writeChart.showLoading();
	inputChart.showLoading();
	outputChart.showLoading();
	updateChart.showLoading();
	rejectedChart.showLoading();
	var param = {
			"frontMachineKey": $("#frontMachineKey").val(), 
			"transName": $("#transName").val(),
			"flag": flag
		}
	$.post(ctx + "/extractDataJob/getTransHandleLines", param, function(data, status) {
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
			
//			option = {
//				    title: {
//				    	show: false,
//				        text: $("#transName").val() + '处理数据行数统计',
//				        left: 'center'
//				    },
//				    tooltip: {
//				        trigger: 'axis'
//				    },
//				    legend: {
//				    	show: false,
//				        data:['读取行数','写入行数','输入行数','输出行数','更新行数','拒绝行数'],
//				        left: 'right',
//				        top: '5%'
//				    },
//				    xAxis:  {
//				        type: 'category',
//				        boundaryGap: false,
//				        data: xAxisData
//				    },
//				    yAxis: {
//				        type: 'value',
////				        axisLabel: {
////				            formatter: '{value} °C'
////				        }
//				    }, 
//				    dataZoom: [{
//				        type: 'inside',
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
//				    series: [
//				        {
//				            name:'读取行数',
//				            type:'line',
//				            data: readLineList,
//				            markPoint: {
//				                data: [
//				                    {type: 'max', name: '最大值'},
//				                    {type: 'min', name: '最小值'}
//				                ]
//				            },
//				            markLine: {
//				                data: [
//				                    {type: 'average', name: '平均值'}
//				                ]
//				            }
//				        },
//				        {
//				            name:'写入行数',
//				            type:'line',
//				            data:writeLineList,
//				            markPoint: {
//				                data: [
//				                    {type: 'max', name: '最大值'},
//				                    {type: 'min', name: '最小值'}
//				                ]
//				            },
//				            markLine: {
//				            	data: [
//					                    {type: 'average', name: '平均值'}
//					                ]
//				            }
//				        },
//				        {
//				            name:'输入行数',
//				            type:'line',
//				            data:inputLineList,
//				            markPoint: {
//				                data: [
//				                    {type: 'max', name: '最大值'},
//				                    {type: 'min', name: '最小值'}
//				                ]
//				            },
//				            markLine: {
//				            	data: [
//					                    {type: 'average', name: '平均值'}
//					                ]
//				            }
//				        },
//				        {
//				            name:'输出行数',
//				            type:'line',
//				            data:ouputLineList,
//				            markPoint: {
//				                data: [
//				                    {type: 'max', name: '最大值'},
//				                    {type: 'min', name: '最小值'}
//				                ]
//				            },
//				            markLine: {
//				            	data: [
//					                    {type: 'average', name: '平均值'}
//					                ]
//				            }
//				        },
//				        {
//				            name:'更新行数',
//				            type:'line',
//				            data:updatedLineList,
//				            markPoint: {
//				                data: [
//				                    {type: 'max', name: '最大值'},
//				                    {type: 'min', name: '最小值'}
//				                ]
//				            },
//				            markLine: {
//				            	data: [
//					                    {type: 'average', name: '平均值'}
//					                ]
//				            }
//				        },
//				        {
//				            name:'拒绝行数',
//				            type:'line',
//				            data:rejectedLineList,
//				            markPoint: {
//				                data: [
//				                    {type: 'max', name: '最大值'},
//				                    {type: 'min', name: '最小值'}
//				                ]
//				            },
//				            markLine: {
//				            	data: [
//					                    {type: 'average', name: '平均值'}
//					                ]
//				            }
//				        }
//				    ]
//				};
//		}

			var readOption = {
				    tooltip: {
				        trigger: 'axis'
				    },
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: xAxisData
				    },
				    yAxis: {
				        type: 'value',
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
				        }
				    ]
				};
		var writeOption = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: xAxisData
			    },
			    yAxis: {
			        type: 'value',
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
			        }
			    ]
			}
	var inputOption = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: xAxisData
		    },
		    yAxis: {
		        type: 'value',
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
		        }
		    ]
		};
		var outputOption = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: xAxisData
			    },
			    yAxis: {
			        type: 'value',
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
			        }
			    ]
			};
		var updateOption = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: xAxisData
			    },
			    yAxis: {
			        type: 'value',
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
			        }
			    ]
			};
		var rejectOption = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: xAxisData
			    },
			    yAxis: {
			        type: 'value',
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
		readChart.hideLoading();
		readChart.setOption(readOption);
		writeChart.hideLoading();
		writeChart.setOption(writeOption);
		inputChart.hideLoading();
		inputChart.setOption(inputOption);
		outputChart.hideLoading();
		outputChart.setOption(outputOption);
		updateChart.hideLoading();
		updateChart.setOption(updateOption);
		rejectedChart.hideLoading();
		rejectedChart.setOption(rejectOption);
	});
}

/*
 * 切换统计范围(本周、本月、本年)
 */
function changeChartFlag(flag) {
	initTransHandleLinesChart(flag);
}