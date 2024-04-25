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
  //statement of purpose(sop)
  sop: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Applied", "Shortlisted", "Accepted", "Rejected"],
    default: "Applied",
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
    default: 0,
    required: false,
  },
});
export const Application = mongoose.model("Application", applicationSchema);
