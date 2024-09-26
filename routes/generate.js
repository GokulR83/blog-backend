const express = require("express");
const { getGenerateController } = require("../controllers/generateController");

const router = express.Router();

router.post("/",getGenerateController);

module.exports = router;