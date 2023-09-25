const express = require("express");
const app = express();

const cors = require("cors");
const body_parser = require("body-parser");

const Product = require('./Product/product.router');
const Category = require('./Category/category.router');
const Status = require('./Status/status.router');

/** Penggunaan Library Cors */
app.use(cors());

/** Penggunaan Library Body Parser */
app.use((body_parser.urlencoded({ extended: false })));
app.use(body_parser.json());

/** List Router */
app.use('/api/product', Product)
app.use('/api/category', Category)
app.use('/api/status', Status)

module.exports = app;