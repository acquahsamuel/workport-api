const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true,
    },
    companyUrl: {
      type: String,
      required: [true, 'Please add a company address'],
      trim: true,
      unique: true,
    },
    companySize: {
      type: String,
    },
    companyLogo: {
      type: String,
      default: 'no-photo.jpg',
    },
    companyTwitter: {
      type: String,
      match: [
        // eslint-disable-next-line no-useless-escape
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
      unique: true,
    },
    companyLinkedin: {
      type: String,
      match: [
        // eslint-disable-next-line no-useless-escape
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
      unique: true,
    },
    companyEmail: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },

    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User field cannot be empty'],
    },
    jobId: {
      type : mongoose.Schema.ObjectId,
      ref : 'Job',
      required : [true, 'Job must be related to a company'],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', CompanySchema);
