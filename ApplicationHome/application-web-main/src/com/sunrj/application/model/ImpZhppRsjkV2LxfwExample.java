package com.sunrj.application.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ImpZhppRsjkV2LxfwExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public ImpZhppRsjkV2LxfwExample() {
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

        public Criteria andCversionIsNull() {
            addCriterion("cversion is null");
            return (Criteria) this;
        }

        public Criteria andCversionIsNotNull() {
            addCriterion("cversion is not null");
            return (Criteria) this;
        }

        public Criteria andCversionEqualTo(String value) {
            addCriterion("cversion =", value, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionNotEqualTo(String value) {
            addCriterion("cversion <>", value, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionGreaterThan(String value) {
            addCriterion("cversion >", value, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionGreaterThanOrEqualTo(String value) {
            addCriterion("cversion >=", value, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionLessThan(String value) {
            addCriterion("cversion <", value, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionLessThanOrEqualTo(String value) {
            addCriterion("cversion <=", value, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionLike(String value) {
            addCriterion("cversion like", value, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionNotLike(String value) {
            addCriterion("cversion not like", value, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionIn(List<String> values) {
            addCriterion("cversion in", values, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionNotIn(List<String> values) {
            addCriterion("cversion not in", values, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionBetween(String value1, String value2) {
            addCriterion("cversion between", value1, value2, "cversion");
            return (Criteria) this;
        }

        public Criteria andCversionNotBetween(String value1, String value2) {
            addCriterion("cversion not between", value1, value2, "cversion");
            return (Criteria) this;
        }

        public Criteria andIyearIsNull() {
            addCriterion("iyear is null");
            return (Criteria) this;
        }

        public Criteria andIyearIsNotNull() {
            addCriterion("iyear is not null");
            return (Criteria) this;
        }

        public Criteria andIyearEqualTo(String value) {
            addCriterion("iyear =", value, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearNotEqualTo(String value) {
            addCriterion("iyear <>", value, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearGreaterThan(String value) {
            addCriterion("iyear >", value, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearGreaterThanOrEqualTo(String value) {
            addCriterion("iyear >=", value, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearLessThan(String value) {
            addCriterion("iyear <", value, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearLessThanOrEqualTo(String value) {
            addCriterion("iyear <=", value, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearLike(String value) {
            addCriterion("iyear like", value, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearNotLike(String value) {
            addCriterion("iyear not like", value, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearIn(List<String> values) {
            addCriterion("iyear in", values, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearNotIn(List<String> values) {
            addCriterion("iyear not in", values, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearBetween(String value1, String value2) {
            addCriterion("iyear between", value1, value2, "iyear");
            return (Criteria) this;
        }

        public Criteria andIyearNotBetween(String value1, String value2) {
            addCriterion("iyear not between", value1, value2, "iyear");
            return (Criteria) this;
        }

        public Criteria andImonthIsNull() {
            addCriterion("imonth is null");
            return (Criteria) this;
        }

        public Criteria andImonthIsNotNull() {
            addCriterion("imonth is not null");
            return (Criteria) this;
        }

        public Criteria andImonthEqualTo(String value) {
            addCriterion("imonth =", value, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthNotEqualTo(String value) {
            addCriterion("imonth <>", value, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthGreaterThan(String value) {
            addCriterion("imonth >", value, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthGreaterThanOrEqualTo(String value) {
            addCriterion("imonth >=", value, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthLessThan(String value) {
            addCriterion("imonth <", value, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthLessThanOrEqualTo(String value) {
            addCriterion("imonth <=", value, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthLike(String value) {
            addCriterion("imonth like", value, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthNotLike(String value) {
            addCriterion("imonth not like", value, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthIn(List<String> values) {
            addCriterion("imonth in", values, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthNotIn(List<String> values) {
            addCriterion("imonth not in", values, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthBetween(String value1, String value2) {
            addCriterion("imonth between", value1, value2, "imonth");
            return (Criteria) this;
        }

        public Criteria andImonthNotBetween(String value1, String value2) {
            addCriterion("imonth not between", value1, value2, "imonth");
            return (Criteria) this;
        }

        public Criteria andIdayIsNull() {
            addCriterion("iday is null");
            return (Criteria) this;
        }

        public Criteria andIdayIsNotNull() {
            addCriterion("iday is not null");
            return (Criteria) this;
        }

        public Criteria andIdayEqualTo(String value) {
            addCriterion("iday =", value, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayNotEqualTo(String value) {
            addCriterion("iday <>", value, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayGreaterThan(String value) {
            addCriterion("iday >", value, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayGreaterThanOrEqualTo(String value) {
            addCriterion("iday >=", value, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayLessThan(String value) {
            addCriterion("iday <", value, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayLessThanOrEqualTo(String value) {
            addCriterion("iday <=", value, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayLike(String value) {
            addCriterion("iday like", value, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayNotLike(String value) {
            addCriterion("iday not like", value, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayIn(List<String> values) {
            addCriterion("iday in", values, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayNotIn(List<String> values) {
            addCriterion("iday not in", values, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayBetween(String value1, String value2) {
            addCriterion("iday between", value1, value2, "iday");
            return (Criteria) this;
        }

        public Criteria andIdayNotBetween(String value1, String value2) {
            addCriterion("iday not between", value1, value2, "iday");
            return (Criteria) this;
        }

        public Criteria andPinpaiIsNull() {
            addCriterion("pinpai is null");
            return (Criteria) this;
        }

        public Criteria andPinpaiIsNotNull() {
            addCriterion("pinpai is not null");
            return (Criteria) this;
        }

        public Criteria andPinpaiEqualTo(String value) {
            addCriterion("pinpai =", value, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiNotEqualTo(String value) {
            addCriterion("pinpai <>", value, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiGreaterThan(String value) {
            addCriterion("pinpai >", value, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiGreaterThanOrEqualTo(String value) {
            addCriterion("pinpai >=", value, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiLessThan(String value) {
            addCriterion("pinpai <", value, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiLessThanOrEqualTo(String value) {
            addCriterion("pinpai <=", value, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiLike(String value) {
            addCriterion("pinpai like", value, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiNotLike(String value) {
            addCriterion("pinpai not like", value, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiIn(List<String> values) {
            addCriterion("pinpai in", values, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiNotIn(List<String> values) {
            addCriterion("pinpai not in", values, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiBetween(String value1, String value2) {
            addCriterion("pinpai between", value1, value2, "pinpai");
            return (Criteria) this;
        }

        public Criteria andPinpaiNotBetween(String value1, String value2) {
            addCriterion("pinpai not between", value1, value2, "pinpai");
            return (Criteria) this;
        }

        public Criteria andKehumcIsNull() {
            addCriterion("kehumc is null");
            return (Criteria) this;
        }

        public Criteria andKehumcIsNotNull() {
            addCriterion("kehumc is not null");
            return (Criteria) this;
        }

        public Criteria andKehumcEqualTo(String value) {
            addCriterion("kehumc =", value, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcNotEqualTo(String value) {
            addCriterion("kehumc <>", value, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcGreaterThan(String value) {
            addCriterion("kehumc >", value, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcGreaterThanOrEqualTo(String value) {
            addCriterion("kehumc >=", value, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcLessThan(String value) {
            addCriterion("kehumc <", value, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcLessThanOrEqualTo(String value) {
            addCriterion("kehumc <=", value, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcLike(String value) {
            addCriterion("kehumc like", value, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcNotLike(String value) {
            addCriterion("kehumc not like", value, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcIn(List<String> values) {
            addCriterion("kehumc in", values, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcNotIn(List<String> values) {
            addCriterion("kehumc not in", values, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcBetween(String value1, String value2) {
            addCriterion("kehumc between", value1, value2, "kehumc");
            return (Criteria) this;
        }

        public Criteria andKehumcNotBetween(String value1, String value2) {
            addCriterion("kehumc not between", value1, value2, "kehumc");
            return (Criteria) this;
        }

        public Criteria andImonthSrIsNull() {
            addCriterion("imonth_sr is null");
            return (Criteria) this;
        }

        public Criteria andImonthSrIsNotNull() {
            addCriterion("imonth_sr is not null");
            return (Criteria) this;
        }

        public Criteria andImonthSrEqualTo(Double value) {
            addCriterion("imonth_sr =", value, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrNotEqualTo(Double value) {
            addCriterion("imonth_sr <>", value, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrGreaterThan(Double value) {
            addCriterion("imonth_sr >", value, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrGreaterThanOrEqualTo(Double value) {
            addCriterion("imonth_sr >=", value, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrLessThan(Double value) {
            addCriterion("imonth_sr <", value, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrLessThanOrEqualTo(Double value) {
            addCriterion("imonth_sr <=", value, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrIn(List<Double> values) {
            addCriterion("imonth_sr in", values, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrNotIn(List<Double> values) {
            addCriterion("imonth_sr not in", values, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrBetween(Double value1, Double value2) {
            addCriterion("imonth_sr between", value1, value2, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andImonthSrNotBetween(Double value1, Double value2) {
            addCriterion("imonth_sr not between", value1, value2, "imonthSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrIsNull() {
            addCriterion("iyear_sr is null");
            return (Criteria) this;
        }

        public Criteria andIyearSrIsNotNull() {
            addCriterion("iyear_sr is not null");
            return (Criteria) this;
        }

        public Criteria andIyearSrEqualTo(Double value) {
            addCriterion("iyear_sr =", value, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrNotEqualTo(Double value) {
            addCriterion("iyear_sr <>", value, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrGreaterThan(Double value) {
            addCriterion("iyear_sr >", value, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrGreaterThanOrEqualTo(Double value) {
            addCriterion("iyear_sr >=", value, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrLessThan(Double value) {
            addCriterion("iyear_sr <", value, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrLessThanOrEqualTo(Double value) {
            addCriterion("iyear_sr <=", value, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrIn(List<Double> values) {
            addCriterion("iyear_sr in", values, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrNotIn(List<Double> values) {
            addCriterion("iyear_sr not in", values, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrBetween(Double value1, Double value2) {
            addCriterion("iyear_sr between", value1, value2, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andIyearSrNotBetween(Double value1, Double value2) {
            addCriterion("iyear_sr not between", value1, value2, "iyearSr");
            return (Criteria) this;
        }

        public Criteria andImonthMlIsNull() {
            addCriterion("imonth_ml is null");
            return (Criteria) this;
        }

        public Criteria andImonthMlIsNotNull() {
            addCriterion("imonth_ml is not null");
            return (Criteria) this;
        }

        public Criteria andImonthMlEqualTo(Double value) {
            addCriterion("imonth_ml =", value, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlNotEqualTo(Double value) {
            addCriterion("imonth_ml <>", value, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlGreaterThan(Double value) {
            addCriterion("imonth_ml >", value, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlGreaterThanOrEqualTo(Double value) {
            addCriterion("imonth_ml >=", value, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlLessThan(Double value) {
            addCriterion("imonth_ml <", value, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlLessThanOrEqualTo(Double value) {
            addCriterion("imonth_ml <=", value, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlIn(List<Double> values) {
            addCriterion("imonth_ml in", values, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlNotIn(List<Double> values) {
            addCriterion("imonth_ml not in", values, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlBetween(Double value1, Double value2) {
            addCriterion("imonth_ml between", value1, value2, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andImonthMlNotBetween(Double value1, Double value2) {
            addCriterion("imonth_ml not between", value1, value2, "imonthMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlIsNull() {
            addCriterion("iyear_ml is null");
            return (Criteria) this;
        }

        public Criteria andIyearMlIsNotNull() {
            addCriterion("iyear_ml is not null");
            return (Criteria) this;
        }

        public Criteria andIyearMlEqualTo(Double value) {
            addCriterion("iyear_ml =", value, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlNotEqualTo(Double value) {
            addCriterion("iyear_ml <>", value, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlGreaterThan(Double value) {
            addCriterion("iyear_ml >", value, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlGreaterThanOrEqualTo(Double value) {
            addCriterion("iyear_ml >=", value, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlLessThan(Double value) {
            addCriterion("iyear_ml <", value, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlLessThanOrEqualTo(Double value) {
            addCriterion("iyear_ml <=", value, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlIn(List<Double> values) {
            addCriterion("iyear_ml in", values, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlNotIn(List<Double> values) {
            addCriterion("iyear_ml not in", values, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlBetween(Double value1, Double value2) {
            addCriterion("iyear_ml between", value1, value2, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIyearMlNotBetween(Double value1, Double value2) {
            addCriterion("iyear_ml not between", value1, value2, "iyearMl");
            return (Criteria) this;
        }

        public Criteria andIorderIndexIsNull() {
            addCriterion("iorder_index is null");
            return (Criteria) this;
        }

        public Criteria andIorderIndexIsNotNull() {
            addCriterion("iorder_index is not null");
            return (Criteria) this;
        }

        public Criteria andIorderIndexEqualTo(Long value) {
            addCriterion("iorder_index =", value, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexNotEqualTo(Long value) {
            addCriterion("iorder_index <>", value, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexGreaterThan(Long value) {
            addCriterion("iorder_index >", value, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexGreaterThanOrEqualTo(Long value) {
            addCriterion("iorder_index >=", value, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexLessThan(Long value) {
            addCriterion("iorder_index <", value, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexLessThanOrEqualTo(Long value) {
            addCriterion("iorder_index <=", value, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexIn(List<Long> values) {
            addCriterion("iorder_index in", values, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexNotIn(List<Long> values) {
            addCriterion("iorder_index not in", values, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexBetween(Long value1, Long value2) {
            addCriterion("iorder_index between", value1, value2, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andIorderIndexNotBetween(Long value1, Long value2) {
            addCriterion("iorder_index not between", value1, value2, "iorderIndex");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeIsNull() {
            addCriterion("dcreatetime is null");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeIsNotNull() {
            addCriterion("dcreatetime is not null");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeEqualTo(Date value) {
            addCriterion("dcreatetime =", value, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeNotEqualTo(Date value) {
            addCriterion("dcreatetime <>", value, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeGreaterThan(Date value) {
            addCriterion("dcreatetime >", value, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("dcreatetime >=", value, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeLessThan(Date value) {
            addCriterion("dcreatetime <", value, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeLessThanOrEqualTo(Date value) {
            addCriterion("dcreatetime <=", value, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeIn(List<Date> values) {
            addCriterion("dcreatetime in", values, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeNotIn(List<Date> values) {
            addCriterion("dcreatetime not in", values, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeBetween(Date value1, Date value2) {
            addCriterion("dcreatetime between", value1, value2, "dcreatetime");
            return (Criteria) this;
        }

        public Criteria andDcreatetimeNotBetween(Date value1, Date value2) {
            addCriterion("dcreatetime not between", value1, value2, "dcreatetime");
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

        public Criteria andCupdatetimeByIsNull() {
            addCriterion("cupdatetime_by is null");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByIsNotNull() {
            addCriterion("cupdatetime_by is not null");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByEqualTo(String value) {
            addCriterion("cupdatetime_by =", value, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByNotEqualTo(String value) {
            addCriterion("cupdatetime_by <>", value, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByGreaterThan(String value) {
            addCriterion("cupdatetime_by >", value, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByGreaterThanOrEqualTo(String value) {
            addCriterion("cupdatetime_by >=", value, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByLessThan(String value) {
            addCriterion("cupdatetime_by <", value, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByLessThanOrEqualTo(String value) {
            addCriterion("cupdatetime_by <=", value, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByLike(String value) {
            addCriterion("cupdatetime_by like", value, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByNotLike(String value) {
            addCriterion("cupdatetime_by not like", value, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByIn(List<String> values) {
            addCriterion("cupdatetime_by in", values, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByNotIn(List<String> values) {
            addCriterion("cupdatetime_by not in", values, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByBetween(String value1, String value2) {
            addCriterion("cupdatetime_by between", value1, value2, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andCupdatetimeByNotBetween(String value1, String value2) {
            addCriterion("cupdatetime_by not between", value1, value2, "cupdatetimeBy");
            return (Criteria) this;
        }

        public Criteria andBflagIsNull() {
            addCriterion("bflag is null");
            return (Criteria) this;
        }

        public Criteria andBflagIsNotNull() {
            addCriterion("bflag is not null");
            return (Criteria) this;
        }

        public Criteria andBflagEqualTo(String value) {
            addCriterion("bflag =", value, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagNotEqualTo(String value) {
            addCriterion("bflag <>", value, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagGreaterThan(String value) {
            addCriterion("bflag >", value, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagGreaterThanOrEqualTo(String value) {
            addCriterion("bflag >=", value, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagLessThan(String value) {
            addCriterion("bflag <", value, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagLessThanOrEqualTo(String value) {
            addCriterion("bflag <=", value, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagLike(String value) {
            addCriterion("bflag like", value, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagNotLike(String value) {
            addCriterion("bflag not like", value, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagIn(List<String> values) {
            addCriterion("bflag in", values, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagNotIn(List<String> values) {
            addCriterion("bflag not in", values, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagBetween(String value1, String value2) {
            addCriterion("bflag between", value1, value2, "bflag");
            return (Criteria) this;
        }

        public Criteria andBflagNotBetween(String value1, String value2) {
            addCriterion("bflag not between", value1, value2, "bflag");
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