package com.sunrj.application.controller;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sunrj.application.System.model.FileUpLoadModel;

@Controller
@RequestMapping("/upload")
public class upLoadFileController {

	
	
	@RequestMapping("/toUpload")
	public String test2() {
    	/*testser.test();*/   
		 return "/uploadForm";
	}
	
 

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
    	   String basePath = request.getSession().getServletContext().getRealPath("/WEB-INF/FileContent");
    	   System.out.println(basePath);
    	   
           //上传文件名
           String filename = filemodel.getFile().getOriginalFilename();
           File filepath = new File(basePath,filename);
           //判断路径是否存在，如果不存在就创建一个
           if (!filepath.getParentFile().exists()) { 
               filepath.getParentFile().mkdirs();
           }
           //将上传文件保存到一个目标文件当中 
           filemodel.getFile().transferTo(new File(basePath + File.separator + filename));
           return "success";
       } else {
           return "error";
       }

    }
}
