const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

const router = express.Router();

// Route files in
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(express.json({ limit: "15kb" }));
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
  message: "Too many request from this IP, Please try again in an hour!"
});
app.use("/api", limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

/**Serving Static files  */
app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




const Jobs = require("./routes/home/jobs");
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');


// Mount routers_API
app.use("/api/v1/workport", Jobs);


/**
 * @Rendering_pages
 */
app.use("/", home);
app.use("/admin", admin);




module.exports = app;



