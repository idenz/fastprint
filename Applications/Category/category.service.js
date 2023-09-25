const CategoryModel = require('../../Databases/sequelize.database').Category;
const Joi = require('joi');

module.exports = {
    create: async function(body) {
        let result;

        try {
            
            const schema = Joi.object({
                nama_kategori: Joi.string().min(2).max(32).required(),
            });

            const { error } = schema.validate(body);
            if(error) {
                return result = {
                    status: error.name,
                    message: error.details[0].message
                }
            }

            const _query = {}
            result = await CategoryModel.create(body);
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
        result = await CategoryModel.count(filter)
      } catch (error) {
        result = null;
        console.log(error);
      }
  
      return result;
    },
  
    getAll: async function (filter = {}, skip = 0, limit = 0) {
        let result;
    
        try {
    
          result = await CategoryModel.findAll(filter)
    
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
    
          result = await CategoryModel.findOne(filter)
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
            nama_kategori: Joi.string().min(2).max(32),
          });
    
          const { error } = schema.validate(body);
    
          if (error) {
            return (result = {
              status: error.name,
              message: error.details[0].message,
            });
          }
    
          result = await CategoryModel.update(body, filter);
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
          
          result = CategoryModel.destroy({where});
          if (!result) result = null;
    
        } catch (error) {
          result = null;
          console.log(error);
        }
    
        return result;
      },
    
    
    
}