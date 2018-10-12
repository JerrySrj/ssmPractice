$(document).ready(function(){
	getContentInfo();
});

var contentInfo;
//查询出所有规则下的所有目录
function getContentInfo(){
	$.ajax({
		type: "POST",
		url:"../setCatalogue/getContentInfo",
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			contentInfo = eval(d);
			console.log(contentInfo);
			initRule();
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}
var resGuidsArr = [];//资源种类guid数组，用于统计数量
//初始化规则选项（只执行一次）
function initRule(){
	var defaultRuleGuid;
	for(var i=0;i<contentInfo.length;i++){
		var html;
		var countTotal = 0;
		resGuidsArr = [];
		for(var j=0;j<contentInfo[i].contents.length;j++){
			for(var k=0;k<contentInfo[i].contents[j].res_guids.length;k++){
				if($.inArray(contentInfo[i].contents[j].res_guids[k],resGuidsArr) == -1){
					resGuidsArr.push(contentInfo[i].contents[j].res_guids[k]);
				}
			}
		}
		if(i == 0){
			html = "<a href=\"#\" class=\"item item-active\" title=\"" + contentInfo[i].rule_name + "\" " +
			   "onclick=\"initContent('" + contentInfo[i].guid + "'," + resGuidsArr.length + ")\">" +
		       "<span class=\"type-choose\">" + contentInfo[i].rule_name + "(" + resGuidsArr.length + ")" + "</span>" +
		       "</a>";
			defaultRuleGuid = contentInfo[i].guid;
			initContent(defaultRuleGuid,resGuidsArr.length);
		}else{
			html = "<a href=\"#\" class=\"item\" title=\"" + contentInfo[i].rule_name + "\" " +
			   "onclick=\"initContent('" + contentInfo[i].guid + "'," + resGuidsArr.length + ")\">" +
		       "<span class=\"type-choose\">" + contentInfo[i].rule_name + "(" + resGuidsArr.length + ")" + "</span>" +
		       "</a>";
		}
		$("#ruleBox").append(html);
	}
}

var currentContents;//当前规则下目录集合
var currentContentGuids = [];//当前规则下目录guid集合
//生成第一级目录
function initContent(guid,total){
	$("#contentBox").empty();
	//删除所有高level框
	$("#itemBox div.item-row").each(function(){
		if($(this).attr("level") >= 2){
			$(this).remove();
		}
	})
	for(var i=0;i<contentInfo.length;i++){
		if(contentInfo[i].guid == guid){
			currentContents = contentInfo[i].contents;
			break;
		}
	}
	
	currentContentGuids = [];
	for(var j=0;j<currentContents.length;j++){
		currentContentGuids.push(currentContents[j].guid);
		if(currentContents[j].parent_guid == "" || currentContents[j].parent_guid == null){
			resGuidsArr = [];
			for(var k=0;k<currentContents[j].res_guids.length;k++){
				resGuidsArr.push(currentContents[j].res_guids[k]);
			}
			getResCountTotal(currentContents[j].guid);
			html = "<a href=\"#\" class=\"item\" title=\"" + currentContents[j].content_name + "\" " +
				"onclick=\"initChirdContent('" + currentContents[j].guid + "',2," + resGuidsArr.length + ")\">" +
		       "<span class=\"type-choose\">" + currentContents[j].content_name + "(" + resGuidsArr.length + ")" + "</span>" +
		       "</a>";
			$("#contentBox").append(html);
		}
	}
	var html = "<a href=\"#\" class=\"item item-active\" title=\"全部\" onclick=\"selectAll('" + guid + "',2,'rule')\">" +
	   "<span class=\"type-choose\">全部" + "(" + total + ")" + "</span>" +
	   "</a>";
	$("#contentBox").prepend(html);
	changeItem();//绑定点击事件
	getResInfo(currentContentGuids);
}
function initChirdContent(parent_guid,level,total){
	//删除所有高level框
	$("#itemBox div.item-row").each(function(){
		if($(this).attr("level") >= level){
			$(this).remove();
		}
	})
	getResInfo(getGuidsByContent(parent_guid));
	//初始化隐藏域
	$("#itemHidden div[class='item-row']").attr("level",level);
	$("#itemHidden div[name='chirdBox']").empty();
	$("#itemHidden span[name='chirdTitle']").html(level+"级目录")
	var hasChird = false;
	var html;
	if(parent_guid != ""){
		level++;
		for(var i=0;i<currentContents.length;i++){
			if(currentContents[i].parent_guid == parent_guid){
				resGuidsArr = [];
				for(var j=0;j<currentContents[i].res_guids.length;j++){
					resGuidsArr.push(currentContents[i].res_guids[j]);
				}
				getResCountTotal(currentContents[i].guid);
				html = "<a href=\"#\" class=\"item\" title=\"" + currentContents[i].content_name + "\" " +
					"onclick=\"initChirdContent('" + currentContents[i].guid + "'," + level +"," + resGuidsArr.length + ")\">" +
			       "<span class=\"type-choose\">" + currentContents[i].content_name + "(" + resGuidsArr.length + ")" + "</span>" +
			       "</a>";
				$("#itemHidden div[name='chirdBox']").append(html);
				hasChird = true;
			}
		}
		if(hasChird){
			html = "<a href=\"#\" class=\"item item-active\" title=\"全部\" onclick=\"selectAll('" + parent_guid + "'," + level +",'content')\">" +
			   "<span class=\"type-choose\">全部" + "(" + total + ")" + "</span>" +
			   "</a>";
			$("#itemHidden div[name='chirdBox']").prepend(html);
		}else{
			html = "<span class=\"type-choose\" style=\"margin:9px 40px 9px 0\">无</span>";
			$("#itemHidden div[name='chirdBox']").prepend(html);
		}
		$("#itemBox").append($("#itemHidden").html());
		changeItem();//绑定点击事件
	}
}

function selectAll(guid,level,type){
	$("#itemBox div.item-row").each(function(){
		if($(this).attr("level") >= level){
			$(this).remove();
		}
	})
	if(type == "rule"){
		getResInfo(currentContentGuids);
	}else if(type == "content"){
		getResInfo(getGuidsByContent(guid));
	}
}
//递归求查看子目录下的res_guid如果不重复则放入resGuidArr
function getResCountTotal(guid){
	for(var i=0;i<currentContents.length;i++){
		if(currentContents[i].parent_guid == guid){
			for(var j=0;j<currentContents[i].res_guids.length;j++){
				if($.inArray(currentContents[i].res_guids[j],resGuidsArr) == -1){
					resGuidsArr.push(currentContents[i].res_guids[j]);
				}
			}
			getResCountTotal(currentContents[i].guid);
		}
	}
	console.log(resGuidsArr);
}


//获取目录以及其所有子目录的id
function getGuidsByContent(guid){
	var guids = [guid];
	for(var i=0;i<currentContents.length;i++){
		if(currentContents[i].parent_guid == guid){
			guids = guids.concat(getGuidsByContent(currentContents[i].guid));
		}
	}
	return guids;
}

function getResInfo(guids){
	var data;
	if(guids.length == 36){
		data = {
				guids:[guids]
			}
	}else{
		data = {
				guids:guids
		}
	}
	
	$.ajax({
		type: "POST",
		url:"getResContentByContentGuids",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			console.log(eval(d));
			showData(eval(d));
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function showData(data){
	$("#showBox").empty();
	var findAllParent = function (guid,allContents){
		for(var i=0;i<allContents.length;i++){
			if(allContents[i].guid == guid){
				if(allContents[i].parent_guid != null && allContents[i].parent_guid !=""){
					return findAllParent(allContents[i].parent_guid,allContents)+allContents[i].content_name+"/";
				}else{
					return allContents[i].content_name+"/";
				}
				break;
			}
		}
	}
	for(var i=0;i<data.length;i++){
		$("#resourceHidden span[name='res_name']").html(data[i].res_name);
		var contentList = "";
		if(data[i].contents.length != 0){
			var contents = data[i].contents.concat();
			var showArr = [];
			//在规则目录信息中查找出所有父目录
			for(var j=0;j<contents.length;j++){
				var rule_guid = contents[j].rule_guid;
				var ruleContents//对应规则以及所包含的目录;
				//找出对应规则
				for(var k=0;k<contentInfo.length;k++){
					if(rule_guid == contentInfo[k].guid){
						ruleContents = contentInfo[k];
						break;
					}
				}
				//递归查询出所有父目录
				showArr.push(ruleContents.rule_name+":"+findAllParent(contents[j].guid,ruleContents.contents));
			}
			//console.log(showArr);
			for(var o=0;o<showArr.length;o++){
				contentList += "<div name=\"content_name\" style=\"height:25px;display:inline-block;margin-right:5px\"><label class=\"label label-info\" style=\"font-size:100%\">" + showArr[o] + "</label></div>";
			}
		}else{
			contentList += "<div name=\"content_name\"><span class=\"property\">还未添加到任何目录</span></div>";
		}
		$("#resourceHidden div[name='content_name']").remove();
		$("#resourceHidden div[name='contentList']").append(contentList);
		$("#resourceHidden tr").clone().appendTo("#showBox");
	}
}

