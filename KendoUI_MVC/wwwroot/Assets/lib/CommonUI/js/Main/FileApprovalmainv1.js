$(document).ready(function () {           
            $(".KendotextButton").kendoButton();
            loadTextbox();
            loadDropdown();

    $("#editor").kendoEditor({
        tools: [
            "bold",
            "italic",
            "underline",
            "undo",
            "redo",
            "strikethrough",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull",
            "insertUnorderedList",
            "insertOrderedList",
            "insertUpperRomanList",
            "insertLowerRomanList",
            "indent",
            "outdent",
            "createLink",
            "unlink",
            "insertImage",
            "insertFile",
            "subscript",
            "superscript",
            "tableWizard",
            "createTable",
            "addRowAbove",
            "addRowBelow",
            "addColumnLeft",
            "addColumnRight",
            "deleteRow",
            "deleteColumn",
            "mergeCellsHorizontally",
            "mergeCellsVertically",
            "splitCellHorizontally",
            "splitCellVertically",
            "tableAlignLeft",
            "tableAlignCenter",
            "tableAlignRight",
            "viewHtml",
            "formatting",
            "cleanFormatting",
            "copyFormat",
            "applyFormat",
            "fontName",
            "fontSize",
            "foreColor",
            "backColor",
            "print"
        ],

    });
    
});


function loadDropdown() {
    $(".Kdropdown").kendoDropDownList({
        placeholder: "No Data..."
    });
}

function loadTextbox() {
    $(".textbox").kendoTextBox({});
    $(".Kdatepicker").kendoDatePicker();
    $("#files").kendoUpload({
        async: {
            autoUpload: true,
            batch: true
        },
        select: onSelect,
        validation: {
            //allowedExtensions: [".gif", ".jpg", ".png", ".pdf",".xlxs"],
            maxFileSize: 4194304
        }
    });
}
function onSelect(e) {
    $("#fileDetails").html(files.files[0].name);
    //$("#txtDescription").val(getFileInfo(e));
}
