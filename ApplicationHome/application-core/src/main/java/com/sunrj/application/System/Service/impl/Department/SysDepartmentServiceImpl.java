package com.sunrj.application.System.Service.impl.Department;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunrj.application.System.Service.Department.SysDepartmentService;
import com.sunrj.application.System.dao.Department.SysDepartmentMapper;
import com.sunrj.application.System.model.Department.SysDepartment;
import com.sunrj.application.System.model.Department.SysDepartmentExample;
@Service
public class SysDepartmentServiceImpl implements SysDepartmentService{
	 @Autowired(required=false)
	 private SysDepartmentMapper sysDepartmentMapper; 
	 
	 
	@Override
	public List<SysDepartment> selectDepartmentList(SysDepartmentExample dto) {
		 
		List<SysDepartment> resultList=sysDepartmentMapper.selectByExample(dto);
		return resultList;
	}

	@Override
	public int insertDepartment(SysDepartmentExample dto) {
		// TODO Auto-generated method stub
		return 0;
	}

}
