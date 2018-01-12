const router = require("express").Router();
const articleRoutes = require("./api");

// Book routes
router.use("/articles", articleRoutes);

module.exports = router;
