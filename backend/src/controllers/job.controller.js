import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      type,
      title,
      description,
      location,
      experience,
      skills,
      salary,
      openings,
    } = req.body;
    if (
      !type ||
      !title ||
      !description ||
      !location ||
      !openings ||
      !experience ||
      !skills ||
      !salary
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const company = req.company;
    const job = await Job.create({
      type,
      title,
      description,
      company: company._id,
      location,
      experience,
      skills,
      salary,
      openings,
    });
    company.jobs.push(job._id);
    await company.save();
    res.status(201).json(new ApiResponse(201, "Job created successfully"));
  } catch (error) {
    next(error);
  }
};

export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    if (!jobId) {
      throw new ApiError(400, "Job ID is required");
    }
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, "Job not found");
    }
    const student = req.student;
    job.applicants.push(student._id);
    await job.save();
    student.appliedJobs.push(job._id);
    await student.save();
    res.status(200).json(new ApiResponse(200, "Applied successfully"));
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    console.log(req.query)
    const jobs = await Job.find(req.query).populate(
      "company",
      "companyName logo socials"
    );
    res
      .status(200)
      .json(new ApiResponse(200, "Fetched successfully", { jobs }));
  } catch (error) {
    next(error);
  }
};
