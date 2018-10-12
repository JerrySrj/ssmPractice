;(function(){
	var Validator = function (ele,opt){
		this.region = ele;
	    this.defaults = {
	    	 cleanError:function(){
	    		 $(this).removeClass("valid_fail")
	    		 var t = $(this).next();
	    		 if(t.hasClass("valid_tip")){
	    			 t.remove();
	    			 $(this).unbind("keyup");
	    		 }
	    	 },
	    	 sendError:function(t,msg){
	    		 t.addClass("valid_fail");
	    		 t.after("<div class='valid_tip'><p>" + msg + "</p></div>");
	    	 }
	    };
	    this.options = $.extend({}, this.defaults, opt);
	}

	Validator.prototype = {
	    valid:function() {
	    		var sendError = this.options.sendError;
	    		var cleanError = this.options.cleanError;
	    		var doValid = function(t){
	    			//没有验证属性直接跳过
	    	    	var vtype = t.attr("valid");
	    	    	if(typeof(vtype) == "undefined"){
	    	    		return true;
	    	    	}else{
	    	    		cleanError();
	    	    		//验证类型数组
	    	    		var types = vtype.split(",");
	    	    		//验证参数数组
	    	    		var vparam = t.attr("param");
	    	    		var params = [];
	    	    		if(typeof(vparam) != "undefined"){
	    	    			params = vparam.split(",");
	    	    		}
	    	    		//验证参数索引
	    	    		var paramIndex = 0;
	    	    		//中文名
	    	    		//var cname = t.attr("cname");
	    	    		var v = $.trim(t.val());
	    	    		var msg = "";
	    	    		var pass = true;
	    	    		for(var i=0;i<types.length;i++){
	    	    			if(!pass){
	    	    				break;
	    	    			}
	    	    			switch(types[i]){
	    	    				case "NotNull":
	    	    					if(v == null || v == ""){
	    	    						msg = "不能为空";
	    	    						pass = false;
	    	    					}
	    	    					break;
	    	    				case "MinLen":
	    	    					var ml = params[paramIndex];
	    	    					paramIndex++;
	    	    					if(v.length < ml){
	    	    						msg = "长度不能小于"+ml;
	    	    						pass = false;
	    	    					}
	    	    					break;
	    	    				case "MaxLen":
	    	    					var ml = params[paramIndex];
	    	    					paramIndex++;
	    	    					if(v.length > ml){
	    	    						msg = "长度不能大于"+ml;
	    	    						pass = false;
	    	    					}
	    	    					break;
	    	    				case "Email":
	    	    					var emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
	    	    					if(!emailReg.test(v)){
	    	    						msg = "邮箱格式不正确";
	    	    						pass = false;
	    	    					}
	    	    					break;
	    	    				case "ID":
	    	    					var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 
	    	    							     22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 
	    	    							     35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 
	    	    							     44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 
	    	    							     53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 
	    	    							     65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
	    	    				    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(code)){
	    	    				        msg = "身份证格式错误";
	    	    				    	pass = false;
	    	    				    }else if (!city[code.substr(0, 2)]) {
	    	    				    	msg = "身份证格式错误";
	    	    				        pass = false;
	    	    				    }else{
	    	    				        //18位身份证需要验证最后一位校验位
	    	    				        if (code.length == 18) {
	    	    				            code = code.split('');
	    	    				            //∑(ai×Wi)(mod 11)
	    	    				            //加权因子
	    	    				            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	    	    				            //校验位
	    	    				            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
	    	    				            var sum = 0;
	    	    				            var ai = 0;
	    	    				            var wi = 0;
	    	    				            for (var i = 0; i < 17; i++) {
	    	    				                ai = code[i];
	    	    				                wi = factor[i];
	    	    				                sum += ai * wi;
	    	    				            }
	    	    				            var last = parity[sum % 11];
	    	    				            if (parity[sum % 11] != code[17]) {
	    	    				            	msg = "身份证格式错误";
	    	    				                pass = false;
	    	    				            }
	    	    				        }
	    	    				    }
	    	    				case "Phone":
	    	    					var reg = new RegExp("^1[34578]\\d{9}$");
	    	    					if(!reg.test(v)){
	    	    						msg = "手机号格式错误";
	    				                pass = false;
	    	    					}
	    	    					break;
	    	    				case "Num":
	    	    					var reg = new RegExp("^[0-9]*$");
	    	    					if(!reg.test(v)){
	    	    						msg = "只能包含数字";
	    				                pass = false;
	    	    					}
	    	    					break;
	    	    				case "En":
	    	    					var reg = new RegExp("^[a-zA-Z]+$");
	    	    					if(!reg.test(v)){
	    	    						msg = "只能包含字母";
	    				                pass = false;
	    	    					}
	    	    					break;
	    	    				case "Ch":
	    	    					var reg = new RegExp("^[\\u4e00-\\u9fa5]*$");
	    	    					if(!reg.test(v)){
	    	    						msg = "只能包含汉字";
	    				                pass = false;
	    	    					}
	    	    					break;
	    	    				case "ENU":
	    	    					var reg = new RegExp("^[A-Za-z0-9_]*$");
	    	    					if(!reg.test(v)){
	    	    						msg = "只能含字母数字下划线";
	    				                pass = false;
	    	    					}
	    	    					break;
	    	    				case "Reg":
	    	    					var reg = new RegExp(eval(params[paramIndex]));
	    	    					paramIndex++;
	    	    					if(!reg.test(v)){
	    	    						msg = "格式错误";
	    				                pass = false;
	    	    					}
	    	    					break;
	    	    			}
	    	    		}
	    	    		if(!pass){
    	    				sendError(t,msg);
    	    				t.keyup(cleanError);
    	    			}
	    	    		return pass;
	    	    	}
	    		};
	    	
	    		var inputs;//目标输入框集合
		    	if(this.region){
		    		inputs = this.region.find("input");
		    	}else{
		    		inputs = $("input");
		    	}
		    	var allPass = true;
		    	inputs.each(function(){
		    		var t = $(this);
		    		if(!doValid(t)){
		    			allPass = false;
		    		}
		    	});
		    	return allPass;
	    }
	}
	
	$.fn.valid = function(opt){
		var validator = new Validator(this,opt);
		return validator.valid();
	}
})();