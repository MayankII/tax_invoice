import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddSale from "./pages/addSale/AddSale.jsx";
import Transactions from "./pages/transactions/Transactions.jsx";
import { Toaster } from "react-hot-toast";
import Invoice from "./pages/invoice/Invoice.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Transactions />} />

        <Route path="/add-sale" element={<AddSale />} />
        <Route path="/invoice/:invoiceNumber" element={<Invoice />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};
export default App;
