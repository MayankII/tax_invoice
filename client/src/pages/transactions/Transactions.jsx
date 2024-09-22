import React, { useState } from "react";
import "./Transactions.css";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
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

  useEffect(() => {
    fetchTransactions();
  }, []);
  return <div>Transactions</div>;
};

export default Transactions;
