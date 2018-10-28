package com.sunrj.application.System.model;

import java.util.List;

public class TestModel {
private String id;
private String ccode;
private String cname;
private String cpar_code;
private String cpar_name;
private String test1;
private String test2;

public String getTest1() {
	return test1;
}
public void setTest1(String test1) {
	this.test1 = test1;
}

@Override
public String toString() {
	return "TestModel [test1=" + test1 + ", test2=" + test2 + "]";
}
public String getTest2() {
	return test2;
}
public void setTest2(String test2) {
	this.test2 = test2;
}
private List<TestModel> children;

public List<TestModel> getChildren() {
	return children;
}
public void setChildren(List<TestModel> children) {
	this.children = children;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getCcode() {
	return ccode;
}
public void setCcode(String ccode) {
	this.ccode = ccode;
}
public String getCname() {
	return cname;
}
public void setCname(String cname) {
	this.cname = cname;
}
public String getCpar_code() {
	return cpar_code;
}
public void setCpar_code(String cpar_code) {
	this.cpar_code = cpar_code;
}
public String getCpar_name() {
	return cpar_name;
}
public void setCpar_name(String cpar_name) {
	this.cpar_name = cpar_name;
} 
}
