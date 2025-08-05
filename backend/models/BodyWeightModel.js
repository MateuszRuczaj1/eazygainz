import mongoose, { Schema } from "mongoose";
const BodyWeightSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  weightedAt: {
    type: String,
    enum: ["morning", "afternoon", "evening"],
    required: true,
    default: "morning",
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
export const BodyWeight = mongoose.model("BodyWeight", BodyWeightSchema);
