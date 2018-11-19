package com.sunrj.application.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SysDepartmentExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SysDepartmentExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andCcodeIsNull() {
            addCriterion("ccode is null");
            return (Criteria) this;
        }

        public Criteria andCcodeIsNotNull() {
            addCriterion("ccode is not null");
            return (Criteria) this;
        }

        public Criteria andCcodeEqualTo(String value) {
            addCriterion("ccode =", value, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeNotEqualTo(String value) {
            addCriterion("ccode <>", value, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeGreaterThan(String value) {
            addCriterion("ccode >", value, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeGreaterThanOrEqualTo(String value) {
            addCriterion("ccode >=", value, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeLessThan(String value) {
            addCriterion("ccode <", value, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeLessThanOrEqualTo(String value) {
            addCriterion("ccode <=", value, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeLike(String value) {
            addCriterion("ccode like", value, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeNotLike(String value) {
            addCriterion("ccode not like", value, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeIn(List<String> values) {
            addCriterion("ccode in", values, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeNotIn(List<String> values) {
            addCriterion("ccode not in", values, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeBetween(String value1, String value2) {
            addCriterion("ccode between", value1, value2, "ccode");
            return (Criteria) this;
        }

        public Criteria andCcodeNotBetween(String value1, String value2) {
            addCriterion("ccode not between", value1, value2, "ccode");
            return (Criteria) this;
        }

        public Criteria andCnameIsNull() {
            addCriterion("cname is null");
            return (Criteria) this;
        }

        public Criteria andCnameIsNotNull() {
            addCriterion("cname is not null");
            return (Criteria) this;
        }

        public Criteria andCnameEqualTo(String value) {
            addCriterion("cname =", value, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameNotEqualTo(String value) {
            addCriterion("cname <>", value, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameGreaterThan(String value) {
            addCriterion("cname >", value, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameGreaterThanOrEqualTo(String value) {
            addCriterion("cname >=", value, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameLessThan(String value) {
            addCriterion("cname <", value, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameLessThanOrEqualTo(String value) {
            addCriterion("cname <=", value, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameLike(String value) {
            addCriterion("cname like", value, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameNotLike(String value) {
            addCriterion("cname not like", value, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameIn(List<String> values) {
            addCriterion("cname in", values, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameNotIn(List<String> values) {
            addCriterion("cname not in", values, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameBetween(String value1, String value2) {
            addCriterion("cname between", value1, value2, "cname");
            return (Criteria) this;
        }

        public Criteria andCnameNotBetween(String value1, String value2) {
            addCriterion("cname not between", value1, value2, "cname");
            return (Criteria) this;
        }

        public Criteria andCparCodeIsNull() {
            addCriterion("cpar_code is null");
            return (Criteria) this;
        }

        public Criteria andCparCodeIsNotNull() {
            addCriterion("cpar_code is not null");
            return (Criteria) this;
        }

        public Criteria andCparCodeEqualTo(String value) {
            addCriterion("cpar_code =", value, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeNotEqualTo(String value) {
            addCriterion("cpar_code <>", value, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeGreaterThan(String value) {
            addCriterion("cpar_code >", value, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeGreaterThanOrEqualTo(String value) {
            addCriterion("cpar_code >=", value, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeLessThan(String value) {
            addCriterion("cpar_code <", value, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeLessThanOrEqualTo(String value) {
            addCriterion("cpar_code <=", value, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeLike(String value) {
            addCriterion("cpar_code like", value, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeNotLike(String value) {
            addCriterion("cpar_code not like", value, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeIn(List<String> values) {
            addCriterion("cpar_code in", values, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeNotIn(List<String> values) {
            addCriterion("cpar_code not in", values, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeBetween(String value1, String value2) {
            addCriterion("cpar_code between", value1, value2, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparCodeNotBetween(String value1, String value2) {
            addCriterion("cpar_code not between", value1, value2, "cparCode");
            return (Criteria) this;
        }

        public Criteria andCparNameIsNull() {
            addCriterion("cpar_name is null");
            return (Criteria) this;
        }

        public Criteria andCparNameIsNotNull() {
            addCriterion("cpar_name is not null");
            return (Criteria) this;
        }

        public Criteria andCparNameEqualTo(String value) {
            addCriterion("cpar_name =", value, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameNotEqualTo(String value) {
            addCriterion("cpar_name <>", value, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameGreaterThan(String value) {
            addCriterion("cpar_name >", value, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameGreaterThanOrEqualTo(String value) {
            addCriterion("cpar_name >=", value, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameLessThan(String value) {
            addCriterion("cpar_name <", value, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameLessThanOrEqualTo(String value) {
            addCriterion("cpar_name <=", value, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameLike(String value) {
            addCriterion("cpar_name like", value, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameNotLike(String value) {
            addCriterion("cpar_name not like", value, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameIn(List<String> values) {
            addCriterion("cpar_name in", values, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameNotIn(List<String> values) {
            addCriterion("cpar_name not in", values, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameBetween(String value1, String value2) {
            addCriterion("cpar_name between", value1, value2, "cparName");
            return (Criteria) this;
        }

        public Criteria andCparNameNotBetween(String value1, String value2) {
            addCriterion("cpar_name not between", value1, value2, "cparName");
            return (Criteria) this;
        }

        public Criteria andCcreateByIsNull() {
            addCriterion("ccreate_by is null");
            return (Criteria) this;
        }

        public Criteria andCcreateByIsNotNull() {
            addCriterion("ccreate_by is not null");
            return (Criteria) this;
        }

        public Criteria andCcreateByEqualTo(String value) {
            addCriterion("ccreate_by =", value, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByNotEqualTo(String value) {
            addCriterion("ccreate_by <>", value, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByGreaterThan(String value) {
            addCriterion("ccreate_by >", value, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByGreaterThanOrEqualTo(String value) {
            addCriterion("ccreate_by >=", value, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByLessThan(String value) {
            addCriterion("ccreate_by <", value, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByLessThanOrEqualTo(String value) {
            addCriterion("ccreate_by <=", value, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByLike(String value) {
            addCriterion("ccreate_by like", value, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByNotLike(String value) {
            addCriterion("ccreate_by not like", value, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByIn(List<String> values) {
            addCriterion("ccreate_by in", values, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByNotIn(List<String> values) {
            addCriterion("ccreate_by not in", values, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByBetween(String value1, String value2) {
            addCriterion("ccreate_by between", value1, value2, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andCcreateByNotBetween(String value1, String value2) {
            addCriterion("ccreate_by not between", value1, value2, "ccreateBy");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeIsNull() {
            addCriterion("dupdatetime is null");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeIsNotNull() {
            addCriterion("dupdatetime is not null");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeEqualTo(Date value) {
            addCriterion("dupdatetime =", value, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeNotEqualTo(Date value) {
            addCriterion("dupdatetime <>", value, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeGreaterThan(Date value) {
            addCriterion("dupdatetime >", value, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("dupdatetime >=", value, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeLessThan(Date value) {
            addCriterion("dupdatetime <", value, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeLessThanOrEqualTo(Date value) {
            addCriterion("dupdatetime <=", value, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeIn(List<Date> values) {
            addCriterion("dupdatetime in", values, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeNotIn(List<Date> values) {
            addCriterion("dupdatetime not in", values, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeBetween(Date value1, Date value2) {
            addCriterion("dupdatetime between", value1, value2, "dupdatetime");
            return (Criteria) this;
        }

        public Criteria andDupdatetimeNotBetween(Date value1, Date value2) {
            addCriterion("dupdatetime not between", value1, value2, "dupdatetime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}