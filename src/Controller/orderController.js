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
const Usermaster = require("../Database/models/userMaster");
const Manufmaster = require("../Database/models/Manufmaster");
const Modelmaster = require("../Database/models/Modelmaster");
const VariantMaster = require("../Database/models/VarientMaster");
const StateMaster = require("../Database/models/StateMaster");
const BankMaster = require("../Database/models/BankMaster");
// const VehicleInformation = require("../Database/models/VehicleInformation");
// Services
const emailService = require("../services/emailService");
const prefixService = require("../services/prefixService");

const Sequelize = JobManage.sequelize;

// ---------------- Order Create API ----------------
const orderCreate = async (req, res) => {
  const payload = req.body;
  const transaction = await Sequelize.transaction();

  try {
    // ---------------- Validate token first ----------------
    const token =
      payload.AuthenticationToken ||
      payload.auth_token ||
      payload.authenticationToken;
    const user = await Usermaster.findOne({
      where: { auth_token: token },
    });
    console.log("User found:", user);
    console.log("AuthenticationToken:", token);

    if (!user) {
      await transaction.rollback();
      return res.status(401).json({
        success: false,
        message: "Invalid Authentication Token",
      });
    }

    // ---------------- Log file creation ----------------
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
    } catch (err) {
      fs.writeFileSync(
        logFilePath,
        `${formattedDate} | ORDER CREATION | -- || ${JSON.stringify(payload)}\n`
      );
    }

    // ---------------- Validation ----------------
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
    const matched = await v.check();
    if (!matched) {
      let message = Object.values(v.errors).flat().join(" ");
      await transaction.rollback();
      return res.status(200).send({ success: false, message });
    }

    // ---------------- Check for existing job ----------------
    const from_date = moment().format("YYYY-MM-01");
    const to_date = moment().format("YYYY-MM-DD");

    const foundData = await JobManage.findOne({
      where: {
        [Op.and]: [
          { reg_no: payload.reg_no },
          { bank_id: payload.client },
          { edate: { [Op.gte]: from_date } },
          { edate: { [Op.lte]: to_date } },
          { edate: { [Op.notIn]: [5] } },
        ],
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

    // ---------------- Validate references ----------------
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

    // ---------------- Prepare date/time ----------------
    const edate = moment().format("YYYY-MM-DD");
    const etime = moment().format("H:mm:ss");

// ---------------- Create JobManage first ----------------
const jobs = await JobManage.create(
  {
    ...payload,
    initiate_date: edate,
    edate,
    etime,
    assigned_vendor_date: edate,
    bank_id: payload.client,
    banker_id: banker ? banker.uid : 0,
    src_from: 1,
    bank_type: payload.bank_type,
    rcor_not: payload.rcor_not,
    process: payload.process,
    order_source: payload.order_source,
    order_type: payload.order_type,
    remarks: payload.remarks,
    partner_type: payload.partner_type,
    pincode: payload.pincode,
    state: payload.state,
    city: payload.city,
  },
  { transaction }
);

// ---------------- Create Application linked to JobManage ----------------
const application = await Application.create(
  {
    ref_no: jobs.uid,
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
    job_id: jobs.uid,
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
  },
  { transaction }
);

// ---------------- Update JobManage with application_id ----------------
await jobs.update({ application_id: application.uid }, { transaction });


    // ---------------- Create supporting records ----------------
    await ApplicationsInspection.create(
      { application_id: application.uid },
      { transaction }
    );
    await VahanItems.create(
      { app_uid: application.uid, bank_id: payload.client },
      { transaction }
    );

    // ---------------- Build case id and update JobManage ----------------
    const prefix = prefixService.getPreAndPostfix("prefix");
    const postfix = prefixService.getPreAndPostfix("postfix");
    const caseid = `${prefix}/${jobs.uid}/${postfix}`;

    await JobManage.update(
      {
        case_id: caseid,
        application_id: application.uid,
        report_status: 11,
        bank_id: payload.client,
        rcfile: payload.rcfile_name,
      },
      { where: { uid: jobs.uid }, transaction }
    );

    // ---------------- Emails & Logs ----------------
    const maker_name = makerExists.manuf_name;
    const model_name = modelExists.model_name;
    const variant_name = variantExists.variant_name;
    const client_name = bankMasterExists.bank_name;

    const setAllEmails = [payload.order_source_email, payload.client_off_email];
    const subject_b = `New case received for the vehicle number-${payload.reg_no}`;
    const message_b = `Dear Concern,<br/><br/>Please find the details of the new lead below<br/>
      <table border='1' cellspacing='0' cellpadding='0'>
        <tr><td>Banker Name-</td><td>${client_name}</td></tr>
        <tr><td>Customer Name-</td><td>${payload.customer_name}</td></tr>
        <tr><td>Customer mobile number-</td><td>${payload.contact_no}</td></tr>
        <tr><td>Vehicle Number-</td><td>${payload.reg_no}</td></tr>
        <tr><td>Make Model-</td><td>${maker_name} / ${model_name}</td></tr>
        <tr><td>Banker ex Name-</td><td>${payload.executive}</td></tr>
        <tr><td>Banker ex Number-</td><td>${payload.executive_contact}</td></tr>
      </table><br/><br/>Regards<br/>TVS Team`;

    // send mail (no blocking on result expected)
    await emailService.sendEmail({
      email_id: setAllEmails,
      subject: subject_b,
      html: message_b,
      attachments: null,
    });

    await LogsEmail.create(
      { description: subject_b + ", " + setAllEmails.toString(), edate, etime },
      { transaction }
    );

    // ---------------- Update application report link ----------------
    const order_visit_link = prefixService.genVisitLink(`${application.uid}`);
    await Application.update(
      {
        report_link: order_visit_link,
        report_status: 11,
        bank_id: payload.client,
      },
      { where: { uid: application.uid }, transaction }
    );

    // ---------------- Audit trail / Job Notes ----------------
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

    // ---------------- Order message (SMS/WhatsApp etc) ----------------
    await emailService.sendOrderMessage({
      banker_name: client_name,
      customer_name: payload.customer_name,
      customer_contact: payload.contact_no,
      vehicle_number: payload.reg_no,
      maker: maker_name || "NA",
      model: model_name || "NA",
      banker_exname: payload.executive || "NA",
      banker_excontact: payload.executive_contact || "NA",
      loan_no: payload.loan_account_no,
      banker_mobile: payload.client_off_mobile,
      exe_1: payload.executive_no_1,
      exe_2: payload.executive_no_2,
    });

    // ---------------- Commit transaction ----------------
    await transaction.commit();

    return res.json({
      success: true,
      message: "Order Created Successfully",
      jobId: jobs.uid,
      applicationId: application.uid,
    });
  } catch (err) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });
  }
};

