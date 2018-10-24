package com.sunrj.application.System.Service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
 
	public List<TestModel> test() {
		// TODO Auto-generated method stub
		List<Map<String, Object>> resultList = ssmtest.testMapper();
		
		//利用工具类进行格式转换为list<T>类型
		TransBeanUtils<TestModel> beanUtils = new TransBeanUtils<TestModel>();
		List<TestModel> resultlist = beanUtils.ListMap2JavaBean(resultList,TestModel.class);
		getTreeList(resultlist);
		return resultlist;
	}
	
	
	public List<TestModel> getTreeList(List<TestModel> xwList) {
		String parCode = "";
		Map<String, TestModel> dataMap = new HashMap<String, TestModel>();
		List<TestModel> finalList = new ArrayList<TestModel>();
		TestModel par;

		if (!CollectionUtils.isEmpty(xwList)) {
			for (TestModel str : xwList) {
				parCode = str.getCpar_code();
				// 如果为空则为 父节点
				if (parCode == null || parCode.equals("")) {
					finalList.add(str);
				} else {
					for (TestModel chilstr : xwList) {
						if (str.getCcode().equals(chilstr.getCpar_code())) {
							if (str.getChildren() == null) {
								str.setChildren(new ArrayList<TestModel>());

							}
							str.getChildren().add(chilstr);
							
						} else {
							continue;
						}
					}
					finalList.add(str);
				}
			}
		}

		return finalList;
	}
	 
}
