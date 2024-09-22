import React, { useEffect, useState } from "react";
import "./AddSale.css";
import AddItem from "./AddItem.jsx";
const AddSale = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [roundoff, setRoundoff] = useState(0);
  const [balance, setBalance] = useState(0);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    invoiceNumber: "",
    invoiceDate: "",
    items: [],
    paymentType: "cash",
    receivedAmount: "",
  });
  const [addRow, setAddRow] = useState([1, 2]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transaction/get", {
        method: "GET",
      });
      const data = await res.json();

      if (data.success) {
        setData((prev) => ({
          ...prev,
          invoiceNumber: data.transactions.length + 1,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  let itemsArray = [];
  const pushItemData = (itemdata) => {
    itemsArray.push(itemdata);
  };
  const deleteItem = (itemName) => {
    const result = itemsArray.filter((val) => val.itemName !== itemName);
    itemsArray = result;
  };
  const addTotalAmount = (amount) => {
    setTotalAmount(totalAmount + amount);
  };
  const removeTotalAmount = (amount) => {
    setTotalAmount(totalAmount - amount);
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <form className="add-sale-main-container">
      <div className="add-sale-header-div">
        <h2>Sale</h2>
      </div>
      <div className="add-sale-first-div">
        <div className="add-sale-first-left-div">
          <div className="add-sale-first-left-top-div">
            <input
              type="text"
              name="customerName"
              placeholder="Customer"
              value={data.customerName}
              onChange={handleChange}
            />
            <input
              type="number"
              name="customerPhone"
              placeholder="Phone Number"
              value={data.customerPhone}
              onChange={handleChange}
            />
          </div>
          <div className="add-sale-first-left-bottom-div">
            <textarea
              rows="5"
              cols="20"
              name="customerAddress"
              value={data.customerAddress}
              onChange={handleChange}
              placeholder="Billing Address"
            />
          </div>
        </div>
        <div className="add-sale-first-right-div">
          <input
            type="number"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={data.invoiceNumber}
            onChange={handleChange}
          />
          <input
            type="date"
            name="invoiceDate"
            onChange={handleChange}
            value={data.invoiceDate}
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan={5}></th>
              <th>PRICE/UNIT</th>
              <th colSpan={2}>DISCOUNT</th>
              <th colSpan={2}>Tax</th>
            </tr>
            <tr>
              <th>S.No.</th>
              <th>Action</th>
              <th>ITEM</th>
              <th>QTY</th>
              <th>UNIT</th>
              <th>without tax</th>

              <th>%</th>
              <th>Amount</th>

              <th>%</th>
              <th>Amount</th>

              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {addRow.map((val, index) => (
              <AddItem
                key={index}
                serial={val}
                pushItemData={pushItemData}
                deleteItem={deleteItem}
                removeTotalAmount={removeTotalAmount}
                addTotalAmount={addTotalAmount}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() =>
          setAddRow((prev) => [...prev, addRow[addRow.length - 1] + 1])
        }
        className="add-row-button"
      >
        Add Row
      </button>
      <div className="add-sale-last-row">
        <div className="add-sale-last-row-left">
          <select
            name="paymentType"
            value={data.paymentType}
            onChange={handleChange}
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
        <div className="add-sale-last-row-right">
          <div className="add-sale-last-row-right-top">
            <div className="round-off">
              <input
                type="checkbox"
                checked={check}
                value={check}
                onChange={() => {
                  setCheck(!check);
                  setRoundoff(totalAmount - Math.floor(totalAmount));
                }}
              />
              <span>Round off </span>
              <input
                type="number"
                value={roundoff}
                onChange={(e) => setRoundoff(e.target.value)}
              />
            </div>
            <div>
              <span>Total </span>
              <input
                type="number"
                value={check ? Math.floor(totalAmount) : totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="received-balance-div">
            <div>
              <span>Received </span>
              <input
                name="receivedAmount"
                value={data.receivedAmount}
                onChange={handleChange}
                type="number"
              />
            </div>
            <div>
              <span>Balance </span>
              <input
                type="number"
                onChange={(e) => setBalance(e.target.value)}
                value={
                  totalAmount && data.receivedAmount
                    ? check
                      ? Math.floor(totalAmount) - data.receivedAmount
                      : totalAmount - data.receivedAmount
                    : balance
                }
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddSale;
