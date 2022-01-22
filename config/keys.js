if (process.env.NODE_ENV === "production") {
  module.export = require("./prod");
  console.log('Production');
} else {
  module.export = require("./dev");
}
