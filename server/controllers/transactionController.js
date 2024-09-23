import Transaction from "../models/transactionModel.js";

export const createTransaction = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerAddress,
      invoiceDate,
      invoiceNumber,
      paymentType,
      items,
      receivedAmount,
      check,
    } = req.body;
    if (
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !invoiceDate ||
      !invoiceNumber ||
      !paymentType ||
      !items ||
      !receivedAmount
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All data is required" });
    }
    const findbyinvoice = await Transaction.findOne({ invoiceNumber });
    if (findbyinvoice) {
      return res
        .status(400)
        .json({ success: false, message: "Invoice number Already Exists" });
    }
    const transaction = new Transaction({
      customerName,
      customerPhone,
      customerAddress,
      invoiceDate,
      invoiceNumber,
      paymentType,
      items,
      receivedAmount,
      check,
    });
    await transaction.save();
    res
      .status(201)
      .json({ success: true, message: "Invoice created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (transactions) {
      res.status(200).json({ success: true, transactions });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const getTransaction = async (req, res) => {
  const { invoiceNumber } = req.params;
  if (!invoiceNumber || invoiceNumber === "") {
    return res
      .status(400)
      .json({ success: false, message: "Invoice Number was not provided" });
  }
  try {
    const transaction = await Transaction.findOne({ invoiceNumber });
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "No transaction found" });
    }
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
