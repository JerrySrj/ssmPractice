package com.sunrj.application.ToolClass;

import java.util.ArrayList;
import java.util.List;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sunrj.application.System.model.PageListData;
import com.sunrj.application.System.model.Department.SysDepartment;

/**
 * pageHelper 插件分页工具类
 * 
 * @author sunrj
 * @param <T>
 *
 */
public class PageHelperTool<Q> {
	// 分页参数
	private int limit;
	private int page;
	private  List<Q> list;  
	public PageHelperTool(int limit,int page,List<Q> list) {
		this.limit = limit;
		this.page = page;
		this.list = list;  
	}

	public PageListData pagefun() throws InstantiationException, IllegalAccessException, ClassNotFoundException {
		PageListData returnlist = new PageListData();

		PageHelper.startPage(page, limit); // startPage是告诉拦截器说我要开始分页了。分页参数是这两个。
		 
		PageInfo<Q> pages = new PageInfo<Q>(list);
		returnlist.setRows(pages.getList());
		returnlist.setTotal(pages.getTotal());
		return returnlist;

	}

}
