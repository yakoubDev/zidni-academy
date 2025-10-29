import { model, models, Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "Missing user ID"],
      trim: true,
    },

    class: {
      type: String,
      required: [true, "Please choose a class"],
    },

    experience: {
      type: String,
      enum: ["No experience", "Beginner", "Intermediate", "Advanced"],
      required: [true, "Please fill your experience"],
    },

    message: {
        type: String,
        default: "",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    enrolledAt: {
      type: Date,
      default: Date.now, // Auto set date when user enrolls
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Enrollment =
  models.Enrollment || model("Enrollment", enrollmentSchema);

export default Enrollment;
