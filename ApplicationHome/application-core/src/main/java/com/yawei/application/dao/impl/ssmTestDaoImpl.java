package com.yawei.application.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.yawei.application.dao.ssmTestDao;
@Repository
public class ssmTestDaoImpl implements ssmTestDao{
 @Resource
 private SqlSession session;
	public List<Map<String, Object>> testMapper() {
		 
		return session.selectList("ssmTestDaoMapper.testMapper");
	}

}
