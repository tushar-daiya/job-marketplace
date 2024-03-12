import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  sop: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Applied", "Shortlisted", "Accepted", "Rejected"],
  },
  dateOfApplication: {
    type: Date,
    default: Date.now,
  },
  resume: {
    type: String,
    required: true,
  },
  resumeScore: {
    type: Number,
    required: false,
  },
});
export const Application = mongoose.model("Application", applicationSchema);
