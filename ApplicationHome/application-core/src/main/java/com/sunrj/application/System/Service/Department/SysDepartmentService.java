package com.sunrj.application.System.Service.Department;

import java.util.List;

import com.sunrj.application.System.model.Department.SysDepartment;
import com.sunrj.application.System.model.Department.SysDepartmentExample;

public interface SysDepartmentService {
	//查询
   public List<SysDepartment> selectDepartmentList(SysDepartmentExample dto);
   //新增
   public int insertDepartment(SysDepartmentExample dto);
}
