package com.sunrj.application.controller;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sunrj.application.System.Service.Department.SysDepartmentService;
import com.sunrj.application.System.Service.impl.Department.SysDepartmentServiceImpl;
import com.sunrj.application.System.model.Department.SysDepartment;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    @Autowired
	private SysDepartmentService departmentService;

    /*@AuthPassport*/
	@RequestMapping("/test2")
	public String test2(Model model) {

		List<Map<String,Object>> list = testser.test();
		String ztreestring="";
		for(int i=0;i<list.size();i++){
			ztreestring+="{"+ "id:"+"'"+list.get(i).get("ccode")+"'"+",";
			ztreestring+="pId:"+"'"+list.get(i).get("ParentId")+"'"+",";
			ztreestring+="name:"+"'"+list.get(i).get("cname")+"'";
			ztreestring+="},";
		}
		 ztreestring="["+ztreestring.substring(0,ztreestring.length())+"]";
		model.addAttribute("ztreestring",ztreestring);
		 return "/HomePage";
	}
	@RequestMapping("/GetDepartment")
	@ResponseBody 
	public Object GetDepartment(@RequestParam(value="limit") int limit,@RequestParam(value="page") int page ) {
    	/*testser.test();*/   
		PageListData returnlist=new PageListData();  
		
		
		PageHelper.startPage(page, limit);  //startPage是告诉拦截器说我要开始分页了。分页参数是这两个。
        List<Map<String,Object>> list = testser.test();
        PageInfo<Map<String, Object>> pages = new PageInfo<Map<String, Object>>(list);
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
	
    @RequestMapping("/modify")
	public String modify(Model model,HttpServletRequest request) {
	    String param=request.getParameter("id");
	    if(param!=null){
            Long id=Long.parseLong(param);
            SysDepartment sys=departmentService.selectbypk(id);
            model.addAttribute("Sys",sys);
        }
		 return "/Add";
	}
	@RequestMapping("/toUI")
	public String toUI(){
		return "/ApplicationManage/UI";
	}

	@RequestMapping("/addDepartment")
	public String addDepartment(SysDepartment department){
		if(department.getId()==null){
			departmentService.insertDepartment(department);
		}
		else{

			departmentService.updateDepartment(department);
		}
		return "redirect:/test1/Login";
	}
}
