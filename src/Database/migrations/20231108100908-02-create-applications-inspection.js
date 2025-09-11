'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('applications_inspection', {
            uid: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            application_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            inspection_comment: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_title1: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            ins_reason1: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark1: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status1: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_reason2: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark2: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status2: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title3: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason3: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark3: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status3: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title4: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason4: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark4: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_status4: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title5: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason5: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark5: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status5: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title6: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason6: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_remark6: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status6: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title7: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason7: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark7: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status7: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title8: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason8: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark8: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status8: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title9: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason9: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark9: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status9: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_title10: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason10: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark10: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status10: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title11: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_reason11: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark11: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status11: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title12: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason12: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark12: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status12: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title13: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason13: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_remark13: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_status13: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title14: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason14: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark14: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status14: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_title15: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason15: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark15: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status15: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title16: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason16: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark16: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status16: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title17: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_reason17: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark17: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_status17: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title18: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason18: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark18: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status18: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title19: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason19: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark19: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status19: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title20: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason20: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark20: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status20: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title21: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason21: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_remark21: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status21: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title22: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason22: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark22: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status22: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title23: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason23: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark23: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status23: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title24: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason24: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark24: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_title25: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_reason25: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark25: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title26: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason26: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark26: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_status26: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title27: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason27: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark27: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status27: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title28: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason28: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark28: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status28: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title29: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason29: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark29: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status29: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title30: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason30: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark30: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status30: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title31: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason31: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark31: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status31: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title32: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason32: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark32: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status32: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title33: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason33: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_remark33: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_status33: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title34: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_reason34: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark34: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status34: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title35: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason35: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark35: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status35: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title36: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason36: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark36: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status36: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title37: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason37: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark37: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status37: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title38: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason38: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark38: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status38: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title39: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason39: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark39: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status39: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title40: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason40: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status40: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title41: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason41: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark41: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status41: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title42: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason42: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark42: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status42: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title43: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason43: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark43: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status43: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title44: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason44: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark44: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status44: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_title45: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason45: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark45: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status45: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title46: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason46: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark46: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status46: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title47: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason47: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark47: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status47: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title48: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason48: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark48: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status48: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title49: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason49: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark49: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status49: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title50: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason50: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark50: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status50: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title51: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason51: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark51: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status51: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title52: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason52: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark52: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status52: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title53: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_reason53: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark53: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status53: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title54: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason54: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark54: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status54: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title55: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason55: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark55: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status55: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title56: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason56: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark56: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status56: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title57: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason57: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark57: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status57: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title58: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason58: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark58: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status58: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title59: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason59: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark59: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status59: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title60: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason60: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark60: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status60: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title61: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason61: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark61: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status61: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title62: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason62: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark62: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status62: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title63: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason63: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark63: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status63: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title64: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason64: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark64: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status64: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title65: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            insReason65: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark65: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status65: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title66: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason66: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark66: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status66: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title67: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason67: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark67: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status67: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title68: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason68: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark68: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status68: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title69: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_season69: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark69: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status69: {
                type: Sequelize.STRING(1),
                allowNull: true,
            },
            ins_title70: {
                type: Sequelize.STRING(3),
                allowNull: true,
            },
            ins_reason70: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_remark70: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            ins_status70: {
                type: Sequelize.STRING(1),
                allowNull: true,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('applications_inspection');
    }
};