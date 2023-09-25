
const StatusService = require('./status.service');
module.exports = {
    create: async function(req, res, next) {

        let response = {};

        let status = await StatusService.create(req.body);

        /** Default Response */
        response.code = 200
        response.status = "success"
        response.items = status;

        /** Checking Error While Create Status */
        if(!status) response = { code: 500, status: 'error', message: "Create Failed"}
        if(status?.status === "ValidationError") response = { code: 400, status: "Validation Failed", message: Status.message }

        /** Response API */
        res.status(response?.code).json(response);
    },

    getAll: async function (req, res, next) {
 
        /** Page & Limit */
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1)*limit;

        let ccount = await StatusService.getTotalItem();
        let result = await StatusService.getAll({}, skip, limit);
        
        res.status(200).json({
            status: 'success',
            totalItem: ccount,
            items : result
        });

    },

    getByID: async function (req, res, next) {
        let response = {}


        let result = await StatusService.getById(req.params.id)

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

        let result = await StatusService.update(filter, req.body)

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

        let result = await StatusService.delete({ id: req.params.id})

        /** Default response */
        response.code = 200
        response.status = 'Success'
        response.items = result;
        
        /** Checking errors */
        if (!result) response = { code: 500, status: "Error", message: "Delete Failed" }

        res.status(response?.code).json(response);

    },



}