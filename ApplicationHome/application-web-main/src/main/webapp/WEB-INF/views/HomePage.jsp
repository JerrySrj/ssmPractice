<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!-- bootstrap css -->
<link rel="stylesheet" href="${ctx}/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="${ctx}/css/bootstrap.min.css">
<link rel="stylesheet" href="${ctx}/css/ionicons.min.css">
<link rel="stylesheet" href="${ctx}/plugins/AdminLTE-master/bower_components/font-awesome/css/font-awesome.css">
<!-- bootstraptable css -->
<link href="${ctx}/plugins/bootstrapTable/css/bootstrap-table.css" rel="stylesheet">
<!-- ztree --> 
<link rel="stylesheet" href="${ctx}/plugins/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<style type="text/css">
body {
	overflow-x: hidden;
} 
.ztree * {font-size: 8pt;font-family:"Microsoft Yahei",Verdana,Simsun,"Segoe UI Web Light","Segoe UI Light","Segoe UI Web Regular","Segoe UI","Segoe UI Symbol","Helvetica Neue",Arial}
.ztree li ul{ margin:0; padding:0}
.ztree li {line-height:30px;}
.ztree li a {width:200px;height:30px;padding-top: 0px;}
.ztree li a:hover {text-decoration:none; background-color: #E7E7E7;}
.ztree li a span.button.switch {visibility:hidden}
.ztree.showIcon li a span.button.switch {visibility:visible}
.ztree li a.curSelectedNode {background-color:#D4D4D4;border:0;height:30px;}
.ztree li span {line-height:30px;}
.ztree li span.button {margin-top: -7px;}
.ztree li span.button.switch {width: 16px;height: 16px;}

.ztree li a.level0 span {font-size: 150%;font-weight: bold;}
.ztree li span.button {background-image:url("../plugins/zTree/css/zTreeStyle/img/left_menuForOutLook.png"); *background-image:url("../plugins/zTree/css/zTreeStyle/img/left_menuForOutLook.gif")}
.ztree li span.button.switch.level0 {width: 20px; height:20px}
.ztree li span.button.switch.level1 {width: 20px; height:20px}
.ztree li span.button.noline_open {background-position: 0 0;}
.ztree li span.button.noline_close {background-position: -18px 0;}
.ztree li span.button.noline_open.level0 {background-position: 0 -18px;}
.ztree li span.button.noline_close.level0 {background-position: -18px -18px;}
</style>
<title>应用</title>
<body>

	<div class="row">
		<div class="col-md-3" >
			<div class="row">

			</div>
		    <ul id="treeDemo" class="ztree showIcon"></ul>

		</div>
		<div class="col-md-9" style="border-left: dashed 2px #d2d2d2;padding: 0px 25px 0px 25px">
			<div class=" bar">
				<div id="toolbar" class="btn-group">
					<div class="pull-left form-inline form-group">
						<input type="text" id="q_regino" name="q_regino"
							class="form-control" placeholder=" "> <input type="text"
							id="q_tablefield" name="q_tablefield" class="form-control"
							placeholder=" ">
						<button type="button" class="btn  btn-info" onclick="bstQuery();">
							<i class="fa fa-search" aria-hidden="true"></i>&nbsp;查询
						</button>
						<button type="button" class="btn  btn-primary"
							onclick="doinsert();">
							<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;新增
						</button>
						<button type="button" class="btn btn-primary" onclick="doEdit();">
							<i class="fa fa-edit" aria-hidden="true"></i>&nbsp;修 改
						</button>
						<button type="button" class="btn btn-warning" onclick="doDel();">
							<i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;删 除
						</button>
					</div>
				</div>
			</div>
			<table id="QueryTable" data-mobile-responsive="true"></table>
		</div>
	</div>


</body>
<script src="${ctx}/scripts/jquery-3.1.1.min.js"></script>
<script src="${ctx}/scripts/bootstrap.min.js"></script>
<script src="${ctx}/plugins/bootstrapTable/js/bootstrap-table/bootstrap-table_add.js"></script>
<script src="${ctx}/plugins/bootstrapTable/js/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>
<script src="${ctx}/plugins/zTree/js/jquery.ztree.core.js" type="text/javascript"></script>
<script src="${ctx}/plugins/layer-v3.1.1/layer/layer.js" type="text/javascript"></script>

<script>
	$.fn.bootstrapTable.defaults.pagination = true;
	$.fn.bootstrapTable.defaults.pageNumber = 1;
	$.fn.bootstrapTable.defaults.pageSize = 10;
	$.fn.bootstrapTable.defaults.showSeqColumn = false;
	$.fn.bootstrapTable.defaults.pageList = [ 10, 25, 50, 100 ];
	$.fn.bootstrapTable.defaults.method = 'POST';

	$.fn.bootstrapTable.defaults.toolbar = '#toolbar', //将页面上的搜索区绑定到表格上，请求时自动带搜索的参数传入
	$.fn.bootstrapTable.defaults.singleSelect = false;
	$.fn.bootstrapTable.defaults.striped = true;
	$.fn.bootstrapTable.defaults.showCheckbox = true;
	$.fn.bootstrapTable.defaults.showColumns = true;
	$.fn.bootstrapTable.defaults.showRefresh = true;
	$.fn.bootstrapTable.defaults.showToggle = true;
	//$.fn.bootstrapTable.defaults.s
	$.fn.bootstrapTable.defaults.queryParamsType = "undefined";
	$.fn.bootstrapTable.defaults.contentType = 'application/x-www-form-urlencoded';
	$(document).ready(function() {
		initTable();
	});
	function initTable() {
		$('#QueryTable').bootstrapTable('destroy');
		$("#QueryTable").bootstrapTable({
			method : "POST",
			url : '${ctx}/test1/GetDepartment', //获取数据的Servlet地址
			queryParams : function(params) {
				var param = {

					page : params.pageNumber,// 当前页数
					limit : params.pageSize,// 每页多少条
					sortfield : function() {
						if (params.sortName) {
							return params.sortName + " " + params.sortOrder;// 排序
						}
						return " ";
					},
					// 查询条件
					filter : function() {
					}
				};

				return param;
			},
			columns : [ {
				field : 'cname',
				title : '部门名称',
				sortable : true
			}, {
				field : 'cpar_name',
				title : '上级部门'
			}, {
				field : 'ccode',
				title : '部门编码'
			}, {
				field : 'ParentId',
				title : '上级编码'
			}, ],
			onLoadSuccess : function() { //加载成功时执行

			},
			onClickRow : function(row, element) {
			},
		});
	}

	function doinsert() {
		var _iframe = window.parent;
		_iframe.modalOut('${ctx}/test1/modify');

	}
	function doEdit(){
	    var a=$('#QueryTable').bootstrapTable('getSelections');
        if(a.length==1){
            var _iframe = window.parent;
            _iframe.modalOut('${ctx}/test1/modify?id='+a[0].id);
        }else{
            layer.msg('只能选择一条数据', function(){
                //取消选择所有行
                $("#QueryTable").bootstrapTable("uncheckAll");
			});
            return ;
		}
	}
</script>
<script type="text/javascript"> 
		var curMenu = null, zTree_Menu = null;
		var setting = {
			view: {
				showLine: false,
				showIcon: false,
				selectedMulti: false,
				dblClickExpand: false,
				addDiyDom: addDiyDom
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeClick: beforeClick
			}
		};

		var zNodes =${ztreestring};

		function addDiyDom(treeId, treeNode) {
			var spaceWidth = 5;
			var switchObj = $("#" + treeNode.tId + "_switch"),
			icoObj = $("#" + treeNode.tId + "_ico");
			switchObj.remove();
			icoObj.before(switchObj);

			if (treeNode.level > 1) {
				var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
				switchObj.before(spaceStr);
			}
		}

		function beforeClick(treeId, treeNode) {
			 
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.expandNode(treeNode);
                zTree.selectNode(treeNode);
				return false;
			 
		}

		$(document).ready(function(){
			var treeObj = $("#treeDemo");
			$.fn.zTree.init(treeObj, setting, zNodes);
			zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
			/*curMenu = zTree_Menu.getNodes()[0].children[0].children[0];
			zTree_Menu.selectNode(curMenu);*/
		}); 
	</script>
</html>

