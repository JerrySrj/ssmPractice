<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = "//" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    basePath = basePath + "";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" href="${ctx}/plugins/AdminLTE-master/bower_components/font-awesome/css/font-awesome.css" >
<!-- Ionicons -->
<link rel="stylesheet"
      href="${ctx}/plugins/AdminLTE-master/bower_components/Ionicons/css/ionicons.min.css">
<script
        src="${ctx}/plugins/AdminLTE-master/bower_components/jquery/dist/jquery.min.js"></script>
<title>页面</title>
<style>
    body {
        margin: 0;
    }

    .topul {
        list-style-type: none;
        border: #3c8dbc 1px;
        height: 55px;
        width: 100%;
        position: absolute;
        top: 0px;
        margin: 0;
        background-color: #3c8dbc;
        padding: 0px;
    }

    .topul li {
        display: inline-block;
        margin: 0;
        font-size: 15px;
        line-height: 26px;
    }

    .topul li a {
        padding: 14px 16px;
        display: block;
        cursor: pointer;
        color: white;
    }

    .leftli {
        width: 16%;
        font-size: 18px;
        text-align: center;
        background-color: #367fa9;
    }
    .rightli{
        float: right;
    }
    .leftul {
        list-style-type: none;
        position: fixed;
        top: 39px;
        width: 16%;
        height: 100%;
        padding: 0px;
        background-color: #222d32;
    }

    .leftul li {
        display: block;
        line-height: 43px;
    }

    .leftul li a {
        display: block;
        padding: 0px 23px;
        text-decoration: none;
        color: white;
        cursor: pointer;
        font-size: 13px;
        border-left: 3px solid transparent;
    }


    .leftul>li>a:hover{
        border-left: 3px solid #3c8dbc;
        color: #fff;
        background: #1e282c;
    }
</style>
<script>
    $(function(){
        $(".leftul>li").click(function () {
            $(".menutoggle").slideToggle();
        })

        
    })

</script>
<body>
<div>
    <!-- 顶部导航 -->
    <ul class='topul'>
        <li class="leftli"><a class='ali'><b style="font-weight: 700;font-size: 20px;">后台管理系统</b></a></li>
        <li class="rightli"><a class='ali'>测试1</a></li>
        <li class="rightli"><a class='ali'>测试2</a></li>
        <li class="rightli"><a class='ali'>测试3</a></li>
    </ul>
</div>
<div>
    <!-- 侧边栏导航 -->
    <ul class="leftul">

        <li><a><i class="fa fa-dashboard" style="width: 22px;"></i>组织管理</a>
            <ul class="menutoggle" style="display: none;padding-left: 16px;">
                <li><a>组织管理</a></li>
                <li><a>人员管理</a></li>
                <li><a>资源管理</a></li>
            </ul>
        </li>
        <li><a>人员管理</a></li>
        <li><a>资源管理</a></li>
    </ul>
</div>
</body>
</html>

