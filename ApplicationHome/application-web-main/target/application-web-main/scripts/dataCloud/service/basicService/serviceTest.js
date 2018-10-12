function toTest(){
	var data = $("#request").val();
	$.ajax({
		type: "POST",
        url: "test",
        contentType: "application/xml; charset=utf-8",
        data: data,
        dataType: "xml",
        success: function (d) {
        	console.log(d);
        	$("#result").val((new XMLSerializer()).serializeToString(d));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown + ':' + textStatus); // 错误处理
        }
	});
}

function download(){
	location.href = 'download';
}

function toTest2(){
	$("#form").submit();
}