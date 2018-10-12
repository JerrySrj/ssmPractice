
function saveSer(){
	$("#serForm").submit();
}

function setAreaOption(id,parent_code,callback){
	var target = $("#"+id);
	var data = {
			parent_code:parent_code
	};
	$.ajax({
 		type: "POST",
		url:"getAreaByParentCode",
		data:JSON.stringify(data),
		contentType:'application/json;charset=UTF-8',
		success:function(d){
			var data = eval(d);
			if(parent_code == "370000"){
				for(var i=0;i<data.length;i++){
					if(data[i].area_code == "370200"){
						var html = "<option value='"+ data[i].area_code +"' selected>" + data[i].area_name + "</option>";
					}else{
						var html = "<option value='"+ data[i].area_code +"'>" + data[i].area_name + "</option>";
					}
					target.append(html);
				}
			}else if(parent_code == "370200"){
				for(var i=0;i<data.length;i++){
					if(data[i].area_code == "370202"){
						var html = "<option value='"+ data[i].area_code +"' selected>" + data[i].area_name + "</option>";
					}else{
						var html = "<option value='"+ data[i].area_code +"'>" + data[i].area_name + "</option>";
					}
					target.append(html);
				}
			}else{
				for(var i=0;i<data.length;i++){
					var html = "<option value='"+ data[i].area_code +"'>"+data[i].area_name+ "</option>";
					target.append(html);
				}
			}
			if(callback){
				callback();
			}
		},
		error:function(){
			alert('服务出错，请稍后重试');
		}
	});
}

