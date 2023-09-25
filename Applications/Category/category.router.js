const express = require("express");
const router = express.Router();

const controller = require("./category.controller");


router 
    .get('/', controller.getAll)
    .get('/:id', controller.getByID);

router
    .post('/', controller.create)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)
    

module.exports = router;