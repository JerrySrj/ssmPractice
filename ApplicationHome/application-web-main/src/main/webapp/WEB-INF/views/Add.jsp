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
<div class="modal-dialog modal-lg">
	<div class="modal-content animated bounceInRight">
		<form id="form">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<h2 class="modal-title" style="text-align: -webkit-left;">新增信息</h2>
			</div>
			<div class="modal-body" style="overflow-y: auto; height: 350px;">
				<input type="hidden" name="PID" id="PID" value="${pd.PID}" /> <input
					type="hidden" name="REGNO" id="REGNO" value="${pd.REGNO}" /> <input
					type="hidden" name="PRIPID" id="PRIPID" value="${pd.PRIPID}" />
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>主体名称：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="ENTNAME"
								placeholder="请输入主体名称" id="ENTNAME" value="${pd.ENTNAME}">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>统一社会信用代码：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="UNISCID"
								readonly placeholder="请输入统一社会信用代码" id="UNISCID"
								value="${pd.UNISCID}" style="background: white;">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>许可文件编号：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="LICNO"
								placeholder="请输入许可文件编号" id="LICNO" value="${pd.LICNO}">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>许可文件名称：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="LICNAME"
								placeholder="请输入许可文件名称" id="LICNAME" value="${pd.LICNAME}">
						</div>
					</div>
				</div>

				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>有效期自：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required datepicker"
								name="VALFROM" placeholder="请输入有效期自" id="VALFROM"
								value="${pd.VALFROM}">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>有效期至：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required datepicker"
								name="VALTO" placeholder="请输入有效期至" id="VALTO"
								value="${pd.VALTO}">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>许可机关：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="LICANTH"
								placeholder="请输入许可机关" id="LICANTH" value="${pd.LICANTH}">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>许可内容：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control required" name="LICITEM"
								placeholder="请输入许可内容" id="LICITEM" value="${pd.LICITEM}">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="row">
						<label class="col-sm-3 control-label" style="margin-top: 5px;"><font
							color="red">*</font>许可状态</label>
						<div class="col-sm-8">
							<input type="radio" name="TYPE" value="1" <c:if test="${pd.TYPE=='1'}">checked</c:if>>有效&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="radio" name="TYPE" value="2" <c:if test="${pd.TYPE=='2'}">checked</c:if>>无效&nbsp;&nbsp;&nbsp;&nbsp;
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

