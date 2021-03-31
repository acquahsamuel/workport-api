const path = require('path');
const cors = require('cors');
const hpp = require('hpp');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

dotenv.config({path: './config/config.env'});
connectDB();

//@desc      Mounting Routes
const jobs = require('./routes/jobs');
const users = require('./routes/users');
const companies = require('./routes/companies');


//@des     Mounting pages routes
const home = require('./routes/viewsHome');
const admin = require('./routes/viewsAdmin');

// Body parser
app.use(express.json());


// Cookie parser
app.use(express.urlencoded({ extended : false }));
app.use(express.json({limit: '15kb'}));
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
  message: 'Too many request from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//@des Serving Static files
app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//@desc  Mount routers_API
app.use('/api/v1/jobs', jobs);
app.use('/api/v1/users', users);
app.use('/api/v1/companies', companies);

//@desc  Rendering_pages
app.use('/', home);
app.use('/admin', admin);

//@des ErrorHandler
app.use(errorHandler);

//@des Rewrite route to display 404 page
const getHome404ErrorPage = require('./controllers/viewsHome');
app.use(getHome404ErrorPage.getHome404);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});

//@desc  Handle unhandled Rejection
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION Shutting down');
  console.log(err.name, err.message);
  // server.close (() => {
  //   process.exit (1);
  // });
});


