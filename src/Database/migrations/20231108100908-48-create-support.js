'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('support', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            state: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            state_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            zone: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            zone_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            responsible_rm: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            contact_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email_id: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            contact_no: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_name1: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_mobile1: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_email1: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_name2: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_mobile2: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_email2: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_name3: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_mobile3: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            level_email3: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('support');
    }
};