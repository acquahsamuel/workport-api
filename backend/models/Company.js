const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please add a company name"],
    trim: true,
  },

  companyAddress : {
    type: String,
    required: [true, "Please add a company address"],
    trim: true,
  },

  companyContact : {
    type: Number,
    required: [true, "Please add a company contact"],
    // trim: true,
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
    unique : true
  },

  companyLinkedin: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
    unique : true
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

  invoiceNotes: {
    type: String
  },
  // username && password && account_status field
});

module.exports = mongoose.model("Company", CompanySchema);