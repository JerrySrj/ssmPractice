$(document).ready(
	function (){
		getContentInfo();
	}		
)
var resContents;//资源目录信息
var contentInfo;//所有规则下的目录信息
function loadData(){
	var data = {
			searchStr:createSearchStr()
		};
	$.ajax({
 		type: "POST",
		url:"getResContentData",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval(d);
			resContents = data;
			console.log(data);
			showData(resContents);
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

//查询出所有规则下的所有目录
function getContentInfo(){
	$.ajax({
 		type: "POST",
		url:"getContentInfo",
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval(d);
			contentInfo = data;
			console.log(contentInfo);
			loadData();
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function showData(data){
	$("#showBox").empty();
	var findAllParent = function (guid,allContents){
		for(var i=0;i<allContents.length;i++){
			if(allContents[i].guid == guid){
				if(allContents[i].parent_guid != null && allContents[i].parent_guid !=""){
					return findAllParent(allContents[i].parent_guid,allContents)+allContents[i].content_name+"/";
				}else{
					return allContents[i].content_name+"/";
				}
				break;
			}
		}
	}
	for(var i=0;i<data.length;i++){
		$("#resourceHidden span[name='res_name']").html(data[i].res_name);
		var contentList = "";
		if(data[i].contents.length != 0){
			var contents = data[i].contents.concat();
			var showArr = [];
			//在规则目录信息中查找出所有父目录
			for(var j=0;j<contents.length;j++){
				var rule_guid = contents[j].rule_guid;
				var ruleContents//对应规则以及所包含的目录;
				//找出对应规则
				for(var k=0;k<contentInfo.length;k++){
					if(rule_guid == contentInfo[k].guid){
						ruleContents = contentInfo[k];
						break;
					}
				}
				//递归查询出所有父目录
				showArr.push(ruleContents.rule_name+":"+findAllParent(contents[j].guid,ruleContents.contents));
			}
			console.log(showArr);
			for(var o=0;o<showArr.length;o++){
				contentList += "<div name=\"content_name\" style=\"height:25px;display:inline-block;margin-left:5px\"><label class=\"label label-info\" style=\"font-size:100%\">" + showArr[o] + "</label></div>";
			}
		}else{
			contentList += "<div name=\"content_name\"><span class=\"property\">还未添加到任何目录</span></div>";
		}
		$("#resourceHidden div[name='content_name']").remove();
		$("#resourceHidden div[name='contentList']").append(contentList);
		var btn = "<button type=\"button\" class=\"btn btn-xs btn-info\" onclick=\"toSelectContent('" + data[i].res_guid + "')\">编目</button>";
		$("#resourceHidden div[name='btnBox']").empty().append(btn);
		$("#resourceHidden tr").clone().appendTo("#showBox");
	}
}

var currentContentGuids = [];
var currentResGuid;
function toSelectContent(guid){
	currentContentGuids= [];
	currentResGuid = guid;
	for(var i=0;i<resContents.length;i++){
		if(resContents[i].res_guid == guid){
			for(var j=0;j<resContents[i].contents.length;j++){
				currentContentGuids.push(resContents[i].contents[j].guid);
			}
			break;
		}
	}
	loadContent();
	art.dialog({
        title: '选择目录',
        content: document.getElementById('contentChoosenBoxHidden'),
        lock: true,
        background: 'gray', // 背景色
        opacity: 0.87,  // 透明度
        id: '3',
    });
}

function loadContent(){
	var data = {
			rule_guid:$("#rule").val()
		};
	$.ajax({
 		type: "POST",
		url:"../catalogueRule/getCataData",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			cataData = d;
			initRuleGrid();
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function addResContent(){
	if(!currentResGuid){
		return;
	}
	var content_guids = [];
	$("#catalogueGrid input[type='checkbox']").each(function(){
		if($(this).prop("checked") == true){
			content_guids.push($(this).prop("id"));
		}
	});
	var data = {
			res_guid:currentResGuid,
			rule_guid:$("#rule").val(),
			content_guids:content_guids
	}
	$.ajax({
 		type: "POST",
		url:"addResContent",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(eval(d)){
				loadData();
				art.dialog.list['3'].close();
			}else{
				alert('保存失败');
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
	
}

//检查目录，如果之前已经勾选过，直接默认勾选
function checkContent(){
	$("#catalogueGrid input[type='checkbox']").each(function(){
		if($.inArray($(this).prop("id"),currentContentGuids) != -1){
			$(this).prop("checked",true);
		} 
	});
}

//查询方式对应的查询表达式
var like = " like ",
	eq	 = " = ",
	gt	 = " > ";
	lt	 = " < ",
	gteq = " >= ",
	lteq = " <= ",
	and	 = " and ",
	yearlike = " like ";

function changeSearchData(id,value){
	$("#"+id).val(value);
	loadData();
}
function createSearchStr() {
	var searchStr = "";
	$("input.searchInput").each(function() {
		if(!$(this).val()) return;
		var searchCol = $(this).attr("data-for");
		if(!searchCol) return;
		var searchType = $(this).attr("search-type");
		if(!searchType) searchType = eq;
		var searchVal = $(this).val();
		switch(searchType) {
			case "like":
				searchStr += and + "a."+ searchCol + like + "'%" + searchVal + "%'";
				break;
			case "eq":
				searchStr += and + "a."+ searchCol + eq + "'" + searchVal + "'";
				break;
			case "gt":
				searchStr += and + "a."+ searchCol + gt + "'" + searchVal + "'";
				break;
			case "lt":
				searchStr += and + "a."+ searchCol + lt + "'" + searchVal + "'";
				break;
			case "gteq":
				searchStr += and + "a."+ searchCol + gteq + "'" + searchVal + "'";
				break;
			case "lteq":
				searchStr += and + "a."+ searchCol + lteq + "'" + searchVal + "'";
				break;
			case "yearlike":
				searchStr += and + "to_char(" + "a."+ searchCol + ", 'yyyy')" + yearlike + "'%'||" + "'" + searchVal + "'" + "||'%'";
				break;
			default:
				break;
		}
	});
	return searchStr;
}

var cataData;

/*
 * 初始化规则 grid
 */
function initRuleGrid() {
	//删除掉原来的grid 全部重新加载，否则ready回调函数不会执行
	$("#catalogueGrid").remove();
	$("#gridBox").append("<div id=\"catalogueGrid\"></div>");
	var cellsRadioFunction = function (row, dataField, cellValue, rowData, cellText) {
		var returnStr = "<input type=\"checkbox\" id=\"" + rowData.guid + "\" parent_guid=\"" + rowData.parent_guid + "\" " 
				      + "name=\"contentCheckBox\">"
					  + cellText;
        return returnStr;
    }
    var source =
     {
         dataType: "json",
         dataFields: [
              { name: "guid", type: "string" },
              { name: "parent_guid", type: "string" },
              { name: "content_name", type: "string" },
              { name: "content_code", type: "string" },
              { name: "content_description", type: "string" },
              { name: "render", type: "string" }
         ],
         hierarchy:
         {
        	 keyDataField: { name: 'guid' },
             parentDataField: { name: 'parent_guid' }
         },
         localData: cataData,
         id: "guid"
     };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
        }
    });
    // create jqxTreeGrid.
    $("#catalogueGrid").jqxTreeGrid(
    {
        source: dataAdapter,
        altRows: true,
        sortable: false,
        //checkboxes: true,
        //hierarchicalCheckboxes: true,
        width: "100%",
        ready: function(){
        	$("#catalogueGrid").jqxTreeGrid('expandAll');
        },
        columns: [
          { text: "名称", dataField: "content_name",cellsRenderer: cellsRadioFunction,cellsAlign: "left", align: "center", width: "20%" },
          { text: "代码", dataField: "content_code", cellsAlign: "center", align: "center",  width: "20%" },
          { text: "描述", dataField: "content_description", cellsAlign: "left", align: "center", width: "60%"},
          //{ text: "操作", dataField: "render", cellsRenderer: cellsRendererFunction, cellsAlign: "center", align: "center" },
        ]
    });
    checkContent();
}