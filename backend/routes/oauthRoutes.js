import express from "express";
import { oauth, oauthRefresh } from "../controllers/oauthController.js";
const router = express.Router();
router.post("/", oauth);
router.post("/refresh-token", oauthRefresh);
export default router;
