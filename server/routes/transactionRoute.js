import express from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionController.js";
const router = express.Router();

router.post("/create", createTransaction);
router.get("/get", getTransactions);
export default router;
