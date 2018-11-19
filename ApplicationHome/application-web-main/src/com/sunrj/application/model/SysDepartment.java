package com.sunrj.application.model;

import java.util.Date;

public class SysDepartment {
    private Long id;

    private String ccode;

    private String cname;

    private String cparCode;

    private String cparName;

    private String ccreateBy;

    private Date dupdatetime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getCparCode() {
        return cparCode;
    }

    public void setCparCode(String cparCode) {
        this.cparCode = cparCode;
    }

    public String getCparName() {
        return cparName;
    }

    public void setCparName(String cparName) {
        this.cparName = cparName;
    }

    public String getCcreateBy() {
        return ccreateBy;
    }

    public void setCcreateBy(String ccreateBy) {
        this.ccreateBy = ccreateBy;
    }

    public Date getDupdatetime() {
        return dupdatetime;
    }

    public void setDupdatetime(Date dupdatetime) {
        this.dupdatetime = dupdatetime;
    }
}