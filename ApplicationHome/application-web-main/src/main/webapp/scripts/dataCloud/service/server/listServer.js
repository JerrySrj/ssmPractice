$(document).ready(search);

function deleteServer(guid){
	var data = {
		guid:guid,	
		update_user:$("#userGuid").val()
	}
	$.ajax({
 		type: "POST",
		url:"deleteServer",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			$("#grid").Grid(cfg);
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

function toModifyServer(id){
	location.href = "toModifyServer?guid=" + id;
}

function toExamServer(id){
	location.href = "toExamServer?guid=" + id;
}

//查询代码		
function search() {
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
	case "ueq": sql = "and " + id + " != '" + val + "%' "; break;
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