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
  console.log("Otrzymane dane:", req.body);
  try {
    const training = new Training(req.body);
    training
      .save()
      .then((savedTraining) => {
        return res.status(201).json(savedTraining);
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message }); // Błąd walidacji lub zapisania
      });
  } catch (error) {
    return res.status(500, { error: "Failed to create new training" });
  }
};
