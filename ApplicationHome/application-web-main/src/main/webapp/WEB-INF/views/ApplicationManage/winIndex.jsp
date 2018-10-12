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
<!-- 弹出框-->
		<link rel="stylesheet" href="${ctx}/plugins/ArtDialog/black.css" />
		<script type="text/javascript"
			src="${ctx}/plugins/ArtDialog/jquery.artDialog.js"></script>
		<script type="text/javascript"
			src="${ctx}/plugins/ArtDialog/iframeTools.source.js"></script>	
			
<title>应用门户</title>
<script>
	$(function() {
		var pictureSources = ${jsonlist};

		  var baseElem = $(
				"<div class='item'  onclick='' style='cursor:pointer'></div>")
				.append(" <ul> <li class=' innerstyle'><p class='icon-content'><span style='color:white'></span></p></li><li class='innerstyle2  ' style='color:white'></li></ul> ");  
		/* var baseElem = $(
		"<div class='item'  onclick='' style='cursor:pointer'></div>")
		.append(" <div class=' col-md-12'> <span style='color:white'></span> <div class='innerstyle2  ' style='color:white'></div> "); */
		//添加item的函数
		 

			for (var i = 0; i < pictureSources.length; i++) {
				var elementObj = baseElem.clone();
			
				//添加链接
				elementObj.attr("onclick", "jumpto("
						+ pictureSources[i].homehref + ")");
				if (pictureSources[i].homeflag == 1) {
					elementObj.children().children().first().addClass('logoEdit');
					elementObj.children().children().last().addClass('textEdit');
					elementObj.css("width","14%"); 
					 //文字说明
					elementObj.children().children().last().html(pictureSources[i].homestatement);
					//添加html元素
					appendhtmlElement(elementObj,pictureSources,i);
				}else if(pictureSources[i].homeflag == 3){

					//添加背景图片，拼接html
				  	elementObj.addClass("parent");  
				  	
					elementObj.empty().append("<div class='img-info col-md-12'><div class='col-md-10'>"+pictureSources[i].homestatement+"</div><div class='col-md-2'> <span class="+pictureSources[i].homelogo+" style='color:#888b96'></span> </div>");
					elementObj.css("width","25%");
					 
					//添加html元素
					appendhtmlElement(elementObj,pictureSources,i);
					
				}else if(pictureSources[i].homeflag == 2){
				   elementObj.css("width","14%"); 
				 //文字说明
					elementObj.children().children().last().html(
							pictureSources[i].homestatement);
					//添加html元素
					appendhtmlElement(elementObj,pictureSources,i);
				}
				else if(pictureSources[i].homeflag == 0){
					elementObj.children().children().first().addClass('logoEditsmall');
					elementObj.children().children().last().addClass('textEdit');
					elementObj.attr("title",pictureSources[i].homestatement);
					   elementObj.css("width","7%"); 
					 //添加html元素
						appendhtmlElement(elementObj,pictureSources,i);
					}
				waterfall(i);

			}

		 
	});
	
	//appendHtml方法
	function appendhtmlElement(elementObj,pictureSources,i){
		elementObj.css("height", pictureSources[i].homesize).css(
				"background-color", pictureSources[i].homecolor).find(
				"span:first-child")
				.addClass(pictureSources[i].homelogo).end().appendTo(
						"#picturewall");
	}
	//实现瀑布流布局的函数
	function waterfall(i) {

		var items = $("div.item");//获取到所有的类名为item的元素
		var postop = [];//这个数组用来存放item定位的高度\
		
		 var returnArray=getwidth();
		 console.log(returnArray);  
		 
		 
		items.each(function(index, elem) {
			var targetItemTop = items.eq(index).height() + 10;//遍历所有item并获取高度
			 
			  var targetwidth=getleftoffset(returnArray,index); 
			 /* var targetwidth=items.eq(index).width(); */
			if (index < 5) {//如果是在第一行
				postop[index] = targetItemTop;//把高度直接加入数组中
				 
				$(elem).css({
					"left" : targetwidth,//设置left  (parseInt(0) + 10)*index
					"top" : 10 //和top
				});
			} else {
				//其他行
				var mintop = Math.min.apply(null, postop);//获取数组中最小的一个

				var minindex = $.inArray(mintop, postop);//获取到数组最小值对应的排序
				 
				$(elem).css({
					"top" : mintop + 10,//设置top为数组中最小值
					"left" : parseInt(items.eq(minindex).css("left"))
				//设置left
				});
			}
			postop[minindex] += $(elem).height() + 10;//更新数组
			 
		});
	}
	function getwidth(){
		var widthArray=[]; //用数组存放item宽度
		$("div.item").each(function(index, elem) {
			var targetwidth=$("div.item").eq(index).width(); //获取当前元素的宽度
			widthArray[index]=parseInt(targetwidth)+10; //将所有宽度放到数组中
		});
		return widthArray;
	}
	function getleftoffset(returnArray,index){
		var j=0;//定义组                 
		var i=index; 
		 if(parseInt(i/5)==j){
			 if(i%5==j){
				 j++;
			 }else{
				 //数组截取
				var newArray=returnArray.slice(0,i);
				 //获取到总偏移量
				var sumwidth=eval(newArray.join("+"));
				return sumwidth;
			 }
		 }else if(i==0){
			 return 0;
		 }
	}
	
	function tojumpout(){
		art
		.dialog({
			id : 'choosePaper',
			title : "",
			width : '70%',
			height : '80%',
			/*top : '80px',*/
			fixed : true,
			resize : false,
			drag : false,

			content : "<iframe id='Box'   src='http://oa.yawei.com.cn:18080/srv-bus/webInterFace/indexFrame?firsturl=requestRegist&secondurl=form&param=1:a,2:b,flag:ADD&'" 
					+ "frameborder='0' style='width: 1000px; height: 800px;'"
					+ "> </iframe>",
			lock : true,
			window : "top",

		});
	}
