'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kategori_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Category",
          key: "id",
        }
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Status",
          key: "id",
        }
      },
      nama_produk: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      kategori_id: {
        type: Sequelize.INTEGER
      },
      status_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};