const orderHistoryList = async (req, res) => {
  try {
    const payload = req.body;

    // Validation (keep rules; aggregate errors properly)
    const rules = {
      AuthenticationToken: "required",
      searchKey: "required|nullable",
      fromDate: "required|nullable",
      toDate: "required|nullable",
      statusId: "required|nullable|string",
      techId: "required|nullable|string",
      client: "required|nullable|string",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
    };

    const v = new Validator(payload, rules);
    if (!(await v.check())) {
      const message = Object.values(v.errors)
        .flatMap((arr) => arr)
        .join(" ");
      return res.status(200).send({ success: false, message });
    }

    // User fetch
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

    // Password reset check (keep flow; change to a flag so frontend can decide)
    const lastResetDate = new Date(user.getDataValue("last_reset_date"));
    const daysDifference = Math.ceil(
      (Date.now() - lastResetDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const needs_password_reset = daysDifference > 30;

    // Utility: split comma lists
    const parseList = (raw) =>
      raw && String(raw).length
        ? String(raw)
            .split(",")
            .map((id) => id.trim())
            .filter((s) => s !== "")
            .map((id) => Number(id))
        : [];

    const selectedBank = parseList(user.getDataValue("selected_bank"));
    const selectedDistrict = parseList(user.getDataValue("selected_city"));
    const selectedStates = parseList(user.getDataValue("selected_state"));

    // Normalize statusId (string -> number where applicable)
    const statusIdRaw = payload.statusId;
    const statusId =
      statusIdRaw === null || statusIdRaw === "null" || statusIdRaw === ""
        ? null
        : Number(statusIdRaw);

    // Parse dates safely (treat as inclusive range with YYYY-MM-DD)
    const hasDates =
      payload.fromDate &&
      payload.toDate &&
      payload.fromDate !== "null" &&
      payload.toDate !== "null";

    const parseDate = (dateString) =>
      dateString ? moment(dateString, "YYYY-MM-DD").toDate() : null;

    const whereAnd = [];

    // Search conditions
    if (payload.searchKey || payload.statusId || payload.client) {
      const orSearch = [];
      if (payload.searchKey) {
        orSearch.push({ reg_no: { [Op.like]: `%${payload.searchKey}%` } });
      }
      if (payload.statusId && payload.client) {
        orSearch.push({
          report_status: String(payload.statusId),
          bank_id: payload.client,
        });
      } else if (payload.statusId) {
        orSearch.push({ report_status: String(payload.statusId) });
      } else if (payload.client) {
        orSearch.push({ bank_id: payload.client });
      }
      if (orSearch.length) {
        whereAnd.push({ [Op.or]: orSearch });
      }
    }

    // Date-field mapping (use numeric key)
    const statusDateMap = {
      6: "order_completed_date",
      7: "inspection_done_date",
      4: "follow_up_date",
      5: "cancel_date",
      8: "unassign_date",
      0: "edate",
      3: "assigned_tech_date",
    };

    if (hasDates) {
      const fromDate = parseDate(payload.fromDate);
      const toDate = parseDate(payload.toDate);

      if (statusId !== null && statusDateMap[statusId]) {
        const dateField = statusDateMap[statusId];
        const cond = {
          [dateField]: { [Op.between]: [fromDate, toDate] },
          report_status: String(statusId),
        };
        if (String(statusId) === "3" && payload.techId) {
          cond.assigned_technician = payload.techId;
        }
        whereAnd.push(cond);
      } else {
        // fallback to assigned_tech_date when no status filter
        whereAnd.push({
          assigned_tech_date: { [Op.between]: [fromDate, toDate] },
        });
      }
    }

    // Role/tech specific filters (preserve flow; make empty arrays safe)
    if (payload.techId == null) {
      if (selectedBank.length) {
        whereAnd.push({ bank_id: { [Op.in]: selectedBank } });
      }
    } else {
      whereAnd.push({ assigned_technician: payload.techId });
    }

    if (user.getDataValue("role_id") !== 5 && selectedStates.length) {
      whereAnd.push({ state: { [Op.in]: selectedStates } });
    }

    // If user has selected_bank != "0" enforce it
    if (
      user.getDataValue("selected_bank") &&
      user.getDataValue("selected_bank") !== "0" &&
      selectedBank.length
    ) {
      whereAnd.push({ bank_id: { [Op.in]: selectedBank } });
    }

    // Compose where
    const where = whereAnd.length ? { [Op.and]: whereAnd } : {};

    // Status-specific counts (preserve special case for statusId === "3")
    let inspectionCompletedForTech = 0;
    if (String(payload.statusId) === "3" && payload.techId) {
      inspectionCompletedForTech = await JobManage.count({
        where: {
          report_status: "7",
          assigned_technician: payload.techId,
          ...(selectedStates.length
            ? { state: { [Op.in]: selectedStates } }
            : {}),
        },
      });
    }

    // Pagination (add total count)
    const limit = Number(payload.limit);
    const page = Number(payload.offset); // original code uses offset * limit
    const offset = page * limit;

    // Fetch rows
    const foundData = await JobManage.findAll({
      where,
      limit,
      offset,
      order: [["uid", "DESC"]],
      include: [
        { model: StateMaster, attributes: ["state_name"], as: "state_master" },
        {
          model: ReportStatus,
          attributes: ["status_name"],
          as: "report_master",
        },
        { model: BankMaster, attributes: ["bank_name"], as: "client_master" },
        {
          model: ProcessMaster,
          attributes: ["process_type"],
          as: "process_master",
        },
      ],
    });

    // Total count for same where
    const totalCount = await JobManage.count({ where });

    // Group counts by status name (preserve behavior)
    const groupedData = foundData.reduce((acc, r) => {
      const s = r.report_master?.status_name;
      if (s) acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    const count = { ...groupedData };
    if (String(payload.statusId) === "3") {
      count["Inspection Completed"] = inspectionCompletedForTech;
    }

    const formattedData = foundData.map((r) => ({
      uid: r.uid,
      customer_name: r.customer_name,
      client_type: r.client_master?.bank_name?.toUpperCase() || null,
      reg_no: r.reg_no?.toUpperCase?.() || r.reg_no,
      chassis_no: r.chassis_no,
      state_name: r.state_master?.state_name || null,
      status_name: r.report_master?.status_name || null,
      initiate_date: r.initiate_date,
      process_type: r.process_master?.process_type?.toUpperCase() || null,
    }));

    return res.status(200).json({
      success: true,
      needs_password_reset,
      data: formattedData,
      count,
      pagination: {
        total: totalCount,
        limit,
        page, // zero-based page index as per original offset*limit usage
        returned: formattedData.length,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { orderCreate, orderHistoryList };
