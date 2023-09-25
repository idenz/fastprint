
const ProductService = require('./product.service');
module.exports = {
    create: async function(req, res, next) {

        let response = {};

        let product = await ProductService.create(req.body);

        /** Default Response */
        response.code = 200
        response.status = "success"
        response.items = product;

        /** Checking Error While Create Product */
        if(!product) response = { code: 500, status: 'error', message: "Register Failed"}
        if(product?.status === "ValidationError") response = { code: 400, status: "Validation Failed", message: product.message }

        /** Response API */
        res.status(response?.code).json(response);
    },

    getAll: async function (req, res, next) {
 
        /** Page & Limit */
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1)*limit;

        let ccount = await ProductService.getTotalItem();
        let result = await ProductService.getAll({}, skip, limit);
        
        res.status(200).json({
            status: 'success',
            totalItem: ccount,
            items : result
        });

    },

    getByID: async function (req, res, next) {
        let response = {}


        let result = await ProductService.getById(req.params.id)

        /** Default response */
        response.code = 200
        response.status = 'Success'
        response.items = result;

        /** Checking errors */
        if(!result) response = { code: 500, status: "Error", message: "No document found with that ID" }

        res.status(response?.code).json(response);

    },

    update: async function (req, res, next) {
        let response = {}

        const filter = { where: { id: req.params.id } }

        let result = await ProductService.update(filter, req.body)

        /** Default response */
        response.code = 200
        response.status = 'Success'
        response.items = result;

        /** Checking errors */
        if(!result) response = { code: 500, status: "Error", message: "Update Failed" }

        res.status(response?.code).json(response);

    },

    delete: async function (req, res, next) {
        let response = {}

        let result = await ProductService.delete({ id: req.params.id})

        /** Default response */
        response.code = 200
        response.status = 'Success'
        response.items = result;
        
        /** Checking errors */
        if (!result) response = { code: 500, status: "Error", message: "Delete Failed" }

        res.status(response?.code).json(response);

    },



}