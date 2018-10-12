$(document).ready(function () {
	$("#grid").Grid(cfg);
//	initSwitchBtn();
//	initRuleGrid();
});

function toSaveRule(){
	$("#guid").val("");
	$("#rule_name").val("");
	$("#rule_code").val("");
	$("#rule_description").val("");
	art.dialog({
        title: '添加规则',
        content: document.getElementById('addRuleDiv'),
        lock: true,
        background: 'gray', // 背景色
        opacity: 0.87,  // 透明度
        id: '1'
    });
}

function toModifyRule(obj,guid){
	var source = $(obj).parent().parent().find("td");
	$("#guid").val(guid);
	$("#rule_name").val($(source[0]).html());
	$("#rule_code").val($(source[1]).html());
	$("#rule_description").val($(source[2]).find("span").html());
	art.dialog({
        title: '修改规则',
        content: document.getElementById('addRuleDiv'),
        lock: true,
        background: 'gray', // 背景色
        opacity: 0.87,  // 透明度
        id: '1'
    });
}

function saveRule(){
	var data = {
		rule_name:$("#rule_name").val(),
		rule_code:$("#rule_code").val(),
		rule_description:$("#rule_description").val()
	}
	if($("#guid").val()!= null && $("#guid").val()!=""){
		data.guid = $("#guid").val();
	}
	$.ajax({
 		type: "POST",
		url:"saveRule",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var result = eval(d);
			if(result){
				$("#guid").val("");
				$("#rule_name").val("");
				$("#rule_code").val("");
				$("#rule_description").val("");
				art.dialog.list['1'].close();
				$("#grid").Grid(cfg);
			}else{
				alert('保存失败');
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function deleteRule(guid){
	if(!window.confirm("确定删除此规则，以及其包含的目录吗？")){
		return;
	}
	var data = {
		guid:guid
	}
	$.ajax({
 		type: "POST",
		url:"deleteRule",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var result = eval(d);
			if(result){
				$("#grid").Grid(cfg);
			}else{
				alert('保存失败');
			}
			art.dialog.list['2'].close();
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function changePublish(obj,guid){
	var value = $(obj).prop("checked")?0:1;
	var data = {
		guid:guid,
		is_publish:value
	}
	$.ajax({
 		type: "POST",
		url:"changePublish",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var result = eval(d);
			if(!result){
				alert('操作失败');
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}
//查询代码		
function searchData() {
	//清空cfg.where
	cfg.where="";
	if ($("input[flag='search']")) {
		$("input[flag='search']").each(function() {	
			//判断不为空的查询条件
				if ($(this).val() != ""){
					//调用解析方法，拼接where条件
					cfg.where += analysis(this);
			}												
		})
	}
	if ($("select[flag='search']")) {
		$("select[flag='search']").each(function() {
			//判断不为空的查询条件
			if ($(this).val() != ""){
				//调用解析方法，拼接where条件
			cfg.where += analysis(this);
			}
				})
	}
	 cfg.where = getResult(cfg.where);
	$("#grid").Grid(cfg);
}
function analysis(data) {
	//取得id和value，id包括运算符flag和列名id
	var id = $(data).attr("id");
	var val = $(data).val();
	var flag = id.split('_')[0];
	var index = id.indexOf("_");
	var id = id.substr(index+1);
	var sql = "";
	//通过判断，来拼写不同的sql语句
	switch (flag) {
	case "th": sql = "and " + id + " >= '" + val + "' "; break;
	case "ls": sql = "and " + id + " <= '" + val + "' "; break;
	case "eq": sql = "and " + id + " = '" + val + "' "; break;
	case "lk": sql = "and " + id + "  like  '%" + val + "%' "; break;
	}
	return sql;
}
function getResult(data){
    //第一个参数必须；第二个、第三个参数可选
    var key1 = "1";  
    var key2 = "2"; 
    var key3 = "3"; 
    //加密方法        
    var  enResult = strEnc(data,key1,key2,key3);            		            
    //展示结果
   // alert(enResult);
    return enResult;
}

/*
 * 初始化开关控件
 */
function initSwitchBtn() {
	$("input[name='publish']").bootstrapSwitch({
		onText:"发布",  
        offText:'不发布',
        size: 'mini'
	});
	$('[name="publish"]').on({
		'switchChange.bootstrapSwitch' : function(event, state) {
//			if (state == false) {
//				var a=$(this).attr("rowid");
//				onToOff(a);
//			} else if (state == true) {
//				var b=$(this).attr("rowid");
//				 offToOn(b);
//			}
		}
	});
}

/*
 * 跳转至设置目录页面
 */
function showSetCatalogue(guid) {
	window.location.href = ctx + "/catalogueRule/addCatalogue?guid="+guid;
}

/*
 * 打开新增编目规则编辑页
 */
function showEditPage(id) {
	$("#editPageDiv").show(500);
	closeForm();
	$('#' + id).show(500);
}

/*
 * 关闭编辑页
 */
function closeEditPage() {
	$("#editPageDiv").hide(500);
}

/*
 * 关闭form
 */
function closeForm() {
	$('#addRuleForm').hide(500);
	$('#addCatalogueForm').hide(500);
}