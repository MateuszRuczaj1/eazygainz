import express from "express";
import {
  getTrainings,
  createTraining,
} from "../controllers/trainingControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getTrainings);
router.post("/", auth, createTraining);
export default router;
