import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDb;
