const asyncHandler = require("../middleware/async");

// @desc          Get Job listings
// @route         www.workport.com/single-blog
// @access        Public
exports.get404 = asyncHandler(async (req, res, next) => {
    await res.status(200).render("404", {
        pageTitle: "Page not found ",
        path: "404",
    });
});


