package com.yawei.application.controller.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.yawei.application.entity.CurrentUser;

public class Validator
{
	private static ThreadLocal<Validator> validatorHolder = new ThreadLocal<Validator>()
	{
		protected Validator initialValue()
		{
			return new Validator();
		}

	};
	// 当前请求的session
	private HttpSession session = null;

	// 当前的请求
	private HttpServletRequest request = null;

	// 当前登录系统的用户信息
	private CurrentUser user = null;

	private Validator()
	{
	}

	public static Validator getInstance()
	{
		return validatorHolder.get();
	}
	/**
	 * 初始化
	 * @param httpRequest
	 */
	public void init(HttpServletRequest httpRequest)
	{
		this.request = httpRequest;
		this.session = request.getSession();
	}

	/**
	 * 将用户填充到session
	 */
	public void confirm()
	{
		if (this.user == null)
		{
			throw new IllegalArgumentException("authentication is null.");
		}
		session.setAttribute(IdentityInterceptor.SESSION_USER, user);
	}

	/**
	 * 拼装用户信息 放入session
	 * @param userinfoStr
	 * @return
	 */
	public boolean setSessionUser(String userinfoStr) {
		//为user创建一个新的实例
		this.user = new CurrentUser();
		//确保session不为null
		if (session == null) {
			return false;
		}

		try {

			//判断用户字符串是否为约定的格式 是否为空
			if (userinfoStr == null || userinfoStr.indexOf(";") <= 0) {
				return false;
			}
			//拆解用户字符串
			String[] attrArrs = userinfoStr.split(";");
			//遍历设置属性
			for (String attrarr : attrArrs) {
				//以防万一 加个判断
				if (attrarr.indexOf("=") <= 0) {

					break;
				}
				//用户属性名
				String userAttrName = attrarr.split("=")[0];
				if (attrarr.split("=").length < 2) {
					break;
				}
				String userAttrValue = attrarr.split("=")[1];

				switch (userAttrName) {
					case "userGuid":
						this.user.setUserGuid(userAttrValue);
						break;
					case "userName":
						this.user.setUserName(userAttrValue);
						break;
					case "account":
						this.user.setAccount(userAttrValue);
						break;
					case "clientIp":
						this.user.setClientIp(userAttrValue);
						break;
					case "userPath":
						this.user.setUserPath(userAttrValue);
						break;
					case "origUserName":
						this.user.setOrigUserName(userAttrValue);
						break;
					case "origUserGuid":
						this.user.setOrigUserGuid(userAttrValue);
						break;
					case "roles":
						this.user.setRoles(userAttrValue);
						break;
					case "powers":
						this.user.setPowers(userAttrValue);
						break;
				}
			}
			session.setAttribute(IdentityInterceptor.SESSION_USER, this.user);
			return true;


		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	/**
	 * 验证用户信息是否过期
	 * @return
	 */
	public boolean validate() {
		if (session == null) {
			return false;
		}
		// 过期
		boolean expired = false;

		try {

			this.user = (CurrentUser) session
					.getAttribute(IdentityInterceptor.SESSION_USER);

				//当session是空时 判断cookie有没有值，有值的话用cookie填充session
			if (this.user == null) {

					//session.setAttribute(IdentityInterceptor.SEESION_USER,this.user );
					return  false;
			}else {
				return true;

			}

		} catch (Exception e) {
			e.printStackTrace();
			return  false;
		}


	}
	/**
	 * 根据名字获取cookie
	 * @param request
	 * @param name cookie名字
	 * @return
	 */
	public static Cookie getCookieByName(HttpServletRequest request, String name){
		Map<String,Cookie> cookieMap = ReadCookieMap(request);
		if(cookieMap.containsKey(name)){
			Cookie cookie = (Cookie)cookieMap.get(name);
			return cookie;
		}else{
			return null;
		}
	}

	/**
	 * 将cookie封装到Map里面
	 * @param request
	 * @return
	 */
	private static Map<String,Cookie> ReadCookieMap(HttpServletRequest request){
		Map<String,Cookie> cookieMap = new HashMap<String,Cookie>();
		Cookie[] cookies = request.getCookies();
		if(null!=cookies){
			for(Cookie cookie : cookies){
				cookieMap.put(cookie.getName(), cookie);
			}
		}
		return cookieMap;
	}

	/**
	 * 清除session
	 */
	public void cancel()
	{
		this.session = null;
		this.user = null;
	}
}
