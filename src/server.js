const os = require('os');
const morgan = require('morgan');
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config('./env');

/**
 *  Connect to port
 */
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`${os.platform()}~${os.version()}`);
  console.log(`Server started on port ${port}`);
});

/**
 * Connection mongoose db
 */
connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**
 * Error Handler
 */
process.on('unhandledRejection', (err) => {
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});