</script>
 
<style>
#picturewall {
	width: 100%;
	height: auto;
	margin: 0 auto;
	position: relative;
	margin-top: 1%;
}
.img-info {
    position: absolute;
    bottom: 0px;
    /* background: gray; */
    width: 100%;
    padding: 5px;
    
    color: #888b96;
   text-align: left;
    font-size: 18px;
}
.title-banner {
	font-size: 18px;
	width: 150px;
	height: 40px;
	border-top: 5px solid #4298cb;
	border-right: 1px solid #f1f1f1;
	line-height: 40px;
	padding-left: 20px;
	z-index: 100;
	background: white;
}

.item {
	box-sizing: border-box;
	border: 1px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	-webkit-box-shadow: 0 0 15px #666;
	-moz-box-shadow: 0 0 15px #666;
	box-shadow: 0 0 15px #666;
	top: 10px;
	/* margin-left: 10%; */
	width: 20%;
	height: auto;
	position: absolute;
	text-align: center;
}

.icon {
	display: inline-block;
	margin: auto;
	font-size: 75px;
	color: white;
	padding: 10px;
	text-align: center;
	position: absolute;
}

.innerstyle {
	position: absolute;
	left: -5px;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	width: 46px;
	height: 82px;
	font-size: 46px;
 
}

.innerstyle2 {
	position: absolute;
	left: 4px;
	right: 0;
	top: 62px;
	bottom: 0;
	margin: auto;
	width: 100%;
	height: 40px;
	font-size: 20px;
}

.textEdit {
	top: 50px !important;
	font-size: 15px !important;
	left: 0px !important;
}

.logoEdit {
	font-size: 27px !important;
	height: 45px !important;
}
.logoEditsmall{
	font-size: 27px !important;
	height: 33px !important;
}
</style>
<!-- 菜单 css-->
<style>
.home-channel-list {
    margin: 0;
    padding: 3px;
    list-style-type: none;
    font-size: 12px;
    text-align: center;
    background: #5f5750;
    border-radius: 5px;
    box-shadow: 0 0 15px #666;
}
.home-channel-list li {
    position: relative;
    float: left;
    width: 70px;
    height: 82px;
    padding: 0 3px;
}

/* user agent stylesheet
li {
    display: list-item;
    text-align: -webkit-match-parent;
} */
.home-channel-list a {
    display: block;
    padding-top: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    _zoom: 1;
    color: #fff;
    color: rgba(255,255,255,0.7);
    -webkit-transition: color .2s;
    transition: color .2s;
}
.home-channel-list span {
    display: block;
    height: 24px;
    margin-bottom: 10px;
    font-size: 24px;
    line-height: 24px;
}
 
/****水平列表布局-自动换行****/
.list-wraprow {
	display:block;
	padding: 0;
	margin: 0;
}

.list-wraprow > .list-item {
	display: inline-block;
	padding: 0;
	margin: 0.2rem;
	margin-bottom: 15px;
    margin-top: 12px;
}

.list-wraprow.child-space-x-0 > .list-item {
	margin-left: 0;
	margin-right: 0;
}

.list-wraprow.child-space-y-0 > .list-item {
	margin-top: 0;
	margin-bottom: 0;
}

.list-wraprow.child-space-0 > .list-item {
	margin: 0;
}

.list-wraprow.child-ml-0 > .list-item:first-child{
	margin-left: 0;
}

.list-wraprow.child-mr-0 > .list-item:last-child{
	margin-right: 0;
}

.list-wraprow.child-mx-0 > .list-item:first-child{
	margin-left: 0;
}

.list-wraprow.child-mx-0 > .list-item:last-child{
	margin-right: 0;
}

/****插件（自定义）-图文链接****/
.icon-container {
	text-align: center;
	padding:0;
	margin:0;
	width:100%;
}

