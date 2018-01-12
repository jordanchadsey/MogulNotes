const router = require("express").Router();
const appController = require("../../controllers/appController");

// Matches with "/api/books"
router.route("/")
  .get(appController.findAll)
  .post(appController.save);


// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(appController.findById)
  .post(appController.createNote)
  .delete(appController.remove);

module.exports = router;
