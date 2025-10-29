import bcrypt from "bcryptjs";
import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name."],
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number."],
  },
  password: {
    type: String,
    default: "",
  },
  gender:{
    type: String,
    enum: ["Male", "Female"]
  },
  role:{
    type: String,
    enum: ["student", "teacher", "admin", "owner"],
    default: "student",
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = models.User || model("User", userSchema);

export default User;
