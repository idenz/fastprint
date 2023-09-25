const ProductModel = require('../../Databases/sequelize.database').Product;
const CategoryModel = require('../../Databases/sequelize.database').Category;
const StatusModel = require('../../Databases/sequelize.database').Status;
const Joi = require('joi');

module.exports = {
    create: async function(body) {
        let result;

        try {
            
            const schema = Joi.object({
                nama_produk: Joi.string().min(2).max(32).required(),
                harga: Joi.number().required(),
                kategori_id: Joi.number().required(),
                status_id: Joi.number().required(),
            });

            const { error } = schema.validate(body);
            if(error) {
                return result = {
                    status: error.name,
                    message: error.details[0].message
                }
            }

            const _query = {}
            result = await ProductModel.create(body);
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
        result = await ProductModel.count(filter)
      } catch (error) {
        result = null;
        console.log(error);
      }
  
      return result;
    },
  
    getAll: async function (filter = {}, skip = 0, limit = 0) {
        let result;
    
        try {
          filter.include = [
            {
              model: CategoryModel,
              as: "category",
            },
            {
              model: StatusModel,
              as: 'status'
            }
          ]
          result = await ProductModel.findAll(filter)
    
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
    
          result = await ProductModel.findOne(filter)
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
            nama_produk: Joi.string().min(2).max(32),
            harga: Joi.number(),
            kategori_id: Joi.number(),
            status_id: Joi.number(),
          });
    
          const { error } = schema.validate(body);
    
          if (error) {
            return (result = {
              status: error.name,
              message: error.details[0].message,
            });
          }
    
          result = await ProductModel.update(body, filter);
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
          
          result = ProductModel.destroy({where});
          if (!result) result = null;
    
        } catch (error) {
          result = null;
          console.log(error);
        }
    
        return result;
      },
    
    
    
}