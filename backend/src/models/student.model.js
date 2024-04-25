import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const studentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    education: [
      {
        degree: {
          type: String,
          required: false,
        },
        year: {
          type: String,
          required: false,
        },
        institute: {
          type: String,
          required: false,
        },
      },
    ],
    socials: {
      github: {
        type: String,
        required: false,
      },
      linkedin: {
        type: String,
        required: false,
      },
      twitter: {
        type: String,
        required: false,
      },
    },
    skills: [],
    projects: [
      {
        title: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
        link: {
          type: String,
          required: false,
        },
      },
    ],
    resume: {
      type: String,
      required: false,
    },
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Student = mongoose.model("Student", studentSchema);
