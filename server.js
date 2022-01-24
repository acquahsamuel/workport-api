const os = require("os");
const path = require("path");
const colors = require('colors');
const hpp = require("hpp");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const express = require("express");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");
const keys = require("./config/keys");


// Mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex : true
});

const app = express();

// Body parser
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
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
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

app.use(errorHandler);

console.log(os.platform());
console.log(os.version());
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server Started on port ${port}`.yellow.underline);
});


// Handle unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION Shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

