import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import transactionRouter from "./routes/transactionRoute.js";
import cors from "cors";
const app = express();

dotenv.config();
const port = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/transaction", transactionRouter);

app.listen(port, () => {
  connectDb();
  console.log(`server is running on port ${port}`);
});
