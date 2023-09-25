const express = require("express");
const router = express.Router();

const controller = require("./product.controller");

router
    .get('/', controller.get);

module.exports = router;