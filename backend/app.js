import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import trainingRoutes from "./routes/trainingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exercisesRoutes.js";
import morgan from "morgan";
import cors from "cors";
import auth from "./middleware/auth.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Połączono z bazą danych"))
  .catch((error) => console.log("Wystąpił błąd ", error));
app.get("/home", (req, res) => {
  res.send("Hello");
});
app.get("/protected-endpoint", auth, (req, res) => {
  res.json({ message: "Access gained!" });
});
app.use("/api/getTrainings", trainingRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api", userRoutes);
app.listen(port, (req, res) => {
  console.log(`Backend listening at port ${port}`);
});
