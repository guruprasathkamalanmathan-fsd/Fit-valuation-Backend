const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const Application = sequelize.define(
  "applications",
  {
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    bank_id: { type: Sequelize.INTEGER, allowNull: false },
    application_date: { type: Sequelize.DATE, allowNull: false },
    ref_no: { type: Sequelize.STRING(50), allowNull: false },
    place: { type: Sequelize.STRING(500), allowNull: true },
    
    // on future defaultValue: "" can lead to error if means change the value to null

    name_add_org_owner: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    contact: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    year_mfg: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    as_per_decoder: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    reg_no: { type: Sequelize.STRING(50), allowNull: false },
    chassis_no: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    eng_no: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },

    maker_id: { type: Sequelize.INTEGER, allowNull: false },
    model_id: { type: Sequelize.INTEGER, allowNull: false },
    body_type: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

    km_readng: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    policy_and_validity: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    insurance_upto: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    permit_no: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    tax_details: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    fitness_upto: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },

    fair_market_value: { type: Sequelize.DECIMAL(15, 2), defaultValue: 0.0, allowNull: false },
    distress_sale_value: { type: Sequelize.DECIMAL(15, 2), defaultValue: 0.0, allowNull: false },

    executive_id: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    banker_name: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    insp_agency: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    payment: { type: Sequelize.DECIMAL(15, 2), defaultValue: 0.0, allowNull: false },
    payment_status: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

    remarks: { type: Sequelize.STRING(500), defaultValue: "", allowNull: false },
    job_id: { type: Sequelize.INTEGER, allowNull: false },

    // docs 1–10
    ...Object.fromEntries(
      Array.from({ length: 10 }, (_, i) => [
        `doc${i + 1}`,
        { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
      ])
    ),

    // Fix invalid defaults for DATE/TIME — Sequelize won’t accept `0` as default
    edate: { type: Sequelize.DATE, allowNull: true },
    etime: { type: Sequelize.TIME, allowNull: true },
    modify_date: { type: Sequelize.DATE, allowNull: true },
    modify_time: { type: Sequelize.TIME, allowNull: true },

    createdby_user: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    mech_trans: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    hyp_with: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    suspension: { type: Sequelize.STRING(50), defaultValue: "", allowNull: true },
    rc_booked: { type: Sequelize.STRING(50), defaultValue: "", allowNull: true },
    permit: { type: Sequelize.STRING(50), defaultValue: "", allowNull: true },
    declaration: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    company: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    client: { type: Sequelize.STRING(50), allowNull: false },
    seating: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    report_status: { type: Sequelize.STRING(50), allowNull: false },
    idv: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    veh_color: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    hpn_with: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    veh_class: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    remarks_recom: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    present_maker_val: { type: Sequelize.DECIMAL(15, 2), defaultValue: 0.0, allowNull: false },
    veh_condition: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    owner_address: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    ins_validity_to: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },

    doc11: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    subject: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    odo_meter: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    permit_status: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    permit_valid_upto: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    valid_to: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    policy_type: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    any_aci: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    fin1: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    tyre: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    ac: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    cd_player: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    veh_cond: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    rating: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    veh_used: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    month_yr_mfg: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    permit_type: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    intr_state: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    rto: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    tax_token: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    permit_copy: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    other_remarks: { type: Sequelize.TEXT, defaultValue: "", allowNull: false }, // changed to string(500) to TEXT 
    capacity: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    reg_auth: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    field_category: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

    // fld1–33
    ...Object.fromEntries(
      Array.from({ length: 33 }, (_, i) => [
        `fld${i + 1}`,
        { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
      ])
    ),

    maker_name: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    model_name: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    body_name: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    battery_name: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    executive_name: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },

    // docs 12–42
    ...Object.fromEntries(
      Array.from({ length: 31 }, (_, i) => [
        `doc${i + 12}`,
        { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
      ])
    ),

    vendor_id: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

    modify_by: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    assigned: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

    fld102: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },
    fld103: { type: Sequelize.STRING(50), defaultValue: "", allowNull: false },

    technician_id: { type: Sequelize.INTEGER, allowNull: false },
    media_files: { type: Sequelize.STRING(255), defaultValue: "", allowNull: false },
    report_link: { type: Sequelize.STRING(255), defaultValue: "", allowNull: false },
    check_report_done_or_hold: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    app_reason_text: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    app_reason_remark: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    picture_line_position: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    resell_value: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },

    ex_showroom_price: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    variant_name: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    app_insurance_status: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },
    engine_cc: { type: Sequelize.STRING(100), defaultValue: "", allowNull: false },

    is_dedupe: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    vahan_search_uid: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
    show_hide_vahan: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

    from_tech_odometer: { type: Sequelize.STRING(255), defaultValue: "", allowNull: false },

    // tyre1–14
    ...Object.fromEntries(
      Array.from({ length: 14 }, (_, i) => [
        `tyre${i + 1}_percentage`,
        { type: Sequelize.STRING(255), defaultValue: "", allowNull: false },
      ])
    ),
    // changed string(225) to text in below colunm
    api_tech_remarks: { type: Sequelize.TEXT, defaultValue: "", allowNull: false },
    app_black_list: { type: Sequelize.TEXT, defaultValue: "", allowNull: false },
    app_body_paint: { type: Sequelize.TEXT, defaultValue: "", allowNull: false },
    app_length_body: { type: Sequelize.TEXT, defaultValue: "", allowNull: false },
    app_veh_current_address: { type: Sequelize.TEXT, defaultValue: "", allowNull: false },
    app_tyre_missing_remark: { type: Sequelize.TEXT, defaultValue: "", allowNull: false },

    app_body_type: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    ai_guided_value: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName: "applications",
  }
);

module.exports = Application;
