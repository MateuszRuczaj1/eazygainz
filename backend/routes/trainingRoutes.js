import express from "express";
import Training from "../models/TrainingModel.js";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const trainings = await Training.find({});
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trainings" });
  }
});

export default router;
