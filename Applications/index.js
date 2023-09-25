const express = require("express");
const app = express();

const cors = require("cors");
const body_parser = require("body-parser");

/** Penggunaan Library Cors */
app.use(cors);

/** Penggunaan Library Body Parser */
app.use((body_parser.urlencoded({ extended: false })));
app.use(body_parser.json());

/** List Router */

module.exports = app;