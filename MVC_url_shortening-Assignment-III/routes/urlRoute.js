const express = require("express");
const router = express.Router();
const urlRouter = require("../controllers/urlController");

router.route("/").get(urlRouter.getAllUrl).post(urlRouter.addNewUrl);

router
  .route("/:id")
  .get(urlRouter.getUrlbyId)
  .patch(urlRouter.updateUrl)
  .delete(urlRouter.deleteUrl);

module.exports = router;
