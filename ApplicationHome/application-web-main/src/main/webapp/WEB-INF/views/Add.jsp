<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = "//"+ request.getServerName() + ":" + request.getServerPort() + path + "/";
    basePath = basePath + "";
%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<div class="modal-dialog  ">
	<div class="modal-content animated bounceInRight">
		<form id="form" action="${ctx}/test1/addDepartment" method="post">
		<input type="hidden" name="id" value="${Sys.id}" />
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<h2 class="modal-title" style="text-align: -webkit-left;">新增部门</h2>
			</div>
			<div class="modal-body" style="overflow-y: auto; height: 300px;">
				 
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;">部门名称：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="cname"
								placeholder="请输入部门名称" id="cname" value="${Sys.cname}">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"> 上级部门：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="cparName"
								  placeholder="上级部门" id="cparName"
								value="${Sys.cparName}" style="background: white;">
							<input type="hidden" id="ParentId" name="ParentId"/>
						</div>
						<button class="btn btn-success" onclick="choosefun()">选择</button>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"> 部门编码：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="ccode"
								placeholder="部门编码" id="ccode" value="${Sys.ccode}">
						</div>
					</div>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-white" data-dismiss="modal">
					<i class="fa fa-close" aria-hidden="true"></i>&nbsp;关闭
				</button>
				<button type="submit" class="btn btn-primary">
					<i class="fa fa-save" aria-hidden="true"></i>&nbsp;保存
				</button>
			</div>
		</form>
	</div>
</div>
<script type="text/javascript">
	 
    $("form").submit(function (){

	})

	function choosefun(){
        var _iframe = window.parent;
        _iframe.modalOut2('${ctx}/test1/modify');
	}
	</script>
</body>
</html>

