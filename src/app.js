const os = require("os");
const hpp = require("hpp");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const express = require("express");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
app.use(express.json());

// Route files
const jobs = require("./routes/jobs");
const auth = require("./routes/auth");
const users = require("./routes/users");
const companies = require("./routes/companies");

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  // 10 mins
  windowMs: 10 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/jobs", jobs);
app.use("/api/v1/users", users);
app.use("/api/v1/companies", companies);

/**
 *Imported from middleware/error  error response
 */
app.use(errorHandler);

module.exports = app;
