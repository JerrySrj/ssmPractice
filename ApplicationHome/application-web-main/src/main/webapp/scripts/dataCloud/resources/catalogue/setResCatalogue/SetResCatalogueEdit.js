$(document).ready(function() {
	initRuleGrid();
	setLeftMenuHeight();
});

/*
 * 初始化规则 grid
 */
function initRuleGrid() {
	var radioRender = function (row, dataField, cellValue, rowData, cellText) {
        return "<input type='radio' name='cataRadio'/>" + cellText;
    }
    var data = [
       {
           "id": "1", "name": "政务综合类", "code": "ZAA00", "desc": "",
           "children":
            [
                {
                    "id": "2", "name": "方针政策", "code": "ZAB00", "desc": "政府制订的、宏观的、指导各个领域发展的方针政策",
                },
                {
                    "id": "3", "name": "中共党务", "code": "ZAC00", "desc": "关于中国共产党的规章制度、组织机构建设和发展，以及工作职责等相关信息",
                }
            ]
       },
       {
           "id": "4", "name": "政务综合类", "code": "ZAA00", "desc": "",
           "children":
            [
                {
                    "id": "5", "name": "方针政策", "code": "ZAB00", "desc": "政府制订的、宏观的、指导各个领域发展的方针政策",
                },
                {
                    "id": "6", "name": "中共党务", "code": "ZAC00", "desc": "关于中国共产党的规章制度、组织机构建设和发展，以及工作职责等相关信息",
                }
            ]
       }
    ];
    var source =
     {
         dataType: "json",
         dataFields: [
              { name: "id", type: "string" },
              { name: "name", type: "string" },
              { name: "code", type: "string" },
              { name: "children", type: "string" },
              { name: "desc", type: "string" },
         ],
         hierarchy:
         {
             root: "children"
         },
         localData: data,
         id: "id"
     };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
        }
    });
    // create jqxTreeGrid.
    $("#ruleGrid").jqxTreeGrid(
    {
        source: dataAdapter,
        altRows: true,
        sortable: true,
//        hierarchicalCheckboxes: true,
//        checkboxes: true,
        width: "100%",
        ready: function () {
            $("#ruleGrid").jqxTreeGrid('expandRow', '1');
            $("#ruleGrid").jqxTreeGrid('expandRow', '2');
        },
        columns: [
          { text: "序号", align: "center", cellsRenderer: radioRender, dataField: "id", width: "10%" },
          { text: "规则名称", cellsAlign: "center", align: "center", dataField: "name", cellsFormat: "c2", width: "20%" },
          { text: "规则代码", dataField: "code", cellsAlign: "center", align: "center",  width: "15%" },
          { text: "描述", dataField: "desc", cellsAlign: "left", align: "center"},
        ]
    });
}

/*
 * 返回资源信息列表
 */
function backToList() {
//	window.location.href = ctx + "/setCatalogue/resourceList";
	history.go(-1);
}