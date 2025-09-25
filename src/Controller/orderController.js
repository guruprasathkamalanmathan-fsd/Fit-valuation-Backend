const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const Validator = require("validatorjs");
const { Op } = require("sequelize");

// Import models
const JobManage = require("../Database/models/JobManage");
const Application = require("../Database/models/Application");
const ApplicationsInspection = require("../Database/models/ApplicationInspection");
const VahanItems = require("../Database/models/VahanItems");
const LogsEmail = require("../Database/models/LogsEmail");
const JobNotes = require("../Database/models/JobNotes");
const ProcessMaster = require("../Database/models/ProcessMaster");
const CityMaster = require("../Database/models/CityMaster");
const ReportStatus = require("../Database/models/ReportStatus");
const Usermaster = require("../Database/models/userMaster");
const Manufmaster = require("../Database/models/Manufmaster");
const Modelmaster = require("../Database/models/Modelmaster");
const VariantMaster = require("../Database/models/VarientMaster");
const StateMaster = require("../Database/models/StateMaster");
const BankMaster = require("../Database/models/BankMaster");
const VehicleInformation = require("../Database/models/VehicleInformation");
// Services
const emailService = require("../services/emailService");
const prefixService = require("../services/prefixService");
const vahanService = require("../services/vahanServices");

const Sequelize = JobManage.sequelize;

