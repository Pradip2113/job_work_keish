// Copyright (c) 2024, unitech and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Emp Machine Job", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("Machine Job item", "job_qty", function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
     if(d.rate >= 0 && d.job_qty >= 0){
        var result = ((d.rate * d.job_qty)).toFixed(2);
        frappe.model.set_value(cdt, cdn, 'amount', result);
    }
});
frappe.ui.form.on("Machine Job item", "rate", function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
     if(d.rate >= 0 && d.job_qty >= 0){
        var result = ((d.rate * d.job_qty)).toFixed(2);
        frappe.model.set_value(cdt, cdn, 'amount', result);
    }
});


