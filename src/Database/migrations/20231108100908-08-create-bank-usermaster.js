'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bank_usermaster', {
            uid: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            empid: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            first_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            middle_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            edate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            etime: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            modify_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            modify_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            fh_husb_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            designation: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            qualification: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            dob: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            doj: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            gender: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            marital_status: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            pan: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            aadhaar_no: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            mobile_official: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email_personal: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            emerg_contact: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            relationship: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            emerg_contact_no: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            blood_group: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            cur_address1: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            cur_address2: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            cur_address_city: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            cur_address_pin: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            per_address1: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            per_address2: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            per_address_city: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            per_address_pin: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            veh_number: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            supervisor: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            mobile_personal: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email_official: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            pwd: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            bank_state: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bank_city: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bank_name: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('bank_usermaster');
    }
};