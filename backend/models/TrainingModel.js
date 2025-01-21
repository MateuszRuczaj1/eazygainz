import mongoose from "mongoose";
const traningSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  exercises: [
    {
      name: {
        type: String,
        required: true,
      },
      sets: [
        {
          reps: {
            type: Number,
            required: true,
          },
          weight: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});
const Training = mongoose.model("Training", traningSchema);
export default Training;
