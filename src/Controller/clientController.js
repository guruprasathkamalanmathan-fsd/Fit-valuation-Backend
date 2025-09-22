const Sequelize = require("sequelize");
const Usermaster = require("../Database/models/userMaster");
const BankMaster = require("../Database/models/BankMaster")
const { Validator } = require("node-input-validator");

const Op = Sequelize.Op;

const clientList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      searchKey: "string",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
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

    const user = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken},
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed - 1" });
    }

    const selectedBankRaw = user.getDataValue("selected_bank");
    const selectedBank = selectedBankRaw
      ? selectedBankRaw.split(",").map((bankId) => +bankId)
      : [];

    let where = {};
    if (
      payload.searchKey != null &&
      payload.searchKey !== "" &&
      payload.searchKey !== undefined
    ) {
      where = {
        [Op.or]: [{ bank_name: { [Op.like]: `%${payload.searchKey}%` } }],
      };
    }

    const count = await BankMaster.count({
      where: {
        [Op.and]: [where, { uid: { [Op.in]: selectedBank } }],
      },
    });

    const foundData = await BankMaster.findAll({
      where: {
        [Op.and]: [where],
        uid: { [Op.in]: selectedBank },
      },
      limit: payload.limit,
      offset: payload.offset * payload.limit,
    });

    return res.status(200).json({
      success: true,
      data: foundData || [],
      count,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {clientList};
