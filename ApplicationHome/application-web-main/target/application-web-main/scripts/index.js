$(function() {
	$(".st_tree").find("a").click(
		function() {
			var id = $(this).attr("id");
			if(typeof(id) == "undefined"){
				return;
			}
			var clickHtml = $(this).html();
			var url = $(this).attr("url");
			var param = $(this).attr("param");
			var pObj;
			if(param){
				pObj = eval("({" + $(this).attr("param") + "})");
			}else{
				pObj = {};
			}
			
			var validate = true;
			$(".st-bar-head").children().each(function() {
				var arr = $(this).attr("id").split("_");
				if (arr[1] == id) {
					validate = false;
					showPage(id);
					return false;
				}
			})
			if (validate) {
				$(".st-bar-head-bj").addClass("st-bar-head-bj-1")
				var span = "<span class='st-bar-head-bj' id='label_" + id + "' onclick=\"showPage('" + id + "')\"></span>";
				var newspan = $(span).html(clickHtml);
				newspan.append("<span class='ion-close-round' onclick=\"closePage('" + id + "')\"></span>");
				$(".st-bar-head").append(newspan);
				//加载页面
				openSubPage(id,url,pObj);
			}
		})
})

function openSubPage(id,url,pObj) {
	var pageId = "page_" + id;
	$("#pages").children("div.container-fluid").hide();
	$("#pages").append("<div id='" + pageId + "' class='container-fluid'></div>");
	$("#" + pageId).load(url,pObj);
	//将创建一个此标签页的一个对应栈
	var stack = new ArrayStack();
	var map = new Map();
	map.set("url",url);
	map.set("pObj",pObj);
	stack.push(map);
	//将栈存入链接map
	urlMap.set(id,stack);
}

function showPage(id) {
	$(".st-bar-head-bj").addClass("st-bar-head-bj-1");
	$("#label_" + id).removeClass("st-bar-head-bj-1");
	//隐藏所有
	$("#pages").children("div.container-fluid").hide();
	//显示对应页
	$("#page_" + id).show();
}

function closePage(id) {
	//阻止事件冒泡
	var e = window.event;
	e.stopPropagation();
	var curr_label_id = $("#pageBar span[class='st-bar-head-bj']").prop("id");
	var curr_id = (curr_label_id.split("_"))[1];
	if(id == curr_id){
		$("#label_" + id).prev().click();
	}
	$("#page_" + id).remove();
	$("#label_" + id).remove();
}

function pageJumpTo(url,pObj){
	//拿到当前显示页的id
	var label_id = $("#pageBar span[class='st-bar-head-bj']").prop("id");
	var id = (label_id.split("_"))[1];
	//跳转
	$("#page_" + id).load(url,pObj);
	//将地址、参数存入栈
	var stack = urlMap.get(id);
	var map = new Map();
	map.set("url",url);
	map.set("pObj",pObj);
	stack.push(map);
}

function pageGoBack(){
	//拿到当前显示页的id
	var label_id = $("#pageBar span[class='st-bar-head-bj']").prop("id");
	var id = (label_id.split("_"))[1];
	//拿到上一个页面的url
	var stack = urlMap.get(id);
	stack.pop();
	var map = stack.top();
	if(typeof(map.get("url")) == "undefined"){
		return;
	}else{
		//跳转
		$("#page_" + id).load(map.get("url"),map.get("pObj"));
	}
}

//记录链接的map
var urlMap = new Map();

function ArrayStack(){  
    var arr = [];  
    //压栈操作  
    this.push = function(element){  
        arr.push(element);  
    }  
    //退栈操作  
    this.pop = function(){  
        return arr.pop();  
    }  
    //获取栈顶元素  
    this.top = function(){  
        return arr[arr.length-1];  
    }  
    //获取栈长  
    this.size = function(){  
        return arr.length;  
    }  
    //清空栈  
    this.clear = function(){  
        arr = [];  
        return true;  
    }  
    this.toString = function(){  
        return arr.toString();  
    }  
}  