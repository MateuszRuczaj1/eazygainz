import Training from "../models/TrainingModel.js";

export const getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({ _user: req.user.userId });
    return res.json(trainings);
  } catch (error) {
    return res.status(500, { error: "Failed to fetch trainings" });
  }
};
export const createTraining = async (req, res) => {
  console.log("Otrzymane dane:", req.body);
  console.log("Użytkownik: ", req.user);
  const newTraining = {
    ...req.body,
    _user: req.user.userId,
  };
  try {
    const training = new Training(newTraining);
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
