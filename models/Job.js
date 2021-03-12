const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 
  slug: String,
  position: {
    type: String,
  },

  companyName: {
    type: String
  },
  locationAllowed: {
    type: String
  },

  jobCategory: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Design ",
      " Product",
      "Customer Service",
      "Data",
      "Sales",
      "DevOps/SysAdmin",
      "Business",
      "Finance",
      "Legal",
      "Human Resources",
      "Medical",
      "Teaching",
      "Everything Else"
    ]
  },

  jobTags: {
    type: [String],
    required  : true
  },
  minimumSalary: {
    type: Number,
    minlength : [2],
    required  : true
  },

  maximumSalary: {
    type: Number,
    maxlength : [15],
    required  : true
  },
  salaryInterval: {
    type: [String]
  },

  jobStatus: {
    type: [String],
    required: true,
    enum: ["Part time", "Full time", "Contract", "Internship"]
  },


  jobDescription: {
    type: String,
    required: [true, "Please add a description"],
    required  : true
  },
  publicationDate: {
    type: Date,
    default: Date.now
  },
  applicationURL: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS"
    ]
  },

  applyToEmail: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  }
});

module.exports = mongoose.model("Job", JobSchema);

