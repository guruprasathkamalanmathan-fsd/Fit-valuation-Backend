const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const Application = sequelize.define(
  "applications",
  {
    uid: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    bank_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    application_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    ref_no: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    place: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    name_add_org_owner: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    contact: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    year_mfg: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    as_per_decoder: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    reg_no: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    chassis_no: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    eng_no: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    maker_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    model_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    body_type: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    km_readng: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    policy_and_validity: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    insurance_upto: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    permit_no: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    tax_details: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fitness_upto: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fair_market_value: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
    distress_sale_value: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
    executive_id: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    banker_name: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    insp_agency: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
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
    remarks: {
      type: Sequelize.STRING(500),
      defaultValue: "",
      allowNull: false,
    },
    job_id: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    doc1: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc2: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc3: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc4: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc5: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc6: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc7: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc8: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc9: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc10: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    edate: {
      type: Sequelize.DATE,
      defaultValue: 0,
      allowNull: false,
    },
    etime: {
      type: Sequelize.TIME,
      defaultValue: 0,
      allowNull: false,
    },
    modify_date: {
      type: Sequelize.DATE,
      defaultValue: 0,
      allowNull: false,
    },
    modify_time: {
      type: Sequelize.TIME,
      defaultValue: 0,
      allowNull: false,
    },
    createdby_user: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    mech_trans: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    hyp_with: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    suspension: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: true,
    },
    rc_booked: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: true,
    },
    permit: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: true,
    },
    declaration: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    company: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    client: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    seating: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    report_status: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    idv: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    veh_color: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    hpn_with: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    veh_class: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    remarks_recom: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    present_maker_val: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
    veh_condition: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    owner_address: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    ins_validity_to: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    doc11: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    odo_meter: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    permit_status: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    permit_valid_upto: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    valid_to: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    policy_type: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    any_aci: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fin1: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    tyre: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    ac: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    cd_player: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    veh_cond: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    rating: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    veh_used: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    month_yr_mfg: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    permit_type: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    intr_state: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    rto: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    tax_token: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    permit_copy: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    other_remarks: {
      type: Sequelize.STRING(500),
      defaultValue: "",
      allowNull: false,
    },
    capacity: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    reg_auth: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    field_category: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    fld1: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld2: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld3: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld4: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld5: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    maker_name: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    model_name: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    body_name: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    battery_name: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    executive_name: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    doc12: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc13: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc14: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc15: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc16: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc17: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc18: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc19: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc20: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    fld6: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld7: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld8: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld9: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld10: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld11: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld12: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld13: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld14: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld15: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld16: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld17: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld18: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld19: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld20: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld21: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld22: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld23: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld24: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld25: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld26: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld27: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld28: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld29: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld30: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld31: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld32: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld33: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    modify_by: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    assigned: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    fld102: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    fld103: {
      type: Sequelize.STRING(50),
      defaultValue: "",
      allowNull: false,
    },
    technician_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    media_files: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    report_link: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    check_report_done_or_hold: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    app_reason_text: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    app_reason_remark: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    picture_line_position: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    resell_value: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc21: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc22: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc23: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc24: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc25: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc26: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc27: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc28: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc29: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc30: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc31: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc32: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc33: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc34: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc35: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc36: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc37: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc38: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc39: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc40: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc41: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    doc42: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    ex_showroom_price: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    variant_name: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    app_insurance_status: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    engine_cc: {
      type: Sequelize.STRING(100),
      defaultValue: "",
      allowNull: false,
    },
    is_dedupe: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    vahan_search_uid: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    show_hide_vahan: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    from_tech_odometer: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre1_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre2_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre3_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre4_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre5_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre6_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre7_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre8_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre9_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre10_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre11_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre12_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre13_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    tyre14_percentage: {
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    api_tech_remarks:{
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    app_black_list:{
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    app_body_paint:{
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    app_length_body:{
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    app_veh_current_address:{
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
    app_tyre_missing_remark:{
      type: Sequelize.STRING(255),
      defaultValue: "",
      allowNull: false,
    },
   app_body_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  ai_guided_value:{
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue:0,
  }, 

  },
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName: "applications",
  }
);

module.exports = Application;