// ---------------- Order Create API --------------
const orderCreate = async (req, res) => {
  const payload = req.body;
  const transaction = await Sequelize.transaction();

  try {
    /** ---------------- Normalize values ---------------- */
    const token =
      payload.AuthenticationToken ||
      payload.auth_token ||
      payload.authenticationToken;

    const rcMap = {
      "Original RC": 1,
      "Xerox RC": 2,
      "Without RC": 3,
      RC: 1, // add mapping for 'RC' if used
    };
    payload.rcor_not = rcMap[payload.rcor_not] || payload.rcor_not;

    const paymentStatusMap = {
      Pending: 1,
      Paid: 2,
      Failed: 3,
      Processing: 4,
    };
    payload.payment_status = paymentStatusMap[payload.payment_status] ?? 0;

    /** ---------------- User authentication ---------------- */
    const user = await Usermaster.findOne({ where: { auth_token: token } });
    if (!user) {
      await transaction.rollback();
      return res.status(401).json({
        success: false,
        message: "Invalid Authentication Token",
      });
    }

    /** ---------------- Log file creation ---------------- */
    const currentDate = moment().tz("Asia/Kolkata");
    const formattedDate = currentDate.toISOString();
    const folderName = `${currentDate.year()}-${
      currentDate.month() + 1
    }-${currentDate.date()}`;
    const logFolderPath = path.join(
      "./",
      "log/order-creation-info",
      folderName
    );
    if (!fs.existsSync(logFolderPath))
      fs.mkdirSync(logFolderPath, { recursive: true });

    const logFilePath = path.join(logFolderPath, "order-info.log");
    try {
      const fileStats = fs.statSync(logFilePath);
      const fileCreationDate = new Date(fileStats.ctime);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      if (fileCreationDate < oneWeekAgo) {
        const newLogFileName = `order-info-${formattedDate}.log`;
        fs.writeFileSync(path.join(logFolderPath, newLogFileName), "");
      } else {
        fs.appendFileSync(
          logFilePath,
          `${formattedDate} | ORDER CREATION | -- || ${JSON.stringify(
            payload
          )}\n`
        );
      }
    } catch {
      fs.writeFileSync(
        logFilePath,
        `${formattedDate} | ORDER CREATION | -- || ${JSON.stringify(payload)}\n`
      );
    }

    /** ---------------- Validation ---------------- */
    const validatorRules = {
      AuthenticationToken: "required",
      reg_no: "required",
      client: "required",
      bank_type: "required",
      rcor_not: "required",
      banker_id: "required",
      process: "required",
      order_source: "required",
      customer_name: "required",
      contact_no: "required",
      loan_account_no: "required",
      state: "required",
      city: "required",
      order_type: "required",
    };

    const v = new Validator(payload, validatorRules);
    if (!(await v.check())) {
      const message = Object.values(v.errors).flat().join(" ");
      await transaction.rollback();
      return res.status(200).send({ success: false, message });
    }

    /** ---------------- Check for existing job ---------------- */
    const from_date = moment().format("YYYY-MM-01");
    const to_date = moment().format("YYYY-MM-DD");

    const foundData = await JobManage.findOne({
      where: {
        reg_no: payload.reg_no,
        bank_id: payload.client,
        edate: { [Op.gte]: from_date, [Op.lte]: to_date, [Op.notIn]: [5] },
      },
    });

    if (foundData) {
      await transaction.rollback();
      return res.status(200).json({
        success: false,
        message: "This vehicle already exists",
        jobId: foundData.uid,
      });
    }

    /** ---------------- Validate references ---------------- */
    const makerExists = await Manufmaster.findOne({
      where: { uid: payload.maker_id },
    });
    if (!makerExists)
      throw new Error(`Maker ID ${payload.maker_id} does not exist.`);

    const modelExists = await Modelmaster.findOne({
      where: { uid: payload.model_id },
    });
    if (!modelExists)
      throw new Error(`Model ID ${payload.model_id} does not exist.`);

    const variantExists = await VariantMaster.findOne({
      where: { uid: payload.variant_id },
    });
    if (!variantExists)
      throw new Error(`Variant ID ${payload.variant_id} does not exist.`);

    const stateExists = await StateMaster.findOne({
      where: { uid: payload.state },
    });
    if (!stateExists)
      throw new Error(`State ID ${payload.state} does not exist.`);

    const bankMasterExists = await BankMaster.findOne({
      where: { uid: payload.client },
    });
    if (!bankMasterExists)
      throw new Error(`Bank ID ${payload.client} does not exist.`);

    const banker = await Usermaster.findOne({
      where: { uid: payload.banker_id },
    });
    if (!banker)
      throw new Error(`Banker not found for banker_id=${payload.banker_id}`);

    /** ---------------- Prepare date/time ---------------- */
    const edate = moment().format("YYYY-MM-DD");
    const etime = moment().format("H:mm:ss");

    /** ---------------- Create JobManage (parent for now) ---------------- */
    const jobs = await JobManage.create(
      {
        ...payload,
        initiate_date: edate,
        edate,
        etime,
        assigned_vendor_date: edate,
        bank_id: payload.client,
        banker_id: banker.uid,
        src_from: 1,
      },
      { transaction }
    );

    /** ---------------- Create Application (child) ---------------- */
    const application = await Application.create(
      {
        ref_no: "", // can update later
        bank_id: payload.client,
        reg_no: payload.reg_no,
        place: payload.address,
        payment: payload.payment,
        payment_status: payload.payment_status,
        report_status: "0",
        edate,
        etime,
        field_category: 0,
        application_date: edate,
        vendor_id: payload.vendor_id,
        technician_id: payload.assigned_technician,
        client: payload.client,
        maker_name: makerExists.manuf_name,
        model_name: modelExists.model_name,
        variant_name: variantExists.variant_name,
        maker_id: payload.maker_id,
        model_id: payload.model_id,
        fld1: payload.variant_id,
        fld30: payload.proposal_name,
        src_from: 1,
        job_id: jobs.uid, // ✅ link job_id
      },
      { transaction }
    );

    /** ---------------- Update JobManage with application_id ---------------- */
    await JobManage.update(
      { application_id: application.uid },
      { where: { uid: jobs.uid }, transaction }
    );

    /** ---------------- Create supporting records ---------------- */
    await ApplicationsInspection.create(
      { application_id: application.uid },
      { transaction }
    );
    await VahanItems.create(
      { app_uid: application.uid, bank_id: payload.client },
      { transaction }
    );

    /** ---------------- Build case id ---------------- */
    const caseid = `${prefixService.getPreAndPostfix("prefix")}/${
      jobs.uid
    }/${prefixService.getPreAndPostfix("postfix")}`;
    await JobManage.update(
      {
        case_id: caseid,
        report_status: payload.report_status, // ✅ use provided value
        bank_id: payload.client,
        rcfile: payload.rcfile_name,
      },
      { where: { uid: jobs.uid }, transaction }
    );

    /** ---------------- Emails & Logs ---------------- */
    const subject_b = `New case received for the vehicle number-${payload.reg_no}`;
    const message_b = `Dear Concern,<br/><br/>Please find the details of the new lead below<br/>
      <table border='1' cellspacing='0' cellpadding='0'>
        <tr><td>Banker Name-</td><td>${bankMasterExists.bank_name}</td></tr>
        <tr><td>Customer Name-</td><td>${payload.customer_name}</td></tr>
        <tr><td>Customer mobile number-</td><td>${payload.contact_no}</td></tr>
        <tr><td>Vehicle Number-</td><td>${payload.reg_no}</td></tr>
        <tr><td>Make Model-</td><td>${makerExists.manuf_name} / ${modelExists.model_name}</td></tr>
        <tr><td>Banker ex Name-</td><td>${payload.executive}</td></tr>
        <tr><td>Banker ex Number-</td><td>${payload.executive_contact}</td></tr>
      </table><br/><br/>Regards<br/>TVS Team`;

    await emailService.sendEmail({
      email_id: [payload.order_source_email, payload.client_off_email],
      subject: subject_b,
      html: message_b,
    });
    await LogsEmail.create(
      {
        description: `${subject_b}, ${[
          payload.order_source_email,
          payload.client_off_email,
        ]}`,
        edate,
        etime,
      },
      { transaction }
    );

    /** ---------------- Update application report link ---------------- */
    await Application.update(
      {
        report_link: prefixService.genVisitLink(`${application.uid}`),
        report_status: "0",
        bank_id: payload.client,
      },
      { where: { uid: application.uid }, transaction }
    );

    /** ---------------- Audit trail ---------------- */
    await JobNotes.create(
      {
        template: 0,
        remarks: `<b>Order Created</b> by ${user.username}(${user.uid})`,
        created_date: edate,
        created_time: etime,
        created_user: user.uid,
        job_id: jobs.uid,
        created_username: user.username,
        other_detail: "API",
        status: "Order Created",
      },
      { transaction }
    );

    /** ---------------- Order message ---------------- */
    await emailService.sendOrderMessage({
      banker_name: bankMasterExists.bank_name,
      customer_name: payload.customer_name,
      customer_contact: payload.contact_no,
      vehicle_number: payload.reg_no,
      maker: makerExists.manuf_name || "NA",
      model: modelExists.model_name || "NA",
      banker_exname: payload.executive || "NA",
      banker_excontact: payload.executive_contact || "NA",
      loan_no: payload.loan_account_no,
      banker_mobile: payload.client_off_mobile,
      exe_1: payload.executive_no_1,
      exe_2: payload.executive_no_2,
    });

    /** ---------------- Commit transaction ---------------- */
    await transaction.commit();
    return res.json({
      success: true,
      message: "Order Created Successfully",
      jobId: jobs.uid,
    });
  } catch (err) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });
  }
};

