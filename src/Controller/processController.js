const Sequelize = require("sequelize");
const ProcessMaster = require("../Database/models/ProcessMaster");
// const StateMaster = require("../Database/models/StateMaster");
const Usermaster = require("../Database/models/userMaster");
const ReportStatus = require("../Database/models/ReportStatus");
const { Validator } = require("node-input-validator");

const Op = Sequelize.Op;

// ---------- processList ----------
const processList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      UserName: "required",
      AuthenticationToken: "required",
    };

    const v = new Validator(payload, validatorRules);
    const matched = await v.check();

    if (!matched) {
      const results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      return res.status(200).send({ success: false, message });
    }

    const foundData = await Usermaster.findOne({
      where: {
        [Op.and]: [
          { username: payload.UserName },
          { auth_token: payload.AuthenticationToken },
        ],
      },
    });

    if (!foundData) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed - 1",
      });
    }

    const process = foundData.selected_process == null
      ? null
      : foundData.selected_process.split(",");

    const processIds = await ProcessMaster.findAll({
      where: { uid: process },
      attributes: ["uid", "process_type_code", "process_type", "vehicle_type"],
    });

    return res.status(200).json({ success: true, data: processIds });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ---------- statusList ----------
const statusList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
    };

    const v = new Validator(payload, validatorRules);
    const matched = await v.check();

    if (!matched) {
      const results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      return res.status(200).send({ success: false, message });
    }

    const foundData = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken },
    });

    if (!foundData) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed - 1",
      });
    }

    let processIds;

    if (foundData.dataValues.role_id == 5) {
      // If role is 5, list specific uids (7 and 3)
      processIds = await ReportStatus.findAll({
        attributes: ["uid", "status_name"],
        where: { uid: [7, 3] },
      });
    } else {
      // If role is not 5, show all names
      processIds = await ReportStatus.findAll({
        attributes: ["uid", "status_name"],
      });
    }

    return res.status(200).json({ success: true, data: processIds });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  processList,
  statusList,
};
