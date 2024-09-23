import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./Transactions.css";
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
  const calculateAmount = (
    itemPrice,
    itemQuantity,
    itemDiscountPercent,
    itemTaxPercent,
    check
  ) => {
    const discount = (itemDiscountPercent * itemPrice) / 100;
    const tax = (itemTaxPercent * itemPrice) / 100;
    let finalAmount = itemPrice + tax - discount;
    finalAmount = finalAmount * itemQuantity;
    finalAmount = check ? Math.floor(finalAmount) : finalAmount;
    return finalAmount;
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
                  let isCheck = val.check;
                  val.items.forEach((val) => {
                    grossAmount += calculateAmount(
                      val.itemPrice,
                      val.itemQuantity,
                      val.itemDiscountPercent,
                      val.itemTaxPercent,
                      isCheck
                    );
                  });
                  return (
                    <tr key={val.invoiceNumber}>
                      <td>{val.invoiceDate}</td>
                      <td>{val.invoiceNumber}</td>
                      <td>{val.customerName}</td>
                      <td>Sale</td>
                      <td>{val.paymentType}</td>
                      <td>
                        {val.check ? grossAmount : grossAmount.toFixed(3)}
                      </td>
                      <td>
                        {val.check
                          ? grossAmount - val.receivedAmount
                          : (grossAmount - val.receivedAmount).toFixed(3)}
                      </td>
                      <td>act</td>
                    </tr>
                  );
                })
              : transactions &&
                transactions.map((val, index) => {
                  let grossAmount = 0;
                  let isCheck = val.check;
                  val.items.forEach((val) => {
                    grossAmount += calculateAmount(
                      val.itemPrice,
                      val.itemQuantity,
                      val.itemDiscountPercent,
                      val.itemTaxPercent,
                      isCheck
                    );
                  });
                  return (
                    <tr key={val.invoiceNumber}>
                      <td>{val.invoiceDate}</td>
                      <td>{val.invoiceNumber}</td>
                      <td>{val.customerName}</td>
                      <td>Sale</td>
                      <td>{val.paymentType}</td>
                      <td>
                        {val.check ? grossAmount : grossAmount.toFixed(3)}
                      </td>
                      <td>
                        {val.check
                          ? grossAmount - val.receivedAmount
                          : (grossAmount - val.receivedAmount).toFixed(3)}
                      </td>
                      <td>act</td>
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
