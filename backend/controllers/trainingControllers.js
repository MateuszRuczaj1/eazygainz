import Training from "../models/TrainingModel.js";

export const getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({});
    return res.json(trainings);
  } catch (error) {
    return res.status(500, { error: "Failed to fetch trainings" });
  }
};
export const createTraining = async (req, res) => {
  try {
    const training = new Training(req.body);
    await training.save();
    res.status(201).json(training);
    return res.text("Nowy trening dodany!");
  } catch (error) {
    return res.status(500, { error: "Failed to create new training" });
  }
};
