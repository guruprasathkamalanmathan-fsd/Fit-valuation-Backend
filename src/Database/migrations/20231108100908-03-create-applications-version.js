'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applications_version', {
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
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      ref_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      place: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      name_add_org_owner: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contact: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      year_mfg: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      as_per_decoder: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reg_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      chassis_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      eng_no: {
        type: Sequelize.TEXT,
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
        allowNull: false,
      },
      km_readng: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      policy_and_validity: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      equ_value: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      risk_covered: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      insurance_upto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      certificate_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      permit_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tax_details: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rto_location: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      road_tax_upto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fitness_upto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      eng_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      chassis_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      battery_make: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tyre_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fair_market_value: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      distress_sale_value: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      executive_id: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      banker_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      insp_agency: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      doc1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc2: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc3: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc4: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc5: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc6: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc7: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc8: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc9: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc10: {
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
        allowNull: false,
      },
      modify_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      createdby_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mech_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_d_pump: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_cl_eng: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_axle: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_ig_sys: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_steering: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_oil_leak: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_trans: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_brake: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_raid: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_g_shift: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mech_suspention: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_bumper: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_door_left: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_dashboard: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_head_lamp: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_door_right: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_seats: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      final_load_body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      final_cabin: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      final_engine: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      final_document: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      final_recomend: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      final_rating_star: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      insp_date: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      val_purpose: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sla_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      initiated_by: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      proposed_owner: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reg_date: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reg_location: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      owner_sno: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_sno: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      hyp_with: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      hyp_from_date: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      invoice_date: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      asset_class: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      elec_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      battery_avail: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      battery_sno: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tyre_total: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      horse_power: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      suspension: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      any_damage: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      no_cylinder: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gear_trans: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      no_battery: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rear_condition: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      stepney: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      break_system: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      color_condition: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rc_booked: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      permit: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ins_comp_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ins_validity: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cur_inv_cost: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      appr_value: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      dep_per: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      dep_value: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      no_photo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      valuer_comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      chassis_imp: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      declaration: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      company: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      client: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      seating: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      report_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tyre_center_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tyre_rear_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      idv: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      veh_color: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fuel_used: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      proposed_hire: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      hpn_with: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      veh_class: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      laden_w: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      un_laden_w: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      registered_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type_makes: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      battery_cond: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      date_survey: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      date_allot_survey: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      remarks_recom: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      present_maker_val: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      loss_assesor: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      veh_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      remarks_mech_unit: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      remarks_body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      billing_rs: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      tyre_front_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      branch_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      borrower_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      owner_address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ins_validity_to: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      valuer_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      insured_value: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      bill_rs: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      doc11: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      subject: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      person_init: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      insp_time: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      veh_ins_by: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      veh_moved: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      eng_started: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      prev_reg_no: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      odo_meter: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      permit_status: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      permit_valid_upto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      route_ops: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tax_paid: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      valid_to: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      policy_type: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      model_status: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      any_aci: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      inv_value: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      any_repair: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin1_month: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin1_val: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin2: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin2_month: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin2_val: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin3: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin3_month: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fin3_val: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tyre: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      upholstery: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ac: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cd_player: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      veh_cond: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      org_paper: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      org_paper_v: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      overall_cond_stas: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      overall_cond: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      veh_life: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      veh_used: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      month_yr_mfg: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      third_party: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      permit_type: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      intr_state: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reg_cert: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tax_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      permit_copy: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      other_remarks: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      remarks_damage: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      lafid: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      place_origin: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mac_serial: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pur_year: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ref_year: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ops_hrs: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      power_cons: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      equ_size: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      current_ops_cond: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      is_amc: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rep_value: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      machinery: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reg_auth: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      field_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fld1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld2: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld3: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld4: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld5: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      maker_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      model_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      battery_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      executive_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc12: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc13: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc14: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc15: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc16: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc17: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc18: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc19: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      doc20: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      fld6: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld7: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld8: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld9: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld10: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld11: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld12: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld13: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld14: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld15: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld16: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld17: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld18: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld19: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld20: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld21: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld22: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld23: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld24: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld25: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld26: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld27: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld28: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld29: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld30: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld31: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld32: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld33: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld34: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld35: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld36: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld37: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld38: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld39: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld40: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld41: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld42: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld43: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld44: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld45: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld46: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld47: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld48: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld49: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld50: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld51: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld52: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld53: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld54: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld55: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld56: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld57: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld58: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld59: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld60: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld61: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld62: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld63: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld64: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld65: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld66: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld67: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld68: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld69: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld70: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld71: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld72: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld73: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld74: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld75: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld76: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld77: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld78: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld79: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld80: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld81: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld82: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld83: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld84: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld85: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld86: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld87: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld88: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld89: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld90: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld91: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld92: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld93: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld94: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld95: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld96: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld97: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld98: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld99: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld100: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld101: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      modify_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assigned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      fld102: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fld103: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      technician_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      media_files: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      report_link: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      check_report_done_or_hold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      app_reason_text: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      app_reason_remark: {
        type: Sequelize.STRING(255),
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('applications_version');
  }
};