package com.sunrj.application.System;

/**
 * 当前操作用户信息
 */
public class CurrentUser
{
	// 用户唯一标识
	private String userGuid;
	// 用户显示名，中文名
	private String userName;
	// 登录名
	private String account;
	// 登录ip
	private String clientIp;

	private String userPath;

	private String origUserName;

	private String origUserGuid;

	//所属角色
	private String roles;
	//拥有的权限
	private String powers;

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public String getPowers() {
		return powers;
	}

	public void setPowers(String powers) {
		this.powers = powers;
	}

	public String getUserGuid()
	{
		return userGuid;
	}

	public void setUserGuid(String userGuid)
	{
		this.userGuid = userGuid;
	}

	public String getUserName()
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

	public String getAccount()
	{
		return account;
	}

	public void setAccount(String account)
	{
		this.account = account;
	}

	public String getClientIp()
	{
		return clientIp;
	}

	public void setClientIp(String clientIp)
	{
		this.clientIp = clientIp;
	}

	public String getUserPath()
	{
		return userPath;
	}

	public void setUserPath(String userPath)
	{
		this.userPath = userPath;
	}

	public String getOrigUserName()
	{
		return origUserName;
	}

	public void setOrigUserName(String origUserName)
	{
		this.origUserName = origUserName;
	}

	public String getOrigUserGuid()
	{
		return origUserGuid;
	}

	public void setOrigUserGuid(String origUserGuid)
	{
		this.origUserGuid = origUserGuid;
	}


	@Override
	public String toString() {
		return	"userGuid=" + userGuid  +
				";userName=" + userName  +
				";account=" + account  +
				";clientIp=" + clientIp  +
				";userPath=" + userPath  +
				";origUserName=" + origUserName  +
				";origUserGuid=" + origUserGuid  +
				";roles=" + roles  +
				";powers=" + powers ;
	}
}
