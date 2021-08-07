const mongoose = require("mongoose");
const slugify = require("slugify");
const marked = require("marked");
const {
  JSDOM
} = require("jsdom");
const createDomPurify = require("dompurify");
const dompurify = createDomPurify(new JSDOM().window);

const JobSchema = new mongoose.Schema({
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
    type: String,
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

  sanitizedHtml: {
    type: String,
    required: true,
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

  company: {
    // companyId: mongoose.Schema.ObjectId,
    companyName: {
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
  },

  publicationDate: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
});

JobSchema.pre("save", function (next) {
  this.slug = slugify(this.position, {
    lower: true
  });
  next();
});

JobSchema.pre("validate", function (next) {
  if (this.jobDescription) {
    this.sanitizedHtml = dompurify.sanitize(
      marked(this.jobDescription),
      // {
      //   ALLOWED_TAGS: ["b", "q", "div", "strong", "ul", "li"],
      //   ALLOWED_ATTR: ["style"],
      // },
      {
        USE_PROFILES: {
          html: true
        }
      }
    );
  }
  next();
});

module.exports = mongoose.model("Job", JobSchema);