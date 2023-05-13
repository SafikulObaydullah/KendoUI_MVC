$(document).ready(function () {


    $("#kendoVersion").text(kendo.version);
    $("#datepicker").kendoDatePicker({
        dateInput: true,
        format: "MM/dd/yyyy",
        parseFormats: ["MM/dd/yyyy"]
    });
    $("#datepicker").bind("focus", function () {
        $(this).data("kendoDatePicker").open();
    });
    $("#monthpicker").kendoDatePicker({
        
        start: "year",

        depth: "year",
        format: "MMMM yyyy",
        dateInput: true
    });


    $("#fabric").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Cotton", value: "1" },
            { text: "Polyester", value: "2" },
            { text: "Cotton/Polyester", value: "3" },
            { text: "Rib Knit", value: "4" }
        ],

        filter: "contains",
        suggest: true,
        index: 3
    });

    // create ComboBox from select HTML element
    $("#size").kendoComboBox();

    var fabric = $("#fabric").data("kendoComboBox");
    var select = $("#size").data("kendoComboBox");


    $("#get").click(function () {
        alert('Thank you! Your Choice is:\n\nFabric ID: ' + fabric.value() + ' and Size: ' + select.value());
    });
});