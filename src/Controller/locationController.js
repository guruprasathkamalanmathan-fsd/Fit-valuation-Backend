// Import dependencies
const Sequelize = require("sequelize");

//models
const CityMaster = require("../Database/models/CityMaster");
const StateMaster = require("../Database/models/StateMaster");
const DistrictMaster = require("../Database/models/DistrictMaster");
const Usermaster = require("../Database/models/userMaster");
const { Validator } = require("node-input-validator");

const Op = Sequelize.Op;

// CITY LIST
const cityList = async (req, res) => {
  try {
    const { AuthenticationToken, searchKey, stateId, limit, offset } = req.body;

    const v = new Validator(
      { AuthenticationToken, searchKey, stateId, limit, offset },
      {
        AuthenticationToken: "required",
        searchKey: "string",
        stateId: "required|integer",
        limit: "required|integer|min:0",
        offset: "required|integer|min:0",
      }
    );

    const matched = await v.check();
    if (!matched) {
      let results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      return res.status(200).json({ success: false, message });
    }

    const user = await Usermaster.findOne({
      where: { auth_token: AuthenticationToken },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token not match" });
    }

    const where = {
      ...(searchKey && {
        [Op.or]: [{ city_name: { [Op.like]: `%${searchKey}%` } }],
      }),
      state_id: stateId,
    };

    const foundData = await CityMaster.findAll({
      where: {
        [Op.and]: [where, stateId && { state_id: stateId }],
      },
      attributes: ["uid", "city_name", "state_id", "district_id"],
      order: [["city_name", "ASC"]],
      limit,
      offset: offset * limit,
    });

    const count = await CityMaster.count({ where });
    return res
      .status(200)
      .json({ success: true, data: foundData || [], count });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// DISTRICT LIST
const districtList = async (req, res) => {
  try {
    const { AuthenticationToken, searchKey, stateId, limit, offset } = req.body;

    const v = new Validator(
      { AuthenticationToken, searchKey, stateId, limit, offset },
      {
        AuthenticationToken: "required",
        searchKey: "string",
        stateId: "required|integer",
        limit: "required|integer|min:0",
        offset: "required|integer|min:0",
      }
    );

    const matched = await v.check();
    if (!matched) {
      let results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      return res.status(200).json({ success: false, message });
    }

    const user = await Usermaster.findOne({
      where: { auth_token: AuthenticationToken },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token not match " });
    }

    const selectedDistrictRaw = user.getDataValue("selected_district");
    const selectedDistrict = selectedDistrictRaw
      ? selectedDistrictRaw.split(",").map((districtId) => +districtId)
      : [];

    const where = {
      ...(searchKey && {
        [Op.or]: [{ district_name: { [Op.like]: `%${searchKey}%` } }],
      }),
      state_id: stateId,
    };
    console.log("Where condition:", JSON.stringify(where, null, 2));

    const count = await DistrictMaster.count({
      where: {
        [Op.and]: [where, { uid: { [Op.in]: selectedDistrict } }],
      },
    });

    const foundData = await DistrictMaster.findAll({
      where: {
        [Op.and]: [where, { uid: { [Op.in]: selectedDistrict } }],
      },
      attributes: ["uid", "district_name"],
      order: [["district_name", "ASC"]],
      limit,
      offset: offset * limit,
    });
    console.log("Selected Districts:", selectedDistrict);

    return res
      .status(200)
      .json({ success: true, data: foundData || [], count });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// STATE LIST
const stateList = async (req, res) => {
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
      const message = results.map((e) => e.message).join(" ");
      return res.status(200).send({ success: false, message });
    }

    // validate user
    const user = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken },
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token not match" });
    }

    // extract user states
    const selectedStatesRaw = user.getDataValue("selected_state");
    let selectedStates = selectedStatesRaw
      ? selectedStatesRaw.split(",").map((stateId) => +stateId)
      : [];

    // if no selected states, fetch all
    let stateFilter = {};
    if (selectedStates.length > 0) {
      stateFilter = { uid: { [Op.in]: selectedStates } };
    }

    // build search filter
    let where = {};
    if (payload.searchKey) {
      where = {
        [Op.or]: [{ state_name: { [Op.like]: `%${payload.searchKey}%` } }],
      };
    }

    // count and fetch
    const count = await StateMaster.count({
      where: {
        [Op.and]: [where, stateFilter],
      },
    });

    const foundData = await StateMaster.findAll({
      where: {
        [Op.and]: [where, stateFilter],
      },
      attributes: ["uid", "state_name"],
      order: [["state_name", "ASC"]],
      limit: payload.limit,
      offset: payload.offset * payload.limit,
    });

    return res
      .status(200)
      .json({ success: true, data: foundData || [], count: count });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// STATE CITY LIST
const stateCityList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      searchKey: "string|nullable",
      offset: "required|integer|min:0",
    };

    const v = new Validator(payload, validatorRules);
    const matched = await v.check();
    if (!matched) {
      const message = Object.values(v.errors).map((e) => e.message).join(" ");
      return res.status(200).json({ success: false, message });
    }

    // Validate user
    const user = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken },
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token not match" });
    }

    // ------------------- States -------------------
    const stateWhere = payload.searchKey
      ? { state_name: { [Op.like]: `%${payload.searchKey}%` } }
      : {};

    const stateCount = await StateMaster.count({ where: stateWhere });
    const stateData = await StateMaster.findAll({
      where: stateWhere,
      attributes: ["uid", "state_name"],
      order: [["state_name", "ASC"]],
    });

    // ------------------- Cities -------------------
    let cityWhere = {};
    if (payload.searchKey) {
      // Find the matching state
      const state = await StateMaster.findOne({
        where: { state_name: { [Op.like]: `%${payload.searchKey}%` } },
      });

      if (state) {
        cityWhere = { state_id: state.uid }; // fetch cities under this state
      } else {
        cityWhere = { state_id: 0 }; // return empty if state not found
      }
    }

    const cityCount = await CityMaster.count({ where: cityWhere });
    const cityData = await CityMaster.findAll({
      where: cityWhere,
      attributes: ["uid", "city_name", "state_id", "district_id"],
      order: [["city_name", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: { state: stateData || [], city: cityData || [] },
      count: { state: stateCount, city: cityCount },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { cityList, districtList, stateList, stateCityList };
