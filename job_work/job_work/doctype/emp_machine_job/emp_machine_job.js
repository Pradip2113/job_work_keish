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


frappe.ui.form.on('Emp Machine Job', {
    before_save:function(frm, cdt, cdn){
    var d = locals[cdt][cdn];
    var total1 = 0;
    frm.doc.machine_job_item.forEach(function(d) { total1 += d.job_qty; });
    frm.set_value("total_job", total1);
    refresh_field("total_job");
  },
    machine_job_item_remove:function(frm, cdt, cdn){
    var d = locals[cdt][cdn];
    var total1 = 0;
    frm.doc.machine_job_item.forEach(function(d) { total1 += d.job_qty; });
    frm.set_value("total_job", total1);
    refresh_field("total_job");
    },
    machine_job_item_add:function(frm, cdt, cdn){
        var d = locals[cdt][cdn];
        var total1 = 0;
        frm.doc.machine_job_item.forEach(function(d) { total1 += d.job_qty; });
        frm.set_value("total_job", total1);
        refresh_field("total_job");
        }
    });

