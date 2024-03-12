import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["Full Time", "Part Time", "Internship"],
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
  eligibility: {
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

  applicants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

export const Job = mongoose.model("Job", jobSchema);