//-----------------Order Histroy API ---------------
const orderHistoryList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      searchKey: "string",
      fromDate: "required|string",
      toDate: "required|string",
      statusId: "required|string",
      techId: "required|string",
      client: "required|string",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
    };
    const v = new Validator(payload, validatorRules);
    const matched = await v.check();
    if (!matched) {
      let results = Object.values(v.errors);
      let message = results.map((e) => e.message).join(", ");
      return res.status(200).send({ success: false, message }); // ✅ added return
    }

    //USER HIEARARCHY ORDER LIST
    const user = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken },
      attributes: [
        "role_id",
        "selected_bank",
        "selected_state",
        "selected_city",
        "selected_zone",
        "last_reset_date",
      ],
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed - 1" });
    }
    if (user) {
      const currentDate = new Date();
      const lastResetDate = new Date(user.getDataValue("last_reset_date"));
      const currentTimestamp = currentDate.getTime();
      const lastResetTimestamp = lastResetDate.getTime();

      const daysDifference = Math.ceil(
        (currentTimestamp - lastResetTimestamp) / (1000 * 60 * 60 * 24)
      );

      if (daysDifference > 30) {
        return res.status(200).json({
          success: true,
          message: "Reset your password now for enhanced security.",
        });
      }
    }

    const selectedBankRaw = user.getDataValue("selected_bank");
    const selectedDistrictRaw = user.getDataValue("selected_city");
    const selectedStatesRaw = user.getDataValue("selected_state");

    const selectedBank = selectedBankRaw
      ? selectedBankRaw.split(",").map((bankId) => +bankId)
      : [];
    const selectedDistrict = selectedDistrictRaw
      ? selectedDistrictRaw.split(",").map((districtId) => +districtId)
      : [];
    const selectedStates = selectedStatesRaw
      ? selectedStatesRaw.split(",").map((stateId) => +stateId)
      : [];

    const parseDate = (dateString) => {
      if (dateString === null) {
        return null;
      }
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const whereConditions = [];

    // Normalize numeric IDs
    const techId =
      payload.techId && payload.techId !== "0" ? +payload.techId : null;
    const clientId = payload.client ? +payload.client : null;
    const statusId = payload.statusId ? payload.statusId : null;

    // Condition 1: Search conditions
    const searchConditions = [];
    if (payload.searchKey) {
      searchConditions.push({
        reg_no: { [Op.like]: `%${payload.searchKey}%` },
      });
    }
    if (statusId && clientId) {
      searchConditions.push({ report_status: statusId, client: clientId });
    } else if (statusId && !clientId) {
      searchConditions.push({ report_status: statusId });
    } else if (!statusId && clientId) {
      searchConditions.push({ client: clientId });
    }
    if (searchConditions.length > 0) {
      whereConditions.push({ [Op.or]: searchConditions });
    }

    // Condition 2: Date range
    if (
      payload.fromDate &&
      payload.toDate &&
      payload.fromDate !== "null" &&
      payload.toDate !== "null"
    ) {
      const fromDate = parseDate(moment(payload.fromDate).format("YYYY-MM-DD"));
      const toDate = parseDate(moment(payload.toDate).format("YYYY-MM-DD"));

      switch (statusId) {
        case "6":
          whereConditions.push({
            order_completed_date: { [Op.between]: [fromDate, toDate] },
            report_status: "6",
          });
          break;
        case "7":
          whereConditions.push({
            inspection_done_date: { [Op.between]: [fromDate, toDate] },
            report_status: "7",
          });
          break;
        case "4":
          whereConditions.push({
            follow_up_date: { [Op.between]: [fromDate, toDate] },
            report_status: "4",
          });
          break;
        case "5":
          whereConditions.push({
            cancel_date: { [Op.between]: [fromDate, toDate] },
            report_status: "5",
          });
          break;
        case "8":
          whereConditions.push({
            unassign_date: { [Op.between]: [fromDate, toDate] },
            report_status: "8",
          });
          break;
        case "0":
          whereConditions.push({
            edate: { [Op.between]: [fromDate, toDate] },
            report_status: "0",
          });
          break;
        case "3":
          if (techId) {
            whereConditions.push({
              assigned_tech_date: { [Op.between]: [fromDate, toDate] },
              report_status: "3",
              assigned_technician: techId,
            });
          } else {
            whereConditions.push({
              assigned_tech_date: { [Op.between]: [fromDate, toDate] },
              report_status: "3",
            });
          }
          break;
        case "1":
          whereConditions.push({
            initiate_date: { [Op.between]: [fromDate, toDate] },
            report_status: "1",
          });
          break;
        default:
          whereConditions.push({
            assigned_tech_date: { [Op.between]: [fromDate, toDate] },
          });
          break;
      }
    }

    // Condition 3: Tech / Bank filter
    if (!techId) {
      if (selectedBank.length > 0) {
        whereConditions.push({ client: { [Op.in]: selectedBank } }); // ✅ client array
      }
    } else {
      whereConditions.push({ assigned_technician: techId });
    }

    // Condition 4: Role-based state filter
    if (user.getDataValue("role_id") != 5 && selectedStates.length > 0) {
      whereConditions.push({ state: { [Op.in]: selectedStates } });
    }

    // Remove empty objects
    const filteredConditions = whereConditions.filter(
      (cond) => Object.keys(cond).length > 0
    );

    // Final WHERE
    const finalWhere = { [Op.and]: filteredConditions };

    console.log("Final WHERE:", JSON.stringify(finalWhere, null, 2));

    let statuswhere = {};
    let counts = 0;
    if (payload.statusId != null && payload.statusId != undefined) {
      statuswhere = {
        [Op.and]: [{ report_status: payload.statusId }],
      };
    }
    if (
      payload.statusId != null &&
      payload.statusId != undefined &&
      payload.statusId == "3"
    ) {
      counts = await JobManage.count({
        where: {
          report_status: "7",
          assigned_technician: payload.techId,
          state: selectedStates,
        },
      });
    }

    await JobManage.findAll({
      where: {
        [Op.and]: [finalWhere, statuswhere], // ✅ use finalWhere
      },
      limit: payload.limit,
      offset: payload.offset * payload.limit,
      order: [["uid", "DESC"]],
      include: [
        {
          model: StateMaster,
          attributes: ["state_name"],
          as: "state_master",
          required: false, // ✅ safe
        },
        {
          model: ReportStatus,
          attributes: ["status_name"],
          as: "report_master",
          required: false,
        },
        {
          model: BankMaster,
          attributes: ["bank_name"],
          as: "client_master",
          required: false,
        },
        {
          model: ProcessMaster,
          attributes: ["process_type"],
          as: "process_master",
          required: false,
        },
      ],
    })
      .then(async (foundData) => {
        if (foundData) {
          const groupedData = foundData.reduce((acc, response) => {
            const statusName = response.report_master
              ? response.report_master.status_name
              : null;

            if (statusName) {
              acc[statusName] = (acc[statusName] || 0) + 1;
            }
            return acc;
          }, {});

          var count = Object.keys(groupedData).reduce((result, statusName) => {
            result[statusName] = groupedData[statusName];
            return result;
          }, {});
          if (
            payload.statusId != null &&
            payload.statusId != undefined &&
            payload.statusId == "3"
          ) {
            count["Inspection Completed"] = counts;
          }

          const formattedData = foundData.map((response) => ({
            uid: response.uid,
            customer_name: response.customer_name,
            client_type: response.client_master
              ? response.client_master.bank_name.toUpperCase()
              : null,
            reg_no: response.reg_no.toUpperCase(),
            chassis_no: response.chassis_no,
            state_name: response.state_master
              ? response.state_master.state_name
              : null,
            status_name: response.report_master
              ? response.report_master.status_name
              : null,
            initiate_date: response.initiate_date,
            process_type: response.process_master
              ? response.process_master.process_type.toUpperCase()
              : null,
          }));

          return res
            .status(200)
            .json({ success: true, data: formattedData, count });
        }
      })
      .catch((err) => {
        const errorMessage = err.message || "Internal Server Error";
        return res.status(500).json({ success: false, message: errorMessage });
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// -----------------Order History Details API -----------------
const orderHistoryDetails = async (req, res) => {
  try {
    const { AuthenticationToken, uid, limit, offset } = req.body;
    console.log("Incoming payload:", req.body);

    // ✅ Input validation
    const v = new Validator(
      { AuthenticationToken, uid, limit, offset },
      {
        AuthenticationToken: "required|string",
        uid: "required|integer",
        limit: "required|integer|min:0",
        offset: "required|integer|min:0",
      }
    );

    if (!(await v.check())) {
      const message = Object.values(v.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(200).json({ success: false, message:message || "Validation Failed" });
    }

    // ✅ User authentication
    const user = await Usermaster.findOne({
      where: { auth_token: AuthenticationToken },
      attributes: ["uid"], // fetch only required column
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token not match" });
    }

    // ✅ Fetch Job Data
    const where = {  uid: Number(uid)};
    console.log("UID after parsing:", uid);
    const [count, foundData] = await Promise.all([
      JobManage.count({ where }),
      JobManage.findOne({
        where,
        attributes: [
          "uid",
          "initiate_date",
          "reg_no",
          "chassis_no",
          "rcfile",
          "pincode",
          "customer_name",
          "contact_no",
          "address",
          "proposal_name",
          "loan_account_no",
          "executive_name",
          "executive_contact",
          "application_id",
          "bank_id",
          "assigned_tech_date",
        ],
        limit,
        offset: offset * limit,
        include: [
          { model: BankMaster, attributes: ["bank_name"], as: "client_master" },
          { model: ProcessMaster, attributes: ["process_type"], as: "process_master" },
          { model: Manufmaster, attributes: ["manuf_name"], as: "make_master" },
          { model: Modelmaster, attributes: ["model_name"], as: "model_master" },
          { model: VariantMaster, attributes: ["variant_name"], as: "variant_master" },
          { model: StateMaster, attributes: ["state_name"], as: "state_master" },
          { model: CityMaster, attributes: ["city_name"], as: "city_master" },
          { model: ReportStatus, attributes: ["status_name"], as: "report_master" },
        ],
      }),
    ]);

    const record = foundData.length > 0 ? foundData[0] : null;
    
    if (!record) {
      return res
        .status(200)
        .json({ success: true, message: "Invalid order ID" });
    }

    // ✅ Extract Data Once
    const {
      reg_no,
      uid: orderUid,
      initiate_date,
      bank_id,
      chassis_no,
      rcfile,
      pincode,
      customer_name,
      contact_no,
      address,
      proposal_name,
      loan_account_no,
      executive_name,
      executive_contact,
      application_id,
      assigned_tech_date,
      process_master,
      client_master,
      make_master,
      model_master,
      variant_master,
      state_master,
      city_master,
      report_master,
    } = record.dataValues;

    const formattedData = {
      uid: orderUid,
      initiate_date,
      bank_id,
      reg_no,
      chassis_no,
      rcfile,
      pincode,
      customer_name,
      contact_no,
      address,
      proposal_name,
      loan_account_no,
      executive_name,
      executive_contact,
      application_id,
      process_type: process_master?.process_type || null,
      client_type: client_master?.bank_name || null,
      make_name: make_master?.manuf_name || null,
      model_name: model_master?.model_name || null,
      variant_name: variant_master?.variant_name || null,
      state_name: state_master?.state_name || null,
      city_name: city_master?.city_name || null,
      status_name: report_master?.status_name || null,
    };

    // ✅ Fetch Vehicle Info
    let foundVechData = {};
    if (reg_no) {
      const vehicleRecord = await VehicleInformation.findOne({
        where: { registration_number: reg_no },
        attributes: [
          "temp_vahan_search_uid",
          "owner_name",
          "registered_place",
          "owner_mobile_no",
          "manufacturer",
          "manufacturer_model",
          "engine_number",
          "chassis_number",
          "registration_number",
          "registration_date",
          "m_registration",
          "m_registration_name",
          "y_registration",
          "body_type",
          "m_y_manufacturing",
          "m_manufacturing",
          "m_manufacturing_name",
          "y_manufacturing",
          "seating_capacity",
          "fuel_type",
          "insurance_name",
          "insurance_validity",
          "vehicle_class",
          "colour",
          "owner_serial_number",
          "number_of_cylinder",
          "permit_no",
          "fitness_upto",
          "insurance_policy_no",
          "permanent_address",
          "permit_validity_from",
          "permit_validity_upto",
          "permit_type",
          "financer",
          "noc_details",
          "norms_type",
          "blacklist_status",
          "puc_number",
          "current_address",
          "permit_issue_date",
          "npermit_upto",
          "father_name",
          "gross_vehicle_weight",
          "cubic_capacity",
          "status_message",
          "wheelbase",
          "status",
          "npermit_issued_by",
          "noc_status",
          "mv_tax_upto",
          "state",
          "npermit_no",
          "noc_valid_upto",
          "noc_issue_date",
          "status_verification",
          "puc_valid_upto",
          "unladden_weight",
          "standing_capacity",
          "status_verfy_date",
          "vehicle_category",
          "sleeper_capacity",
          "rc_expiry_date",
        ],
      });

      if (vehicleRecord) {
        foundVechData = vehicleRecord.dataValues || {};
      } else {
        const vehicleDetails = await vahanService.fetchAndUpdateVehicleData(record, res);
        foundVechData = vehicleDetails?.dataValues || {};
      }
    }

    // ✅ Merge final response safely
    const finalData = { ...formattedData, ...foundVechData };

    return res.status(200).json({ success: true, data: finalData, count });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// ------------------------Order-ReInitiated --------------------
const orderReInitiated = async (req, res) => {
  try {
    const { AuthenticationToken, orderId, re_initiate_remarks } = req.body;

    const validatorRules = {
      AuthenticationToken: "required",
      orderId: "required|integer",
      re_initiate_remarks: "required",
    };

    const v = new Validator(
      { AuthenticationToken, orderId, re_initiate_remarks },
      validatorRules
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

    // Check if the report_status is already 0 in JobManage
    const existingOrder = await JobManage.findOne({
      where: { uid: orderId, report_status: 0 },
    });

    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already Re-Initiated Successfully",
      });
    }

    const where = { uid: orderId };
    const foundData = await JobManage.update(
      {
        report_status: 0,
        re_initiate_remarks: re_initiate_remarks,
        modify_date: moment().tz("Asia/Kolkata").format("YYYY-MM-DD"),
        modify_time: moment().tz("Asia/Kolkata").format("H:mm:ss"),
      },
      { where }
    );

    if (!foundData) {
      return res
        .status(200)
        .json({ success: false, message: "Order Re-Initiated Failed" });
    }

    const updateApplication = await Application.update(
      {
        report_status: 0,
        modify_date: moment().tz("Asia/Kolkata").format("YYYY-MM-DD"),
        modify_time: moment().tz("Asia/Kolkata").format("H:mm:ss"),
      },
      { where: { job_id: orderId } }
    );

    if (!updateApplication) {
      return res.status(200).json({
        success: false,
        message: "Application Update Failed",
      });
    }

    let modify_date = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    let modify_time = moment().tz("Asia/Kolkata").format("H:mm:ss");
    let prefix = "tvs/";
    let postfix = modify_date;
    let caseid = prefix + "/" + orderId + "/" + postfix;
    let audit_caseid = caseid;
    let audit_caseno = orderId;
    let audit_template = 0;
    let statusname = "Re-initiate";
    let other_detail = "";
    let audit_remarks =
      "<b>" +
      statusname +
      "</b> by " +
      user?.dataValues.first_name +
      "(" +
      user?.dataValues.username +
      ")";

    let updatejobNotes = await JobNotes.create({
      template: audit_template,
      remarks: audit_remarks,
      created_date: modify_date,
      created_time: modify_time,
      created_user: user?.dataValues.uid,
      job_id: audit_caseno,
      created_username: user?.dataValues.first_name,
      other_detail: other_detail,
      status: statusname,
    });

    let jobManageData = await JobManage.findOne({
      where: { uid: orderId },
      attributes: [
        "customer_name",
        "bank_id",
        "contact_no",
        "reg_no",
        "maker_id",
        "model_id",
        "executive",
        "executive_contact",
        "order_source_email",
      ],
    });

    let client_name = "";
    let clients = await BankMaster.findOne({
      where: {
        uid: jobManageData.bank_id,
      },
      attributes: ["bank_name"],
    });
    if (clients) {
      client_name = clients?.bank_name;
    }

    let maker_name = "";
    let model_name = "";

    let manufs = await Manufmaster.findOne({
      where: {
        uid: jobManageData?.maker_id,
      },
      attributes: ["manuf_name"],
    });
    if (manufs) {
      maker_name = manufs.manuf_name;
    }

    let models = await Modelmaster.findOne({
      where: {
        uid: jobManageData?.model_id,
      },
      attributes: ["model_name"],
    });
    if (models) {
      model_name = models.model_name;
    }

    let jobManageMsgData = {
      jobManage: jobManageData,
      client_name: client_name,
      maker_name: maker_name,
      model_name: model_name,
    };

    statusController.orderReInitiate(jobManageMsgData);

    return res
      .status(200)
      .json({ success: true, message: "Order Re-Initiated Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// --------------------------Master Order Details List ------------------
const masterOrderDetailsList = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      searchKey: "string",
      fromDate: "string",
      toDate: "string",
      statusId: "string",
      techId: "string",
      client: "string",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
    };

    const v = new Validator(payload, validatorRules);
    const matched = await v.check();
    if (!matched) {
      let results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      return res.status(200).send({ success: false, message });
    }
    //USER HIEARARCHY ORDER LIST
    const user = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken },

      attributes: [
        "role_id",
        "selected_bank",
        "selected_state",
        "selected_city",
        "selected_zone",
        "last_reset_date",
      ],
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed - 1" });
    }
    if (user) {
      // Check if password reset date is older than 30 days
      const currentDate = new Date();
      const lastResetDate = new Date(user.getDataValue("last_reset_date"));
      const currentTimestamp = currentDate.getTime();
      const lastResetTimestamp = lastResetDate.getTime();

      const daysDifference = Math.ceil(
        (currentTimestamp - lastResetTimestamp) / (1000 * 60 * 60 * 24)
      );
      // let alert;
      if (daysDifference > 30) {
        return res.status(200).json({
          success: true,
          message: "Reset your password now for enhanced security.",
        });
      }
      // if (daysDifference > 27 && lastResetDate) {
      //   alert = 'Your password is set to expire soon.Kindly reset your password.'
      // }
    }
    //STATE SPLIT

    const selectedBankRaw = user.getDataValue("selected_bank");
    const selectedDistrictRaw = user.getDataValue("selected_city");
    const selectedStatesRaw = user.getDataValue("selected_state");

    const selectedBank = selectedBankRaw
      ? selectedBankRaw.split(",").map((bankId) => +bankId)
      : [];
    const selectedDistrict = selectedDistrictRaw
      ? selectedDistrictRaw.split(",").map((districtId) => +districtId)
      : [];
    const selectedStates = selectedStatesRaw
      ? selectedStatesRaw.split(",").map((stateId) => +stateId)
      : [];

    const parseDateSafe = (dateString) => {
      if (!dateString || dateString === "null") return null;
      const m = moment(dateString, "YYYY-MM-DD", true);
      return m.isValid() ? m.toDate() : null;
    };

    const whereConditions = [];

    // Condition 1: Search conditions
    if (
      payload.searchKey !== null ||
      payload.statusId !== null ||
      payload.client !== null
    ) {
      const searchConditions = [
        payload.searchKey
          ? { reg_no: { [Op.like]: `%${payload.searchKey}%` } }
          : {},
        payload.statusId !== null && payload.client !== null
          ? { report_status: payload.statusId, bank_id: payload.client }
          : {},
        payload.statusId !== null && payload.client === null
          ? { report_status: payload.statusId }
          : {},
        payload.statusId === null && payload.client !== null
          ? { bank_id: payload.client }
          : {},
      ];

      whereConditions.push({
        [Op.or]: searchConditions.filter(
          (condition) => Object.keys(condition).length > 0
        ),
      });
    }

    // Condition 2: Date range conditions based on statusId
    if (
      payload.statusId !== null &&
      payload.fromDate !== null &&
      payload.toDate !== null &&
      payload.fromDate !== "null" &&
      payload.toDate !== "null"
    ) {
      const fromDate = parseDateSafe(payload.fromDate);
      const toDate = parseDateSafe(payload.toDate);

      if (payload.statusId === "7") {
        //Inspection Completed
        whereConditions.push({
          inspection_done_date: { [Op.between]: [fromDate, toDate] },
          report_status: payload.statusId,
        });
      } else if (payload.statusId === "3") {
        //Technician Assigned
        whereConditions.push({
          assigned_tech_date: { [Op.between]: [fromDate, toDate] },
          report_status: payload.statusId,
          assigned_technician: payload.techId,
        });
      }
    } else if (
      payload.fromDate !== "null" &&
      payload.toDate !== "null" &&
      payload.fromDate !== null &&
      payload.toDate !== null
    ) {
      const fromDate = parseDate(moment(payload.fromDate).format("YYYY-MM-DD"));
      const toDate = parseDate(moment(payload.toDate).format("YYYY-MM-DD"));
      whereConditions.push({
        assigned_tech_date: { [Op.between]: [fromDate, toDate] },
        report_status: { [Op.in]: [3, 7] },
      });
    }

    if (payload.techId == null) {
      // ignore for technician login
      whereConditions.push({ bank_id: selectedBank });
    }

    if (payload.techId !== null) {
      // ignore for technician login
      whereConditions.push({ assigned_technician: payload.techId });
    }
    // whereConditions.push({ district: { [Op.in]: selectedDistrict } });
    if (user.getDataValue("role_id") != 5) {
      //Assign Tech Order List
      whereConditions.push({ state: { [Op.in]: selectedStates } });
    }

    // Final Where Clause
    const where = {
      [Op.and]: whereConditions,
    };

    if (selectedBankRaw && selectedBankRaw !== "0") {
      // ADMIN BANkID = 0
      where[Op.and].push({ bank_id: { [Op.in]: selectedBank } });
    }
    let statuswhere = {};
    let counts = 0;
    if (payload.statusId != null && payload.statusId != undefined) {
      statuswhere = {
        [Op.and]: [{ report_status: payload.statusId }],
      };
    }
    if (
      payload.statusId != null &&
      payload.statusId != undefined &&
      payload.statusId == "3"
    ) {
      // let statuswhere1 = {
      //   [Op.and]: [{ report_status: '7' }],
      // };
      counts = await JobManage.count({
        where: {
          report_status: "7",
          assigned_technician: payload.techId,
          //  state: selectedStates
        },
      });
    }
    await JobManage.findAll({
      where: {
        [Op.and]: [where, statuswhere],
        report_status: [7, 3],
      },
      limit: payload.limit,
      offset: payload.offset * payload.limit,
      order: [["uid", "DESC"]],
      include: [
        {
          model: StateMaster,
          attributes: ["state_name"],
          as: "state_master",
        },
        {
          model: CityMaster,
          attributes: ["city_name"],
          as: "city_master",
        },
        {
          model: ReportStatus,
          attributes: ["status_name"],
          as: "report_master",
        },
        {
          model: BankMaster,
          attributes: ["bank_name"],
          as: "client_master",
        },
        {
          model: ProcessMaster,
          attributes: ["process_type"],
          as: "process_master",
        },
        {
          model: Manufmaster,
          attributes: ["manuf_name"],
          as: "make_master",
        },
        {
          model: Modelmaster,
          attributes: ["model_name"],
          as: "model_master",
        },
        {
          model: VariantMaster,
          attributes: ["variant_name"],
          as: "variant_master",
        },
      ],
    })
      .then(async (foundData) => {
        if (foundData) {
          const groupedData = foundData.reduce((acc, response) => {
            const statusName = response.report_master
              ? response.report_master.status_name
              : null;

            if (statusName) {
              acc[statusName] = (acc[statusName] || 0) + 1;
            }
            return acc;
          }, {});

          var count = Object.keys(groupedData).reduce((result, statusName) => {
            result[statusName] = groupedData[statusName] || 0;
            return result;
          }, {});

          // Check if 'Inspection Completed' is not present in the result and add it with a value of 0
          if (!count.hasOwnProperty("Inspection Completed")) {
            count["Inspection Completed"] = 0;
          }

          // Check if 'Technician Assigned' is not present in the result and add it with a value of 0
          if (!count.hasOwnProperty("Technician Assigned")) {
            count["Technician Assigned"] = 0;
          }
          const formattedData = [];
          for (const foundDataItem of foundData) {
            try {
              // Fetch VehicleInformation
              let foundVechData = await VehicleInformation.findOne({
                where: { registration_number: foundDataItem.reg_no },
                attributes: [
                  "temp_vahan_search_uid",
                  "owner_name",
                  "registered_place",
                  "owner_mobile_no",
                  "manufacturer",
                  "manufacturer_model",
                  "engine_number",
                  "chassis_number",
                  "registration_number",
                  "registration_date",
                  "m_registration",
                  "m_registration_name",
                  "y_registration",
                  "body_type",
                  "m_y_manufacturing",
                  "m_manufacturing",
                  "m_manufacturing_name",
                  "y_manufacturing",
                  "seating_capacity",
                  "fuel_type",
                  "insurance_name",
                  "insurance_validity",
                  "vehicle_class",
                  "colour",
                  "owner_serial_number",
                  "number_of_cylinder",
                  "permit_no",
                  "fitness_upto",
                  "insurance_policy_no",
                  "permanent_address",
                  "permit_validity_from",
                  "permit_validity_upto",
                  "permit_type",
                  "financer",
                  "noc_details",
                  "norms_type",
                  "blacklist_status",
                  "puc_number",
                  "current_address",
                  "permit_issue_date",
                  "npermit_upto",
                  "father_name",
                  "gross_vehicle_weight",
                  "cubic_capacity",
                  "status_message",
                  "wheelbase",
                  "status",
                  "npermit_issued_by",
                  "noc_status",
                  "mv_tax_upto",
                  "state",
                  "npermit_no",
                  "noc_valid_upto",
                  "noc_issue_date",
                  "status_verification",
                  "puc_valid_upto",
                  "unladden_weight",
                  "standing_capacity",
                  "status_verfy_date",
                  "vehicle_category",
                  "sleeper_capacity",
                  "rc_expiry_date",
                ],
              });
              // Old Order Vehicle Information Fetch From Vahan API if not found in the database
              if (!foundVechData) {
                const foundData = foundDataItem;
                const vehicleNumber = foundDataItem.reg_no;
                const vehicleDetails =
                  await vahanService.fetchAndUpdateVehicleData(foundData, res);
                if (vehicleDetails == null) {
                  foundVechData = {
                    temp_vahan_search_uid: "",
                    owner_name: "",
                    registered_place: "",
                    owner_mobile_no: "",
                    manufacturer: "",
                    manufacturer_model: "",
                    engine_number: "",
                    chassis_number: "",
                    registration_number: vehicleNumber,
                    registration_date: "",
                    m_registration: "",
                    m_registration_name: "",
                    y_registration: "",
                    body_type: "",
                    m_y_manufacturing: "",
                    m_manufacturing: "",
                    m_manufacturing_name: "",
                    y_manufacturing: "",
                    seating_capacity: "",
                    fuel_type: "",
                    insurance_name: "",
                    insurance_validity: "",
                    vehicle_class: "",
                    colour: "",
                    owner_serial_number: "",
                    number_of_cylinder: "",
                    permit_no: "",
                    fitness_upto: "",
                    insurance_policy_no: "",
                    permanent_address: "",
                    permit_validity_from: "",
                    permit_validity_upto: "",
                    permit_type: "",
                    financer: "",
                    noc_details: "",
                    norms_type: "",
                    blacklist_status: "",
                    puc_number: "",
                    current_address: "",
                    permit_issue_date: "",
                    npermit_upto: "",
                    father_name: "",
                    gross_vehicle_weight: "",
                    cubic_capacity: "",
                    status_message: "",
                    wheelbase: "",
                    status: "",
                    npermit_issued_by: "",
                    noc_status: "",
                    mv_tax_upto: "",
                    state: "",
                    npermit_no: "",
                    noc_valid_upto: "",
                    noc_issue_date: "",
                    status_verification: "",
                    puc_valid_upto: "",
                    unladden_weight: "",
                    standing_capacity: "",
                    status_verfy_date: "",
                    vehicle_category: "",
                    sleeper_capacity: "",
                    rc_expiry_date: "",

                    uid: foundData.dataValues.uid,
                    bank_id: foundData.dataValues.bank_id,
                    initiate_date: foundData.dataValues.initiate_date,
                    assigned_tech_date: foundData.dataValues.assigned_tech_date,
                    customer_name: foundData.dataValues.customer_name,
                    process_type: foundData.dataValues.process_master
                      ? foundData.dataValues.process_master.process_type
                      : null,
                    client_type: foundData.dataValues.client_master
                      ? foundData.dataValues.client_master.bank_name
                      : null,
                    make_name: foundData.dataValues.make_master
                      ? foundData.dataValues.make_master.manuf_name
                      : null,
                    model_name: foundData.dataValues.model_master
                      ? foundData.dataValues.model_master.model_name
                      : null,
                    variant_name: foundData.dataValues.variant_master
                      ? foundData.dataValues.variant_master.variant_name
                      : null,
                    state_name: foundData.dataValues.state_master
                      ? foundData.dataValues.state_master.state_name
                      : null,
                    city_name: foundData.dataValues.city_master
                      ? foundData.dataValues.city_master.city_name
                      : null,
                    status_name: foundData.dataValues.report_master
                      ? foundData.dataValues.report_master.status_name
                      : null,
                    contact_no: foundData.dataValues.contact_no,
                    address: foundData.dataValues.address,
                    proposal_name: foundData.dataValues.proposal_name,
                    loan_account_no: foundData.dataValues.loan_account_no,
                    executive_name: foundData.dataValues.executive_name,
                    executive_contact: foundData.dataValues.executive_contact,
                    application_id: foundData.dataValues.application_id,
                  };
                } else {
                  foundVechData = vehicleDetails;
                }
              }
              // Construct the data object including JobNotes
              const orderListDetails = {
                uid: foundDataItem.uid,
                customer_name: foundDataItem.customer_name,
                client_type:
                  foundDataItem.client_master.bank_name.toUpperCase(),
                reg_no: foundDataItem.reg_no.toUpperCase(),
                chassis_no: foundDataItem.chassis_no,
                state_name:
                  foundDataItem.dataValues?.state_master?.dataValues
                    ?.state_name || null,
                status_name: foundDataItem.dataValues.report_master.dataValues
                  .status_name
                  ? foundDataItem.dataValues.report_master.dataValues
                      .status_name
                  : null,
                initiate_date: foundDataItem.initiate_date,
                process_type:
                  foundDataItem.process_master?.dataValues?.process_type ||
                  "null".toUpperCase(),
                assigned_tech_date: foundDataItem.assigned_tech_date,
              };
              let mergeData = {
                bank_id: foundDataItem.dataValues.bank_id,
                initiate_date: foundDataItem.initiate_date,
                assigned_tech_date: foundDataItem.assigned_tech_date,
                customer_name: foundDataItem.customer_name,
                client_type: foundDataItem.client_master.bank_name,
                status_name:
                  foundDataItem.dataValues?.report_master?.dataValues
                    ?.status_name || null,
                state_name:
                  foundDataItem.dataValues?.state_master?.dataValues
                    ?.state_name || null,
                city_name:
                  foundDataItem.dataValues?.city_master?.dataValues
                    ?.city_name || null,
                process_type:
                  foundDataItem.process_master?.dataValues?.process_type ||
                  null,
                contact_no: foundDataItem.dataValues.contact_no,
                address: foundDataItem.dataValues.address,
                proposal_name: foundDataItem.dataValues.proposal_name,
                loan_account_no: foundDataItem.dataValues.loan_account_no,
                executive_name: foundDataItem.dataValues.executive_name,
                executive_contact: foundDataItem.dataValues.executive_contact,
                make_name: foundDataItem.dataValues.make_master
                  ? foundDataItem.dataValues.make_master.manuf_name
                  : null,
                model_name: foundDataItem.dataValues.model_master
                  ? foundDataItem.dataValues.model_master.model_name
                  : null,
                variant_name: foundDataItem.dataValues.variant_master
                  ? foundDataItem.dataValues.variant_master.variant_name
                  : null,
                application_id: foundDataItem.dataValues.application_id,
              };

              foundVechData["uid"] = foundDataItem.uid;

              if (foundVechData?.dataValues) {
                foundVechData = Object.assign(
                  foundVechData?.dataValues,
                  mergeData
                );
              }
              const masterOrderDetails = {
                order_list: orderListDetails,
                order_details: foundVechData || null,
              };

              formattedData.push(masterOrderDetails); // Add valid data to the result array
            } catch (error) {
              console.error(
                `Error fetching data for registration number ${foundDataItem.reg_no}:`,
                error
              );
            }
          }
          return res
            .status(200)
            .json({ success: true, data: formattedData, count });
        }
      })
      .catch((err) => {
        const errorMessage = err.message || "Internal Server Error";
        return res.status(500).json({ success: false, message: errorMessage });
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// ------------------------- Get Activity ------------------------------
const getActivity = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      statusId: "string",
      techId: "string",
      limit: "required|integer|min:0",
      job_id: "required|integer|min:0",
      offset: "required|integer|min:0",
    };

    const v = new Validator(payload, validatorRules);
    const matched = await v.check();
    if (!matched) {
      let results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      return res.status(200).send({ success: false, message });
    }

    // USER HIERARCHY ORDER LIST
    const user = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken },
      attributes: ["uid"],
      raw: true,
    });

    const jobNotesData = await JobNotes.findAll({
      where: { job_id: payload.job_id },
      order: [["uid", "DESC"]],
      limit: payload.limit,
      offset: payload.offset * payload.limit,
      raw: true,
    });
    console.log("job id is", jobNotesData);

    // HTML remarks parser
    const parseHTMLRemarks = (remarks) => {
      const parsedRemarks = {};
      const regex = /<b>(.*?)<\/b>([\s\S]*?)(?=(?:<b>|$))/g;
      let match;
      remarks = remarks.replace(/\<br\/\>/g, "");

      while ((match = regex.exec(remarks)) !== null) {
        const [, key, value] = match;
        parsedRemarks[key.trim()] = value.trim();
      }

      return parsedRemarks;
    };

    const parsedJobNotes = jobNotesData.map((item) => ({
      uid: item.uid,
      template: item.template,
      remarks: parseHTMLRemarks(item.remarks || ""),
      created_date: item.created_date,
      created_time: item.created_time,
      created_user: item.created_user,
      job_id: item.job_id,
      created_username: item.created_username || "",
      status: item.status || "",
      other_detail: item.other_detail || "",
    }));

    return res.status(200).json({
      success: true,
      activity_log: parsedJobNotes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = {
  orderCreate,
  orderHistoryList,
  orderHistoryDetails,
  orderReInitiated,
  masterOrderDetailsList,
  getActivity,
};
