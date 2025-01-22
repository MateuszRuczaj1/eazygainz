import Training from "./models/TrainingModel.js";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import trainingRoutes from "./routes/trainingRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Połączono z bazą danych"))
  .catch((error) => console.log("Wystąpił błąd ", error));
app.get("/home", (req, res) => {
  res.send("Hello");
});
app.use("/api/getTrainings", trainingRoutes);
app.listen(port, (req, res) => {
  console.log(`Backend listening at port ${port}`);
});
