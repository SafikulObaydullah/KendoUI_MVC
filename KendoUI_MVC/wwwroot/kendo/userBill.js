/*document.getElementById("Company").value = "0";*/

//var coll = document.getElementsByClassName("collapsible");
//var i;

//for (i = 0; i < coll.length; i++) {
//    coll[i].addEventListener("click", function () {
//        this.classList.toggle("active");
//        var content = this.nextElementSibling;
//        if (content.style.display === "block") {
//            content.style.display = "none";
//        } else {
//            content.style.display = "block";
//        }
//    });
//}


let suppliers = []; // array to store employee data

function create() {
    let Company = document.getElementById("Company").value;
    let Supplier = document.getElementById("Supplier").value;
    let paymentMode = document.getElementById("paymentMode").value;
    let Currency = document.getElementById("Currency").value;
    let BillReference = document.getElementById("BillReference").value;
    let Remarks = document.getElementById("Remarks").value;
    let AdjustAmount = document.getElementById("AdjustAmount").value;
    let Netpayable = document.getElementById("Netpayable").value;
    let AdjustNote = document.getElementById("AdjustNote").value;

    // create employee object
    let supplier = {
        Company: Company,
        Supplier: Supplier,
        paymentMode: paymentMode,
        Currency: Currency,
        BillReference: BillReference,
        Remarks: Remarks,
        AdjustAmount: AdjustAmount,
        Netpayable: Netpayable,
        AdjustNote: AdjustNote
    };

    // add employee object to array
    suppliers.push(supplier);
    console.log(suppliers);
    // display success message
    document.getElementById("output").innerHTML = "<p>Suppliers Info added successfully!</p>";
    read();
}

function read() {
    let output = "<table><tr><th>Company</th><th>Supplier</th><th>paymentMode</th><th>Currency</th><th>Bill Reference</th><th>Remarks</th><th>AdjustAmount</th><th>Netpayable</th><th>AdjustNote</th></tr>";

    // loop through array and display employee data
    for (let i = 0; i < suppliers.length; i++) {
        output += "<tr><td>" + suppliers[i].Company + "</td><td>" + suppliers[i].Supplier + "</td><td>" + suppliers[i].paymentMode + "</td><td>" + suppliers[i].Currency + "</td><td>" + suppliers[i].BillReference + "</td><td>" + suppliers[i].Remarks + "</td><td>" + suppliers[i].AdjustAmount + "</td><td>" + suppliers[i].Netpayable + "</td><td>" + suppliers[i].AdjustNote + "</td></tr>";
    }

    output += "</table>";

    // display employee data
   /* document.getElementById("output").innerHTML = output;*/
}
let resetForm = () => {
    Company.value = "";
    Supplier.value = "";
    paymentMode.value = "";
    Currency.value = "";
    BillReference.value = "";
    Remarks.value = "";
    AdjustAmount.value = "";
    Netpayable.value = "";
    AdjustNote.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("suppliers")) || []
    console.log(suppliers);
    read()();
})();