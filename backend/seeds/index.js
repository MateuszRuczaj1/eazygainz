import mongoose from "mongoose";
import Training from "../models/TrainingModel";
import trainingSeeds from "./trainingSeeds.json";
mongoose
  .connect("mongodb://127.0.0.1:27017/eazygainz")
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
