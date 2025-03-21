import express from "express";
import {
  getExercisesByMuscleGroup,
  getMuscleGroups,
} from "../controllers/exercisesController.js";
const router = express.Router();
router.get("/getMuscleGroups", getMuscleGroups);
router.get("/getExercises/:id", getExercisesByMuscleGroup);
export default router;
