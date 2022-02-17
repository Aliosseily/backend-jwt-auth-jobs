const Job = require("../module/Job");
// const jwt = require("jsonwebtoken");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  // instead of checking token here in every function, use middleware instead.
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   throw new UnauthenticatedError("Authentication invalid");
  // }
  // const token = authHeader.split(" ")[1];
  // const payload = jwt.verify(token, process.env.JWT_SECRET);

  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(200).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  // const { params, user } = req;
  // console.log("req",req);
  //
  // object destructuring
  const {
    params: { id: jobId }, // jobId alias name / get id property from req.params
    user: { userId }, //get userId property from req.user, req.user coming from authentication middeware
  } = req;
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
    //  _id:req.params.id,
    //  createdBy:req.user.userId
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(200).json(job);
};

const createJob = async (req, res) => {
  //req.user is comming from authentication middleware
  req.body.createdBy = req.user.userId; //initialize createdBy property from user object coming from authentication midlleware;
  console.log("req.body", req.body);
  const createdJob = await Job.create(req.body);
  res.status(201).json(createdJob);
};

const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(200).json({ status: true, message: "successfully deleted" });
};

const updateJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
    body: { company, position },
  } = req;
  if (
    !company ||
    !position ||
    company.trim().length === 0 ||
    position.trim().length === 0
  ) {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(200).json({ job });
};

module.exports = { getAllJobs, getJob, createJob, deleteJob, updateJob };
