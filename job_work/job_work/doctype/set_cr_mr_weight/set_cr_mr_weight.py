# Copyright (c) 2024, Sanpra and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from datetime import datetime
from frappe.utils import nowdate, nowtime


class SetCRMRWeight(Document):
	def before_save(self):
		filters = {
			'item_code': self.item_code,
			'customer': self.party_name,
			'posting_date': ['between', [self.from_date, self.to_date]]
		}
		dc = frappe.get_all("Delivery Note", filters=filters)
		for i in dc:
			tot = 0
			doc = frappe.get_doc("Delivery Note", i['name'])
			for itm in doc.items:
				total_weight = itm.qty * self.casting_weight
				tot += total_weight
				# itm.weight_per_unit = self.casting_weight
				# itm.total_weight = itm.qty * self.casting_weight
				# tot += itm.total_weight
				frappe.db.set_value("Delivery Note Item", itm.name, "weight_per_unit", self.casting_weight)
				frappe.db.set_value("Delivery Note Item", itm.name, "total_weight", total_weight)
		
		# Use frappe.db.set_value to update the total_net_weight
		frappe.db.set_value("Delivery Note", doc.name, "total_net_weight", tot)
			# doc.total_net_weight = tot
			# doc.save()
   
#    frappe.db.set_value("Delivery Note",j.cn,"custom_flag", 0)