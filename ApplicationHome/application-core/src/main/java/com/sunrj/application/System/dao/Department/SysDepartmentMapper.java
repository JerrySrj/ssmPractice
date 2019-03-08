package com.sunrj.application.System.dao.Department;

import com.sunrj.application.System.model.Department.SysDepartment;
import com.sunrj.application.System.model.Department.SysDepartmentExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SysDepartmentMapper {
    int countByExample(SysDepartmentExample example);

    int deleteByExample(SysDepartmentExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SysDepartment record);

    int insertSelective(SysDepartment record);

    List<SysDepartment> selectByExample(SysDepartmentExample example);

    SysDepartment selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") SysDepartment record, @Param("example") SysDepartmentExample example);

    int updateByExample(@Param("record") SysDepartment record, @Param("example") SysDepartmentExample example);

    int updateByPrimaryKeySelective(SysDepartment record);

    int updateByPrimaryKey(SysDepartment record);
    
}