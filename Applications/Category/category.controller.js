
const CategoryService = require('./category.service');
module.exports = {
    create: async function(req, res, next) {

        let response = {};

        let category = await CategoryService.create(req.body);

        /** Default Response */
        response.code = 200
        response.status = "success"
        response.items = category;

        /** Checking Error While Create Category */
        if(!category) response = { code: 500, status: 'error', message: "Create Failed"}
        if(category?.status === "ValidationError") response = { code: 400, status: "Validation Failed", message: category.message }

        /** Response API */
        res.status(response?.code).json(response);
    },

    getAll: async function (req, res, next) {
 
        /** Page & Limit */
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1)*limit;

        let ccount = await CategoryService.getTotalItem();
        let result = await CategoryService.getAll({}, skip, limit);
        
        res.status(200).json({
            status: 'success',
            totalItem: ccount,
            items : result
        });

    },

    getByID: async function (req, res, next) {
        let response = {}


        let result = await CategoryService.getById(req.params.id)

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

        let result = await CategoryService.update(filter, req.body)

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

        let result = await CategoryService.delete({ id: req.params.id})

        /** Default response */
        response.code = 200
        response.status = 'Success'
        response.items = result;
        
        /** Checking errors */
        if (!result) response = { code: 500, status: "Error", message: "Delete Failed" }

        res.status(response?.code).json(response);

    },



}