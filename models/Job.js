const mongoose = require("mongoose");
const slugify = require("slugify");

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
    },

    locationAllowed: {
      type: String,
    },

    jobStatus: {
      type: String,
      required: true,
    },

    jobCategory: {
      type: String,
      required: true,
    },

    jobSearchTags: {
      type: [String],
      required: [true, "Please add jobs tags"],
    },

    currency: {
      type: String,
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

    // type of string = requires only string no number
    applyToEmail: {
      type: String,
      required: [true, "Please add an email"],
      // unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },

    company: {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

JobSchema.pre("save", function (next) {
  this.slug = slugify(this.position, {
    lower: true,
  });
  next();
});

module.exports = mongoose.model("Job", JobSchema);
