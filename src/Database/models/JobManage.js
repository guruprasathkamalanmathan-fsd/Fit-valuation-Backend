const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");
const ProcessMaster  = require("./ProcessMaster");
const Application = require("./Application");
const UserMaster = require("./userMaster");
const JobNotes = require("./JobNotes");
const CityMaster = require("./CityMaster");
const BankMaster = require("./BankMaster");
const ReportStatus = require("./ReportStatus");
const Manufmaster = require("./Manufmaster");
const Modelmaster = require("./Modelmaster");
const VariantMaster = require("./VarientMaster");
const StateMaster = require("./StateMaster");
const ApplicationInspection = require("./ApplicationInspection");


const JobManage = sequelize.define(
  "job_manage",
  {
    uid: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    initiate_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    ref_no: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: true,
    },
    bank_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    company: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: true,
    },
    maker_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    model_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reg_no: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    place: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: true,
    },
    executive: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    executive_1: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    executive_no_1: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    executive_2: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    executive_no_2: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    payment: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
    payment_status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    report_status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    remarks: {
      type: Sequelize.TEXT,
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
      // defaultValue: 0,
      allowNull: true,
    },
    modify_time: {
      type: Sequelize.TIME,
      // defaultValue: 0,
      allowNull: true,
    },
    createdby_user: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    application_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    client: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    pincode: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    field_category: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    doc_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    exprice: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
    doc_1: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    case_id: {
      type: Sequelize.STRING(255),
      defaultValue: 0,
      allowNull: true,
    },
    bank_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    customer_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    contact_no: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    banker_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    assigned: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    state: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    district: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    city: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    refered_by: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    proposal_name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    chassis_no: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    executive_name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    rcor_not: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    loan_account_no: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    variant_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    process: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    rcfile: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    referred_by: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    order_source: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    order_source_name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    order_source_email: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    order_source_phone: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    assigned_technician: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    executive_contact: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    order_manage_userid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    order_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    assigned_vendor_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    assigned_tech_date: {
      type: Sequelize.DATEONLY,
      // defaultValue: 0,
      allowNull: true,
    },
    assigned_vendor_time: {
      type: Sequelize.TIME,
      defaultValue: 0,
      allowNull: true,
    },
    assigned_tech_time: {
      type: Sequelize.TIME,
      defaultValue: 0,
      allowNull: true,
    },
    qc_byuser: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    qc_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    qc_date: {
      type: Sequelize.DATEONLY,
      // defaultValue: 0,
      allowNull: true,
    },
    qc_time: {
      type: Sequelize.TIME,
      allowNull: true,
      defaultValue: 0,
    },
    mode_of_report: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    agent_assigned_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tech_assigned_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    qc_done_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    qc_done_date: {
      type: Sequelize.DATEONLY,
      // defaultValue: 0,
      allowNull: true,
    },
    qc_done_time: {
      type: Sequelize.TIME,
      // defaultValue: 0,
      allowNull: true,
    },
    inspection_done_date: {
      type: Sequelize.DATEONLY,
      // defaultValue: 0,
      allowNull: true,
    },
    inspection_done_time: {
      type: Sequelize.TIME,
      // defaultValue: 0,
      allowNull: true,
    },
    order_completed_date: {
      type: Sequelize.DATEONLY,
      // defaultValue: 0,
      allowNull: true,
    },
    order_completed_time: {
      type: Sequelize.TIME,
      defaultValue: 0,
      allowNull: true,
    },
    order_completed_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    app_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    app_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    app_address: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    follow_up_date: {
      type: Sequelize.DATEONLY,
      // defaultValue: 0,
      allowNull: true,
    },
    follow_up_time: {
      type: Sequelize.TIME,
      // defaultValue: 0,
      allowNull: true,
    },
    app_remark: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    order_additional_remark: {
      type: Sequelize.STRING(255),
      defaultValue: 0,
      allowNull: true,
    },
    app_done_by: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    followup_done_by: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    order_status_form_remark: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    follow_up_created_by: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    cancelled_by: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    unassigned_by: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    cancel_reason: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    cancel_remark: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    follow_up_reason: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: true,
    },
    follow_up_remark: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: true,
    },
    agent_assign_remark: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    unassign_remark: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    cancel_date: {
      type: Sequelize.DATEONLY,
      // defaultValue: 0,
      allowNull: true,
    },
    cancel_time: {
      type: Sequelize.TIME,
      // defaultValue: 0,
      allowNull: true,
    },
    unassign_date: {
      type: Sequelize.DATEONLY,
      // defaultValue: 0,
      allowNull: true,
    },
    unassign_time: {
      type: Sequelize.TIME,
      // defaultValue: 0,
      allowNull: true,
    },
    technician_start_location: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: true,
    },
    technician_end_location: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: true,
    },
    technician_distance: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: true,
    },
    inspection_done_by: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    additional_remark1: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    additional_remark2: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    recomendation_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    overall_rating: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: true,
    },
    load_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    job_load_uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    src_from: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
      comment: "1-Mob,0-Web",
    },
    offline: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      comment: "1-Offline,0-Online",
    },
    re_initiate_remarks: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    ai_guided_value:{
    type: Sequelize.INTEGER,
    defaultValue:0,
    allowNull:false,
    }, 
  },
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName: "job_manage",
  }
);

JobManage.belongsTo(ProcessMaster, { foreignKey: 'process', targetKey: 'uid', as: 'process_master' });
JobManage.belongsTo(BankMaster, { foreignKey: 'bank_id', targetKey: 'uid', as: 'client_master' });
JobManage.belongsTo(UserMaster, { foreignKey: 'banker_id', targetKey: 'uid' });
JobManage.belongsTo(ReportStatus, { foreignKey: 'report_status', targetKey: 'uid', as: 'report_master' });
JobManage.belongsTo(Manufmaster, { foreignKey: 'maker_id', targetKey: 'uid', as: 'make_master' });
JobManage.belongsTo(Modelmaster, { foreignKey: 'model_id', targetKey: 'uid', as: 'model_master' });
JobManage.belongsTo(VariantMaster, { foreignKey: 'variant_id', targetKey: 'uid', as: 'variant_master' });
JobManage.belongsTo(CityMaster, { foreignKey: 'city', targetKey: 'uid', as: 'city_master' });
JobManage.belongsTo(StateMaster, { foreignKey: 'state', targetKey: 'uid', as: 'state_master' });
JobManage.belongsTo(Application, { foreignKey: 'application_id', targetKey: 'uid', as: 'applications' });
JobManage.belongsTo(ApplicationInspection, { foreignKey: 'application_id', targetKey: 'uid', as: 'applications_inspection' });
JobManage.belongsTo(JobNotes, { foreignKey: 'uid', targetKey: 'job_id', as: 'action_log' });

module.exports = JobManage;
