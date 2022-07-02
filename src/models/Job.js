const mongoose = require('mongoose');
const slugify = require('slugify');

const JobSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
    },
    position: {
      type: String,
    },
    title: {
      type: String,
    },
    locationAllowed: {
      type: String,
    },
    jobType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'active'],
      default: 'pending',
    },
    jobCategory: {
      type: String,
      required: true,
    },

    jobSearchTags: {
      type: [String],
      required: [true, 'Please add jobs tags'],
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

    companyId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: [true, 'Company field cannot be empty'],
    },

    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User field cannot be empty'],
    },

    premium: {
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
  this.slug = slugify(this.position + this.company, {
    lower: true,
  });
  next();
});

/**
 *  Queries for item
 *  Generic middleware /^find/
 */
JobSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  this.find({ premium: { $ne: true } });
  next();
});




module.exports = mongoose.model('Job', JobSchema);
