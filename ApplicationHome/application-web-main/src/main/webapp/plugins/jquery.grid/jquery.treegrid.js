
(function ($) {
    $.fn.extend({
        TreeGrid: function (options) {
            var defaults = {
                sortName: "",
                order: "",
                ajaxUrl: "",
                rowsData: [],
                connectionName: "",
                connectionString: "",
                providerName: "",
                tableName: "",
                condition: "",
                pageCount: 0,
                columns: [],
                rowsData: [],
                width: "99%",
                height: 100,
                idField: "",
                page: 1,
                where: "",
                parentfield: "",
                childfield: "",
                childWhere: "",
                Pagination: false,
                pageSelect: [],
                Cascade: false,
                SelectedRows: function () { },
                CannelRows: function () { },
                BindBefore: function (data) { return data; }
            }
            var options = $.extend(defaults, options);
            return this.each(function () {
                var opt = options;
                var $gridcontent = $("<div />");//grid容器
                var $gridhead = $("<div />");//grid列头
                var $headtable = $("<table />");//列头表格
                var $datacontent = $("<div />");//grid数据容器
                var $datatable = $("<table />");

                $gridcontent = $(this);
                $gridcontent.children().remove();
                $gridcontent.width(opt.width).height(opt.height).addClass("gridcontent");
                $headtable.width("100%").attr({ "border": "0", "cellpadding": "0", "cellspacing": "0" });
                $gridhead.append($headtable.append(SetGridHeader(opt.columns)));
                $gridcontent.append($gridhead).append($datacontent);
                $datatable.width("100%").addClass("datagrid").attr({ "border": "0", "cellpadding": "0", "cellspacing": "0" });

                $datacontent.height($gridcontent.height() - 35 - 28).addClass("gridtablecontent").css({ "overflow-y": "auto" });
                $datacontent.append($datatable);
                var total = 0;
                if (opt.ajaxUrl == "") {
                    total = opt.rowsData.total;
                    SetGridData(opt.rowsData.rows, opt.columns);
                    //  $headtable.width($datatable.width());
                    if (opt.Pagination) {
                        pageSize();
                    }
                }
                else {
                    GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page, opt.parentfield, opt.childfield, opt.childWhere);
                    //    $headtable.width($datatable.width());
                    if (opt.Pagination) {
                        pageSize();
                    }
                } 
                
                if ($gridcontent.is(':hidden')) {
                
                    var init = setInterval('Window.SetWidth()', 1000);
                    $gridcontent.data("init", init);
                    Window.SetWidth = function () {
                        $(".gridcontent").each(function () {
                            if ($(this).data("init")) {
                                if ($(this).is(":visible")) {
                                    $(this).find("table").eq(0).width($(this).find("table").eq(1).width());
                                    clearInterval($(this).data("init"));
                                }
                            }
                        });
                    }
                }

                //ajax请求数据
                function GetData(idField, ajaxUrl, sort, order, connectionName, connectionString, providerName, tableName, condition, pageCount, where, columns, page, parentfield, childfield, childWhere) {
                    $.ajax({
                        type: "POST",
                        url: ajaxUrl,
                        dataType: "json",
                        async: false,

                        data: { idField: idField, sort: sort, order: order, connectionName: connectionName, connectionString: connectionString, providerName: providerName, tableName: tableName, condition: condition, rows: pageCount, page: page, where: where, parentfield: parentfield, childfield: childfield, childWhere: childWhere },
                        success: function (data) {
                            $datatable.find("tr").remove();
                            var dataRow;
                            total = data.total;
                            dataRow = data.rows;

                            var newJson = opt.BindBefore(dataRow);
                            if (newJson) {
                                dataRow = newJson;
                            }

                            SetGridData(dataRow, columns);
                            //table.append(str);
                        },
                        error: function (data) {
                            alert("数据请求错误，错误类型：" + data.status);
                        }

                    });
                }


                //设置表头
                function SetGridHeader(columns) {
                    var tr = $("<tr />");
                    $.each(columns, function (i, obj) {
                        if (typeof (obj) != "undefined") {
                            var td = $("<td />");
                            td.addClass("gridHeader")
                            if (typeof (obj.width) != "undefined") {
                                td.css("width", obj.width);
                            }
                            if (obj.checkbox) {
                                $("<input />", { id: "checkall", type: "checkbox", name: "name" + i }).bind("click", function () { checkAll(this); }).appendTo(td);
                            }
                            else {

                                td.html(obj.name);
                            }
                            tr.append(td);
                        }
                    });
                    return tr;
                }



                function SetGridData(dataRow, columns) {

                    var level = 0;
                    $.each(dataRow, function (i, rowDat) {
                        var tr = $("<tr  />");

                        tr.hover(function () { $(this).addClass("griddatahover"); }, function () {
                            if ($(this).find(":checkbox,:radio").attr("checked") != "checked")
                                $(this).removeClass("griddatahover");

                        });
                        tr.data("data", rowDat);
                        $.each(columns, function (i, colDat) {
                            var td = $("<td />", { "class": "gridlabel" });
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
                                                if ($(this).prop("checked")) {
                                                    opt.SelectedRows(rowDat);
                                                    tr.addClass("griddatahover");
                                                    if (opt.Cascade) {
                                                        if (tr.next().find("div").length > 0) {
                                                            tr.next().find("div").find(":checkbox").each(function () {
                                                                $(this).prop("checked", true);
                                                                $(this).parent().parent().addClass("griddatahover");
                                                            });
                                                        }
                                                    }
                                                }
                                                else {
                                                    opt.CannelRows(rowDat);
                                                    if (opt.Cascade) {
                                                        if (tr.next().find("div").length > 0) {
                                                            tr.next().find("div").find(":checkbox").each(function () {
                                                                $(this).prop("checked", false);
                                                                $(this).parent().parent().removeClass("griddatahover");
                                                            });
                                                        }


                                                        var ptable = $(this).parent().parent().parent();
                                                        while (true) {
                                                            var trs = ptable.find("tr");

                                                            if (ptable.is("tbody")) {
                                                                var istd = ptable.parent().parent().parent();
                                                                if (istd.is("td")) {
                                                                    ptable = istd.parent().parent();
                                                                    if (!istd.parent().prev().find(":checkbox").eq(0).prop("checked", false))
                                                                        break;
                                                                    istd.parent().prev().find(":checkbox").eq(0).prop("checked", false);
                                                                }
                                                                else
                                                                    break;
                                                            }

                                                            if (ptable.is("table")) {
                                                                var istd = ptable.parent().parent();
                                                                if (istd.is("td")) {
                                                                    ptable = istd.parent().parent();
                                                                    if (!istd.parent().prev().find(":checkbox").eq(0).prop("checked", false))
                                                                        break;
                                                                    istd.parent().find(":checkbox").eq(0).prop("checked", false);
                                                                }
                                                                else
                                                                    break;
                                                            }

                                                        }




                                                    }
                                                }
                                            });
                                            td.append(input);
                                        }
                                        else if (colDat.radiobox) {
                                            var input = $("<input />", { "type": "radio", "name": "name" + i }).val(rowDat[key]);
                                            input.click(function () {
                                                if ($(this).attr("checked") == "checked") {
                                                    $datatable.find(".griddatahover").removeClass("griddatahover");
                                                    tr.addClass("griddatahover");
                                                }
                                            });
                                            td.append(input);
                                        }
                                        else {
                                            if (colDat.collapsible) {
                                                if (rowDat.children) {
                                                    var span = $("<span />", { "class": "tree-expanded" });
                                                    span.css({ "margin-left": 18 * level, "cursor": "pointer" });
                                                    var folder = $("<span />", { "class": "tree-folder" });
                                                    td.append(span).append(folder);

                                                    span.click(function () {

                                                        if ($(this).attr("class") == "tree-collapsed") {
                                                            $(this).addClass("tree-expanded").removeClass("tree-collapsed");
                                                            $(this).next().addClass("tree-folder-open").removeClass("tree-folder");
                                                            tr.next().find("div").eq(0).hide();
                                                            tr.next().show();
                                                            tr.next().find("div").eq(0).slideDown("slow", function () {
                                                                $headtable.width($datatable.width());
                                                            });
                                                        }
                                                        else if ($(this).attr("class") == "tree-expanded") {
                                                            $(this).addClass("tree-collapsed").removeClass("tree-expanded");
                                                            $(this).next().addClass("tree-folder").removeClass("tree-folder-open");

                                                            tr.next().find("div").eq(0).slideUp("slow", function () {
                                                                tr.next().hide();
                                                                $headtable.width($datatable.width());
                                                            });

                                                        }


                                                    });
                                                }
                                                else {
                                                    var span = $("<span />", { "class": "tree-indent" });
                                                    span.css({ "margin-left": 18 * level, "cursor": "pointer" });
                                                    var folder = $("<span />", { "class": "tree-file" });
                                                    td.append(span).append(folder);
                                                }
                                                if (colDat.render && typeof (colDat.render) == "function") {
                                                    trStr = colDat.render(rowDat[key].replace('0:00:00', ''), rowDat, key);
                                                    td.append("<span class='tree-title'>" + trStr + "</span>");
                                                }
                                                else {
                                                    td.append("<span class='tree-title'>" + rowDat[key].replace('0:00:00', '') + "</span>");
                                                }
                                                // td.css("text-overflow", "clip");
                                            }
                                            else {
                                                if (colDat.render && typeof (colDat.render) == "function") {
                                                    trStr = colDat.render(rowDat[key].replace('0:00:00', ''), rowDat, key);
                                                    td.html(td.html() + trStr);
                                                }
                                                else {
                                                    td.html(rowDat[key].replace('0:00:00', ''));
                                                }
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
                                                        $datatable.find(".tablehover").removeClass("griddatahover");
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
                        });
                        $datatable.append(tr);
                        if (rowDat.children) {
                            $datatable.append(childrenTableData(rowDat, opt.columns, level + 1));
                        }
                    });
                    if ($datatable.find("tr").length <= 0) {
                        $datatable.append("<tr><td class='gridlabel' colspan='" + columns.length + "'>暂无数据</td></tr>");
                    }
                }

                function childrenTableData(currentRowData, columns, level) {
                    var $tr = $("<tr />");//.css("display", "none");

                    var $td = $("<td />").attr("colspan", columns.length).css({ "border": "0", "margin": "0", "padding": "0" });
                    var $div = $("<div />").css("display", "block ");
                    $tr.append($td);
                    var table = $("<table />").css({ "width": "100%" }).addClass("datagrid").attr({ "border": "0", "cellpadding": "0", "cellspacing": "0" });
                    $div.append(table);
                    $.each(currentRowData.children, function (i, rowDat) {

                        var tr = $("<tr  />").css({ "border-collapse": "separate" });
                        tr.hover(function () { $(this).addClass("griddatahover"); }, function () {
                            if ($(this).find(":checkbox,:radio").attr("checked") != "checked")
                                $(this).removeClass("griddatahover");

                        });
                        tr.data("data", rowDat);
                        $.each(columns, function (i, colDat) {
                            var td = $("<td />", { "class": "gridlabel" }).css({ "border-collapse": "separate" });
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
                                                    if (opt.Cascade) {
                                                        if (tr.next().find("div").length > 0) {
                                                            tr.next().find("div").find(":checkbox").each(function () {
                                                                $(this).prop("checked", true);
                                                                $(this).parent().parent().addClass("griddatahover");
                                                            });
                                                        }
                                                        var ptable = $(this).parent().parent().parent();
                                                        var b = true;
                                                        while (true) {
                                                            var trs = ptable.find("tr");
                                                            trs.each(function (i) {
                                                                if ($(this).find("div").length <= 0) {
                                                                    if (!$(this).find(":checkbox").eq(0).prop("checked")) {
                                                                        b = false;
                                                                        return false;
                                                                    }
                                                                }

                                                            });
                                                            if (!b)
                                                                break;
                                                            if (ptable.is("tbody")) {
                                                                var istd = ptable.parent().parent().parent();
                                                                if (istd.is("td")) {
                                                                    ptable = istd.parent().parent();
                                                                    istd.parent().prev().find(":checkbox").eq(0).prop("checked", true);
                                                                }
                                                                else
                                                                    break;
                                                            }


                                                            if (ptable.is("table")) {
                                                                var istd = ptable.parent().parent();
                                                                if (istd.is("td")) {
                                                                    ptable = istd.parent().parent();
                                                                    istd.parent().find(":checkbox").eq(0).prop("checked", true);
                                                                }
                                                                else
                                                                    break;
                                                            }

                                                        }
                                                    }
                                                }
                                                else {
                                                    opt.CannelRows(rowDat);
                                                    if (opt.Cascade) {
                                                        if (tr.next().find("div").length > 0) {
                                                            tr.next().find("div").find(":checkbox").each(function () {
                                                                $(this).prop("checked", false);
                                                                $(this).parent().parent().removeClass("griddatahover");
                                                            });
                                                        }




                                                        var ptable = $(this).parent().parent().parent();
                                                        while (true) {
                                                            var trs = ptable.find("tr");

                                                            if (ptable.is("tbody")) {
                                                                var istd = ptable.parent().parent().parent();
                                                                if (istd.is("td")) {
                                                                    ptable = istd.parent().parent();
                                                                    if (!istd.parent().prev().find(":checkbox").eq(0).prop("checked"))
                                                                        break;
                                                                    istd.parent().prev().find(":checkbox").eq(0).prop("checked", false);
                                                                }
                                                                else
                                                                    break;
                                                            }

                                                            if (ptable.is("table")) {
                                                                var istd = ptable.parent().parent();
                                                                if (istd.is("td")) {
                                                                    ptable = istd.parent().parent();
                                                                    if (!istd.parent().find(":checkbox").eq(0).prop("checked", false))
                                                                        break;
                                                                    istd.parent().find(":checkbox").eq(0).prop("checked", false);
                                                                }
                                                                else
                                                                    break;
                                                            }

                                                        }
                                                    }
                                                }
                                            });
                                            td.append(input);
                                        }
                                        else if (colDat.radiobox) {
                                            var input = $("<input />", { "type": "radio", "name": "name" + i }).val(rowDat[key]);
                                            input.click(function () {
                                                if ($(this).attr("checked") == "checked") {
                                                    $datatable.find(".griddatahover").removeClass("griddatahover");
                                                    tr.addClass("griddatahover");
                                                }
                                            });
                                            td.append(input);
                                        }
                                        else {
                                            if (colDat.collapsible) {
                                                if (rowDat.children) {
                                                    var span = $("<span />", { "class": "tree-expanded" });
                                                    span.css({ "margin-left": 18 * level, "cursor": "pointer" });
                                                    var folder = $("<span />", { "class": "tree-folder" });
                                                    td.append(span).append(folder);

                                                    span.click(function () {
                                                        if ($(this).attr("class") == "tree-collapsed") {
                                                            $(this).addClass("tree-expanded").removeClass("tree-collapsed");
                                                            $(this).next().addClass("tree-folder-open").removeClass("tree-folder");
                                                            tr.next().find("div").eq(0).hide();
                                                            tr.next().show();
                                                            tr.next().find("div").eq(0).slideDown("slow", function () {
                                                                $headtable.width($datatable.width());
                                                            });
                                                        }
                                                        else if ($(this).attr("class") == "tree-expanded") {
                                                            $(this).addClass("tree-collapsed").removeClass("tree-expanded");
                                                            $(this).next().addClass("tree-folder").removeClass("tree-folder-open");

                                                            tr.next().find("div").eq(0).slideUp("slow", function () {
                                                                tr.next().hide();
                                                                $headtable.width($datatable.width());
                                                            });

                                                        }
                                                    });
                                                }
                                                else {
                                                    var span = $("<span />", { "class": "tree-indent" });
                                                    span.css({ "margin-left": 18 * level, "cursor": "pointer" });
                                                    var folder = $("<span />", { "class": "tree-file" });
                                                    td.append(span).append(folder);
                                                }
                                                if (colDat.render && typeof (colDat.render) == "function") {
                                                    trStr = colDat.render(rowDat[key].replace('0:00:00', ''), rowDat, key);
                                                    td.append("<span class='tree-title'>" + trStr + "</span>");
                                                }
                                                else {
                                                    td.append("<span class='tree-title'>" + rowDat[key].replace('0:00:00', '') + "</span>");
                                                }
                                            }
                                            else {
                                                if (colDat.render && typeof (colDat.render) == "function") {
                                                    trStr = colDat.render(rowDat[key].replace('0:00:00', ''), rowDat, key);
                                                    td.html(td.html() + trStr);
                                                }
                                                else {
                                                    td.html(rowDat[key].replace('0:00:00', ''));
                                                }
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
                        });
                        table.append(tr);
                        if (rowDat.children) {
                            tr.after(childrenTableData(rowDat, opt.columns, level + 1));
                        }
                    });
                    $td.append($div);
                    $tr.append($td);
                    return $tr;
                }

                function checkAll(obj) {
                    if ($(obj).attr("checked")) {
                        $("#" + $gridcontent.attr("id") + " [name='" + $(obj).attr("name") + "']").attr("checked", true).parent().parent().addClass("griddatahover");

                    }
                    else {
                        $("#" + $gridcontent.attr("id") + " [name='" + $(obj).attr("name") + "']").attr("checked", false).parent().parent().removeClass("griddatahover");

                    }
                }


                //设置排序以及页码
                function pageSize() {
                    var div = $("<div />", { "class": "gridfooter" });
                    $datatable.parent().next().remove();
                    if (opt.pageSelect.length > 0) {
                        var select = $("<select />");
                        select.append("<option>" + opt.pageCount + "</option>");
                        $.each(opt.pageSelect, function (i, dat) {
                            if (opt.pageCount != dat) {
                                select.append("<option>" + dat + "</option>");
                            }
                        });
                        select.change(function () {
                            opt.pageCount = $(this).val();
                            gridContentData(opt.order, opt.sortName);
                            div.find("div").remove();
                            div.append(SetPageGo());
                            $(this).val(opt.pageCount);
                            // SetTaleEquel(headerTable, table);
                        });
                        var sp = $("<span />").css({ "line-height": "37px", "float": "left" });
                        sp.html(select);
                        select.before("每页&nbsp;");
                        select.after("&nbsp;条目数");
                        div.append(sp);
                    }
                    //div.append(spn);
                    div.append(SetPageGo());
                    $gridcontent.append(div);
                    // SetTaleEquel(headerTable, table);
                    $headtable.width($datatable.width());
                }
                //排序↑↓
                function clumOrder(orderType, sortName, text) {
                    var spn = $("<span />").css("cursor", "pointer");
                    spn.html(text);
                    spn.attr("order", orderType);
                    spn.bind("click", function () {
                        spn.text(text);
                        var spanText = $(".orderF").text();
                        if (spanText.indexOf("↑") > -1 || spanText.indexOf("↓") > -1) {
                            spanText = spanText.replace("↑", "").replace("↓", "");
                            $(".orderF").text(spanText);
                            $(".orderF").removeClass("orderF");
                        }
                        if ($(this).attr("order") == "asc") {
                            $(this).attr("order", "desc");
                            spn.html(spn.html() + "&nbsp;↓");
                        }
                        else {
                            $(this).attr("order", "asc");
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
                    var div = $('<div />').css({ "float": "right", "width": "440px", "line-height": "37px" });
                    div.html("共有记录" + total + "条&nbsp;" + opt.page + "/" + Math.ceil(parseInt(total) / opt.pageCount));
                    $("<span />", { "class": "fPage" }).text("首页").bind("click", function () { firstPage(); }).appendTo(div);
                    $("<span />", { "class": "prevPage" }).text("上一页").bind("click", function () { prevPage(); }).appendTo(div);
                    $("<span />", { "class": "nextPage" }).text("下一页").bind("click", function () { nextPage(); }).appendTo(div);
                    $("<span />", { "class": "ePage" }).text("末页").bind("click", function () { endPage(); }).appendTo(div);
                    $("<input />", { "class": "pageText" }).css({ width: 35, height: 15 }).appendTo(div);
                    $("<span />", { "class": "pageGo" }).text("跳转").bind("click", function () { pageGo(this); }).appendTo(div);

                    return div;

                }

                //首页
                function firstPage() {
                    if (opt.page != 1) {
                        opt.page = 1;
                        GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page, opt.parentfield, opt.childfield, opt.childWhere);

                        pageSize();
                    }
                }
                //末页
                function endPage() {
                    if (opt.page < Math.ceil(parseInt(total) / opt.pageCount)) {
                        opt.page = Math.ceil(parseInt(total) / opt.pageCount);
                        GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page, opt.parentfield, opt.childfield, opt.childWhere);

                        pageSize();
                    }
                }

                //上一页
                function prevPage() {
                    if (opt.page > 1) {
                        opt.page -= 1;
                        GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page, opt.parentfield, opt.childfield, opt.childWhere);

                        pageSize();
                    }
                }

                //下一页
                function nextPage() {

                    if (opt.page < Math.ceil(parseInt(total) / opt.pageCount)) {
                        opt.page += 1;
                        GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page, opt.parentfield, opt.childfield, opt.childWhere);

                        pageSize();
                    }
                }
                //跳页
                function pageGo(obj) {

                    if (!isNaN($(obj).prev(".pageText").val())) {
                        var paged = parseInt($(obj).prev(".pageText").val());
                        if (paged >= 1 && paged <= Math.ceil(parseInt(total) / opt.pageCount) && paged != opt.page) {
                            opt.page = paged;
                            GetData(opt.idField, opt.ajaxUrl, opt.sortName, opt.order, opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page, opt.parentfield, opt.childfield, opt.childWhere);

                            pageSize();
                        }
                    }
                }  //设置表格内容  
                function gridContent() {
                    GetData(opt.idField, opt.ajaxUrl, arguments[1], arguments[0], opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page, opt.parentfield, opt.childfield, opt.childWhere);
                    // pageSize("top")
                    pageSize("b");
                }
                function gridContentData() {
                    GetData(opt.idField, opt.ajaxUrl, arguments[1], arguments[0], opt.connectionName, opt.connectionString, opt.providerName, opt.tableName, opt.condition, opt.pageCount, opt.where, opt.columns, opt.page, opt.parentfield, opt.childfield, opt.childWhere);

                }

            });
        }, GetSelection: function (type) {

            var arry = new Array();
            var table = $(this).find("table").eq(1);

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
        }, CannelSelection: function () {
            var table = $(this).find("table").eq(1);
            table.find("input:checked").each(function () {
                $(this).prop("checked", false);
                $(this).parent().parent().removeClass("griddatahover");
            });
        }
    });
})(jQuery);