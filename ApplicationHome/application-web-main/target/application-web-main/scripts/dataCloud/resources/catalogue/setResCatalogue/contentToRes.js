$(document).ready(
	function (){
		loadData($("#ruleBox a.item-active").attr("value"));
		getContentInfo();
	}		
)

var contentInfo;
//查询出所有规则下的所有目录
function getContentInfo(){
	$.ajax({
 		type: "POST",
		url:"getContentInfo",
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval(d);
			contentInfo = data;
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function loadData(guid){
	var data = {
			rule_guid:guid
		};
	$.ajax({
 		type: "POST",
		url:"getContentResData",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval(d);
			//console.log(data);
			cataData = data;
			initRuleGrid();
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

var currentResGuids = [];
var currentContentGuid;
function toSelectRes(guid){
	currentResGuids= [];
	currentContentGuid = guid;
	for(var i=0;i<cataData.length;i++){
		if(cataData[i].content_guid == guid){
			for(var j=0;j<cataData[i].resources.length;j++){
				currentResGuids.push(cataData[i].resources[j].guid);
			}
			break;
		}
	}
	loadRes();
	art.dialog({
        title: '选择目录',
        content: document.getElementById('resChoosenBoxHidden'),
        lock: true,
        background: 'gray', // 背景色
        opacity: 0.87,  // 透明度
        id: '3',
    });
}

var resContents;//资源目录信息
function loadRes(){
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
			showData(resContents);
			checkRes();
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
		$("#resourceHidden span[name='res_name']").html(data[i].res_name + "<input type=\"checkbox\" id=\"" + data[i].res_guid + "\">");
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
			//console.log(showArr);
			for(var o=0;o<showArr.length;o++){
				contentList += "<div name=\"content_name\" style=\"height:25px;display:inline-block;margin-right:5px\"><label class=\"label label-info\">" + showArr[o] + "</label></div>";
			}
		}else{
			contentList += "<div name=\"content_name\"><span class=\"property\">还未添加到任何目录</span></div>";
		}
		$("#resourceHidden div[name='content_name']").remove();
		$("#resourceHidden div[name='contentList']").append(contentList);
		$("#resourceHidden tr").clone().appendTo("#showBox");
	}
}

function addContentRes(){
	if(!currentContentGuid){
		return;
	}
	var res_guids = [];
	$("#showBox input[type='checkbox']").each(function(){
		if($(this).prop("checked") == true){
			res_guids.push($(this).prop("id"));
		}
	});
	var data = {
			content_guid:currentContentGuid,
			res_guids:res_guids
	}
	$.ajax({
 		type: "POST",
		url:"addContentRes",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			if(eval(d)){
				loadData($("#ruleBox a.item-active").attr("value"));
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
function checkRes(){
	$("#showBox input[type='checkbox']").each(function(){
		if($.inArray($(this).prop("id"),currentResGuids) != -1){
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
	loadRes();
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
	var cellsRendererFunction = function (row, dataField, cellValue, rowData, cellText) {
		var returnStr = "<button type=\"button\" class=\"btn btn-xs btn-info\" style=\"margin-left:5px;\" onclick=\"toSelectRes('" + cellValue + "')\">"
					  + "编目"
					  + "</button>";
        return returnStr;
    }
	var cellsResFunction = function (row, dataField, cellValue, rowData, cellText) {
		var returnStr = "";
		for(var i=0;i<cellValue.length;i++){
			returnStr += cellValue[i].res_name + ",";
		}
		if(cellValue.length > 0){
			returnStr = returnStr.substr(0,returnStr.length-1);
		}else{
			returnStr = "未绑定任何资源";
		}
        return returnStr;
    }
    var source =
     {
         dataType: "json",
         dataFields: [
              { name: "content_guid", type: "string" },
              { name: "parent_guid", type: "string" },
              { name: "content_name", type: "string" },
              { name: "content_description", type: "string" },
              { name: "resources",type:"array"},
              { name: "render", type: "string" }
         ],
         hierarchy:
         {
        	 keyDataField: { name: 'content_guid' },
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
          { text: "名称", dataField: "content_name",cellsAlign: "left", align: "center", width: "20%" },
          { text: "描述", dataField: "content_description", cellsAlign: "left", align: "center", width: "30%"},
          { text: "已绑定资源", dataField: "resources", cellsRenderer: cellsResFunction,cellsAlign: "left", align: "center", width: "40%"},
          { text: "操作", dataField: "content_guid", cellsRenderer: cellsRendererFunction, cellsAlign: "center", align: "center",width:"10%" },
        ]
    });
}