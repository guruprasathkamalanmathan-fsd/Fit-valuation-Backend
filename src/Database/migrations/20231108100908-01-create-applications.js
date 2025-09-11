'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('applications', {
            uid: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            bank_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            application_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            ref_no: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            place: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            name_add_org_owner: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            contact: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            year_mfg: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            as_per_decoder: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            reg_no: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            chassis_no: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            eng_no: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            maker_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            model_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            body_type: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            km_readng: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            policy_and_validity: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            insurance_upto: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            permit_no: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            tax_details: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fitness_upto: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fair_market_value: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false
            },
            executive_id: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            banker_name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            insp_agency: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            payment: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false
            },
            payment_status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            remarks: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            job_id: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            doc1: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc2: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc3: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc4: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc5: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc6: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc7: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc8: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc9: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc10: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            edate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            etime: {
                type: Sequelize.TIME,
                allowNull: false
            },
            modify_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            modify_time: {
                type: Sequelize.TIME,
                allowNull: false
            },
            createdby_user: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            mech_trans: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            hyp_with: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            suspension: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            rc_booked: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            permit: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            declaration: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            company: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            client: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            seating: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            report_status: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            idv: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            veh_color: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            hpn_with: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            veh_class: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            remarks_recom: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            present_maker_val: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false
            },
            veh_condition: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            owner_address: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            ins_validity_to: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc11: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            subject: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            odo_meter: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            permit_status: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            permit_valid_upto: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            valid_to: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            policy_type: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            any_aci: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fin1: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            tyre: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            ac: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            cd_player: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            veh_cond: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            rating: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            veh_used: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            month_yr_mfg: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            permit_type: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            intr_state: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            rto: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            tax_token: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            permit_copy: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            other_remarks: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            capacity: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            reg_auth: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            field_category: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            fld1: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld2: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld3: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld4: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld5: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            maker_name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            model_name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            body_name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            battery_name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            executive_name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc12: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc13: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc14: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc15: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc16: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc17: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc18: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc19: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            doc20: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            vendorId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            fld6: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld7: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld8: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld9: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld10: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld11: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld12: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld13: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld14: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld15: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld16: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld17: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld18: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld19: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld20: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld21: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld22: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld23: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld24: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld25: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld26: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld27: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld28: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld29: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld30: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld31: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld32: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld33: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            modify_by: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            assigned: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            fld102: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fld103: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            technician_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            media_files: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            report_link: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            check_report_done_or_hold: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            app_reason_text: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            app_reason_remark: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            picture_line_position: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            resell_value: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc21: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc22: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc23: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc24: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc25: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc26: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc27: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc28: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc29: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc30: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc31: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc32: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            doc33: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            ex_showroom_price: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            variant_name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            app_insurance_status: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            engine_cc: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            is_dedupe: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            vahan_search_uid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            show_hide_vahan: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('applications');
    }
};