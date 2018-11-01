<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html style="height:100%">
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!-- bootstrap css -->
<link rel="stylesheet" href="${ctx}/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="${ctx}/css/bootstrap.min.css">
<link rel="stylesheet" href="${ctx}/css/ionicons.min.css">
<!-- bootstraptable css -->
<link href="${ctx}/plugins/bootstrapTable/css/bootstrap-table.css"
	rel="stylesheet">
<title>应用</title>
<body>
	<!--搜索区-->
	<div id="toolbar" class="btn-group">
		<div class="pull-left form-inline form-group">
			<input type="text" id="q_regino" name="q_regino" class="form-control"
				placeholder="请输入 "> <input type="text" id="q_tablefield"
				name="q_tablefield" class="form-control" placeholder="请输入 ">
			<button type="button" class="btn  btn-info" onclick="bstQuery();">
				<i class="fa fa-search" aria-hidden="true"></i>&nbsp;查询
			</button>
			<button type="button" class="btn  btn-success" onclick="doinsert();">
				<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;新增
			</button>
			<button type="button" class="btn btn-primary" onclick="doEdit();">
				<i class="fa fa-edit" aria-hidden="true"></i>&nbsp;修 改
			</button>
			<button type="button" class="btn btn-danger" onclick="doDel();">
				<i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;删 除
			</button>
		</div>
	</div>
	<!-- 表格（采用bootstrap table） -->
	<table id="tb_departments" data-mobile-responsive="true"></table>
<!-- 模态框，需要模态弹框时调用 -->
	<div id="myModal" class="modal inmodal fade" tabindex="-1"
		role="dialog" aria-hidden="true"></div>
</body>
<script src="${ctx}/scripts/jquery.min.js"></script>
<script src="${ctx}/scripts/bootstrap.min.js"></script>
<script
	src="${ctx}/plugins/bootstrapTable/js/bootstrap-table/bootstrap-table_yawei.js"></script>
<script
	src="${ctx}/plugins/bootstrapTable/js/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>
<script>
	$(function() {

		//1.初始化Table
		var oTable = new TableInit();
		oTable.Init();

		//2.初始化Button的点击事件
		/* var oButtonInit = new ButtonInit();
		oButtonInit.Init(); */

	});

	var TableInit = function() {
		var oTableInit = new Object();
		//初始化Table
		oTableInit.Init = function() {
			$('#tb_departments').bootstrapTable({
				url : '${ctx}/test1/GetDepartment', //请求后台的URL（*）
				method : 'post', //请求方式（*）
				 contentType: "application/x-www-form-urlencoded",//post请求的话就加上这个句话
				toolbar : '#toolbar', //工具按钮用哪个容器
				striped : true, //是否显示行间隔色
				cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				pagination : true, //是否显示分页（*）
				sortable : false, //是否启用排序
				sortOrder : "asc", //排序方式
				queryParamsType: "",
				queryParams : oTableInit.queryParams,//传递参数（*）
				sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
				pageNumber : 1, //初始化加载第一页，默认第一页
				pageSize : 10, //每页的记录行数（*）
				pageList : [ 10, 25, 50, 100 ], //可供选择的每页的行数（*）
				search : false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
				strictSearch : true,
				showColumns : true, //是否显示所有的列
				showRefresh : true, //是否显示刷新按钮
				minimumCountColumns : 2, //最少允许的列数
				clickToSelect : true, //是否启用点击选中行
				height : 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
				uniqueId : "ID", //每一行的唯一标识，一般为主键列
				showToggle : true, //是否显示详细视图和列表视图的切换按钮
				cardView : false, //是否显示详细视图
				detailView : false, //是否显示父子表
				columns : [  
				 {
					field : 'cname',
					title : '部门名称'
				}, {
					field : 'cpar_name',
					title : '上级部门'
				}, {
					field : 'ccode',
					title : '部门级别'
				}, {
					field : 'cpar_code',
					title : '描述'
				}, ]
			});
		};

		//得到查询的参数
		oTableInit.queryParams = function(params) {
			var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit : params.pageSize, //页面大小
				page : params.pageNumber, //页码 
				/* statu : $("#txt_search_statu").val() */
			};
			return temp;
		};
		return oTableInit;
	};
    
	function doinsert(){
		$("#myModal").load("${ctx}/test1/toadd",function(){
			$("#myModal").modal();
		})
	}
	 
</script>
</html>

