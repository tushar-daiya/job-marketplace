import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  jobType: {
    type: String,
    required: true,
    enum: ["Hybrid", "Remote", "Onsite"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  location: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  salary: {
    type: String,
    required: true,
  },
  openings: {
    type: Number,
    required: true,
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

export const Job = mongoose.model("Job", jobSchema);
