'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vendor_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            company: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            contact_person: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            contact_number: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email_official: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            doj: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            billing_address: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            pincode: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            gst: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            selected_process: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            selected_zone: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            selected_state: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            selected_district: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            selected_city: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            date_created: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            time_created: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            created_by_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            created_by_user: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            selected_bank: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            district: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            customer_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            payment_mode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            payment: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
            },
            admin_userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('vendor_master');
    }
};