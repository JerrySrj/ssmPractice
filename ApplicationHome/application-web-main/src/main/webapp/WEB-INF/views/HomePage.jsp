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
<link rel="stylesheet"
	href="${ctx}/plugins/AdminLTE-master/bower_components/font-awesome/css/font-awesome.css">
<!-- bootstraptable css -->
<link href="${ctx}/plugins/bootstrapTable/css/bootstrap-table.css"
	rel="stylesheet">
<style>
.treegrid-indent {width:16px; height: 16px; display: inline-block; position: relative;}

.treegrid-expander {width:16px; height: 16px; display: inline-block; position: relative; cursor: pointer;}

.treegrid-expander-expanded{background-image: url(../img/collapse.png); }
.treegrid-expander-collapsed{background-image: url(../img/expand.png);}
</style>
<title>应用</title>
<body>

	<div class="row">
		<div class="col-sm-12">
			<div class="col-sm-4">
			</div>
			<div class="col-sm-8">
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
				<button type="button" class="btn  btn-primary" onclick="doinsert();">
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
		</div>
	</div>
	
	<!-- 模态框，需要模态弹框时调用 -->
	<div id="myModal" class="modal inmodal fade" tabindex="-1"
		role="dialog" aria-hidden="true"></div>
	<!-- 模态框遮罩 -->
	<div id='backdropId' class='modal-backdrop fade in'
		style='display: none;'></div>
</body>
<script src="${ctx}/scripts/jquery-3.1.1.min.js"></script>
<script src="${ctx}/scripts/bootstrap.min.js"></script>
<script
	src="${ctx}/plugins/bootstrapTable/js/bootstrap-table/bootstrap-table_add.js"></script>
<script
	src="${ctx}/plugins/bootstrapTable/js/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script> 
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
				title : '部门级别'
			}, {
				field : 'cpar_code',
				title : '描述'
			}, ],
			onLoadSuccess : function() { //加载成功时执行

			},
			onClickRow : function(row, element) {
			},
		});
	}
	
	function doinsert(){
		$("#myModal").load("${ctx}/test1/toadd",function(){
			$("#myModal").modal();
		})
	}
</script>
</html>

