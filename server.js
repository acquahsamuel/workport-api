const ejs = require('ejs');
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const express = require("express");
const connectDB = require("./config/db");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const errorHandler = require("./middleware/error");

const app = express();

// @des   dB session-store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI_DEV,
  collection: 'sessions'
})


dotenv.config({
  path: "./config.env"
});

// @des   dB connection
connectDB();


// @des   Mounting pages routes
const auth = require("./routes/auth");
const homeRoute = require("./routes/home");
const adminRoute = require("./routes/admin");
const errorController = require('./controllers/error');


// Body parser
app.use(express.json());

// Cookie parser
app.use(express.urlencoded({
  extended: false
}));


// Enable CORS
app.use(cors());

// @des Serving Static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, "public")));


// @desc express session
app.use(session({
  secret: 'session-secret-key-value',
  resave: false,
  saveUninitialized: false,
  store: store
}));


// @desc routes middlewares
app.use("/", homeRoute);
app.use("/auth", auth);
app.use("/admin", adminRoute);


// @des 404 page on error
app.use(errorController.get404);


// @des ErrorHandler
app.use(errorHandler);


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});

// @desc  Handle unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION Shutting down");
  console.log(err.name, err.stack, err.message);
});