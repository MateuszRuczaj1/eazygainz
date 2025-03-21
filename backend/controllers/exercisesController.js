import Muscle from "../models/MuscleGroupModel.js";
export const getMuscleGroups = async (req, res) => {
  try {
    const muscleGroups = await Muscle.find({});
    return res.json(muscleGroups);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch muscle groups" });
  }
};
///Actually, i don't need this one anymore...
export const getExercisesByMuscleGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const exercises = await Muscle.findById(id, { exercises: 1 });
    if (!exercises) {
      return res
        .status(404)
        .json({ error: `Muscle group with id ${id} not found` });
    }
    return res.json(exercises);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch muscle groups" });
  }
};