.icon-container .icon-content{
	padding:0;
	margin:0 auto;
	font-size:4rem;
	/* margin-bottom:0.5rem; */
	color: white;
	padding: 6px;
}

.icon-container .icon-content.edge{
	padding:0;
	margin:0 auto;
	margin-bottom:0.5rem;
	width:4rem;
	height:4rem;
	line-height:4rem;
	font-size:3.5rem;
}

.icon-container .icon-title{
	padding:0;
	margin:0 auto;
	font-weight:500;
	color: white;
}
 
 

 
<!-- 磁贴图标-->
 
 
.top-nav{background-color:#054fa5; height:37px;color:#ffffff;}
.footertools{
	height: 120px;
	position: fixed;
	background: gray;
	opacity: 0.7;
	width: 100%;
	bottom:0px;
}
 
</style>
 <style>
 .parent {
  position: relative;  
 
background: url(../images/logoback.jpg);
/* opacity: 0.7; */
}	
 

 
 </style>
<body style="height: 100%; overflow-y: hidden ; ">


	<div class="top-nav">
	<div class="container">
		<div class="top-nav-c">
		
			<div class="top-nav-welcome left">欢迎访问青岛市公安局网站！</div>
			<div class="top-nav-phone right">
				<div class="top-nav-phone-l ion-person-add left"></div>
				<div class="top-nav-phone-r left">您好，请登录 | 注册</div>
			</div>
			</div>
		</div>
	</div>
	<div class="head-out">
	<div class="container">
		<div class="head">
			<div class="head-logo left">
				<img src="${ctx}/images/logo2.png" width="" height="" alt="">
			</div>
			<div class="head-main left">
			<h1 style="margin: 10px 30px;font-weight: bold;color:#054fa5">青岛市公安局信息共享与服务系统</h1>
				<%-- <img src="${ctx}/images/home/img-2.jpg" alt=""> --%>
			</div>

</div>
		</div>
	</div>

	<!-- ------------------------------------------------------------------------------------------------>
	<div style="height: 100%; overflow: scroll;background:url('../images/bj-1.jpg') no-repeat;">
	 
		<div class="container" style="height: 100%;">
		 
 
			<div class='col-md-12' style='height: 100%'>
				<div id="picturewall" style="height: 60%; width: 100%"></div>
			</div>
		 
		</div>

		



	</div>
	
	<!--  -->
<div class="rect-container mx-auto">
										<p class="rect-content">
											<span class="ion-ios-people"></span>
										</p>
										<div class="rect-title">
											<p class="rect-text word-space-4 text-truncate-clip">四全七半多余截断</p>
										</div>
									</div>
	<!--  -->
	<div class="footertools" > <!-- onmouseover="$(this).css({'height':'300px'})" onmouseout="$(this).css({'height':'120px'})" -->
	<div class="container">
		<ul class="list-wraprow">
								<li class="list-item m-2" onclick="tojumpout()">
									<div class="icon-container mx-auto">
										<p class="icon-content">
											<span class="glyphicon glyphicon-list"></span>
										</p>
										<div class="icon-title">&nbsp;&nbsp;&nbsp;服务申请</div>
									</div>
								</li>
								<li class="list-item m-2">
									<div class="icon-container mx-auto">
										<p class="icon-content">
											<span class="glyphicon glyphicon-share"></span>
										</p>
										<div class="icon-title">请求方注册</div>
									</div>
								</li>
								<li class="list-item m-2">
									<div class="icon-container mx-auto">
										<p
											class="icon-content">
											<span class="glyphicon glyphicon-tasks"></span>
										</p>
										<div class="icon-title">已申请服务</div>
									</div>
								</li>
								<li class="list-item m-2">
									<div class="icon-container mx-auto">
										<p class="icon-content ">
											<span class="glyphicon glyphicon-edit"></span>
										</p>
										<div class="icon-title">&nbsp;&nbsp;&nbsp;资源申请</div>
									</div>
								</li>
								<li class="list-item m-2">
									<div class="icon-container mx-auto">
										<p class="icon-content ">
											<span class="glyphicon glyphicon-tags"></span>
										</p>
										<div class="icon-title">&nbsp;&nbsp;&nbsp;资源注册</div>
									</div>
								</li>
								
								<li class="list-item m-2">
									<div class="icon-container mx-auto">
										<p
											class="icon-content">
											<span class="glyphicon glyphicon-folder-open"></span>
										</p>
										<div class="icon-title">已申请资源</div>
									</div>
								</li>
								
								<li class="list-item m-2">
									<div class="icon-container mx-auto">
										<p
											class="icon-content">
											<span class="glyphicon glyphicon-cloud-download"></span>
										</p>
										<div class="icon-title">已注册资源</div>
									</div>
								</li>
							</ul>
							</div>
	</div>
	
	
	
</body>
</html>

