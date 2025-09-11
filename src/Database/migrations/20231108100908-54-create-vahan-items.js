'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vahan_items', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            app_uid: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bank_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            api_response: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            api_noc_valid_upto: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_seating_capacity: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_fitness_upto: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_variant: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_registration_number: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_npermit_upto: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_manufacturer_model: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_standing_capacity: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_status: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_status_message: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            api_number_of_cylinder: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_colour: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_puc_valid_upto: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_vehicle_class: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_permanent_address: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_permit_no: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_father_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_status_verfy_date: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_m_y_manufacturing: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_registration_date: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_gross_vehicle_weight: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_registered_place: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_permit_validity_upto: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_insurance_policy_no: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_noc_details: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_npermit_issued_by: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_sleeper_capacity: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_current_address: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_status_verification: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_permit_type: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_noc_status: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_masked_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_fuel_type: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_permit_validity_from: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_owner_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_puc_number: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_owner_mobile_no: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_blacklist_status: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_manufacturer: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_permit_issue_date: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_engine_number: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_chassis_number: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_mv_tax_upto: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_body_type: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_unladden_weight: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_insurance_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_owner_serial_number: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_vehicle_category: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_noc_issue_date: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_npermit_no: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_cubic_capacity: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_norms_type: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_state: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_insurance_validity: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_financer: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_wheelbase: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            vahan_search_uid: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            api_m_manufacturing: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_y_manufacturing: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_m_manufacturing_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_m_registration: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_y_registration: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            api_m_registration_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('vahan_items');
    }
};