import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Invoice.css";
import { useParams } from "react-router-dom";
import converter from "number-to-words";
const Invoice = () => {
  const { invoiceNumber } = useParams();
  const [invoiceData, setInvoiceData] = useState();
  let totalTaxableAmount = 0;
  let totalTaxAmount = 0;
  let totalDiscount = 0;
  let totalQuantity = 0;
  const fetchInvoice = async () => {
    try {
      const res = await fetch(`/api/transaction/${invoiceNumber}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success) {
        setInvoiceData(data.transaction);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchInvoice();
  }, []);
  return (
    <>
      <div>
        <button onClick={() => window.print()} className="print-full-invoice">
          Print
        </button>
      </div>
      {invoiceData && (
        <div className="invoice-main-container">
          <div className="invoice-heading">
            <span>Tax Invoice</span>
          </div>
          <div className="customer-invoice-details-heading-div">
            <div className="customer-details-heading">
              <span>Bill to</span>
            </div>
            <div className="invoice-details-heading">
              <span>Invoice Details</span>
            </div>
          </div>
          <div className="customer-invoice-details-div">
            <div className="customer-details-div">
              <div className="customer-name">{invoiceData.customerName}</div>
              <div>{invoiceData.customerAddress}</div>
              <div>Contact No. : {invoiceData.customerPhone}</div>
            </div>
            <div className="invoice-details-div">
              <div>Invoice No. : {invoiceData.invoiceNumber}</div>

              <div>Date : {invoiceData.invoiceDate}</div>
            </div>
          </div>
          <table>
            <thead className="invoice-thead">
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price/Unit</th>
                <th>Discount</th>
                <th>Taxable Amount</th>
                <th>GST</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items &&
                invoiceData.items.map((item, index) => {
                  totalTaxableAmount +=
                    (item.itemPrice -
                      (item.itemDiscountPercent * item.itemPrice) / 100) *
                    item.itemQuantity;

                  totalTaxAmount +=
                    ((item.itemTaxPercent *
                      (
                        item.itemPrice -
                        (item.itemDiscountPercent * item.itemPrice) / 100
                      ).toFixed(3)) /
                      100) *
                    item.itemQuantity;

                  totalDiscount +=
                    ((item.itemDiscountPercent * item.itemPrice) / 100) *
                    item.itemQuantity;

                  totalQuantity += item.itemQuantity;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.itemName}</td>
                      <td>{item.itemQuantity}</td>
                      <td>{item.itemUnit}</td>
                      <td>₹ {item.itemPrice}</td>
                      <td>
                        ₹ {(item.itemDiscountPercent * item.itemPrice) / 100}
                      </td>
                      <td>
                        {" "}
                        ₹
                        {(
                          item.itemPrice -
                          (item.itemDiscountPercent * item.itemPrice) / 100
                        ).toFixed(3)}
                      </td>
                      <td>
                        ₹{" "}
                        {(
                          (item.itemTaxPercent *
                            (
                              item.itemPrice -
                              (item.itemDiscountPercent * item.itemPrice) / 100
                            ).toFixed(3)) /
                          100
                        ).toFixed(3)}
                      </td>
                      <td>
                        ₹
                        {(item.itemTaxPercent *
                          (
                            item.itemPrice -
                            (item.itemDiscountPercent * item.itemPrice) / 100
                          ).toFixed(3)) /
                          100 +
                          (item.itemPrice -
                            (item.itemDiscountPercent * item.itemPrice) / 100)}
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td></td>
                <td>Total</td>
                <td>{totalQuantity}</td>
                <td></td>
                <td></td>
                <td>₹ {totalDiscount.toFixed(2)}</td>
                <td>₹ {totalTaxableAmount.toFixed(2)} </td>
                <td>₹ {totalTaxAmount.toFixed(2)}</td>
                <td>₹ {(totalTaxableAmount + totalTaxAmount).toFixed(3)}</td>
              </tr>
            </tbody>
          </table>
          <div className="invoice-third-div">
            <table>
              <thead className="invoice-thead">
                <tr>
                  <th>Tax type</th>
                  <th>Taxable Amount</th>

                  <th>Tax Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> GST</td>
                  <td> ₹ {totalTaxableAmount.toFixed(3)}</td>

                  <td> ₹ {totalTaxAmount.toFixed(3)}</td>
                </tr>
              </tbody>
            </table>
            <div className="invoice-third-right-div">
              <div className="invoice-third-right-div-heading">Accounts</div>
              <div className="invoice-third-right-div-data">
                <div>Sub Total</div>
                <div> ₹ {(totalTaxableAmount + totalTaxAmount).toFixed(3)}</div>
              </div>
              <div className="invoice-third-right-div-data">
                <div>Round-off</div>
                <div>
                  ₹{" "}
                  {(
                    (totalTaxableAmount + totalTaxAmount).toFixed(3) -
                    Math.floor((totalTaxableAmount + totalTaxAmount).toFixed(3))
                  ).toFixed(3)}
                </div>
              </div>
              <div className="invoice-third-right-div-data invoice-third-right-div-data-total ">
                <div>Total</div>
                <div>
                  ₹ {Math.floor(totalTaxableAmount + totalTaxAmount).toFixed(2)}
                </div>
              </div>
              <div className="invoice-third-right-div-data">
                <div>Received</div>
                <div> ₹ {invoiceData.receivedAmount.toFixed(2)}</div>
              </div>

              <div className="invoice-third-right-div-data invoice-third-right-div-data-total ">
                <div>Balance</div>
                <div>
                  ₹{" "}
                  {(
                    Math.floor(totalTaxableAmount + totalTaxAmount).toFixed(2) -
                    invoiceData.receivedAmount
                  ).toFixed(2)}
                </div>
              </div>
              <div className="invoice-third-right-div-data">
                <div>You Saved</div>
                <div>
                  {" "}
                  ₹{" "}
                  {(
                    totalDiscount +
                    ((totalTaxableAmount + totalTaxAmount).toFixed(3) -
                      Math.floor(
                        (totalTaxableAmount + totalTaxAmount).toFixed(3)
                      ))
                  ).toFixed(3)}
                </div>
              </div>
            </div>
          </div>
          <div className="invoice-fourth-div">
            <div className="invoice-fourth-div-left">
              <div className="invoice-fourth-div-left-heading">
                Invoice Amount In Words
              </div>
              <div>
                {converter.toWords(
                  Math.floor(totalTaxableAmount + totalTaxAmount).toFixed(2)
                )}{" "}
                Rupees Only
              </div>
            </div>
            <div></div>
          </div>
          <div className="invoice-last-div">
            <div className="invoice-last-div-left">
              <div className="invoice-last-div-left-heading">
                Terms and Conditions
              </div>
              <div className="invoice-last-div-left-content">
                Thanks for doing business with us.
              </div>
            </div>
            <div className="invoice-last-div-right">
              <p>For : My Company</p>
              <h4>Authorized Signatory</h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
