import mongoose from "mongoose";
import Training from "../models/TrainingModel.js";
import { BodyWeight } from "../models/BodyWeightModel.js";
import Muscle from "../models/MuscleGroupModel.js";
import trainingSeeds from "./trainingSeeds.json" assert { type: "json" };
import muscleGroupSeeds from "./muscleGroupSeeds.json" assert { type: "json" };
import bodyWeightSeeds from "./bodyWeight.json" assert { type: "json" };
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => console.log("Połączono z bazą danych"))
  .catch((error) => console.log("Wystąpił błąd", error));

const seedDB = async () => {
  try {
    await Training.deleteMany({});
    const training = new Training({
      ...trainingSeeds,
    });
    await Muscle.deleteMany({});

    await training.save();
    await Muscle.insertMany(muscleGroupSeeds);
    await BodyWeight.deleteMany({});
    await BodyWeight.insertMany(bodyWeightSeeds);
  } catch (error) {
    console.error(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
