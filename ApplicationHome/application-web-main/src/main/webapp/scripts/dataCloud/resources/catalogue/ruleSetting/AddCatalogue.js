$(document).ready(function(){
	getCataData();
});
var cataData;
function getCataData(){
	var data = {
		rule_guid:$("#rule_guid").val()
	}
	$.ajax({
 		type: "POST",
		url:"getCataData",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			//console.log(d);
			cataData = d;
			initRuleGrid();
			$("#catalogueGrid").jqxTreeGrid('expandAll');
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}


function toAddContent(){
	$("#parent_guid").val("");
	art.dialog({
        title: '添加目录',
        content: document.getElementById('addContentDiv'),
        lock: true,
        background: 'gray', // 背景色
        opacity: 0.87,  // 透明度
        id: '1'
    });
}

function toAddChildContent(parent_guid){
	$("#parent_guid").val(parent_guid);
	art.dialog({
        title: '添加子目录',
        content: document.getElementById('addContentDiv'),
        lock: true,
        background: 'gray', // 背景色
        opacity: 0.87,  // 透明度
        id: '1'
    });
}

function addContent(){
	var data = {
		rule_guid:$("#rule_guid").val(),
		parent_guid:$("#parent_guid").val(),
		content_name:$("#content_name").val(),
		content_code:$("#content_code").val(),
		content_description:$("#content_description").val()
	}
	$.ajax({
 		type: "POST",
		url:"addContent",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var result = eval(d);
			if(result){
				$("#parent_guid").val("");
				$("#content_name").val("");
				$("#content_code").val("");
				$("#content_description").val("");
				art.dialog.list['1'].close();
				getCataData();
			}else{
				alert('保存失败');
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function deleteContent(guid){
	if(!window.confirm("确认删除此目录，以及其包含的子目录吗？")){
		return;
	}
	var data = {
			content_guid:guid
		}
	$.ajax({
 		type: "POST",
		url:"deleteContent",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var result = eval(d);
			if(result){
				getCataData();
			}else{
				alert('保存失败');
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function deleteAllContent(){
	if(!window.confirm("确认删除此规则下的所有目录吗？")){
		return;
	}
	var data = {
			rule_guid:$("#rule_guid").val()
		}
	$.ajax({
 		type: "POST",
		url:"deleteAllContent",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var result = eval(d);
			if(result){
				getCataData();
			}else{
				alert('操作失败');
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

/*
 * 初始化规则 grid
 */
function initRuleGrid() {
	var cellsRendererFunction = function (row, dataField, cellValue, rowData, cellText) {
		if(rowData.contents){
			return "";
		}
		var returnStr = "<button type=\"button\" class=\"btn btn-xs btn-primary\" style=\"margin-left:5px;\" onclick=\"toAddChildContent('" + row + "')\">"
					  + "<span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>添加子目录"
					  + "</button>"
					  + "<button type=\"button\" class=\"btn btn-xs btn-danger\" style=\"margin-left:5px;\" onclick=\"deleteContent('" + row + "')\">"
					  + "<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>删除"
					  + "</button>";
        return returnStr;
    }
	var cellsRadioFunction = function (row, dataField, cellValue, rowData, cellText) {
		var returnStr = "<label class=\"checkbox-inline\">"
					  + "<input type=\"checkbox\" id=\"" + rowData.guid + "\" parent_guid=\"" + rowData.parent_guid + "\" name=\"contentCheckBox\" onclick=\"check('" + rowData.guid + "')\" >" + cellText
					  +	"</label>";
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
        	//$("#catalogueGrid").jqxTreeGrid('hideColumn','firstName');
        }
    });
    // create jqxTreeGrid.
    $("#catalogueGrid").jqxTreeGrid(
    {
        source: dataAdapter,
        altRows: true,
        sortable: true,
        checkboxes: true,
        hierarchicalCheckboxes: true,
        width: "100%",
//        ready: function () {
//            $("#catalogueGrid").jqxTreeGrid('expandAll');
//        },
        columns: [
          { text: "名称", dataField: "content_name",cellsAlign: "left", align: "center", width: "20%" },
          { text: "代码", dataField: "content_code", cellsAlign: "center", align: "center",  width: "15%" },
          { text: "描述", dataField: "content_description", cellsAlign: "left", align: "center", width: "35%"},
          { text: "操作", dataField: "render", cellsRenderer: cellsRendererFunction, cellsAlign: "center", align: "center" },
        ]
    });
    
}



