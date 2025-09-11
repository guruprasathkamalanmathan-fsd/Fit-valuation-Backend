'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banker_process', {
        uid: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          process_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          process_fee: {
            type: Sequelize.DECIMAL(15,2),
            allowNull: false,
          } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('banker_process');
  }
};