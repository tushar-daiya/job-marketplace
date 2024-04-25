import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const updateProfile = async (req, res, next) => {
  try {
    const {
      fullName,
      phone,
      state,
      city,
      education,
      socials,
      skills,
      projects,
    } = req.body;
    if (
      !fullName ||
      !phone ||
      !state ||
      !city ||
      !education ||
      !socials ||
      !skills ||
      !projects
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const student = await Student.findById(req.student._id);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    if (fullName) student.fullName = fullName;
    if (phone) student.phone = phone;
    if (state) student.state = state;
    if (city) student.city = city;
    if (education) student.education = education;
    if (socials) student.socials = socials;
    if (skills) student.skills = skills;
    if (projects) student.projects = projects;
    await student.save();
    res.status(200).json(new ApiResponse(200, "Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateResume = async (req, res, next) => {
  try {
    const file = req.file;
    if (file) {
      const student = await Student.findById(req.student._id);
      if (!student) {
        throw new ApiError(404, "Student not found");
      }
      const resume = await uploadToCloudinary(file.path);
      student.resume = resume.secure_url;
      await student.save();
      res
        .status(200)
        .json(new ApiResponse(200, "Resume uploaded successfully"));
    }
    res.status(400).json(new ApiResponse(400, "Please upload a file"));
  } catch (error) {
    next(error);
  }
};
