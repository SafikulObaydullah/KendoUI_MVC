$(document).ready(function () {

});
var ComboBoxWork = {
   PopulateComboBox: function () {
      $("#cmbEmployee").kendoComboBox({
         dataTextField: "Name",
         dataValueField: "Id",
         dataSource: []
      });
   }
}