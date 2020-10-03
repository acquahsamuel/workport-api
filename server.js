const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const  mongoSanitize = require('express-mongo-sanitize');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// Route Files
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');


const app = express();

// Routing
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Express fileupload
app.use(fileUpload());

// Sanitize data 
app.use(mongoSanitize());

//Security header
app.use(helmet());

//Prevent XSS 
app.use(xss());

// app.use(express.static(path.join(__dirname, 'public')));

//Might change the template engine
// const pug = require('pug');
// app.engine('pug', pug());
// app.set('view engine', 'pug');

// Mount routers
app.use('/', home);
app.use('/admin', admin);

// app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
	console.log(`Sever is runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error : ${err.message}`.red);
});
