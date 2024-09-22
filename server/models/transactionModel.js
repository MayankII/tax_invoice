import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: Number,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: String,
      required: true,
    },
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    items: [
      {
        itemName: {
          type: String,
          required: true,
        },
        itemQuantity: {
          type: Number,
          required: true,
        },
        itemUnit: {
          type: String,
          required: true,
        },
        itemPrice: {
          type: Number,
          required: true,
        },
        itemDiscountPercent: {
          type: Number,
          required: true,
        },

        itemTaxPercent: {
          type: Number,
          required: true,
        },
      },
    ],
    receivedAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
