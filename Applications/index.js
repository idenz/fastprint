const express = require("express");
const app = express();

const cors = require("cors");
const body_parser = require("body-parser");

const Product = require('./Product/product.router');

/** Penggunaan Library Cors */
app.use(cors());

/** Penggunaan Library Body Parser */
app.use((body_parser.urlencoded({ extended: false })));
app.use(body_parser.json());

/** List Router */
app.use("/test", (req, res, next) => {
    res.send(`<h1>Connected to server</h1>`);
  });
app.use('/api/product', Product)

module.exports = app;