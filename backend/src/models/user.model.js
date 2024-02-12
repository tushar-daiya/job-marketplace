import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
