//时间控件
$(function(){
	
     $("#updateTimePerYear").datetimepicker({
         format : "yyyy-mm-dd hh:ii",
         minView : "hour",
         todayHighlight : true,
         initialDate : new Date(),
         keyboardNavigation : true,
         autoclose : true,
         pickerPosition: "top-right",
         maxView: "year",
         startView : "year"
     }).on('changeDate', function(ev){
    	 res_info_type.update_time_point = $("#updateTimePerYear").val();
    	    });
     
     $("#updateTimePerMonth").datepicker({
    	 format:"yyyy-mm-dd",
		 language:"zh-CN",
         todayHighlight : true,
         initialDate : new Date(),
         keyboardNavigation : true,
         autoclose : true,
         pickerPosition: "top-right",
     }).on('changeDate', function(ev){
    	 res_info_type.update_time_point = $("#updateTimePerMonth").val();
	    });
     
     $("#updateTimePerDay").clockpicker({
         format : "yyyy-mm-dd hh:ii",
         minView : "hour",
         todayHighlight : true,
         initialDate : new Date(),
         keyboardNavigation : true,
         autoclose : true,
         pickerPosition: "top-right",
         maxView : "day",
         startView : "day"
     }).on('change', function(ev){
    	 res_info_type.update_time_point = $("#updateTimePerDay").val();
	    });
     
     $("#updateTimePerHour").numberbox({
    	 max : 12,
    	 min : 1,
    	 showmark : 1,
    	 showmodel : 1
     }).on('blur',function(ev){
    	 res_info_type.update_time_point = $("#updateTimePerHour").val();
     });
     
     $("#updateTimeOnetime").datetimepicker({
         format : "yyyy-mm-dd hh:ii",
         minView : "hour",
         todayHighlight : true,
         initialDate : new Date(),
         keyboardNavigation : true,
         autoclose : true,
         pickerPosition: "top-right",
         maxView: "year",
         startView : "year"
     }).on('changeDate', function(ev){
    	 res_info_type.update_time_point = $("#updateTimeOnetime").val();
    	    });
     
     //绑定标签页事件
     $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
         //生成第三步的表格
    	 if($(e.target).attr('href') == "#step3"){
    		 if($(e.relatedTarget).attr('href') == "#step2"){
    			 $("#fieldBox").empty();
    			 readTableName();
    		 };
    	 }else if($(e.target).attr('href') == "#step4"){
    		 showInfo();
    	 }
    	 
     });
     
     getDepartments();
     
//     //初始化省列表
//     $.ajax({
// 		type: "POST",
//		url:"getProvinces",
//		contentType:'application/json;charset=UTF-8',
//		success:function(d){
//			var data = eval(d);
//			for(var i=0;i<data.length;i++){
//				if(data[i].area_code == "370000"){
//					var html = "<option value='"+ data[i].area_code +"' selected>" + data[i].area_name + "</option>";
//				}else{
//					var html = "<option value='"+ data[i].area_code +"'>" + data[i].area_name + "</option>";
//				}
//				$("#department_province").append(html);
//			}
//		},
//		error:function(){
//			alert('服务出错，请稍后重试');
//		}
//	});
//    setAreaOption("department_city","370000");
//    setAreaOption("department_area","370200");
//    
//    $("#department_province").change(function(){
//    	$("#department_city").empty();
//    	$("#department_area").empty();
//    	setAreaOption("department_city",$("#department_province").val(),function(){
//    		setAreaOption("department_area",$("#department_city").val());
//    	});
//    })
//    
//    $("#department_city").change(function(){
//    	$("#department_area").empty();
//    	setAreaOption("department_area",$("#department_city").val());
//    })
    
});

