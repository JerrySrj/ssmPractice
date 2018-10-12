//时间控件
$(function(){
	
	$('#form1').InitForm();
	$('#form2').InitForm();
	 
    changeHeight();
});

function saveReq(){
	$("#reqForm").submit();
}


//计算高度的方法
function changeHeight(){
	var rightHeight=$("#rightcontent").height();
	//alert(rightHeight);
    if(rightHeight>543){
        $("#leftmenu").height(rightHeight);
        $(".body").height(rightHeight);
    }else{
    	$(".body").height("543");
    }
    setLeftMenuHeight();
}