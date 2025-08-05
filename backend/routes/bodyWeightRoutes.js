import e from "express";
import {
  createBodyWeightRaport,
  getBodyWeightByFilter,
} from "../controllers/bodyWeightController.js";
import auth from "../middleware/auth.js";
const router = e.Router();
router.get("/", auth, getBodyWeightByFilter);
router.post("/create-raport", auth, createBodyWeightRaport);
export default router;
