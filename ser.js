const fs = require("fs");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Job = require("./models/Job");
// const Company = require("./models/Company");

// Connect to DB
dotenv.config({ path: "./config.env" });
connectDB();

const jobs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/jobs.json`, "utf-8")
);

// const companies = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/compaies.json`, "utf-8")
// );

const importData = async () => {
  try {
    await Job.create(jobs);
    // await Company.create(companies);
    await console.log("Data imported...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Job.deleteMany();
    console.log("Data destroyed...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}