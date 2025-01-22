import mongoose from "mongoose";
import Training from "../models/TrainingModel.js";
import trainingSeeds from "./trainingSeeds.json" assert { type: "json" };
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Połączono z bazą danych"))
  .catch((error) => console.log("Wystąpił błąd"));

const seedDB = async () => {
  try {
    await Training.deleteMany({});
    const training = new Training({
      ...trainingSeeds,
    });
    await training.save();
  } catch (error) {
    console.error(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
