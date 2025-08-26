const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const PasswordHistory = sequelize.define(
  'PasswordHistory',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usermaster', // Reference table
        key: 'uid',
      },
      onDelete: 'CASCADE', // ✅ if user deleted, clear history
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'password_history',
    collate: 'utf8mb4_general_ci',
    timestamps: false, // ✅ we already defined created_at & updated_at
    indexes: [
      {
        fields: ['uid'], // ✅ improves lookup speed when checking password history per user
      },
    ],
  }
);

module.exports = PasswordHistory;
