import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    validate: [validator.isEmail, "Email must be valid"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePic: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
