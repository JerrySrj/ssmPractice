/*  首页轮播图  */
$(function(){
    var count = 0;
    var $li = $("#slider>ul>li");
    $(".next").click(function(){
        count++;
        if(count == $li.length){
            count =0;
        }
        $li.eq(count).fadeIn().siblings().fadeOut();
        $(".slider_icon i").eq(count).addClass("btn_act").siblings().removeClass('btn_act');
        console.log(count);
    });
    $(".prve").click(function(){
        count--;
        if(count == -1){
            count = $li.length-1;
        }
        console.log(count);
        $li.eq(count).fadeIn().siblings().fadeOut();
        $(".slider_icon i").eq(count).addClass("btn_act").siblings().removeClass('btn_act');
    });
    $(".slider_icon i").mouseenter(function(){
        $(this).addClass('btn_act').siblings().removeClass("btn_act");
        $li.eq($(this).index()).fadeIn().siblings().fadeOut();
        count = $(this).index();
    });
    
    //加载统计数据
    $.ajax({
 		type: "POST",
		url:"getTotalData",
		success:function(d){
			var data = eval('(' + d + ')');
			$("#sta").text("共" + (data.sta1+data.sta2) + "个");
			$("#range").text("共" + (data.range) + "个");
			$("#metaData").text("共" + (data.metaData) + "个");
		},
		error:function(){
			alert('操作失败');
		}
	});
});


/*  首页数据资源tab切换  */



function showTab(num){
    for (i=0; i<2; i++)
    {
        document.getElementById("tab"+i).style.display="none";
        document.getElementById("id"+i).className="date-resource-c-title-a";

    }
    document.getElementById("tab"+num).style.display="block";
    document.getElementById("id"+num).className="date-resource-c-title-hover";}


/*  首页服务资源tab切换  */

function svtab(num){
    for (i=0; i<2; i++)
    {
        document.getElementById("stab"+i).style.display="none";
        document.getElementById("sid"+i).className="service-resource-c-title-a";

    }
    document.getElementById("stab"+num).style.display="block";
    document.getElementById("sid"+num).className="service-resource-c-title-hover";}



/*  数据标准化 标准库/原始库 tab切换  */



function sohtab(num){
    for (i=0; i<2; i++)
    {
        document.getElementById("sotab"+i).style.display="none";
        document.getElementById("soid"+i).className="os-library-c-title-a";

    }
    document.getElementById("sotab"+num).style.display="block";
    document.getElementById("soid"+num).className="os-library-c-title-hover";}




/*  主页  */
/*  资源公开  */

function resourcetab(num){
    for (i=0; i<2; i++)
    {
        document.getElementById("resourctab"+i).style.display="none";
        document.getElementById("resourcid"+i).className="Public-resources-c-title-a";

    }
    document.getElementById("resourctab"+num).style.display="block";
    document.getElementById("resourcid"+num).className="Public-resources-c-title-hover";}


