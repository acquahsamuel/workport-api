const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });


const connectDB = require("./config/db");
const app = require("./app");
connectDB();


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
