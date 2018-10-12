/*
author:田飞飞
ie 7  拖动会出现闪动 ie6 未测
更新历史:
1、增加列拖动 2、表格高度自定义
2013-9-30 1、增加  Property(属性表格)  见demo
treeGrid 待开发
*/

(function ($) {
    $.fn.extend({
        Grid: function (options) {
            var defaults = {
                columns: [],
                sortName: "",
                order: "",
                ajaxUrl: "",
                rowsData: [],
                request: "ajax",
                connectionName: "",
                connectionString: "",
                providerName: "",
                tableName: "",
                condition: "",
                pageCount: 0,
                width: "100%",
                height: 600,
                idField: "",
                page: 1,
                where: "",
                pageSelect: [],
                extmethod:function(){
                    
                	console.log("列表加载完成");
                },
                SelectedRows: function () { },
                CannelRows: function () { },
                BindBefore: function (data) { return data; }
            }
            var options = $.extend(defaults, options);
            return this.each(function () {
                var opt = options;
                $(this).addClass("grid");
                $(this).html("") ;
                var table, headerTable;
                var grid = $(this);
                var tableContent = $("<div id='gridContent'>");
                grid.append(tableContent);
                
                tableContent.css({"height":opt.height});
                if (tableContent.find("table").length > 1) {
                    table = tableContent.find("table").eq(1);
                    headerTable = tableContent.find("table").eq(0);
                    headerTable.find(":checkbox,:radio").attr("checked", false);
                }
                else {
//                    table = $("<table />");
//                    table.addClass("table table-striped");
                    headerTable = $("<table />");
 //                  headerTable.addClass("table table-striped table-hover gridtable");
                    headerTable.append(SetListHeader(opt.columns));
                    headerTable.attr({ "border": "0", "cellpadding": "0", "cellspacing": "0" }).css({ "width": "100%",});;
                    tableContent.append(headerTable);
                }
                var total = 0;
                opt.oldCount = opt.pageCount;
 
                if (opt.request == "data") {
                    setListContent(opt.rowsData, opt.columns);
                }
                else {
                    gridContent(opt.order, opt.sortName);
                }



                function SetTaleEquel(tableF, eqTable) {

                }

                //设置表头
                function SetListHeader(columns) {
                	var thead = $("<thead/>");
                    var tr = $("<tr />"); 
                    $.each(columns, function (i, obj) {
                        if (typeof (obj) != "undefined") {
                            var td = $("<th />");
                           // td.addClass("gridHeader")
                            if (typeof (obj.width) != "undefined") {
                                td.css("width", obj.width);
                            }
                          
                            if (obj.checkbox) {
                                $("<input />", { id: "checkall", type: "checkbox", name: "name" + i }).bind("click", function () { checkAll(this); }).appendTo(td);
                            }
                            else {
                                if (obj.drag) {
                                    if (i < columns.length - 1) {
                                        var span = $("<label />", { "class": "resizeDragClass" });
                                        var img = $('<img />');
                                        span.html("&nbsp;");
                                        drag(span);
                                        td.html(span);
                                    }
                                    if (obj.order) {
                                        var orDiv = $("<div  style='padding-top:0px;height:18px;overflow:hidden;width:97%;flaot:left'></div>");
                                        orDiv.html(clumOrder("desc", obj.field, obj.name));
                                        td.append(orDiv);
                                    }
                                    else {
                                        td.append("<div  style='padding-top:0px;height:18px;overflow:hidden;width:97%;flaot:left'>" + obj.name + "</div>");
                                    }
                                }
                                else {
                                    if (obj.order) {
                                        td.html(clumOrder("desc", obj.field, obj.name));
                                    }
                                    else
                                        td.html(obj.name);
                                }
                            }
                            tr.append(td);
                            thead.append(tr)
                        }
                    });
                    return thead;
                }

                //设置表格内容  
                function gridContent() {
                    GetData(opt.idField, opt.ajaxUrl, arguments[1], arguments[0], opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page);
                    // pageSize("top")
                    pageSize("b");
                }
                function gridContentData() {
                    GetData(opt.idField, opt.ajaxUrl, arguments[1], arguments[0], opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page);

                }

                //设置排序以及页码
                function pageSize() {
                    var div = $("<div />", { "class": "grid-footer" });
                    $(".grid-footer").remove();
                    if (opt.pageSelect.length > 0) {
                        var select = $("<select />");
                        select.css({"height":"20px"});
                        select.append("<option>" + opt.oldCount + "</option>");
                        $.each(opt.pageSelect, function (i, dat) {
                            if (opt.oldCount != dat) {
                                select.append("<option>" + dat + "</option>");
                            }
                        });
                        select.change(function () {
                            opt.pageCount = $(this).val();
                            gridContentData(opt.order, opt.sortName);
                             div.find("div")[1].remove();
                            div.append(SetPageGo());
                            $(this).val(opt.pageCount);
                           // SetTaleEquel(headerTable, table);
                        });
                        var sp = $("<div />" ,{"class": "pagecheck"})
                        .css({ "line-height": "30px", "float": "left","width":"120px" });
                        sp.html(select);
                        select.before("每页&nbsp;");
                        select.after("&nbsp;行");
                        div.append(sp);
                    }
                  //  div.append(sp);
                    div.append(SetPageGo());
                    grid.append(div);
                    //扩展方法、列表加载后执行的方法
                    opt.extmethod();
                   // SetTaleEquel(headerTable, table);
                }
                //排序↑↓
                function clumOrder(orderType, sortName, text) {
                    var spn = $("<span />").css("cursor", "pointer");
                    spn.html(text);
                    spn.attr("order", orderType);
                    spn.bind("click", function () {
                        opt.sortName = sortName;
                        spn.text(text);
                        var spanText = $(".orderF").text();
                        if (spanText.indexOf("↑") > -1 || spanText.indexOf("↓") > -1) {
                            spanText = spanText.replace("↑", "").replace("↓", "");
                            $(".orderF").text(spanText);
                            $(".orderF").removeClass("orderF");
                        }
                        if ($(this).attr("order") == "asc") {
                            $(this).attr("order", "desc");
                            opt.sort = "desc";
                            spn.html(spn.html() + "&nbsp;↓");
                        }
                        else {
                            $(this).attr("order", "asc");
                            opt.sort = "asc";
                            
                            spn.html(spn.html() + "&nbsp;↑");
                        }
                        gridContent($(this).attr("order"), sortName);
                        spn.addClass("orderF");
                        SetTaleEquel(headerTable, table);
                    });

                    return spn;
                }

                //跳页
                function SetPageGo() {
                	 
					var pageinfo =$('<div />',{"class":"page-info"}).html("	共<a>"+total+"</a>条记录，"+opt.page+"/"+ Math.ceil(parseInt(total) / opt.pageCount)+"页 &nbsp;&nbsp; ");
                
					 var pageLabelNum = 4;
					 
					 var pagepages=$('<div />',{"class":"page-pages"});
					 
					 for(var i=pageLabelNum;i>0;i--){
						 
						 if(opt.page-i>0){
							 var page = opt.page-i;
							 
							 var label =$("<label />").html(page).bind("click", function () { pageJump(this); })
							 
							  pagepages.append(label);
						 }
					 }
					 pagepages.append("<label>"+opt.page+"</label>");
					 for(var i=1;i<=pageLabelNum;i++){
						 
						 if(opt.page+i<=Math.ceil(parseInt(total) / opt.pageCount)){
							 var page =opt.page+i;
							 var label =$("<label />").html(page).bind("click", function () { pageJump(this); })
							 
							  pagepages.append(label);
						 }
					 }
					
					//var pagepages=$('<div />',{"class":"page-pages"}).html("<label>1</label> <label>2</label> <label>3</label> <label>4</label><label>5</label>");
					 
					   var input =  $("<input />", { "class": "pageText" }).css({ width: 30, height: 29,position: "relative" });
					   
					   var jump = $("<a/>",{"class":"btn btn-primary btn-xs"}).html("跳转").bind("click", function () { pageGo(this); });
					
					var pagejump=$('<div />',{"class":"page-jump"}).html(" &nbsp;&nbsp;到第").append(input).append("页").append(jump);
					 
					var div =$('<div />');
					
					
					pagejump.appendTo(div);
					
					pagepages.appendTo(div);
					
					pageinfo.appendTo(div);
					
					
					
				 
					
				/*	var div = $('<div />').css({ "float": "left",  "line-height": "30px" });
                    $("<div />", { "class": "pagecheck" }).text("共" + total + "条  " ).appendTo(div);
                    $("<div />", { "class": "pagecheck" }).text(opt.page + "/" + Math.ceil(parseInt(total) / opt.pageCount)).appendTo(div);
                    $("<div />", { "class": "pagecheck" }).text("首页").bind("click", function () { firstPage(); }).appendTo(div);
                    $("<div />", { "class": "pagecheck" }).text("上一页").bind("click", function () { prevPage(); }).appendTo(div);
                    $("<div />", { "class": "pagecheck" }).text("下一页").bind("click", function () { nextPage(); }).appendTo(div);
                    $("<div />", { "class": "pagecheck" }).text("末页").bind("click", function () { endPage(); }).appendTo(div);
                   var input =  $("<input />", { "class": "pageText" }).css({ width: 60, height: 29,position: "relative" });
                    $("<div />", { "class": "pagecheck" }).append(input).appendTo(div);
                   $("<div />", { "class": "page-jump" }).text("跳转").bind("click", function () { pageGo(this); }).appendTo(div);*/
                    return div;

                }
                //全选
                function checkAll(obj) {
                   
                    if ($(obj).prop("checked")) {
                        $("#" + tableContent.attr("id") + " [name='" + $(obj).attr("name") + "']").attr("checked", true).parent().parent().addClass("griddatahover");
                    }
                    else {
                        $("#" + tableContent.attr("id") + " [name='" + $(obj).attr("name") + "']").attr("checked", false).parent().parent().removeClass("griddatahover");

                    }
                }

                //首页
                function firstPage() {
                    if (opt.page != 1) {
                        opt.page = 1;
                        GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page);
                        
                        pageSize();
                    }
                }
                //末页
                function endPage() {
                    if (opt.page < Math.ceil(parseInt(total) / opt.pageCount)) {
                        opt.page = Math.ceil(parseInt(total) / opt.pageCount);
                        GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page);
                       
                        pageSize();
                    }
                }

                //上一页
                function prevPage() {
                    if (opt.page > 1) {
                        opt.page -= 1;
                        GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page);
                        
                        pageSize();
                    }
                }

                //下一页
                function nextPage() {

                    if (opt.page < Math.ceil(parseInt(total) / opt.pageCount)) {
                        opt.page += 1;
                        GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page);
                        
                        pageSize();
                    }
                }
                
                //跳页
                function pageGo(obj) {

                    if (!isNaN($(obj).prev(".pageText").val())) {
                        var paged = parseInt($(obj).prev(".pageText").val());
                        if (paged >= 1 && paged <= Math.ceil(parseInt(total) / opt.pageCount) && paged != opt.page) {
                            opt.page = paged;
                            GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page);
                            
                            pageSize();
                        }
                    }
                }
                //跳页
                function pageJump(obj) {
                		var paged = parseInt($(obj).html());
                		console.log("跳转到："+paged);
                        if (paged >= 1 && paged <= Math.ceil(parseInt(total) / opt.pageCount) && paged != opt.page) {
                            opt.page = paged;
                            GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page);
                            
                            pageSize();
                        }
                    
                }

                //ajax请求数据
                function GetData(idField, ajaxUrl, sort, order, connectionName, connectionString, providerName, tableName, condition, pageCount, where, columns, page) {
                  var  data = { sort: sort, order: order,  tableName: tableName, rows: pageCount, page: page, where: where,condition:condition };
                  var search = "";
                 
                    $.ajax({
                        type: "POST",
                        url: ajaxUrl,
                        dataType: "json",
                        async: false,
                        data:data,
                      
                        success: function (data) {
                            total = data.total;
                            var dataRow = data.rows;
                            var newJson = opt.BindBefore(dataRow);
                            if (newJson) {
                                dataRow = newJson;
                            }
                            setListContent(dataRow, columns);
                            //table.append(str);
                        },
                        error: function (data) {
                            alert("数据请求错误，错误类型：" + data.status);
                        }

                    });
                }

                //设置列表内容
                function setListContent(dataRow, columns) {

                    var trStr = "";
                    headerTable.find("tbody tr").remove();
                    $.each(dataRow, function (j, rowDat) {
                        var tr = $("<tr  />");
                        if (j % 2 != 0)
                            tr.addClass("tabletr");
                        tr.hover(function () { $(this).addClass("griddatahover"); }, function () {
                            if ($(this).find(":checkbox,:radio").attr("checked") != "checked")
                                $(this).removeClass("griddatahover");
                            
                        });

                        tr.data("data", rowDat);
                        $.each(columns, function (i, colDat) {
                            if (typeof (colDat) != "undefined") {
                                var td = $("<td />");

                                td.width(colDat.width);
                                if (colDat.field) {
                                    for (key in rowDat) {
                                        if (colDat.field.toLowerCase() == key.toLowerCase()) {
                                            if (colDat.align) {
                                                td.css({ "text-align": colDat.align });
                                            }
                                            if (colDat.checkbox) {
                                                var input = $("<input />", { "type": "checkbox", "name": "name" + i }).val(rowDat[key]);
                                                input.click(function () {
                                                    if ($(this).attr("checked") == "checked") {
                                                        opt.SelectedRows(rowDat);
                                                        tr.addClass("griddatahover");
                                                    }
                                                    else {
                                                        opt.CannelRows(rowDat);
                                                    }
                                                });
                                                td.append(input);
                                            }
                                           else if (colDat.radiobox) {
                                                var input = $("<input />", { "type": "radio", "name": "name" + i }).val(rowDat[key]);
                                                input.click(function () {
                                                    if ($(this).attr("checked") == "checked") {
                                                        table.find(".griddatahover").removeClass("griddatahover");
                                                        tr.addClass("griddatahover");
                                                    }
                                                });
                                                td.append(input);
                                            }
                                            else {
                                                if (colDat.render && typeof (colDat.render) == "function") {
                                                    trStr = colDat.render(rowDat[key], rowDat, key);
                                                    td.html(td.html() + trStr);
                                                }
                                                else {
                                                    td.html(rowDat[key].replace('0:00:00', ''));
                                                }
                                                td.click(function (event) {
                                            
                                                    if ($(event.target).is("td")) {
                                                        var checkbox = $(this).parent().find(":checkbox[name*='name']").eq(0);
                                                        if (checkbox.attr("checked") == "checked") {
                                                            checkbox.attr("checked", false);
                                                            opt.CannelRows(rowDat);
                                                        }
                                                        else {
                                                            checkbox.attr("checked", "checked");
                                                            opt.SelectedRows(rowDat);
                                                        }
                                                        checkbox = $(this).parent().find(":radio[name*='name']").eq(0);
                                                        if (checkbox.attr("checked") == "checked") {
                                                            checkbox.attr("checked", false);
                                                        }
                                                        else {
                                                            table.find(".tablehover").removeClass("griddatahover");
                                                            checkbox.attr("checked", "checked");
                                                            tr.addClass("griddatahover");
                                                        }
                                                    }
                                                });
                                            } tr.append(td);
                                            break;
                                        }

                                    }
                                }
                                else
                                    tr.append(td);
                            }
                        });
                        headerTable.append(tr);
                    });

                    if (headerTable.find("tbody tr").length <= 0) {
                    	headerTable.append("<tr><td class='gridlabel' colspan='" + columns.length + "'>暂无数据</td></tr>");
                    }

                }

                function drag(obj) {
                    var dragEle = $(obj);
                    getEleWidth = function (ele) {
                        return ele.innerWidth();
                    }

                    setEleWidth = function (ele, width) {
                        ele.width(width);
                        var index = ele.index();
                        var table = ele.parent().parent().parent().next();
                        var tr = table.find("tr").eq(0);
                        tr.find("td").eq(index).width(width);
                    }
                    dragEle.mousedown(function () {

                        var d = document; var evt = window.event;
                        var lastX = evt.clientX;
                        var td = dragEle.get(0);
                        var wd = getEleWidth(dragEle.parent()) + getEleWidth(dragEle.parent().next());
                        if (td.setCapture)
                            td.setCapture();
                        else if (window.captureEvents)
                            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                        document.onmousemove = function () {
                            var evt = window.event;
                            var t = evt.clientX - lastX;
                            if (getEleWidth(dragEle.parent()) + getEleWidth(dragEle.parent().next()) > wd) {
                                setEleWidth(dragEle.parent().next(), wd - getEleWidth(dragEle.parent()));
                                return;
                            }
                            if (t > 0) {
                                if (dragEle.parent().next().width() < 30)
                                    return;
                                setEleWidth(dragEle.parent(), getEleWidth(dragEle.parent()) + t);
                                setEleWidth(dragEle.parent().next(), getEleWidth(dragEle.parent().next()) - t);
                            } else {//left 
                                if (dragEle.parent().width() < 30)
                                    return;
                                setEleWidth(dragEle.parent(), getEleWidth(dragEle.parent()) + t);
                                setEleWidth(dragEle.parent().next(), getEleWidth(dragEle.parent().next()) - t);
                            }

                            lastX = evt.clientX;
                        };
                        document.onmouseup = function () {
                            var td = dragEle.get(0);
                            if (td.releaseCapture)
                                td.releaseCapture();
                            else if (window.captureEvents)
                                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                            document.onmousemove = null;
                            document.onmouseup = null;
                        };
                    });
                }
            });
        },
        GetSelection: function (type) {

            var arry = new Array();
            var table = $(this).find("table");

            if (type.toLowerCase() == "single") {

                table.find("[id!='checkall'][name*='name']:checked").each(function () {
                    if ($(this).attr("value"))
                        arry[arry.length] = $(this).val();
                });
            }
            if (type.toLowerCase() == "total") {
                table.find("[id!='checkall'][name*='name']:checked").each(function () {
                    if ($(this).attr("value"))
                        arry[arry.length] = $(this).parent().parent().data("data");
                });
            }
            return arry;
        },
        DetelteRow: function (url) {
            var tableContent = $(this);
            var table = $(this).find("table").eq(1);
            if (confirm("确定要删除吗")) {
                var guids = $(this).GetSelection("single");
                if (guids.length <= 0) {
                    alert("请选择要删除的行"); return;
                }
                $.ajax({
                    url: url,
                    type: "post",
                    data: { tableName: cfg.tableName, where: " and guid in('" + guids.join("','") + "')" },
                    dataType: "text",

                    success: function (data) {
                        if (data != "False") {
                            alert("删除成功");
                            var options = table.data("opt");
                            tableContent.Grid(options);
                        }
                    },
                    error: function (msg)
                    { alert("请求数据失败"+msg.status); }
                });
            }
        },
        Refresh: function () {
            var tableContent = $(this);
            $(this).find("table").eq(0).find(":checkbox,:radio").attr("checked", false);
            var table = $(this).find("table").eq(1);
            var options = table.data("opt");
            tableContent.Grid(options);
        }
    });
})(jQuery);

