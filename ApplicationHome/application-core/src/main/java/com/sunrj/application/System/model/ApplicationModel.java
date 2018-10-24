package com.sunrj.application.System.model;

public class ApplicationModel {
	 private String guid;

	    private String homelogo;

	    private String homestatement;

	    private String homesize;

	    private String homecolor;

	    private String homeflag;

	    private String homehref;

	    public String getGuid() {
	        return guid;
	    }

	    public void setGuid(String guid) {
	        this.guid = guid == null ? null : guid.trim();
	    }

	    public String getHomelogo() {
	        return homelogo;
	    }

	    public void setHomelogo(String homelogo) {
	        this.homelogo = homelogo == null ? null : homelogo.trim();
	    }

	    public String getHomestatement() {
	        return homestatement;
	    }

	    public void setHomestatement(String homestatement) {
	        this.homestatement = homestatement == null ? null : homestatement.trim();
	    }

	    public String getHomesize() {
	        return homesize;
	    }

	    public void setHomesize(String homesize) {
	        this.homesize = homesize == null ? null : homesize.trim();
	    }

	    public String getHomecolor() {
	        return homecolor;
	    }

	    public void setHomecolor(String homecolor) {
	        this.homecolor = homecolor == null ? null : homecolor.trim();
	    }

	    public String getHomeflag() {
	        return homeflag;
	    }

	    public void setHomeflag(String homeflag) {
	        this.homeflag = homeflag == null ? null : homeflag.trim();
	    }

	    public String getHomehref() {
	        return homehref;
	    }

	    public void setHomehref(String homehref) {
	        this.homehref = homehref == null ? null : homehref.trim();
	    }
}
