import express from "express";
import {
  createTransaction,
  getTransaction,
  getTransactions,
} from "../controllers/transactionController.js";
const router = express.Router();

router.post("/create", createTransaction);
router.get("/get", getTransactions);
router.get("/:invoiceNumber", getTransaction);
export default router;
