const express = require("express");
const router = express.Router();
const app = express();
console.log("router loaded");
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/question", require("./question"));
router.use("/option", require("./option"));
module.exports = router; //exporting router
