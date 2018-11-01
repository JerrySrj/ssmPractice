package com.sunrj.application.controller;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sunrj.application.System.Service.ssmTestService;
import com.sunrj.application.System.model.FileUpLoadModel;
import com.sunrj.application.System.model.PageListData;
import com.sunrj.application.System.model.TestModel;
import com.sunrj.application.ToolClass.annotation.AuthPassport;
 

@Controller
@RequestMapping("/test1")
public class mvcTest {
	@Autowired(required=false)
	private ssmTestService testser;


    /*@AuthPassport*/
	@RequestMapping("/test2")
	public String test2() {
    	/*testser.test();*/   
		 return "/HomePage";
	}
	@RequestMapping("/GetDepartment")
	@ResponseBody 
	public Object GetDepartment(@RequestParam(value="limit") int limit,@RequestParam(value="page") int page ) {
    	/*testser.test();*/   
		PageListData returnlist=new PageListData();  
		
		
		PageHelper.startPage(page, limit);  //startPage是告诉拦截器说我要开始分页了。分页参数是这两个。
        List<Map<String,Object>> list = testser.test();
        PageInfo pages = new PageInfo(list);
        returnlist.setRows(pages.getList());
        returnlist.setTotal(pages.getTotal());
		 return returnlist;
	}
	
    @RequestMapping("/Login")
    public String Login() throws IllegalAccessException, InvocationTargetException {
    	Map<String,Object> map=new HashMap<String,Object>();
    	map.put("test1","1" );
    	map.put("test2", "2");
    	TestModel model=new TestModel();
    	BeanUtils.populate(model, map);
    	System.out.println(model);
        return "/Login";
    }
	
    @RequestMapping("/toadd")
	public String toadd() {
    	/*testser.test();*/   
		 return "/Add";
	}
}
