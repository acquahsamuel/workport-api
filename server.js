const path = require("path");
const cors = require("cors");
const hpp = require("hpp");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");

dotenv.config({ path: "./config/config.env" });
connectDB();

const router = express.Router();
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
const home = require("./routes/home/index");
const admin = require("./routes/admin/index");

// Mount routers_API
app.use("/api/v1/workport", Jobs);

/**
 * @Rendering_pages
 */
app.use("/", home);
app.use("/admin", admin);

process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION Shutting down");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION Shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
