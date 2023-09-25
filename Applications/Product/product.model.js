'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasOne(models.Category, {
        foreignKey: 'id',
        as: 'category'
      })
      Product.hasOne(models.Status, {
        foreignKey: 'id',
        as: 'status'
      })
    }
    
  }
  Product.init({
    nama_produk: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    kategori_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
