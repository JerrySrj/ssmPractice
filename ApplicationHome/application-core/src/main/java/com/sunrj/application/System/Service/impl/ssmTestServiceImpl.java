package com.sunrj.application.System.Service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.sunrj.application.System.Service.TransBeanUtils;
import com.sunrj.application.System.Service.ssmTestService;
import com.sunrj.application.System.dao.ssmTestDao;
import com.sunrj.application.System.model.TestModel;

 

@Service
public class ssmTestServiceImpl implements ssmTestService {
	@Autowired
	private ssmTestDao ssmtest;
 
	public List<Map<String,Object>> test() {
		// TODO Auto-generated method stub
		List<Map<String, Object>> resultList = ssmtest.testMapper();
		
		//利用工具类进行格式转换为list<T>类型
		 /* TransBeanUtils<TestModel> beanUtils = new TransBeanUtils<TestModel>();
		List<TestModel> resultlist = beanUtils.ListMap2JavaBean(resultList,TestModel.class);  */
		return resultList;
	}
	
	 
	 
}
