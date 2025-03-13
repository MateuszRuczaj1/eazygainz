import mongoose from "mongoose";
const muscleGroupSchema = new mongoose.Schema({
  muscle: {
    type: String,
    required: true,
    unique: true,
  },
  exercises: [
    {
      type: String,
      required: true,
    },
  ],
});
const Muscle = mongoose.model("Muscle", muscleGroupSchema);
export default Muscle;
