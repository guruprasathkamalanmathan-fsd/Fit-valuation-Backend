const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async (app) => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected to server");

    // 🔥 Sync models with DB
    await sequelize.sync();
    console.log("✅ Tables created");
    
  } catch (err) {
    console.error("❌ DB connecting error... Check connection", err);
    app.set("HEALTH_STATUS", "DB_MIGRATION_FAILED");
  }
};

module.exports = { sequelize, connectDB };