function getDepartments(){
	var data = {
		is_inside:$("input[name='is_inside']:checked").val()
	}
	$.ajax({
 		type: "POST",
		url:"getDepartments",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var deps = eval('(' + d +')');
			$("#department").empty();
			for(var i=0;i<deps.length;i++){
				var html = "<option value='" + deps[i].department_guid + "'>" +  deps[i].department_name + "</option>";
				$("#department").append(html);
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}


//function setAreaOption(id,parent_code,callback){
//	var target = $("#"+id);
//	var data = {
//			parent_code:parent_code
//	};
//	$.ajax({
// 		type: "POST",
//		url:"getAreaByParentCode",
//		data:JSON.stringify(data),
//		contentType:'application/json;charset=UTF-8',
//		success:function(d){
//			var data = eval(d);
//			if(parent_code == "370000"){
//				for(var i=0;i<data.length;i++){
//					if(data[i].area_code == "370200"){
//						var html = "<option value='"+ data[i].area_code +"' selected>" + data[i].area_name + "</option>";
//					}else{
//						var html = "<option value='"+ data[i].area_code +"'>" + data[i].area_name + "</option>";
//					}
//					target.append(html);
//				}
//			}else if(parent_code == "370200"){
//				for(var i=0;i<data.length;i++){
//					if(data[i].area_code == "370202"){
//						var html = "<option value='"+ data[i].area_code +"' selected>" + data[i].area_name + "</option>";
//					}else{
//						var html = "<option value='"+ data[i].area_code +"'>" + data[i].area_name + "</option>";
//					}
//					target.append(html);
//				}
//			}else{
//				for(var i=0;i<data.length;i++){
//					var html = "<option value='"+ data[i].area_code +"'>"+data[i].area_name+ "</option>";
//					target.append(html);
//				}
//			}
//			if(callback){
//				callback();
//			}
//		},
//		error:function(){
//			alert('服务出错，请稍后重试');
//		}
//	});
//}


var res_info_type = {};
var tableInfos = [];
function nextStep(index){
	var error = false;
	var message = "";
	if(index == 1){
		//检查编号是否重复
		if($("#res_number").val()==""){
			$("#res_number").css("border-color","red");
			alert("请填写资源编号");
			return;
		}
		var data = {
				res_number:$("#res_number").val()
		}
		$("#res_number").removeAttr("border-color");
		$.ajax({
	 		type: "POST",
			url:"checkResNum",
			data:JSON.stringify(data),
			contentType:'application/json;charset=UTF-8',
			async: false,
			success:function(d){
				if(d){
					error = true;
					alert("资源编号已经存在，请重新输入！");
				};
			},
			error:function(){
				alert('服务出错，请稍后重试');
			}
		});
		if(error){
			$("#res_number").css("border-color","red");
			return;
		}
		//收集数据
		res_info_type.res_name = $("#res_name").val();
		res_info_type.res_number = $("#code_prefix").html() + $("#res_number").val();
		res_info_type.res_responsible_party = $("#res_responsible_party").val();
		res_info_type.related_bussiness = $("#related_bussiness").val();
		res_info_type.res_description = $("#res_description").val();
		var update_cycle = $("#update_cycle").val();
		res_info_type.update_cycle = update_cycle;
		res_info_type.share_situation=$("input[name='share_situation']:checked").val();
		res_info_type.is_inside=$("input[name='is_inside']:checked").val();
		res_info_type.remark=$("#remark").val();
		res_info_type.department_name=$("#department").find("option:selected").text();
		res_info_type.department_guid=$("#department").val();
		res_info_type.admin_name=$("#admin_name").val();
		res_info_type.admin_duty=$("#admin_duty").val();
		res_info_type.admin_phone=$("#admin_phone").val();
		//数据源信息
		res_info_type.source = $("input.source:checked").val();
		if(res_info_type.source == "数据库"){
			$("#readBtn").show();
			res_info_type.database_type = $("select.database_type").val();
			res_info_type.port = $("input.port").val();
			res_info_type.db_name = $("input.db_name").val();
			res_info_type.url = $("input.url").val();
		}else{
			$("#readBtn").hide();
		}
		res_info_type.host = $("input.host").val();
		res_info_type.system = $("input.system").val();
		res_info_type.deploy_network = $("select.deploy_network").val();
		res_info_type.account = $("input.account").val();
		res_info_type.password = $("input.password").val();
		res_info_type.is_telnet = $("input.is_telnet:checked").val();
		res_info_type.is_file_output = $("input.is_file_output:checked").val();
	}else if(index == 2){
		//检查是否有主表
		error = true;
		message = "请指定一个主表";
		$("#dataSourceTableBox select[name='table_type']").each(function(){
			if($(this).val()== 0){
				error = false;
				message = "";
				return false;
			}
		});
		if(error){
			alert(message);
			return;
		}
		//检查输入情况
		var tableNames = [];
		$("#dataSourceTableBox input[name='table_name_en']").each(function(){
			$(this).removeAttr("border-color");
			if($(this).val()==''||$(this).val()==null){
				$(this).css("border-color","red");
				error = true;
				message = "请填写所有表名！";
				return false;
			}
			tableNames.push($(this).val());
		})
		if(error){
			alert(message);
			return;
		}
		//判断表名是否重复
		if(tableNames.length > 1){
			for(var i=0;i<tableNames.length;i++){
				if(error){
					break;
				}
				for(var j=i+1;j<tableNames.length;j++){
					if(tableNames[i]==tableNames[j]){
						alert("表名不能重复！");
						return;
					}
				}
			}
		}
		//取得填写的数据
		tableInfos = [];
		$("#dataSourceTableBox tr").each(function(){
			var ThisRow = $(this);
			var tableInfo = {};
			tableInfo.table_name_en = ThisRow.find("input[name='table_name_en']").val();
			tableInfo.table_description = ThisRow.find("input[name='table_description']").val();
			tableInfo.table_type = ThisRow.find("select[name='table_type']").val();
			tableInfos.push(tableInfo);
		});
		//存入数据资源
		res_info_type.res_info_table = tableInfos;
	}else if(index == 3){
		//每个表至少要有一个字段
		$("#fieldBox div[class='fieldContent']").each(function(){
			var trCount = 0;
			$(this).find("tr").each(function(){
				trCount++;
			})
			if(trCount == 1){
				error = true;
				message = "请为每张表格添加至少一个字段";
			}
		});
		if(error){
			alert(message);
			return;
		}
		//检查表名录入情况
		$("#fieldBox input[name='name']").each(function(){
			var fieldName = $(this).val();
			$(this).removeAttr("border-color");
			if(fieldName =='' || fieldName == null){
				$(this).css("border-color","red");
				error = true;
				message = "必须填写所有字段名";
			}
		});
		if(error){
			alert(message);
			return;
		}
		//检查主表主键
		$("#fieldBox div[class='fieldContent']").each(function(){
			var type = $(this).find("span[class='tableType']").html();
			var count = 0;
			$(this).find("input[name='is_primary_key']:checked").each(function(){
				count++;
			});
			if(type == "主表"){
				if(count==0){
					error = true;
					message = "主表必须设置一个主键";
				}
			}
		});
		if(error){
			alert(message);
			return;
		}
		//取得填写的数据
		$("#fieldBox div[class='fieldContent']").each(function(){
			var fieldInfos = [];
			var tableName = $(this).find("span[class='tableName']").html();
			var fieldNames = [];
			$(this).find("tr[class='dataRow']").each(function(){
				var fieldInfo = {};
				var name = $(this).find("input[name='name']").val();
				if($.inArray(name,fieldNames) != -1){
					error = true;
					message = "同表中字段名不能重复！";
					return false;
				}
				fieldNames.push(name);
				fieldInfo.name = name;
				fieldInfo.description = $(this).find("input[name='description']").val();
				fieldInfo.orig_type = $(this).find("input[name='orig_type']").val();
				fieldInfo.type = $(this).find("select[name='type']").val();
				fieldInfo.length = $(this).find("input[name='length']").val();
				fieldInfo.is_primary_key = $(this).find("input[name='is_primary_key']:checked").val()==1?1:0;
				fieldInfo.is_mark = $(this).find("input[name='is_mark']:checked").val()==1?1:0;
				fieldInfo.is_time_stamp = $(this).find("input[name='is_time_stamp']:checked").val()==1?1:0;
				fieldInfo.is_foreign_key = $(this).find("input[name='is_foreign_key']:checked").val()==1?1:0;
				fieldInfos.push(fieldInfo);
			});
			if(error){
				return false;
			}
			for(var i=0;i<tableInfos.length;i++){
				if(tableInfos[i].table_name_en == tableName){
					tableInfos[i].res_info_table_structure = fieldInfos;
				}
			}
		})
		if(error){
			alert(message);
			return;
		}
	}
	console.log(res_info_type);
	$('#myTab li:eq('+index+') a').tab('show');
	eventFun.setStep(index+1);
}

function lastStep(index){
	$('#myTab li:eq('+index+') a').tab('show');
	eventFun.setStep(index+1);
}

//-------------第1步的方法------------
//更新时间选择框切换
function changeUpdateTimeBox(){
	$("#updateTimeBox").children("div").css("display","none");
	var type = $("#update_cycle").val();
	if(type == "每年"){
		$("#perYearBox").css("display","inline");
	}else if(type == "每月"){
		$("#perMonthBox").css("display","inline");
	}else if(type == "每日"){
        $("#perDayBox").css("display","inline");
    }else if(type == "数小时"){
    	$("#perHourBox").css("display","inline");
    }else if(type == "一次性"){
    	$("#onetimeBox").css("display","inline");
    }
	//清空已经填写的时间
	$("#updateTimePerYear").val("");
	$("#updateTimePerMonth").val("");
	$("#updateTimePerDay").val("");
	$("#updateTimePerHour").val("");
	$("#updateTimeOnetime").val("");
}

//数据源类型切换
function changeSourceInfo(obj){
	var id = $(obj).val();
	if(id == "数据库"){
		$("div.databaseInfo").show();
	}else{
		$("div.databaseInfo").hide();
	}
}

//获取字符串
function getUrl(){
	var type = $("select.database_type").val();
	var url;
	if(type == "MySQL"){
		url = "jdbc:mysql://"+$("input.host").val()+":"+$("input.port").val()+"/"+$("input.db_name").val();
	}else if(type == "Oracle"){
		url = "jdbc:oracle:thin:@"+$("input.host").val()+":"+$("input.port").val()+":"+$("input.db_name").val();
	}else if(type == "SQLServer"){
		url = "jdbc:sqlserver://"+$("input.host").val()+":"+$("input.port").val()+";databaseName="+$("input.db_name").val();
	}
	$("input.url").val(url);
}

//-------------------第2步的方法-----------------------
//检查是否已经有主表
function checkMainTable(obj){
	var count = 0;
	var thisTable = $(obj).parent().parent().parent().parent().parent();
	thisTable.find("select[name='table_type']").each(function(){
			if($(this).val()==0){
				count++;
			}
		});
	if(count>1){
		alert("每个资源只能拥有一个主表");
		$(obj).val(1);
	}
}
//数据表信息动态行
var count = 1;
function addTr() {
	var targetTable = $("#dataSourceTableBox").find("table tbody");
    $("#dataSourceTableRowHidden tbody tr").clone().appendTo(targetTable);   //在表格后面添加一行
    changeIndex(targetTable);//更新行号
}
function changeIndex(obj) {
    var i = 1;
    obj.find("tr").each(function () { //循环tab tbody下的tr
        $(this).find("span[class='num']").html(i+'.');//更新行号
        i++;
    });
}
function delTr(opp) {
	var targetTable = $("#dataSourceTableBox").find("table tbody");
    var length = targetTable.find("tr").length;
    if (length <= 1) {
        alert("至少保留一行");
    } else {
        $(opp).parent().parent().remove();//移除当前行
        changeIndex(targetTable);
    }
}
//记录是否是读取的表
var isRead = false;
function readTable(){
	var zTreeObj;
	art.dialog({
        title: '表格选择',
        content: document.getElementById('tableChoosenBoxHidden'),
        lock: true,
        background: 'gray', // 背景色
        opacity: 0.87,  // 透明度
        id: '3',
        ok:function(){
        	var checkedNodes = zTreeObj.getCheckedNodes(true);
        	var target = $("#dataSourceTableBox").find("table tbody");
        	target.empty();
        	for(var i=0;i<checkedNodes.length;i++){
        		$("#dataSourceTableChooseHidden input[name='table_name_en']").val(checkedNodes[i].name);
        		$("#dataSourceTableChooseHidden input[name='table_description']").val(checkedNodes[i].table_description);
        		$("#dataSourceTableChooseHidden tbody tr").clone().appendTo(target);   //在表格后面添加一行
        	    changeIndex(target);
        	}
        	isRead = true;
        	return true;
        }
    });
	
	$.ajax({
 		type: "POST",
		url:"readTable",
		data:JSON.stringify(res_info_type),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(d == null){
				alert("数据库链接失败，请检查数据源信息填写是否正确！");
				art.dialog.list['3'].close();
				return;
			}
			var data = eval(d);
			var nodes = [];
			for(var i=0;i<data.length;i++){
				var node = {
						name:data[i].table_name,
						table_description:data[i].table_description
				}
				nodes.push(node);
			}
			var setting = {
					check: {
						enable: true
					},
					data: {
						simpleData: {
							enable: true
						}
					}
			};
			var zNodes =  [{name: "所有表",open:true, nocheck:true,children: nodes}];
			zTreeObj = $.fn.zTree.init($("#tableTree"), setting, zNodes);
			zTreeObj.setting.check.chkboxType = { "Y":"s", "N":"ps"};
		},
		error:function(){
			alert('连接失败');
		},
		beforeSend: function(){    
            $("<div class=\"loading\">连接中</div>").prependTo("#tableChoosenBoxHidden");    
        },   
        complete: function(){    
            $(".loading").remove();    
        }
	});
}
//-------------------第3步的方法-----------------------
//读取第2步的表格数据
function readTableName(){
	if(isRead){
		$.ajax({
	 		type: "POST",
			url:"readField",
			data:JSON.stringify(res_info_type),
			contentType:'application/json;charset=UTF-8',
			success:function(d){
				var data = eval(d);
				var button = $("#fieldReadBoxHidden button.fieldAddBtn");
				for(var i=0;i<data.length;i++){
					$("#fieldReadBoxHidden tr[class='dataRow']").remove();
					if(data[i].table_type == 1){
						$("#fieldsReadAddBoxHidden input[name='is_foreign_key']").prop("disabled",false);
					}else{
						$("#fieldsReadAddBoxHidden input[name='is_foreign_key']").prop("disabled",true);
					}
					for(var j=0;j<data[i].res_info_table_structure.length;j++){
						var s = data[i].res_info_table_structure[j];
						if(s == null){
							continue;
						}
						$("#fieldsReadAddBoxHidden input[name='name']").val(s.name);
						$("#fieldsReadAddBoxHidden input[name='orig_type']").val(s.orig_type);
						$("#fieldsReadAddBoxHidden input[name='description']").val(s.description);
						var otype = s.orig_type.toUpperCase();
						if(otype.indexOf('VARCHAR')>=0){
							$("#fieldsReadAddBoxHidden select[name='type'] option").each(function(){
								$(this).attr("selected",false);
								if($(this).val() == 'VARCHAR2'){
									$(this).attr("selected",true);
								}
							});
						}else if(otype.indexOf('INT')>=0 || otype.indexOf('FLOAT')>=0 || otype.indexOf('DOUBLE')>=0){
							$("#fieldsReadAddBoxHidden select[name='type'] option").each(function(){
								$(this).attr("selected",false);
								if($(this).val() == 'NUMBER'){
									$(this).attr("selected",true);
								}
							});
						}else if(otype.indexOf('timestamp')>=0){
							$("#fieldsReadAddBoxHidden select[name='type'] option").each(function(){
								$(this).attr("selected",false);
								if($(this).val() == 'TIMESTAMP(6)'){
									$(this).attr("selected",true);
								}
							});
						}else{
							$("#fieldsReadAddBoxHidden select[name='type'] option").each(function(){
								$(this).attr("selected",false);
								if(otype.indexOf($(this).val()) >= 0){
									$(this).attr("selected",true);
								}
							});
						}
						$("#fieldsReadAddBoxHidden input[name='length']").val(s.length);
						if(s.is_primary_key == 1){
							$("#fieldsReadAddBoxHidden input[name='is_primary_key']").prop("checked",true);
						}else{
							$("#fieldsReadAddBoxHidden input[name='is_primary_key']").prop("checked",false);
						}
						if(s.is_mark == 1){
							$("#fieldsReadAddBoxHidden input[name='is_mark']").prop("checked",true);
						}else{
							$("#fieldsReadAddBoxHidden input[name='is_mark']").prop("checked",false);
						}
						$("#fieldReadBoxHidden tbody").append($("#fieldsReadAddBoxHidden tr").clone());
					}
					var type;
					if(data[i].table_type == 0){
						type="主表";
						button.attr("onclick","addField(this,0,'fieldsReadAddBoxHidden')");
					}else if(data[i].table_type == 1){
						type="从表";
						button.attr("onclick","addField(this,1,'fieldsReadAddBoxHidden')");
					}else if(data[i].table_type == 2){
						type="字典表";
						button.attr("onclick","addField(this,0,'fieldsReadAddBoxHidden')");
					}
					var html = "<span>表名称：</span><span class='tableName'>" + data[i].table_name_en + "</span>" +
			           		   "<span> ， </span>" + "<span class='tableType'>" + type + "</span>";
					$("#fieldReadBoxHidden label[class='tableNameLabel']").html(html);
					$("#fieldReadBoxHidden div[class='fieldContent']").clone().appendTo("#fieldBox");
				}
				//重置隐藏，便于动态行添加使用
				$("#fieldsReadAddBoxHidden input[name='name']").val("");
				$("#fieldsReadAddBoxHidden input[name='orig_type']").val("");
				$("#fieldsReadAddBoxHidden select[name='type'] option").each(function(){
						$(this).prop("selected",false);
				});
				$("#fieldsReadAddBoxHidden input[name='length']").val("");
				$("#fieldsReadAddBoxHidden input[name='is_primary_key']").prop("checked",false);
				$("#fieldsReadAddBoxHidden input[name='is_mark']").prop("checked",false);
			},
			error:function(){
				alert('连接失败');
			},
			beforeSend: function(){
				art.dialog({
			        title: '载入中',
			        content: "<div class=\"loading\">连接中</div>",
			        lock: true,
			        background: 'gray', // 背景色
			        opacity: 0.87,  // 透明度
			        id: '4',
			    });  
	        },   
	        complete: function(){    
	        	art.dialog.list['4'].close();
	        }
		});
	}else{
		var button = $("#fieldBoxHidden button.fieldAddBtn");
		for(var i=0;i<tableInfos.length;i++){
			var type;
			if(tableInfos[i].table_type == 0){
				type="主表";
				button.attr("onclick","addField(this,0,'fieldsAddBoxHidden')");
			}else if(tableInfos[i].table_type == 1){
				type="从表";
				button.attr("onclick","addField(this,1,'fieldsAddBoxHidden')");
			}else if(tableInfos[i].table_type == 2){
				type="字典表";
				button.attr("onclick","addField(this,0,'fieldsAddBoxHidden')");
			}
			var html = "<span>表名称：</span><span class='tableName'>" + tableInfos[i].table_name_en + "</span>" +
			           "<span> ， </span>" + "<span class='tableType'>" + type + "</span>"
			$("#fieldBoxHidden label[class='tableNameLabel']").html(html);
			$("#fieldBoxHidden div[class='fieldContent']").clone().appendTo("#fieldBox");
		}
	}
}

function addField(obj,type,boxId){
	var foreign = $("#"+ boxId +" input[name='is_foreign_key']");
	if(type == 0){
		foreign.prop("disabled",true);
	}else if(type == 1){
		foreign.prop("disabled",false);
	}
	$(obj).parent().parent().find("table tbody").append($("#"+ boxId +" tr").clone());
}

function delField(opp) {
	$(opp).parent().parent().remove();//移除当前行
}
//-------------------第4步的方法-----------------------
//读取填写的信息
function showInfo(){
	$("#confirmInfo td[class='res_name']").html(res_info_type.res_name);
	$("#confirmInfo td[class='res_number']").html(res_info_type.res_number);
	$("#confirmInfo td[class='res_responsible_party']").html(res_info_type.res_responsible_party);
	$("#confirmInfo td[class='related_bussiness']").html(res_info_type.related_bussiness);
	$("#confirmInfo td[class='res_description']").html(res_info_type.res_description);
	if(res_info_type.update_time_point != null){
		if(res_info_type.update_cycle == "数小时"){
			$("#confirmInfo td[class='update_cycle']").html("每 " + res_info_type.update_time_point + " 小时");
		} else if(res_info_type.update_cycle == "一次性"){
			$("#confirmInfo td[class='update_cycle']").html("在 " + res_info_type.update_time_point + " 一次性导入");
		} else if(res_info_type.update_cycle == "每年"){
			$("#confirmInfo td[class='update_cycle']").html(res_info_type.update_cycle + res_info_type.update_time_point.substr(5,5));
		} else if(res_info_type.update_cycle == "每月"){
			$("#confirmInfo td[class='update_cycle']").html(res_info_type.update_cycle + res_info_type.update_time_point.substr(3,2) + " 日");
		} else {
			$("#confirmInfo td[class='update_cycle']").html(res_info_type.update_cycle + " " + res_info_type.update_time_point);
		}
	}
	var shareSituation;
	switch (res_info_type.share_situation){
		case "0" : shareSituation = "无条件共享";break;
		case "1" : shareSituation = "需管理部门审批";break;
		case "2" : shareSituation = "需提供部门审批";break;
		case "3" : shareSituation = "不共享";
 	} 
	$("#confirmInfo td[class='share_situation']").html(shareSituation);
	$("#confirmInfo td[class='is_inside']").html(res_info_type.is_inside == 0?'内部':'外部');
	$("#confirmInfo td[class='remark']").html(res_info_type.remark);
	$("#confirmInfo td[class='department']").html(res_info_type.department_name);
	var adminInfo = res_info_type.admin_name + "/" + res_info_type.admin_duty + "/" + res_info_type.admin_phone;
	$("#confirmInfo td[class='admin']").html(adminInfo);
	var source = "";
	if(res_info_type.source == "数据库"){
		source = "数据库类型：" +  res_info_type.database_type
			     + " 主机：" + res_info_type.host + " 端口：" + res_info_type.port + " 数据库名： " + res_info_type.db_name + "<br>";
	}else{
		source = "服务地址：" + res_info_type.host + "<br>";
	}
	var sourceInfo = "数据源类型：" + res_info_type.source + "<br>"
				   + source
			       + "服务器系统：" + res_info_type.system + " 部署网络："+ res_info_type.deploy_network + "<br>"
			       + "远程登陆：" + (res_info_type.is_telnet==0?"允许":"不允许") + " 文件传输：" + (res_info_type.is_file_output==0?"允许":"不允许") + "<br>"
			       + "用户名：" + res_info_type.account + "<br>"
			       + "密码：" + res_info_type.password + "<br>";
	$("#confirmInfo td[class='source']").html(sourceInfo);
	
	//显示表结构
	$("#tableInfo tbody").empty();
	for(var i=0;i<tableInfos.length;i++){
		var fieldInfos = tableInfos[i].res_info_table_structure;
		$("#tableInfo tbody").append("<tr><th colspan=\"9\" style=\"text-align:center\">" + tableInfos[i].table_name_en + " , " + 
									  (tableInfos[i].table_type==0?"主表":(tableInfos[i].table_type==1)?"从表":"字典表") + "</th></tr>" +
									 "<tr><th>表描述</th><td colspan=\"8\">" + tableInfos[i].table_description + "</td>" +
								     "<tr><th colspan=\"2\">字段名</th><th>描述</th><th>类型</th><th>长度</th><th>主键</th><th>标识</th><th>时间戳</th><th>外键</th></tr>")
		for(var j=0;j<fieldInfos.length;j++){
			$("#tableInfo tbody").append("<tr>" +
										 "<td colspan=\"2\">" + fieldInfos[j].name +"</td><td>" + fieldInfos[j].description + "</td>" + 
					                     "<td>" + fieldInfos[j].type +"</td><td>" + fieldInfos[j].length + "</td>" +
					                     "<td>" + (fieldInfos[j].is_primary_key==1?"是":"") + "</td><td>" + (fieldInfos[j].is_mark==1?"是":"") + "</td>" +
					                     "<td>" + (fieldInfos[j].is_timestamp==1?"是":"") + "</td><td>" + (fieldInfos[j].is_foreign_key==1?"是":"") + "</td>" +
					                     "</tr>");
		}
	}
}

function saveRes(){
	$.ajax({
 		type: "POST",
		url:"saveRes",
		data:JSON.stringify(res_info_type),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			alert("保存成功！");
			location.href = "toListResource";
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}


//计算高度的方法
//function changeHeight(){
//	var rightHeight=$("#rightcontent").height();
//	//alert(rightHeight);
//    if(rightHeight>543){
//        $("#leftmenu").height(rightHeight);
//        $(".body").height(rightHeight);
//    }else{
//    	$(".body").height("543");
//    }
//    setLeftMenuHeight();
//}