const mongoose = require('mongoose');
const slugify = require('slugify');

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
    },
    title: {
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
      required: [true, 'Please add jobs tags'],
    },
    salaryRange: {
      from: {
        type: Number,
      },
      to: {
        type: Number,
      },
      currency: {
        type: String,
      },
    },
    jobDescription: {
      type: String,
      required: [true, 'Please add a description'],
    },

    applicationURL: {
      type: String,
      match: [
        // eslint-disable-next-line no-useless-escape
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: [true, 'Company field cannot be empty'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User field cannot be empty'],
    },

    premiumJob: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
  { timestamps: true }
);

/**
 * Add slug
 */
JobSchema.pre('save', function (next) {
  this.slug = slugify(this.position, {
    lower: true,
  });
  next();
});

/**
 *  Queries for item
 *  When we don't want preminim items to be add to the
 *  general results
 *  Generic middleware /^find/
 */
JobSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  this.find({ premiumJob: { $ne: true } });
  next();
});

JobSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'company',
    select: 'companyName, companyUrl, companyDescription',
  }).populate({
    path: 'user',
    select: 'name',
  });
  next();
});

module.exports = mongoose.model('Job', JobSchema);
