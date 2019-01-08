package com.sunrj.application.model;

import com.sunrj.application.model.ImpZhppRsjkV2Lxfw;
import com.sunrj.application.model.ImpZhppRsjkV2LxfwExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ImpZhppRsjkV2LxfwMapper {
    int countByExample(ImpZhppRsjkV2LxfwExample example);

    int deleteByExample(ImpZhppRsjkV2LxfwExample example);

    int deleteByPrimaryKey(Long id);

    int insert(ImpZhppRsjkV2Lxfw record);

    int insertSelective(ImpZhppRsjkV2Lxfw record);

    List<ImpZhppRsjkV2Lxfw> selectByExample(ImpZhppRsjkV2LxfwExample example);

    ImpZhppRsjkV2Lxfw selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") ImpZhppRsjkV2Lxfw record, @Param("example") ImpZhppRsjkV2LxfwExample example);

    int updateByExample(@Param("record") ImpZhppRsjkV2Lxfw record, @Param("example") ImpZhppRsjkV2LxfwExample example);

    int updateByPrimaryKeySelective(ImpZhppRsjkV2Lxfw record);

    int updateByPrimaryKey(ImpZhppRsjkV2Lxfw record);
}