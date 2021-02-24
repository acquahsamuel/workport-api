const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config/config.env" });

const Job = require("./models/Job");

// Connect to DB                                                                                                                                                                                                                                                                                                                      
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  

const jobs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/jobs.json`, "utf-8")
);

const importData = async () => {
  try {
    await Job.create(jobs);
    console.log("Data imported...");
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
