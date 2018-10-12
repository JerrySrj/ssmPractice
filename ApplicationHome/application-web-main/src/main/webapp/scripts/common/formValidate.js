/**
 * empty 不为空
 * emall 电子邮箱验证 
 * IDNO 身份证号 
 * phone	手机 1+ 34578 开头的 11位
 * RMB  货币    0.0 0 1.1 0.00  
 * number 数字 0-9
 * EN 英文
 * lowEN 小写英文 a-z
 * upEN 大写英文A-Z
 * month 月份验证 “01”-“09”和“1”“12”
 * day 验证一个月的31天  正确格式为：01、09和1、31
 * datetime 日期时间 
 * chinese 汉子
 */
/******
 * 提示方式
 * alert 弹出框
 * tooltip boostrap 工具提示
 * ******/
 var cfg ={};
(function($){
	
	// 在我们插件容器内，创造一个公共变量来构建一个私有方法
	var privateFunction = function() {
		// code here
	}
	// 创建一个默认设置对象
	var defaults = {
		testValue: '',
		testReg:'',
		diyReg: '',
		errorType:'tooltip'
	}
	
	// 通过字面量创造一个对象，存储我们需要的共有方法
	var methods = {
		// 在字面量对象中定义每个单独的方法
		init: function(options) {
			

			// 使用extend方法从options和defaults对象中构造出一个settings对象
			  cfg = $.extend({}, defaults, options);
			
			// 为了更好的灵活性，对来自主函数，并进入每个方法中的选择器其中的每个单独的元素都执行代码
			return this.each(function() {
				// 为每个独立的元素创建一个jQuery对象
				var $this = $(this);
					$this.attr("onsubmit","return  validate()");
					console.log("初始化表单验证，为表单验证提供onsubmit");
					
					
				// 执行代码
				// 例如： privateFunction();
			});
		},
		/***********************单独验证某一个字符串************************/
		test:function(options){
			
			return this.each(function() {
				// 为每个独立的元素创建一个jQuery对象
				var $this = $(this);
				var cfg = $.extend({}, defaults, options);
				if(cfg.testReg==''&&cfg.diyReg==''){
					$.error("未定义表达式，请使用系统定义的正则表达式或自己定义正则表达式，不知道的问爸爸");
				}
					$this.attr("onsubmit","return  validate()");
					console.log("初始化表单验证，为表单验证提供onsubmit");
					
					
				// 执行代码
				// 例如： privateFunction();
			});
		},
		destroy: function() {
			// 对选择器每个元素都执行方法
			return this.each(function() {
				// 执行代码
			});
		}
	};
	
	$.fn.formvalidate=function(){
		var method=arguments[0];
		if(methods[method]) {
			method = methods[method];

			// 我们的方法是作为参数传入的，把它从参数列表中删除，因为调用方法时并不需要它
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if( typeof(method) == 'object' || !method ) {
			method = methods.init;
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
			return this;
		}
		// 用apply方法来调用我们的方法并传入参数
		return method.apply(this, arguments);
	}
	

	
})(jQuery)

//验证状态
	var validateState=true;

	function validate(){
		//去掉页面提示信息
		$(".tooltip").remove();
		
		validateState=true;
			 
			/***********************为空验证*************************/
			$("[validate='empty']").each(function(){
				if($(this).is(':radio') || $(this).is(':checkbox')){
					//console.log(this.tagName+"不能为空");
					
					var  name =$(this).attr("name");
					var checkflag =false;
					$("input[name='"+name+"']").each(function(){
						
						if($(this).prop("checked")){
							checkflag=true;
							
						}
						
					})
					if(!checkflag){
						error(cfg.errorType,$($("[name='"+name+"']")[0]).attr("info"),$("[name='"+name+"']")[0]);
						console.log("选框验证不通过");
						validateState=false;
						return false;
					}
					
				}else{
					
					if($(this).val()==""||$(this).val()=="undifine"){
						console.log("文本验证不通过");
						error(cfg.errorType,$(this).attr("info"),this);
						validateState=false;
						return false;
						
					}
				}
				
			 
			})
			/***************邮箱验证****************/
			$("[validate='emall']").each(function(){
				var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
				 if (!reg.test($(this).val())){
					 error(cfg.errorType,$(this).attr("info"),this);
						validateState=false;
						return false;
				 }
			})
			/*****************身份证号验证****************/
			$("[validate='IDNO']").each(function(){
				var code =$(this).val();
				/*
				根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
				    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
				    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
				    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
				    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

				出生日期计算方法。
				    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
				    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
				下面是正则表达式:
				 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
				 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
				 15位校验规则 6位地址编码+6位出生日期+3位顺序号
				 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
				 
				 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
				                公式(1)中： 
				                i----表示号码字符从由至左包括校验码在内的位置序号； 
				                ai----表示第i位置上的号码字符值； 
				                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
				                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
				                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

				*/
				//身份证号合法性验证 
				//支持15位和18位身份证号
				//支持地址编码、出生日期、校验位验证
				var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
			    var tip = "";
			    var pass = true;

			    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(code)) {
			        tip = "身份证号格式错误";
			        pass = false;
			    }

			    else if (!city[code.substr(0, 2)]) {
			        tip = "身份证号格式错误";
			        pass = false;
			    }
			    else {
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
			                tip = "身份证号格式错误";
			                pass = false;
			            }
			        }
			    }
			    if (!pass){
			    	 error("tooltip",$(this).attr("info"),this);
			    		validateState=false;
					 
			    	 return pass;
			    	
			    };
			   
			})
			
			/*****************手机号码验证****************/
			$("[validate='phone']").each(function(){
			  
				 if(!(/^1[34578]\d{9}$/.test($(this).val()))){ 
					 error("tooltip",$(this).attr("info"),this); 
						validateState=false;
						return false;
				    } 
			 
			})
			/*****************货币验证****************/
			$("[validate='RMB']").each(function(){
				var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
				
				if (!reg.test($(this).val())) {
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			/*****************纯数字验证****************/
			$("[validate='number']").each(function(){
				var reg = /^[0-9]*$/ ;
				
				if ($(this).val()==""||!reg.test($(this).val())) {
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			/*****************纯英文验证****************/
			$("[validate='EN']").each(function(){
				  
				         
				var  reg=/^[a-zA-Z]+$/; 
				if(!reg.test($(this).val())){    
		             
		        
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			/*****************纯英文小写验证****************/
			$("[validate='lowEN']").each(function(){
				var reg = /^[a-z]+$/;
				
				if (!reg.test($(this).val())) {
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			/*****************纯英文大写验证****************/
			$("[validate='upEN']").each(function(){
				var reg = /^[A-Z]+$/;
				
				if (reg.test($(this).val())) {
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			/*****************月份验证 “01”-“09”和“1”“12” ****************/
			$("[validate='month']").each(function(){
				var reg = /^(0?[1-9]|1[0-2])$/;
				
				if (!reg.test($(this).val())) {
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			/*****************验证一个月的31天  正确格式为：01、09和1、31 ****************/
			$("[validate='day']").each(function(){
				var reg = /^((0?[1-9])|((1|2)[0-9])|30|31)$/;
				
				if (!reg.test($(this).val())) {
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			/*****************验证日期时间 ****************/
			$("[validate='datetime']").each(function(){
				var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$ /;
				
				if (!reg.test($(this).val())) {
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			 
			
			/*****************验证汉字 ****************/
			$("[validate='chinese']").each(function(){
				var reg = /^[\u4e00-\u9fa5],{0,}$ /;
				
				if (!reg.test($(this).val())) {
				 error("tooltip",$(this).attr("info"),this); 
					validateState=false;
					return false;
				}
			})
			
			console.log("一通百通全身轻松");
			 
			return validateState;
		}



	//error 提示信息
		function error(type,info,obj){
			if(validateState){
				 
				validateState = false;
				
				switch(type){
				case "alert" :
					alert(info);
					break;
				case "tooltip" :
					$(obj).wrap("<div style='position:relative;display: inline;'></div>");
					var height =  obj.offsetHeight+10;
					
					
					console.log("使用容器,爬升高度："+height);
					
					var tooltip = $("<div />",{"class":"tooltip top","style":"top:-"+height+"px;left:0px;"});
					var  arrow = $("<div />",{"class":"tooltip-arrow"}).appendTo(tooltip);
					var  inner = $("<div />",{"class":"tooltip-inner","style":"white-space:nowrap;"}).html(info).appendTo(tooltip);
					$(obj).parent().append(tooltip);
					console.log("添加提示信息");
					break;
				case "alert" :
					break;
				
				default:
					var tooltip = $("<div />",{"class":"tooltip top"});
				var  arrow = $("<div />",{"class":"tooltip-arrow"}).appendTo(tooltip);
				var  inner = $("<div />",{"class":"tooltip-inner"}).html(info).appendTo(tooltip);
				
				break;
				
				}
				
				 
				 
				
			}
			
			
			return false;
		}


 

