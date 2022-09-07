const express = require('express');
const router = express.Router();
const examplesController = require("../controllers/examples")


router.route("/mobile")
    .get(examplesController.renderMobile);

router.route("/web")
    .get(examplesController.renderWeb);


module.exports = router;