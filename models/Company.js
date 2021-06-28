const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  CompanyName: {
    type: String,
    required: [true, "Please add a company name"],
    trim: true,
  },

  companyLogo: {
    type: String,
    default: "no-photo.jpg",
  },

  companyTwitter: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },

  companyEmail: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },

  jobId: {
    type: mongoose.Schema.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Company", CompanySchema);
