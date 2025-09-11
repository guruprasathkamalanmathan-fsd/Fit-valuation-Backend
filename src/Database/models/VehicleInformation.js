const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const VehicleInformation = sequelize.define("vehicle_information", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    temp_vahan_search_uid: {
        type: Sequelize.STRING(255),
    },
    owner_name: {
        type: Sequelize.STRING(255),
    },
    registered_place: {
        type: Sequelize.STRING(255),
    },
    owner_mobile_no: {
        type: Sequelize.STRING(255),
    },
    manufacturer: {
        type: Sequelize.STRING(255),
    },
    manufacturer_model: {
        type: Sequelize.STRING(255),
    },
    engine_number: {
        type: Sequelize.STRING(255),
    },
    chassis_number: {
        type: Sequelize.STRING(255),
    },
    registration_number: {
        type: Sequelize.STRING(255),
    },
    registration_date: {
        type: Sequelize.STRING(255),
    },
    m_registration: {
        type: Sequelize.STRING(255),
    },
    m_registration_name: {
        type: Sequelize.STRING(255),
    },
    y_registration: {
        type: Sequelize.STRING(255),
    },
    body_type: {
        type: Sequelize.STRING(255),
    },
    m_y_manufacturing: {
        type: Sequelize.STRING(255),
    },
    m_manufacturing: {
        type: Sequelize.STRING(255),
    },
    m_manufacturing_name: {
        type: Sequelize.STRING(255),
    },
    y_manufacturing: {
        type: Sequelize.STRING(255),
    },
    seating_capacity: {
        type: Sequelize.STRING(255),
    },
    fuel_type: {
        type: Sequelize.STRING(255),
    },
    insurance_name: {
        type: Sequelize.STRING(255),
    },
    insurance_validity: {
        type: Sequelize.STRING(255),
    },
    vehicle_class: {
        type: Sequelize.STRING(255),
    },
    colour: {
        type: Sequelize.STRING(255),
    },
    owner_serial_number: {
        type: Sequelize.STRING(255),
    },
    number_of_cylinder: {
        type: Sequelize.STRING(255),
    },
    permit_no: {
        type: Sequelize.STRING(255),
    },
    fitness_upto: {
        type: Sequelize.STRING(255),
    },
    insurance_policy_no: {
        type: Sequelize.STRING(255),
    },
    permanent_address: {
        type: Sequelize.STRING(255),
    },
    permit_validity_from: {
        type: Sequelize.STRING(255),
    },
    permit_validity_upto: {
        type: Sequelize.STRING(255),
    },
    permit_type: {
        type: Sequelize.STRING(255),
    },
    financer: {
        type: Sequelize.STRING(255),
    },
    noc_details: {
        type: Sequelize.STRING(255),
    },
    norms_type: {
        type: Sequelize.STRING(255),
    },
    blacklist_status: {
        type: Sequelize.STRING(255),
    },
    puc_number: {
        type: Sequelize.STRING(255),
    },
    current_address: {
        type: Sequelize.STRING(255),
    },
    permit_issue_date: {
        type: Sequelize.STRING(255),
    },
    npermit_upto: {
        type: Sequelize.STRING(255),
    },
    father_name: {
        type: Sequelize.STRING(255),
    },
    gross_vehicle_weight: {
        type: Sequelize.STRING(255),
    },
    cubic_capacity: {
        type: Sequelize.STRING(255),
    },
    status_message: {
        type: Sequelize.STRING(255),
    },
    wheelbase: {
        type: Sequelize.STRING(255),
    },
    status: {
        type: Sequelize.STRING(255),
    },
    npermit_issued_by: {
        type: Sequelize.STRING(255),
    },
    noc_status: {
        type: Sequelize.STRING(255),
    },
    mv_tax_upto: {
        type: Sequelize.STRING(255),
    },
    state: {
        type: Sequelize.STRING(255),
    },
    npermit_no: {
        type: Sequelize.STRING(255),
    },
    noc_valid_upto: {
        type: Sequelize.STRING(255),
    },
    noc_issue_date: {
        type: Sequelize.STRING(255),
    },
    status_verification: {
        type: Sequelize.STRING(255),
    },
    puc_valid_upto: {
        type: Sequelize.STRING(255),
    },
    unladden_weight: {
        type: Sequelize.STRING(255),
    },
    standing_capacity: {
        type: Sequelize.STRING(255),
    },
    status_verfy_date: {
        type: Sequelize.STRING(255),
    },
    vehicle_category: {
        type: Sequelize.STRING(255),
    },
    sleeper_capacity: {
        type: Sequelize.STRING(255),
    },
    rc_expiry_date: {
        type: Sequelize.STRING(255),
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
    deleted_at: {
        type: Sequelize.DATE,
    },
},
{
    collate: 'utf8mb4_general_ci',
    timestamps: false,
    tableName: 'vehicle_information',
});

module.exports = VehicleInformation;
