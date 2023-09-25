const StatusModel = require('../../Databases/sequelize.database').Status;
const Joi = require('joi');

module.exports = {
    create: async function(body) {
        let result;

        try {
            
            const schema = Joi.object({
                nama_status: Joi.string().min(2).max(32).required(),
            });

            const { error } = schema.validate(body);
            if(error) {
                return result = {
                    status: error.name,
                    message: error.details[0].message
                }
            }

            const _query = {}
            result = await StatusModel.create(body);
            if(!result) result = null

        } catch (error) {
            result = null
            console.log(error);
        }

        return result;
    },

    getTotalItem: async function (filter = {}) {
      let result;
  
      try {
        result = await StatusModel.count(filter)
      } catch (error) {
        result = null;
        console.log(error);
      }
  
      return result;
    },
  
    getAll: async function (filter = {}, skip = 0, limit = 0) {
        let result;
    
        try {
    
          result = await StatusModel.findAll(filter)
    
          if (!result) result = null;
          
        } catch (error) {
          result = null;
          console.log(error);
        }
    
        return result;
    },

    getById: async function (id) {
        let result;
        let filter = {}
    
        try {
    
          filter.where = { id }
    
          result = await StatusModel.findOne(filter)
          if (!result) result = null;
          
        } catch (error) {
          result = null;
          console.log(error);
        }
    
        return result;
    },    

    update: async function (filter = {}, body) {
        let result;
    
        try {
          const schema = Joi.object({
            nama_status: Joi.string().min(2).max(32),
          });
    
          const { error } = schema.validate(body);
    
          if (error) {
            return (result = {
              status: error.name,
              message: error.details[0].message,
            });
          }
    
          result = await StatusModel.update(body, filter);
          if (!result) result = null;
          
        } catch (error) {
          result = null;
          console.log(error);
        }
    
        return result;
    },

    delete: async function (where) {
        let result;
    
        try {
          
          result = StatusModel.destroy({where});
          if (!result) result = null;
    
        } catch (error) {
          result = null;
          console.log(error);
        }
    
        return result;
      },
    
    
    
}