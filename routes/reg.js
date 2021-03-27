const express = require("express");
const { verify_get } = require("../controllers/mailVerfication");
const { add_post } = require("../controllers/registrationController");
const { get_home } = require("../controllers/registrationController");
const router = express.Router();

router.get("/:test", verify_get);
router.post("/add", add_post);
router.get("/", get_home);

module.exports = router;
