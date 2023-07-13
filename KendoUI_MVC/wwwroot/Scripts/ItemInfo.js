$(document).ready(function () {
   ItemInfoHelper.GenerateItemInfoGrid();
   $("#btnSaveItemInfo").click(function () {
      ItemInfoManager.SaveItemInfo();
   });
});

var ItemInfoManager = {
   SaveItemInfo: function () {
      var itemObj = ItemInfoHelper.CreateItemList();
      var jsonParam = "objItemList:" + JSON.stringify(itemObj);
      var serviceUrl = "../ItemInformation/SaveItemInfo/";
      ItemInfoManager.PostJson(serviceUrl, jsonParam, onSuccess, onFailed);
      function onSuccess(jsonData) {
         if (jsonData == "Success") {
            alert("Save Success");
         }
      }
      function onFailed(error) {
         alert("error");
      }
   },
   PostJson: function (serviceUrl, jsonParams, successCallback, errorCallback) {
      jQuery.ajax({
         url: serviceUrl,
         async: false,
         type: "POST",
         data: "{" + jsonParams + "}",
         dataType: "json",
         contentType: "application/json; charset=utf=8",
         success: successCallback,
         error: errorCallback
      });
   }
};
var ItemInfoHelper = {
   GenerateItemInfoGrid: function () {
      $("#grdItemInfo").kendoGrid({
         dataSource: ItemInfoManager.gridDataSource(),
         pageable: false,
         editable: {
            createAt: "bottom",
            mode: "incell"
         },
         toolbar: [{ name: "create",text:"Add New" }],
         filterable: false,
         sortable: false,
         column: ItemInfoHelper.GenerateItemColumn(),
         navigatable: true,
         selectable:"row"
      });
   },
   GenerateItemColumn: function () {
      return columns = [
         { field: "Id", hidden: true },
         { field: "items", title: "Item",width:100, editor: ItemInfoHelper.ItemDropDownEditor, template: "#=items.ItemName#" },
         { field: "Qnty", title: "Qnty",width:50 },
         { field: "Rate", title: "Rate", width: 50 },
         { field: "Amount", title: "Amount", width: 50 }
      ];
   },
   ItemDropDownEditor: function (container, options) {
      $('<input required data-text-field="ItemName" data-value-field="ItemId" data-bind="value:' + options.field + '"/>')
         .appendTo(container)
         .kendoDropDownList({
            autoBind: false,
            optionLabel: '--Select--',
            dataSource: [
               { ItemId: 1, ItemName: "Item-1" },
               { ItemId: 2, ItemName: "Item-2" },
               { ItemId: 3, ItemName: "Item-3" }
            ],
            placeholder: "Please Select"
         });
   },
   CreateItemList: function () {
      var gridData = $("grdItemInfo").data("kendoGrid").dataSource.data();
      return gridData;
   }
};