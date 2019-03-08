package com.sunrj.application.System.Service.Department;

import java.util.List;

import com.sunrj.application.System.model.Department.SysDepartment;
import com.sunrj.application.System.model.Department.SysDepartmentExample;

public interface SysDepartmentService {
	//查询
   public List<SysDepartment> selectDepartmentList(SysDepartmentExample dto);
   //新增
   public int insertDepartment(SysDepartment dto);
   //根据主键查询
    public SysDepartment selectbypk(Long guid);
    //删除
    int deleteDepartment(String guid);
    //更新
    int updateDepartment(SysDepartment dto);
}
