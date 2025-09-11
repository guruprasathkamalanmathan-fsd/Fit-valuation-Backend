const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");
const VendorMaster = require("./VendorMaster")

const UserMaster = sequelize.define("Usermaster",
{
    uid: {  
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
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
    auth_token:{
        type: Sequelize.STRING(255),
        allowNull: true,
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
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:null
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1
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
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    doj: {
        type: Sequelize.DATEONLY,
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
    profile_pic: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    menu_access_permission: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:null
    },
    created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    district: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    city: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pincode: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    selected_bank: {
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
    user_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    company_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    bank_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0,
        references: {
            model: 'vendor_master', // The name of the target table
            key: 'uid',      // The name of the target column
        },
    },
    bank_state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    bank_city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    payment_status: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:null
    },
    retail_or_yard: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    payment: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:null
    },
     aadharCardPhoto: {
        type: Sequelize.STRING(255), // Stored as a string
        allowNull: true,        // Allow null values if needed
      },
      drivingLicensePhoto: {
        type: Sequelize.STRING(255), // Stored as a string
        allowNull: true,        // Allow null values if needed
      },
      panCardPhoto: {
        type: Sequelize.STRING(255), // Stored as a string
        allowNull: true,        // Allow null values if needed
      },
     selfiePhoto: {
        type: Sequelize.STRING(255), // Stored as a string
        allowNull: true,        // Allow null values if needed
      },
      aadharCardNumber:{
        type: Sequelize.STRING(255), // Stored as a string
        allowNull: true,        // Allow null values if needed
      },
      panCardNumber:{
        type: Sequelize.STRING(255), // Stored as a string
        allowNull: true,        // Allow null values if needed
      },
      drivingLicenseNumber:{
        type: Sequelize.STRING(255), // Stored as a string
        allowNull: true,        // Allow null values if needed
      },
      educationalCertificatePhoto:{
        type: Sequelize.STRING(255), // Stored as a string
        allowNull: true,        // Allow null values if needed
      },
    selected_process: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:null
    },
    banker_usertype: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    selected_banker_usertype: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    email_official_prefix: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    email_official_suffix: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    email_multiple: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    device_login_flag: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:null
    },
    last_login: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    }  , 
    last_logout: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    last_reset_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:'usermaster'
    });
    
UserMaster.belongsTo(VendorMaster, { foreignKey: 'company_id',targetKey:'uid' });

module.exports = UserMaster;