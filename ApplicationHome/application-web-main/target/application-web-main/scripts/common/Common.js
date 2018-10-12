
/**
 * 时间对象format
 * @author mengql
 */
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds() // millisecond
	};

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

/**
 * 错误信息提示框
 * @author mengql
 */
function showErrorMsg(msgContent) {
    art.dialog({
    	id: 'errorMsg',
        title: '错误',
        content: msgContent,
        icon: 'error',
        lock: true,
        okVal: "确定",
        ok: function () { return true; },
        cancel: false
    });
}

/**
 * 提示信息提示框
 * @author mengql
 */
function showInfoMsg(msgContent, okCallback) {
    art.dialog({
        title: '信息',
        content: msgContent,
      icon: 'succeed',
      lock: true,
      okVal: "确定",
      ok: function () { 
      	if(typeof (okCallback) == "function") okCallback();
      },
      cancel: false
  });
}

/**
 * 警告信息提示框
 * @author mengql
 */
function showWarningMsg(msgContent, okCallback) {
    art.dialog({
        title: '警告',
        content: msgContent,
        icon: 'warning',
        lock: true,
        okVal: "确定",
        ok: function () { 
        	if(typeof (okCallback) == "function") okCallback();
        },
        cancel: false
    });
}

/**
 * 确认信息提示框
 * @author mengql
 */
function showConfirm(content, okCallback, param) {
    art.dialog({
        title: '提示',
        content: content,
        icon: 'warning',
        lock: true,
        okVal: "确定",
        cancelVal: "取消",
        ok: function () {
            if (typeof (okCallback) == "function") okCallback(param);
        },
        cancel: true
    });
}

/**
 * 提示框模板
 * @author mengql
 */
function pop(title, dialogId, initCallback, okCallback, param) {
    art.dialog({
        title: title,
        content: document.getElementById(dialogId),
        lock: true,
        window: "top",
        okVal: "确定",
        cancelVal: "取消",
        top:"105px",
        init: function () {
        	clearPopInput();
            if (typeof (initCallback) == "function") initCallback(param);
        },
        ok: function () {
            if (typeof (okCallback) == "function") {
                return okCallback(param);
            }
        },
        cancel: function () {
        	clearPopInput();
        }
    });
}

/**
 * 警告信息提示框
 * @author mengql
 */
function clearPopInput() {
	$("table[class='aui_dialog']").find("textarea").each(function(){
		$(this).val("");
	});
	$("table[class='aui_dialog']").find("input[type='input']").each(function(){
		$(this).val("");
	});
}

/**
 * 初始化日期控件
 * @author mengql
 */
function initDatetimePicker(id, initDate) {
	var date;
	if(initDate) {
		date = new Date(initDate);
		$("#" + id).val(new Date(initDate).format("yyyy-MM-dd"));
	} else {
		date = new Date();
		$("#" + id).val(new Date().format("yyyy-MM-dd"));
	}
	$("#" + id).datetimepicker({
		format: "yyyy-mm-dd",
		minView: "month",
		todayHighlight: true,
		initialDate: date,
		keyboardNavigation: true,
		autoclose:true
	});
}


/**
 * 步骤导航栏
 * @author cuiml
 */
var eventFun={
    setStep:function(index){                
        for(var i=2;i<=index;i++){
            $("#step"+i+"Li").addClass("blue").removeClass("gray");
            $("#step"+i+"Img").attr("src","./images/blue_blue.png");
        }
        for(var i=index+1;i<=4;i++){
            $("#step"+i+"Li").addClass("gray").removeClass("blue");
            $("#step"+i+"Img").attr("src","./images/gray_gray.png");
        }
        $("#step"+(index+1)+"Img").attr("src","./images/blue_gray.png");
    }
};

/**
 * 切换步骤控件
 * @author cuiml
 */
function changeTab(index){
	$('#myTab li:eq('+index+') a').tab('show');
	eventFun.setStep(index+1);
   	setLeftMenuHeight();
}

/**
 * 初始化步骤控件
 * @author cuiml
 */
function initStep() {
	 //绑定标签页事件
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //生成第三步的表格
   	 if($(e.relatedTarget).attr('href') == "#step2"){
   		 $("#fieldBox").empty();
   		 var href = $(this).attr('href');
   		 if(href == "#step3"){
            }
   	 } else if($(e.relatedTarget).attr('href') == "#step1"){
   		 $("#dataSourceTableBox").empty();
   		 var href = $(this).attr('href');
   		 if(href == "#step2"){
            }
   	 }
   	//当标签页显示时，重新计算页面高度
   	setLeftMenuHeight();
    });
}


function initDynamicTable() {
	// 全选
	$("#AllCk").click(function() {
		if ($(this).is(":checked")) {
			$('[name=ck]:checkbox').prop("checked", true);
		} else {
			$('[type=checkbox]:checkbox').prop('checked', false);
		}
	})
	// 添加行RowsAdd DemoTable
	$("#RowsAdd").click(function() {
		var $tr = $("#DynamicRowTable tr").eq(1).clone(true);
		$tr.find("td").each(function(){
			switch($(this).children()[0].nodeName.toLowerCase()) {
				case "input": 
					$(this).children(':text').val('');
					$(this).children(':checkbox').prop('checked', false);
				case "select": $(this).children().get(0).selectedIndex = 1;
			}
		});
		$("#DynamicRowTable tr:last").after($tr);
	})
	// 删除行
	$("#RowsDelet").click(function() {
		var ckbs = $("input[name=ck]:checked");
		if (ckbs.size() == 0) {
			alert("要删除指定行，需选中要删除的行！");
			return;
		}
		ckbs.each(function() {
			$(this).parent().parent().remove();
		});
	})
	// 保存
	$("#AllSave").click(
		function() {
			var Items, Item = "", ItemRow = "";
			$('[name=ck]').each(
					function() {

						Items = $(this).parent().parent();
						for (var i = 0; i < Items.children().length; i++) {
							Item += "'val"
									+ i
									+ ":"
									+ Items.children().eq(i).find("input")
											.val() + "';";
						}
						ItemRow += "{" + Item + "},";
						Item = "";

					})
			if (ItemRow != "" && ItemRow != null) {
				ItemRow = ItemRow.substring(0, ItemRow.length - 1);
				alert("您选择的数据如下：" + ItemRow);
			}
	})
}