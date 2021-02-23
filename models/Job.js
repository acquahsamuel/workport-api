const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    /**Insert ObjectId */
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  position: {
    type: String,
    enum: ["admin", "publisher"]
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
    type: [String]
  },
  minimumSalary: {
    type: Number
  },

  maximumSalary: {
    type: Number
  },
  salaryInterval: {
    type: [String]
  },

  slug: String,
  jobDescription: {
    type: String,
    required: [true, "Please add a description"],
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

module.exports = mongoose.model("User", JobSchema);
