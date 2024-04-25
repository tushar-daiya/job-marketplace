import mongoose, { Schema } from "mongoose";

const internshipSchema = new Schema({
  internshipType: {
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
  duration: {
    type: String,
    required: true,
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
  stipend: {
    type: String,
    required: true,
  },
  openings: {
    type: Number,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  application: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});
