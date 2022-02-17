const  mongoose  = require("mongoose");

  const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide position"],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ["interview", "declined", "pending"], // status must be one of these 3 values, else, it will thorw error
    default: "pending", // default value of status is pending
  },
  createdBy: {
    type: mongoose.Types.ObjectId, //id of user creted this job
    ref: "User", // reference to user model
    required: [true, "Please provide user"],
  },
},
  // used by mongoose to automatically manage create at and update at properties on our documents
  { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
