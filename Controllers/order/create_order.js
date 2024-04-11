const order = require("../../Models/order");
const cart = require("../../Models/cart");
const sendEmail = require("../../middlewares/emailconfig");
const website_info = require("../../Models/website_info");

const createorder = async (req, res) => {
  try {
    const {
      shipping_first_name,
      shipping_last_name,
      shipping_address1,
      shipping_address2,
      shipping_country,
      shipping_state,
      shipping_city,
      shipping_pincode,
      shipping_mobile,
      shipping_email,
      total_amount,
      payment_method,
      payment_status,
      payment_key,
      shipping_charges,
    } = req.body;

    const user_id = req.user.id;
    const countorder = await order.countDocuments();
    const countcount = await cart.countDocuments({
      user_id,
      orderstatus: "add to cart",
    });
    const orderid = `ORDXXXXX00${countorder}`;
    let savedOrder;
    const ordernow = new order({
      orderid,
      user_id,
      shipping_first_name,
      shipping_last_name,
      shipping_address1,
      shipping_address2,
      shipping_country,
      shipping_state,
      shipping_city,
      shipping_pincode,
      shipping_mobile,
      shipping_email,
      grand_total_amount: total_amount,
      sub_total_amount: total_amount,
      payment_method,
      payment_status,
      payment_key,
      shipping_charges,
    });
    if (countcount > 0) {
      // Save the order first
      savedOrder = await ordernow.save();
    }
    // Update cart items
    const updatedCart = await cart.updateMany(
      { user_id, orderstatus: "add to cart" },
      { $set: { orderstatus: "confirmed", orderid } }
    );
    const websiteinfo = await website_info.find();
    const existingCartItem = await cart.find({orderid: savedOrder.orderid}).populate('product_variant_id', 'product_name product_image1 description selling_price mrp_price weight weighttype').populate('product_id', 'product_name product_image1 description selling_price mrp_price weight weighttype');    

const emailHtml = `<div class="row">
<div class="col-xs-12">
    <div class="container-fluid">
        <table width="99%" border="0" align="center" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; border: 1px solid #eee;">
            <tbody>
                <tr>
                    <td style="border-bottom: 1px solid #eee; height: 24px; font-size: 14px;" align="center"><strong>TAX INVOICE</strong></td>
                </tr>
                <tr>
                    <td width="50%" valign="top" style="border-bottom: 1px solid #eee; padding: 8px; line-height: 20px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="49%"><strong>Company Name :</strong> ${websiteinfo[0].website_name}<br>
                                        <strong>Address:</strong> Rz-453T-block Dharampura New Delhi - 110043<br>
                                        <strong>Phone no.: </strong>+91${websiteinfo[0].mobile_no}<br>
                                        <strong>Email: </strong>${websiteinfo[0].email}<br>
                                        <strong>GSTIN:</strong> 393idkei39ei39993
                                    </td>
                                    <td width="51%" align="right"><img src="https://demo-ecomus-global.myshopify.com/cdn/shop/files/Ecomus.svg?v=1699583364&width=272" alt="Company Logo" style="width: 150px;"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="50%" height="24" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; padding: 8px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>SHIPPING ADDRESS</strong></td>
                                    <td width="50%" align="right" style="border-bottom: 1px solid #eee; padding: 8px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>Invoice No.: ${savedOrder.orderid}</strong></td>
                                </tr>
                                <tr>
                                    <td width="50%" valign="top" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; padding: 8px; line-height: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
                                        <p>
                                            <strong>Name:</strong> ${savedOrder.shipping_first_name}&nbsp;${savedOrder.shipping_last_name}<br>
                                            <strong>Address:</strong> ${savedOrder.shipping_address1},${savedOrder.shipping_address2},${savedOrder.shipping_city},${savedOrder.shipping_state},${savedOrder.shipping_country}-${savedOrder.shipping_pincode}<br>
                                            <strong>Phone no.: </strong>${savedOrder.shipping_mobile}<br>
                                            <strong>Email: </strong>${savedOrder.shipping_email}
                                        </p>
                                    </td>
                                    <td width="50%" align="right" valign="top" style="border-bottom: 1px solid #eee; padding: 8px; line-height: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
                                        <p><strong>Date: ${savedOrder.order_date}</strong></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="border-bottom: 1px solid #eee; border-right: 1px solid #eee;">
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="5%" height="24" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>S.NO.</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 12px;" width="29%" align="center"><strong>PRODUCT DESCRIPTION</strong></td>
                                    <td width="12%" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;"><strong>HSN/ SAC</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="15%" align="center"><strong>Qty</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="15%" align="center"><strong>Price Per Product</strong></td>
                                    <td style="border-bottom: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="12%" align="center"><strong>Total Price</strong></td>
                                </tr>
                                ${existingCartItem.map((rescart, index) => (
                                  `<tr>
                                  <td width="5%" height="24" align="center" style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }}>&nbsp;${index + 1}</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="29%" align="center">&nbsp;${rescart.product_name}</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="15%" align="center">&nbsp;HSN</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="15%" align="center">&nbsp;${rescart.product_qty}</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="12%" align="center">&nbsp;${rescart.product_id == null ? rescart.product_variant_id.selling_price : rescart.product_id.selling_price}</td>
                                  <td style={{ borderBottom: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="12%" align="center">&nbsp;${rescart.product_id == null ? rescart.product_variant_id.selling_price * rescart.product_qty : rescart.product_id.selling_price * rescart.product_qty}</td>
                                </tr>`
                                ))}
                                <tr>
                                    <td colspan="3" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold;">Total</td>
                                    <td colspan="3" style="border-bottom: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; background: #CCC; font-size: 14px; font-weight: bold;" width="15%" align="center">${savedOrder.sub_total_amount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="20%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Sub Total :</strong> ${savedOrder.sub_total_amount} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr style="border-top: 1px solid #eee;">
                                    <td width="20%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Shipping Charges :</strong>  ${savedOrder.shipping_charges} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr style="border-top: 1px solid #eee;">
                                    <td width="20%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Grand Total :</strong> ${savedOrder.sub_total_amount} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
`;



    sendEmail(shipping_email,"Order Confirmation","Order Details With Invoice",emailHtml)
    res.send({ status: "successfully", order: savedOrder, updatedCart });
  } catch (err) {
    console.log(`Here is error: ${err}`);
    res.send({ status: "failed", errors: err });
  }
};

module.exports = createorder;
