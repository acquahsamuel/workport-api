const mongoose = require("mongoose");
const slugify = require("slugify");

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String
    },
    title: {
      type: String
    },
    locationAllowed: {
      type: String
    },
    jobStatus: {
      type: String,
      required: true
    },
    jobCategory: {
      type: String,
      required: true
    },

    jobSearchTags: {
      type: [String],
      required: [true, "Please add jobs tags"]
    },
    salaryRange: {
      from: {
        type: Number
      },
      to: {
        type: Number
      },
      currency: {
        type: String
      }
    },
    jobDescription: {
      type: String,
      required: [true, "Please add a description"]
    },

    applicationURL: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS"
      ]
    },
    // company: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Company",
    //  required: [true, "Filled cannot be empty"]
    // },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Filled cannot be empty"]
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  },
  { timestamps: true }
);

JobSchema.pre("save", function (next) {
  this.slug = slugify(this.position, {
    lower: true
  });
  next();
});

module.exports = mongoose.model("Job", JobSchema);
