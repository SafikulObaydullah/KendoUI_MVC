let form = document.getElementById("form");
let BillReference = document.getElementById("BillReference");
let remarks = document.getElementById("remarks");
let adjustamount = document.getElementById("adjustamount");
let netpayable = document.getElementById("netpayable");
let adjustnote = document.getElementById("adjustnote");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
var company;
//function getDropdownValues() {
//    // Get the select element
//    var dropdown = document.getElementById("dropdown");

//    // Get the selected option value
//    var selectedValue = dropdown.value;

//    // Display the selected value
//    alert(selectedValue);
//}

//function getDropdownValue() {
//    // Get the select element
//    //var dropdown = document.getElementById("dropdown");
//    var dropdown = document.getElementById("company");

//    // Get the selected option value
//    var selectedValue = dropdown.value;
//    company = selectedValue
//    console.log(company)
//}
//var com = document.getElementById("company");
//com.addEventListener("change", updateDropdownOptions);
//console.log(com.value);
//com.addEventListener("")
//company.addEventListener("change", updateDropdownOptions);

//function updateDropdownOptions() {
//    var selectedValue = company.value;
//    var options = company.getElementsByTagName("option");

//    for (var i = 0; i < options.length; i++) {
//        var option = options[i];
//        if (option.value === selectedValue) {
//            /*option.style.display = "block";*/
//        } else {
//            /*option.style.display = "none";*/
//        }
//    }
//}
//console.log(company);

        //var update = document.getElementById('company');
        //if (update) {
        //    update.addEventListener('submit', function () {

        //        fetch('quotes', {
        //            method: 'put',
        //            headers: { 'Content-Type': 'application/json' },
        //            body: JSON.stringify({
        //                'name': 'Muskan',
        //                'quote': 'I find your lack of faith disturbing.'
        //            })
        //        })
        //            .then(res => {
        //                if (res.ok) return res.json()
        //            })
        //            .then(data => {
        //                console.log(data);
        //                window.location.reload(true);
        //            })
        //    })
        //}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (BillReference.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        //msg.innerHTML = "";
        acceptData();
        /*add.setAttribute("data-bs-dismiss", "modal");*/
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

let data = [{}];

let acceptData = () => {
    data.push({
        //company: company.value,
        BillReference: BillReference.value,
        remarks: remarks.value,
        adjustamount: adjustamount.value,
        netpayable: netpayable.value,
        adjustnote: adjustnote.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    loadData();
    createTasks();
};
let loadData = () => {
    var table = document.getElementById("myTable");
    tasks.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow();
        var BillReference = row.insertCell(0);
        var remarks = row.insertCell(1);
        var adjustamount = row.insertCell(2);
        var NetPayable = row.insertCell(3);
        var adjustnote = row.insertCell(4);
        var action = row.insertCell(5);
        BillReference.innerHTML = data[i].BillReference;
        remarks.innerHTML = data[i].remarks;
        adjustamount.innerHTML = data[i].adjustamount;
        NetPayable.innerHTML = data[i].netpayable;
        adjustnote.innerHTML = data[i].adjustnote;
        action.innerHTML += `<div><i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i></div>`;

    }
}
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
    <div id=${y}>
         <table>
         <tr>
         <th>Company</th>
         <th>Bill Reference</th>
         <th>Remarks</th>
         <th>Adjust Amount</th>
         <th>AdjustNote</th>
         <th>Action</th>
         </tr>
         <tr>
         <td>${x.BillReference}</td>
         <td>${x.remarks}</td>
         <td>${x.adjustamount}</td>
         <td>${x.netpayable}</td>
         <td>${x.adjustnote}</td>
         <td><i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
         </td >
         </tr>
         </table>
        </div>
    `);
    });
loadData();
    resetForm();
};//<td>${x.company}</td>

//let createTasks = () => {
//    tasks.innerHTML = "";
//    loadData();

//    resetForm();
//};
//<td>${x.company}</td>

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};
let resetForm = () => {
    company.value = "";
    BillReference.value = "";
    remarks.value = "";
    adjustamount.value = "";
    netpayable.value = "";
    adjustnote.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
})();