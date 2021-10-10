const mongoose = require("mongoose");
const slugify = require("slugify");

const JobSchema = new mongoose.Schema({
  position: {
    type: String,
  },

  locationAllowed: {
    type: String,
  },

  jobStatus: {
    type: [String],
    required: true,
  },

  jobCategory: {
    type: [String],
    required: true,
  },

  jobTags: {
    type: [String],
    required: [true, "Please add jobs tags"],
  },

  minimumSalary: {
    type: Number,
    minlength: [5],
    required: true,
  },
  slug: String,

  maximumSalary: {
    type: Number,
    maxlength: [15],
    required: true,
  },

  currency: {
    type: String,
    maxlength: [10],
    required: true,
  },

  salaryInterval: {
    type: [String],
    required: true,
  },

  jobDescription: {
    type: String,
    required: [true, "Please add a description"],
  },

  applicationURL: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  applyToEmail: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  postingDate: {
    type: Date,
    default: Date.now,
  },
  // jobId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Job",
  //   required: true,
  // },
  // userId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: true,
  // }
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});


JobSchema.pre("save", function (next) {
  this.slug = slugify(this.position, {
    lower: true,
  });
  next();
});

module.exports = mongoose.model("Job", JobSchema);

