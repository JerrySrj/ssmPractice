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
<div class="modal-dialog  ">
	<div class="modal-content animated bounceInRight">
		<form id="form">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<h2 class="modal-title" style="text-align: -webkit-left;">新增部门</h2>
			</div>
			<div class="modal-body" style="overflow-y: auto; height: 300px;">
				 
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>部门名称：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="ENTNAME"
								placeholder="请输入主体名称" id="ENTNAME" value="${pd.ENTNAME}">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>上级部门：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="UNISCID"
								readonly placeholder="上级部门" id="UNISCID"
								value="${pd.UNISCID}" style="background: white;">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>部门编码：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="LICNO"
								placeholder="部门编码" id="LICNO" value="${pd.LICNO}">
						</div>
					</div>
				</div>
				 

				  

				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;">备注</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" name="REMARK"
								placeholder="请输入备注" id="REMARK" value="${pd.REMARK}">
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
	 
    
	</script>
</body>
</html>

