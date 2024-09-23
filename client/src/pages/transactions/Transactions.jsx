import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./Transactions.css";
import { FiPrinter } from "react-icons/fi";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchedTransactions, setSearchedTransactions] = useState([]);
  const [search, setsearch] = useState("");

  const navigate = useNavigate();
  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transaction/get", {
        method: "GET",
      });
      const data = await res.json();

      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchedTransactions(
      transactions.filter((val) => val.customerName.includes(search))
    );
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="transaction-main-container">
      <h2>Transactions</h2>
      <div className="transaction-second-div">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search....."
            onChange={(e) => setsearch(e.target.value)}
            value={search}
          />
          <button type="submit">
            <CiSearch />
          </button>
        </form>
        <button onClick={() => navigate("/add-sale")}>Add Sale</button>
      </div>
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>INVOICE NO.</th>
              <th>PARTY NAME</th>
              <th>TRANSACTION TYPE</th>
              <th>PAYMENT TYPE</th>
              <th>AMOUNT</th>
              <th>BALANCE DUE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {searchedTransactions.length > 0
              ? transactions &&
                searchedTransactions.map((val, index) => {
                  let grossAmount = 0;

                  let totalTaxableAmount = 0;
                  let totalTaxAmount = 0;
                  let totalDiscount = 0;

                  val.items.forEach((item) => {
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
                  });
                  grossAmount = totalTaxableAmount + totalTaxAmount;
                  return (
                    <tr key={val.invoiceNumber}>
                      <td>{val.invoiceDate}</td>
                      <td>{val.invoiceNumber}</td>
                      <td>{val.customerName}</td>
                      <td>Sale</td>
                      <td>{val.paymentType}</td>
                      <td>
                        {val.check
                          ? Math.floor(grossAmount)
                          : grossAmount.toFixed(3)}
                      </td>
                      <td>
                        {val.check
                          ? Math.floor(grossAmount) - val.receivedAmount
                          : (grossAmount - val.receivedAmount).toFixed(3)}
                      </td>
                      <td>
                        <FiPrinter
                          className="print-invoice"
                          onClick={() =>
                            navigate(`/invoice/${val.invoiceNumber}`)
                          }
                        />
                      </td>
                    </tr>
                  );
                })
              : transactions &&
                transactions.map((val, index) => {
                  let grossAmount = 0;

                  let totalTaxableAmount = 0;
                  let totalTaxAmount = 0;
                  let totalDiscount = 0;
                  val.items.forEach((item) => {
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
                  });
                  grossAmount = totalTaxableAmount + totalTaxAmount;
                  return (
                    <tr key={val.invoiceNumber}>
                      <td>{val.invoiceDate}</td>
                      <td>{val.invoiceNumber}</td>
                      <td>{val.customerName}</td>
                      <td>Sale</td>
                      <td>{val.paymentType}</td>
                      <td>
                        {val.check
                          ? Math.floor(grossAmount)
                          : grossAmount.toFixed(3)}
                      </td>
                      <td>
                        {val.check
                          ? Math.floor(grossAmount) - val.receivedAmount
                          : (grossAmount - val.receivedAmount).toFixed(3)}
                      </td>
                      <td>
                        <FiPrinter
                          className="print-invoice"
                          onClick={() =>
                            navigate(`/invoice/${val.invoiceNumber}`)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
