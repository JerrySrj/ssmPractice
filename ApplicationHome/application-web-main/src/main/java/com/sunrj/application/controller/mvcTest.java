package com.sunrj.application.controller;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sunrj.application.System.Service.ssmTestService;
import com.sunrj.application.System.model.FileUpLoadModel;
import com.sunrj.application.System.model.TestModel;
import com.sunrj.application.ToolClass.annotation.AuthPassport;
 

@Controller
@RequestMapping("test1")
public class mvcTest {
	@Autowired(required=false)
	private ssmTestService testser;


    /*@AuthPassport*/
	@RequestMapping("/test2")
	public String test2() {
    	/*testser.test();*/   
		 return "/HomePage";
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
	//上传文件会自动绑定到MultipartFile中Login

    /**
     *
     * @param request
     * @param filemodel
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/upload",method=RequestMethod.POST)
    public String upload(HttpServletRequest request,@ModelAttribute FileUpLoadModel filemodel
           ) throws Exception {

       System.out.println(filemodel.getUsername());
       //如果文件不为空，写入上传路径
       if(!filemodel.getFile().isEmpty()) {
           //上传文件路径/application-web-main/src/main/webapp/FileContent
           //String path = request.getServletContext().getRealPath("/FileContent/");
    	   String basePath = request.getSession().getServletContext().getRealPath("/FileContent");
    	   System.out.println(basePath);
    	   String path="src/main/webapp/FileContent";
           //上传文件名
           String filename = filemodel.getFile().getOriginalFilename();
           File filepath = new File(path,filename);
           //判断路径是否存在，如果不存在就创建一个
           if (!filepath.getParentFile().exists()) { 
               filepath.getParentFile().mkdirs();
           }
           //将上传文件保存到一个目标文件当中 
           filemodel.getFile().transferTo(new File(path + File.separator + filename));
           return "success";
       } else {
           return "error";
       }

    }
}
