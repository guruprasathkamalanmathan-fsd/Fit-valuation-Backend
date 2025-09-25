const Sequelize = require("sequelize");


const JobManage = require("../Database/models/JobManage");
const Usermaster = require("../Database/models/userMaster");
const VendorMaster = require("../Database/models/VendorMaster");
const InsuranceCompanyMaster = require("../Database/models/InsuranceCompanyMaster");

const axios = require("axios");
const { Validator } = require("node-input-validator");

const Op = Sequelize.Op;

// Technician List
const technicianList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      orderId: "required",
      searchKey: "string",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
      company_type: "required|integer|min:0",
      company_id: "required",
    };
    const v = new Validator(payload, validatorRules);
    const matched = await v.check();
    if (!matched) {
      let results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      res.status(200).send({ success: false, message });
    } else {
      await JobManage.findOne({
        where: {
          [Op.and]: [{ uid: payload.orderId }],
        },
        attributes: ["state"],
      })
        .then(async (foundData) => {
          if (foundData) {
            let where = {};
            if (payload.searchKey) {
              where = {
                [Op.or]: [
                  { first_name: { [Op.like]: `%${payload.searchKey}%` } },
                  { middle_name: { [Op.like]: `%${payload.searchKey}%` } },
                  { last_name: { [Op.like]: `%${payload.searchKey}%` } },
                ],
              };
            }
            let technicians = {};
            if (payload.company_type != 1) {
              technicians = await Usermaster.findAndCountAll({
                where: {
                  [Op.and]: [
                    where,
                    Sequelize.fn(
                      "FIND_IN_SET",
                      foundData.state,
                      Sequelize.col("selected_state")
                    ),
                    { role_id: 5 },
                    { company_type: 0 },
                  ],
                },
                attributes: [
                  "uid",
                  "username",
                  "first_name",
                  "middle_name",
                  "last_name",
                ],
                limit: payload.limit,
                offset: payload.offset * payload.limit,
              });
            }
            if (payload.company_type == 1) {
              technicians = await Usermaster.findAndCountAll({
                where: {
                  [Op.and]: [
                    where,
                    Sequelize.fn("FIND_IN_SET", 5, Sequelize.col("role_id")),
                    { company_type: 1 },
                    { company_id: payload.company_id },
                  ],
                },
                attributes: [
                  "uid",
                  "username",
                  "first_name",
                  "middle_name",
                  "last_name",
                ],
                limit: payload.limit,
                offset: payload.offset * payload.limit,
              });
            }
            return res.status(200).json({ success: true, data: technicians });
          } else {
            return res.status(400).json({
              success: false,
              message: "Order Id is invalid",
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({ success: false, message: err.message });
        });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Agent List
const agentList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      orderId: "required",
      searchKey: "required|nullable",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
      company_type: "required|integer|min:0",
      company_id: "required",
      stateId: "required|nullable",
    };
    const v = new Validator(payload, validatorRules);
    const matched = await v.check();
    if (!matched) {
      let results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      res.status(200).send({ success: false, message });
    } else {
      await JobManage.findOne({
        where: {
          [Op.and]: [{ uid: payload.orderId }],
        },
        attributes: ["state"],
      })
        .then(async (foundData) => {
          if (foundData) {
            let state = foundData.state;
            if (payload.stateId) {
              state = payload.stateId;
            }
            let where = {};
            if (payload.searchKey) {
              where = {
                [Op.or]: [
                  { first_name: { [Op.like]: `%${payload.searchKey}%` } },
                  { middle_name: { [Op.like]: `%${payload.searchKey}%` } },
                  { last_name: { [Op.like]: `%${payload.searchKey}%` } },
                ],
              };
            }
            let technicians = {};
            if (payload.company_type == 1) {
              technicians = await Usermaster.findAndCountAll({
                raw: true,
                where: {
                  [Op.and]: [
                    where,
                    Sequelize.fn("FIND_IN_SET", 1, Sequelize.col("role_id")),
                    { company_type: 1 },
                    { company_id: payload.company_id },
                  ],
                },
                order: [["first_name", "ASC"]],
                attributes: [
                  "uid",
                  "username",
                  "first_name",
                  "middle_name",
                  "last_name",
                ],
                include: {
                  model: VendorMaster,
                  attributes: ["selected_state", "company"],
                  where: Sequelize.fn(
                    "FIND_IN_SET",
                    state,
                    Sequelize.col("vendor_master.selected_state")
                  ),
                },
                limit: payload.limit,
                offset: payload.offset * payload.limit,
              });
            }
            if (payload.company_type != 1) {
              technicians = await Usermaster.findAndCountAll({
                raw: true,
                where: {
                  [Op.and]: [
                    where,
                    Sequelize.fn("FIND_IN_SET", 1, Sequelize.col("role_id")),
                    { company_type: 1 },
                  ],
                },
                order: [["first_name", "ASC"]],
                attributes: [
                  "uid",
                  "username",
                  "first_name",
                  "middle_name",
                  "last_name",
                ],
                include: {
                  model: VendorMaster,
                  attributes: ["selected_state", "company"],
                  where: Sequelize.fn(
                    "FIND_IN_SET",
                    state,
                    Sequelize.col("vendor_master.selected_state")
                  ),
                },
                limit: payload.limit,
                offset: payload.offset * payload.limit,
              });
            }
            return res.status(200).json({ success: true, data: technicians });
          } else {
            return res.status(400).json({
              success: false,
              message: "Order Id is invalid",
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({ success: false, message: err.message });
        });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Company List
const companyList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
    };

    const validator = new Validator(payload, validatorRules);
    const isValid = await validator.check();

    if (!isValid) {
      const errors = Object.values(validator.errors);
      const errorMessage = errors.map((e) => e.message).join("");
      return res.status(200).send({ success: false, message: errorMessage });
    }

    const user = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed - 1" });
    }

    const count = await InsuranceCompanyMaster.count({ where: {} });
    const foundData = await InsuranceCompanyMaster.findAll({
      where: {},
      attributes: ["uid", "company"],
      order: [["company", "ASC"]],
    });

    const responseData = {
      success: true,
      data: foundData || [],
      count: count,
    };

    return res.status(200).json(responseData);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Initiate Call To Customer
const initiateCallToCustomer = async (req, res) => {
  try {
    const { AuthenticationToken, orderId } = req.body;

    const validationRules = {
      AuthenticationToken: "required",
      orderId: "required",
    };

    const v = new Validator({ AuthenticationToken, orderId }, validationRules);

    const isValid = await v.check();

    if (!isValid) {
      const errorMessage = Object.values(v.errors)
        .map((e) => e.message)
        .join("");
      return res.status(200).json({ success: false, message: errorMessage });
    }

    const user = await Usermaster.findOne({
      where: { auth_token: AuthenticationToken },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed - 1" });
    }

    const TechContact = user.getDataValue("mobile_official"); //Technician Contact

    if (!TechContact || !/^\d{10}$/.test(TechContact)) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Technician Number" });
    }

    const foundData = await JobManage.findOne({
      where: { uid: orderId },
      attributes: ["contact_no"],
    });

    if (
      !foundData ||
      !foundData.getDataValue("contact_no") ||
      !/^\d{10}$/.test(foundData.getDataValue("contact_no"))
    ) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Customer Mobile Number" });
    }

    const customerContact = foundData.getDataValue("contact_no") || ""; // Customer Contact
    // Parse the JSON string from the .env file
    const postData = JSON.parse(process.env.POST_DATA || "{}");

    postData.callFlowConfiguration.initiateCall_1.participants[0].participantAddress =
      TechContact;
    postData.callFlowConfiguration.addParticipant_1.participants[0].participantAddress =
      customerContact;

    // API URL
    const apiUrl = process.env.API_URL || ""; // Add API URL to .env

    // Configure headers
    const headers = {
      Authorization: process.env.Authorization || "",
    };

    if (!headers.Authorization) {
      return res
        .status(200)
        .json({ success: false, message: "Authorization is required" });
    }

    const response = await axios.post(apiUrl, postData, { headers });
    const responseData = Array.isArray(response.data)
      ? response.data
      : [response.data];

    const { status, correlationId } = responseData[0];

    let message = "";
    if (status === "success") {
      message = "Call Initiated to Customer";
    } else {
      message = "Customer is engaged in another call.";
    }

    const jsonResponse = { status, message, correlationId };

    return res.status(200).json({ success: true, data: [jsonResponse] });
  } catch (error) {
    console.error("Error fetching Call Response:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  technicianList,
  agentList,
  companyList,
  initiateCallToCustomer,
};
