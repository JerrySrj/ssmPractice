<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html style="height:100%">
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" href="${ctx}/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="${ctx}/css/bootstrap.min.css">
<script src="${ctx }/scripts/jquery.min.js"></script>
<script src="${ctx}/scripts/index.js"></script>
<script src="${ctx}/scripts/bootstrap.min.js"></script>
<link href="${ctx}/css/main.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="${ctx}/css/ionicons.min.css">
<style>
.head
{
overflow: hidden;
padding-top:30px;
 width: 700px;
}
.imageBorder:before {
	position: absolute;
	left: 0%;
    top: 30%;
	content: url(../images/borderimg.png);
}

.bottomimageBorder:before {
	position: absolute;
	    left: 100%;
    top: 70%;
	content: url(../images/borderimg.png);
}
.padding-5 {
	padding: 0px 5px;
}
.imageBortwo:before {
    position: absolute;
    margin-left: -13px;
    margin-top: 3%;
    content: url(../images/borderimg.png);
}
.list-group-item {
    border-top: 1px solid #424242;
    border-bottom: 1px solid #424242;
    border-radius:0px;
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: transparent;
   border-left:none;
   border-right:none;
}
.list-group-item:first-child{
	border-radius: 0px;
}
.list-group-item:last-child{
border-radius: 0px;
}
a.list-group-item, button.list-group-item {
    color: white;
    font-size: 16px;
}
.img-info{
    position: absolute;
    bottom: 0px;
    background: gray;
    width: 100%;
    padding: 5px;
    opacity: 0.7;
    color: white;
    text-align: center;
	display: none;
	color: darkred;
    }
.img-info-over{
    height: 100%;
   }
   .img-info-over{
   	 background-image: url(/application-web-main/images/bj.png);  
    background-size: 100% 100%;
    
    background-repeat: no-repeat;
    padding: 22%;
    font-size: 22px;
    color: #5bb5e8; 
   	 
   }
</style>
<title>应用门户</title>
<body
	style="height: 100%; overflow-y: hidden; background: url('../images/backg.jpg') no-repeat;">


	<div class="head-out" style="border-bottom: 0px solid #b5b5b5;">
		<div class="container">
			<div class="head">
				<div class="head-logo left">
					<img src="${ctx}/images/logo2.png" width="" height="" alt="">
				</div>
				<div class="head-main left">
					<h1 style="margin: 10px 30px; font-weight: bold; color: white">青岛市公安局信息共享与服务系统</h1>

				</div>

			</div>
		</div>
	</div>

	<!-- ------------------------------------------------------------------------------------------------>
	<div style="height: 100%; overflow: scroll; overflow-y: hidden">
		<div class=" " style="height: 100%;padding:5% 10%;">
			<div class='col-md-12 padding-5'  style='height: 90%'>
				<div class="col-md-3  padding-5 bottomimageBorder" style="height: 100%;width:24%;border:1px solid #1C7776;border-radius: 5px;box-shadow: 0 0 5px ;">
					<div class="col-md-12" style="padding:40px 20px;text-align: center">
					<img src="${ctx }/images/tou.png" style="display:block;margin:0 auto">
						
					</div>
					<div class="col-md-12" style="text-align: center;color:white;padding:40px 20px;">
						<h4>欢迎您：陈警官</h4>
						<p>系统管理员 <small> 2018年1月9号</small></p>
					</div>
					
					<div class="list-group" style="margin-top:20%;">
						<a href="http://27.223.110.234:18080/datacloud-web-main/index" target="_blank" onmouseover="$(this).css({'background-color':'red !important'})"><button type="button" class="list-group-item" href="http://27.223.110.234:18080/datacloud-web-main/index">资源管理 <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style="float:right"></span></button></a>
						<a href="http://27.223.110.234:18080/srv-bus/index" target="_blank"><button type="button" class="list-group-item">服务总线 <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style="float:right"></span></button></a>
						<a href="http://27.223.110.234:18080/inter-network-monitor-webapp/index" target="_blank"><button type="button" class="list-group-item">链路管理  <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style="float:right"></span></button></a>
						<a href="http://27.223.110.234:18080/data-standard-webapp/index" target="_blank"><button type="button" class="list-group-item">数据元管理 <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style="float:right"></span></button></a>
						 
					</div>
				</div>
				<div class="col-md-9 imageBortwo padding-5 " style="height: 100%;width:74%;border:1px solid #4ddcda;border-radius: 5px;box-shadow: 0 0 5px ;margin-left:10px">
				
					<div class="col-md-4" onmouseover="$(this).find('.img-info').addClass('img-info-over')"  onmouseout="$(this).find('.img-info').removeClass('img-info-over')" style="width:30%;margin-left:1%;margin-top:20px;border:1px solid #1C7776;border-radius: 5px;box-shadow: 0 0 5px ;padding:0px;">
						<a href="http://27.223.110.234:18080/srv-bus/serverMonitor" target="_blank">
						<img src="${ctx }/images/screenshot1.png" style=" width: 100%;height:187px;"/>
						<div class="img-info" >
							服务总线监控
						</div>
						</a>
					</div>
					<div class="col-md-4" onmouseover="$(this).find('.img-info').addClass('img-info-over')"  onmouseout="$(this).find('.img-info').removeClass('img-info-over')" style="width:30%;margin-left:1%;margin-top:20px;border:1px solid #1C7776;border-radius: 5px;box-shadow: 0 0 5px ;padding:0px;">
						<a href="http://27.223.110.234:18080/srv-bus/warning " target="_blank">
						<img src="${ctx }/images/screenshot2.png" style=" width: 100%;height:187px;"/>
						<div class="img-info" >
						  服务总线统计
						</div>
						</a>
					</div>
					<div class="col-md-4" onmouseover="$(this).find('.img-info').addClass('img-info-over')"  onmouseout="$(this).find('.img-info').removeClass('img-info-over')" style="width:30%;margin-left:1%;margin-top:20px;border:1px solid #1C7776;border-radius: 5px;box-shadow: 0 0 5px ;padding:0px;">
						<a href="http://27.223.110.234:18080/inter-network-monitor-webapp/linkMonitor/linkMonitor" target="_blank">
						<img src="${ctx }/images/screenshot1.png" style=" width: 100%;height:187px;"/>
						<div class="img-info" >
							数据链路监控
						</div>
						</a>
					</div>
					<div class="col-md-4" onmouseover="$(this).find('.img-info').addClass('img-info-over')"  onmouseout="$(this).find('.img-info').removeClass('img-info-over')" style="width:30%;margin-left:1%;margin-top:20px;border:1px solid #1C7776;border-radius: 5px;box-shadow: 0 0 5px ;padding:0px;">
						<a href="#" >
						<img src="${ctx }/images/screenshot1.png" style=" width: 100%;height:187px;"/>
						<div class="img-info" >
							数据对标监控
						</div>
						</a>
					</div>
					<div class="col-md-4" onmouseover="$(this).find('.img-info').addClass('img-info-over')"  onmouseout="$(this).find('.img-info').removeClass('img-info-over')" style="width:30%;margin-left:1%;margin-top:20px;border:1px solid #1C7776;border-radius: 5px;box-shadow: 0 0 5px ;padding:0px;">
						<a href="http://27.223.110.234:18080/srv-bus/resourcesMonitor" target="_blank">
						<img src="${ctx }/images/screenshot3.png" style=" width: 100%;height:187px;"/>
						<div class="img-info" >
							资源监控
						</div>
						</a>
					</div>
				</div>
			</div>

		</div>





	</div>


</body>
</html>

