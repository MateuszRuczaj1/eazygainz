import mongoose from "mongoose";
const muscleGroupSchema = new mongoose.Schema({
  muscle: {
    type: String,
    required: true,
    unique: true,
  },
  exercises: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
  ],
});
const Muscle = mongoose.model("Muscle", muscleGroupSchema);
export default Muscle;
