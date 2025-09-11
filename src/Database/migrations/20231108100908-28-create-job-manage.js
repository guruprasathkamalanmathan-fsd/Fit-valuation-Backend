'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('job_manage', {
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
                allowNull: false,
            },
            bank_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            company: {
                type: Sequelize.STRING(255),
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
            reg_no: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            place: {
                type: Sequelize.STRING(255),
                allowNull: false,
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
                allowNull: false,
            },
            payment_status: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            report_status: {
                type: Sequelize.INTEGER,
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
                allowNull: false,
            },
            doc_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            exprice: {
                type: Sequelize.DECIMAL(15, 2),
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
                allowNull: false,
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
                type: Sequelize.BIGINT,
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
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            process: {
                type: Sequelize.STRING(255),
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
                allowNull: false,
            },
            assigned_vendor_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            assigned_tech_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            qc_byuser: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            qc_status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            qc_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            qc_time: {
                type: Sequelize.TIME,
                allowNull: false,
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
            },
            qc_done_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            qc_done_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            inspection_done_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            inspection_done_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            order_completed_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            order_completed_time: {
                type: Sequelize.TIME,
                allowNull: false,
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
                allowNull: false,
            },
            follow_up_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            app_remark: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            order_additional_remark: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            app_done_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            followup_done_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            order_status_form_remark: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            follow_up_created_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            cancelled_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            unassigned_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
                allowNull: false,
            },
            follow_up_remark: {
                type: Sequelize.STRING(255),
                allowNull: false,
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
                allowNull: false,
            },
            cancel_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            unassign_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            unassign_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            technician_start_location: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            technician_end_location: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            technician_distance: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            inspection_done_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
                allowNull: false,
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
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('job_manage');
    }
};