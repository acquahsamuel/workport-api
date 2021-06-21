const mongoose = require("mongoose");
const slugify = require("slugify");

const JobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: String,

    position: {
      type: String,
    },

    locationAllowed: {
      type: String,
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
        "Everything Else",
      ],
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

    maximumSalary: {
      type: Number,
      maxlength: [15],
      required: true,
    },
    salaryInterval: {
      type: [String],
    },

    jobStatus: {
      type: [String],
      required: true,
      enum: ["Part time", "Full time", "Contract", "Internship"],
    },

    jobDescription: {
      type: String,
      required: [true, "Please add a description"],
      required: true,
    },

    publicationDate: {
      type: Date,
      default: Date.now,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

JobSchema.pre("save", function (next) {
  this.slug = slugify(this.position, { lower: true });
  next();
});

//Cascade delete jobs when a compmany is deleted
JobSchema.pre("remove", async function (next) {
  await this.model("Company").deleteMany({ company: this_id });
  next();
});

// Reverse populate with virtuals
JobSchema.virtual("company", {
  ref: "Company",
  localField: "_id",
  foreignField: "job",
  justOne: false,
});

module.exports = mongoose.model("Job", JobSchema);
