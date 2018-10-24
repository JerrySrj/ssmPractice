package com.sunrj.application.controller.interceptor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 自定义拦截器，拦截符合条件url的请求 身份验证拦截
 * (是否有登录用户信息)
 */
public class IdentityInterceptor extends HandlerInterceptorAdapter
{
	//加载日志
	static Logger log = Logger.getLogger(IdentityInterceptor.class);
	
	public final static String SESSION_USER = "session_user";
	// 不拦截的url
	private List<String> uncheckUrls = null;

	public List<String> getUncheckUrls()
	{
		return uncheckUrls;
	}

	public void setUncheckUrls(List<String> uncheckUrls)
	{
		this.uncheckUrls = uncheckUrls;
	}

	/**
	 * 在业务处理器处理请求之前被调用 如果返回false 从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链
	 * 如果返回true 执行下一个拦截器,直到所有的拦截器都执行完毕 再执行被拦截的Controller 然后进入拦截器链,
	 * 从最后一个拦截器往回执行所有的postHandle() 接着再从最后一个拦截器往回执行所有的afterCompletion()
	 */
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception
	{

		log.debug("==============执行顺序: 1、preHandle================");
		// 获取当前请求的url
		String requestUri = request.getRequestURI();
		String queryString = request.getQueryString();

		Validator validator = Validator.getInstance();
		// 注入当前session
		validator.init(request);
		// 默认check
		boolean check = true; 
		// 遍历放行的url
		if (this.uncheckUrls != null)
		{
			for (String uncheckUri : this.uncheckUrls)
			{
				String uncheckQuery = null;
				String uri = uncheckUri;
				// 拦截可细致到参数
				if (uncheckUri.indexOf("?") >= 0)
				{
					uri = uncheckUri.substring(0, uncheckUri.indexOf("?"));
					uncheckQuery = uncheckUri
							.substring(uncheckUri.indexOf("?") + 1);
					check = !(requestUri.startsWith(uri) && queryString
							.indexOf(uncheckQuery) >= 0);
				}
				else
				{
					check = !(requestUri.startsWith(uri));
				}
			}
		}
		if (check) {
			if (!validator.validate()) {//获取用户信息为空
				validator.cancel();
				request.getRequestDispatcher("/WEB-INF/views/system/login/Login.jsp").forward(
						request, response);
			} else {//验证通过，将用户信息填到session中
				validator.confirm();
			   
				return true;
			}
		}
		else
		{
			return true;
		}
		return false;
	}
	

	/**
	 * 在业务处理器处理请求执行完成后,生成视图之前执行的动作 可在modelAndView中加入数据，比如当前时间
	 */
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception
	{
		log.debug("==============执行顺序: 2、postHandle================");
	}

	/**
	 * 在DispatcherServlet完全处理完请求后被调用,可用于清理资源等
	 * 
	 * 当有拦截器抛出异常时,会从当前拦截器往回执行所有的拦截器的afterCompletion()
	 */
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception
	{
		log.debug("==============执行顺序: 3、afterCompletion================");
	}
}
