const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const JobNotes = sequelize.define("job_notes", 
{
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    template: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    remarks: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    created_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    created_time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    created_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    job_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
    },
    created_username: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    other_detail: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
},);

module.exports = JobNotes;