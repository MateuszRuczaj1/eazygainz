import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Podaj nazwę użytkownika"],
    unique: [true, "Taka nazwa użytkownika już istnieje"],
  },
  email: {
    type: String,
    required: [true, "Podaj email"],
    unique: [true, "Taki email już istnieje"],
  },
  password: {
    type: String,
    required: [true, "Podaj hasło"],
    unique: false,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
