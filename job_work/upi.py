import frappe
import pyqrcode
import io
import base64 
import qrcode

def qrgen(doc, method):
    amount=doc.rounded_total
    company=doc.company
    data = frappe.db.sql("""select custom_upi_id from `tabCompany` where company_name=%s""", company)
    upi=f"upi://pay?pa={data[0][0]}&am={amount}"
    qr = pyqrcode.create(upi)
    
    qr_code_data=generate_qr_code(upi)
    doc.set('custom_upi_qr',f"data:image/png;base64,{qr_code_data}")
    
    
def generate_qr_code(data):
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L)
    qr.add_data(data)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")
    img_buffer = io.BytesIO()
    qr_img.save(img_buffer, format="PNG")
    base64_data = img_buffer.getvalue()
    base64_string = base64.b64encode(base64_data).decode("utf-8")
    return base64_string