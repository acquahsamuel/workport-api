const path = require('path');
const hpp = require('hpp');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');


// Load env vars
dotenv.config();

// Connect to database
connectDB();


const app = express();

// Body parser
app.use(express.json());


// Route files
const jobs = require('./routes/jobs');
const auth = require('./routes/auth');
const users = require('./routes/users');
const companies = require('./routes/companies');

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
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


// Set static folder
app.use(express.static(path.join(__dirname, "public")));


// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/jobs', jobs);
app.use('/api/v1/users', users);
app.use('/api/v1/companies', companies);

app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});

//@desc  Handle unhandled Rejection
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});






