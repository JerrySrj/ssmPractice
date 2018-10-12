package com.yawei.application.model;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

public class FileUpLoadModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String username;
	private MultipartFile file;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	 
	
	

}
