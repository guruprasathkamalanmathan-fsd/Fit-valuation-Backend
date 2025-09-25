const Sequelize = require("sequelize");

const Application = require("../Database/models/Application");
const JobAssigned = require("../Database/models/JobAssigned");
const JobManage = require("../Database/models/JobManage");
const JobNotes = require("../Database/models/JobNotes");
const Usermaster = require("../Database/models/userMaster");

const emailService = require("../services/emailService");
const moment = require("moment");

const Op = Sequelize.Op;

const { Validator } = require("node-input-validator");

const assignAgent = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      orderId: "required",
      agentId: "required",
      state: "required",
      remarks: "required",
    };
    const v = new Validator(payload, validatorRules);

    if (!(await v.check())) {
      let message = Object.values(v.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(200).send({ success: false, message });
    }

    // 1️⃣ Get the user from AuthenticationToken
    let users = await Usermaster.findOne({
      where: { auth_token: payload.AuthenticationToken },
    });
    console.log("Looking for token:", payload.AuthenticationToken);

    if (!users) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired AuthenticationToken",
      });
    }

    // 2️⃣ Get the agent details
    let foundData = await Usermaster.findOne({
      where: {
        [Op.and]: [
          { uid: payload.agentId },
          { email_official: { [Op.ne]: "" } },
        ],
      },
      attributes: [
        "uid",
        "company_id",
        "first_name",
        "email_official",
        "mobile_official",
        "pincode",
      ],
    });

    if (!foundData) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Agent Id" });
    }

    // 3️⃣ Assign the job (with duplicate check)
    let edate = moment().format("YYYY-MM-DD");
    let etime = moment().format("H:mm:ss");
    let jobData = {
      vendor_id: foundData.uid,
      job_id: payload.orderId,
      edate,
      etime,
      accept_date: edate,
      accept_time: etime,
      is_assigned_for_this_job: 0,
    };

    let existingAssign = await JobAssigned.findOne({
      where: {
        vendor_id: foundData.uid,
        job_id: payload.orderId,
      },
    });

    if (!existingAssign) {
      await JobAssigned.create(jobData);
    }

    // 4️⃣ Fetch job/order details
    let manufs = await JobManage.findOne({
      where: { uid: payload.orderId },
      attributes: [
        "executive_contact",
        "customer_name",
        "contact_no",
        "reg_no",
        "order_source_email",
        "loan_account_no",
        "application_id",
      ],
    });

    let executive_contact = "",
      customer_name = "",
      contact_no = "",
      reg_no = "",
      order_source_email = "",
      loan_account_no = "",
      application_id = "";
    if (manufs) {
      executive_contact = manufs.executive_contact;
      customer_name = manufs.customer_name;
      contact_no = manufs.contact_no;
      reg_no = manufs.reg_no.toUpperCase();
      order_source_email = manufs.order_source_email;
      loan_account_no = manufs.loan_account_no;
      application_id = manufs.application_id;
    }

    // 5️⃣ Send WhatsApp/email if executive contact exists
    if (executive_contact) {
      await emailService.sendAgentMessage({
        customer_name,
        contact_no,
        reg_no,
        reason: "Agent Assigned " + foundData.first_name,
        remarks: payload.remarks,
        executive_contact,
      });
    }

    let setAllEmails = [order_source_email, foundData.email_official];
    let subject_b = `New Case Assigned Vehicle Number: ${reg_no}`;
    let message_b = `Dear Concern,
      <br/><br/>
      New order assigned to you please find details below.
      <br/>
      <table border='1' cellspacing='0' cellpadding='0'><tr><th>Vehicle Number</th><th>Customer Name</th><th>Loan Account Number</th><th>Remark</th></tr>
      <tr><td>${reg_no}</td><td> ${customer_name}</td><td>${loan_account_no}</td><td>${payload.remarks}</td></tr>
      </table>
      <br/><br/>
      Regards<br/>TVS Team`;

    await emailService.sendEmail({
      email_id: setAllEmails,
      subject: subject_b,
      html: message_b,
      attachments: null,
    });

    // 6️⃣ Update JobManage and JobNotes
    let description = `<b>Updated By-</b> ${users.username}<br/><b>Remarks</b> ${payload.remarks}<br/>`;
    let jobManageData = {
      report_status: 1,
      assigned_vendor_date: edate,
      assigned_vendor_time: etime,
      modify_date: edate,
      modify_time: etime,
      vendor_id: payload.agentId,
      agent_assign_remark: payload.remarks,
      agent_assigned_by: users.uid,
    };
    await JobManage.update(jobManageData, { where: { uid: payload.orderId } });

    let jobNotes = {
      template: 0,
      remarks: description,
      created_date: edate,
      created_time: etime,
      created_user: users.uid,
      job_id: payload.orderId,
      created_username: users.username,
      other_detail: foundData.first_name,
      status: "Agent Assigned",
    };

    // 🔍 Prevent duplicate notes
    let existingNote = await JobNotes.findOne({
      where: {
        job_id: payload.orderId,
        created_user: users.uid,
        status: "Agent Assigned",
        remarks: description,
      },
    });

    if (!existingNote) {
      await JobNotes.create(jobNotes);
    }

    // 7️⃣ Update Application
    await Application.update(
      { report_status: 1 },
      { where: { job_id: payload.orderId, uid: application_id } }
    );

    return res.json({ success: true, message: "Agent Assigned Successfully!" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const fixAppointment = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      orderId: "required",
      technicianId: "required",
      appDate: "required",
      appTime: "required",
      appAddress: "required",
      remarks: "required",
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
      await Usermaster.findOne({
        where: {
          [Op.and]: [{ auth_token: payload.AuthenticationToken }],
        },
      })
        .then(async (foundData) => {
          if (foundData) {
            let edate = moment().format("YYYY-MM-DD");
            let etime = moment().format("H:mm:ss");
            let jobData = {
              job_id: payload.orderId,
              edate,
              etime,
              assigned_technician_id: payload.technicianId,
              is_assigned_for_this_job: 0,
            };
            let jobAssign = await JobAssigned.create(jobData);
            let jobManageData = {
              report_status: 3,
              modify_date: edate,
              modify_time: etime,
              assigned_technician: payload.technicianId,
              assigned_tech_date: edate,
              assigned_tech_time: etime,
              tech_assigned_by: foundData.uid,
              app_date: payload.appDate,
              app_time: payload.appTime,
              app_address: payload.appAddress,
              app_remark: payload.remarks,
            };
            await JobManage.update(jobManageData, {
              where: { uid: payload.orderId },
            });
            let executive_contact,
              executive_contact1,
              executive_contact2,
              customer_name,
              contact_no,
              reg_no,
              order_source_email,
              loan_account_no,
              application_id,
              email_official,
              mobile_official = "";
            let manufs = await JobManage.findOne({
              where: {
                uid: payload.orderId,
              },
              attributes: [
                "executive_contact",
                "customer_name",
                "contact_no",
                "reg_no",
                "order_source_email",
                "loan_account_no",
                "application_id",
                "executive_no_1",
                "executive_no_2",
              ],
              include: [
                {
                  model: Usermaster,
                  attributes: ["email_official", "mobile_official"],
                },
              ],
            });
            if (manufs) {
              executive_contact = manufs.executive_contact;
              executive_contact1 = manufs.executive_no_1;
              executive_contact2 = manufs.executive_no_2;
              customer_name = manufs.customer_name;
              contact_no = manufs.contact_no;
              reg_no = manufs.reg_no.toUpperCase();
              order_source_email = manufs.order_source_email;
              loan_account_no = manufs.loan_account_no;
              application_id = manufs.application_id;
              email_official =
                manufs.usermaster == null
                  ? ""
                  : manufs.usermaster.email_official;
              mobile_official =
                manufs.usermaster == null
                  ? ""
                  : manufs.usermaster.mobile_official;
            }
            let users = await Usermaster.findOne({
              where: {
                [Op.and]: [
                  { uid: payload.technicianId },
                  { email_official: { [Op.ne]: "" } },
                ],
              },
              attributes: [
                "uid",
                "company_id",
                "first_name",
                "email_official",
                "mobile_official",
                "pincode",
              ],
            });
            if (users.company_type == 0) {
              let subject_b = `New Case Assigned Vehicle Number: ${reg_no}`; // Customer name- $customer_name

              let message_b = `Dear Concern,
                <br/><br/>
                New order assigned to you please find details below.
                <br/>
                <table border='1' cellspacing='0' cellpadding='0'><tr><th>Vehicle Number</th><th>Customer Name</th><th>Loan Account Number</th></tr>
                <tr><td>${reg_no}</td><td>${customer_name}</td><td>${loan_account_no}</td></tr>
                </table>
                <br/><br/>
                Regards<br/>TVS Team`;
              await emailService.sendEmail({
                email_id: users.email_official,
                subject: subject_b,
                html: message_b,
                attachments: null,
              });
            }
            if (executive_contact != "") {
              let messData = {
                customer_name,
                contact_no,
                reg_no,
                loan_account_no,
                appDate: payload.appDate,
                appTime: payload.appTime,
                remarks: payload.remarks,
                executive_contact: [
                  executive_contact,
                  executive_contact1,
                  executive_contact2,
                ],
              };
              await emailService.sendTechMessage(messData);
            }
            let setAllEmails = [order_source_email, email_official];
            let edate1 = moment(payload.appDate).format("DD-MM-YYYY");
            let subject_b = `Appointment Fix for the valuation  order for vehicle number- ${reg_no}`; // Customer name- $customer_name

            let message_b = `Dear Concern,
              <br/><br/>
              Please find the details of the update to the order
              <br/>
              $message_b+=  "<table border='1' cellspacing='0' cellpadding='0'>
              <tr><td style='padding:5px;'>Appointment Fixing<br/><span style='font-size:10px'>(As per the portal update)</span></td><td  style='padding:5px;' >${edate1} ${payload.appTime} </td></tr>
              <tr><td style='padding:5px;'>Customer Name-</td><td style='padding:5px;'>${customer_name}</td></tr>
              <tr><td style='padding:5px;'>Customer mobile number-</td><td style='padding:5px;'>${contact_no}</td></tr>
              <tr><td style='padding:5px;'>Vehicle Number-</td><td style='padding:5px;'>${reg_no}</td></tr>
              <tr><td style='padding:5px;'>Remarks-</td><td style='padding:5px;'>${payload.remarks}</td></tr>
            
              </table>
              <br/><br/>
              Regards<br/>TVS Team`;
            await emailService.sendEmail({
              email_id: setAllEmails,
              subject: subject_b,
              html: message_b,
              attachments: null,
            });

            let description = `<b>Updated By-</b> ${foundData.username}<br/>
                   <b>Appointment Date and time-</b> ${payload.appDate} ${payload.appTime}<br/>
                   <b>Appointment Address-</b> ${payload.appAddress}<br/>
                   <b>Remarks</b> ${payload.remarks}<br/>
                   <b>Technician Assigned-</b> ${foundData.username}<br/>`;
            let jobNotes = {
              template: 0,
              remarks: description,
              created_date: edate,
              created_time: etime,
              created_user: foundData.uid,
              job_id: payload.orderId,
              created_username: foundData.username,
              other_detail: users.first_name,
              status: "Appointment Fixed and Technician Assigned",
            };
            await JobNotes.create(jobNotes);
            await Application.update(
              {
                report_status: 3,
              },
              {
                where: { job_id: payload.orderId, uid: application_id },
              }
            );
            return res.json({
              success: true,
              message:
                "Appointment Fixed and Technician Assigned Successfully!",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Invalid Authentication Token",
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
const followUp = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      follow_reason: "required",
      follow_date: "required",
      follow_time: "required",
      orderId: "required",
      remarks: "required",
    };
    const v = new Validator(payload, validatorRules);

    if (!(await v.check())) {
      let results = Object.values(v.errors);
      let message = "";
      results.forEach((e) => {
        message += e.message;
      });
      res.status(200).send({ success: false, message });
    } else {
      await Usermaster.findOne({
        where: {
          auth_token: payload.AuthenticationToken,
        },
      })
        .then(async (foundData) => {
          if (foundData) {
            let edate = moment().format("YYYY-MM-DD");
            let etime = moment().format("H:mm:ss");
            let jobManageData = {
              report_status: 4,
              modify_date: edate,
              modify_time: etime,
              follow_up_date: payload.follow_date,
              follow_up_time: payload.follow_time,
              follow_up_reason: payload.follow_reason,
              follow_up_remark: payload.remarks,
              follow_up_created_by: foundData.uid,
            };
            await JobManage.update(jobManageData, {
              where: { uid: payload.orderId },
            });
            let executive_contact,
              executive_contact1,
              executive_contact2,
              customer_name,
              contact_no,
              reg_no,
              order_source_email,
              loan_account_no,
              email_official,
              application_id = "";
            let manufs = await JobManage.findOne({
              where: {
                uid: payload.orderId,
              },
              attributes: [
                "executive_contact",
                "customer_name",
                "contact_no",
                "reg_no",
                "order_source_email",
                "loan_account_no",
                "application_id",
                "executive_no_1",
                "executive_no_2",
              ],
              include: [
                {
                  model: Usermaster,
                  attributes: ["email_official"],
                },
              ],
            });
            if (manufs) {
              executive_contact = manufs.executive_contact;
              executive_contact1 = manufs.executive_no_1;
              executive_contact2 = manufs.executive_no_2;
              customer_name = manufs.customer_name;
              contact_no = manufs.contact_no;
              reg_no = manufs.reg_no.toUpperCase();
              order_source_email = manufs.order_source_email;
              loan_account_no = manufs.loan_account_no;
              application_id = manufs.application_id;
              email_official =
                manufs.usermaster == null
                  ? ""
                  : manufs.usermaster.email_official;
            }
            let messData = {
              customer_name,
              contact_no,
              reg_no,
              reason: payload.follow_reason,
              remarks: payload.remarks,
              executive_contact: [
                executive_contact,
                executive_contact1,
                executive_contact2,
              ],
            };
            await emailService.sendFollowMessage(messData);
            let setAllEmails = [order_source_email, email_official];
            let subject_b = `Appointment Problem. Vehicle Number: ${reg_no}`; // Customer name- $customer_name

            let message_b = `Dear Concern,
              <br/><br/>
              Appointment Problem Reason:
              <br/>
              <b>Reason-</b> ${payload.follow_reason} <br/><b>Remarks</b> ${payload.remarks}<br/>
              <br/>
              Regards<br/>TVS Team`;
            await emailService.sendEmail({
              email_id: setAllEmails,
              subject: subject_b,
              html: message_b,
              attachments: null,
            });

            let description = `<b>Updated By-</b> ${foundData.username}<br/>
              <b>Follow date and time -</b> ${payload.follow_date} ${payload.follow_time} <br/>
              <b>Reason-</b> ${payload.follow_reason} <br/><b>Remarks</b> ${payload.remarks}<br/>`;
            let jobNotes = {
              template: 0,
              remarks: description,
              created_date: edate,
              created_time: etime,
              created_user: foundData.uid,
              job_id: payload.orderId,
              created_username: foundData.username,
              other_detail: "",
              status: "Follow Up",
            };
            await JobNotes.create(jobNotes);
            await Application.update(
              {
                report_status: 4,
              },
              {
                where: { job_id: payload.orderId, uid: application_id },
              }
            );
            return res.json({
              success: true,
              message: "Follow Up Updated Successfully!",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Invalid Authentication Token",
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
const customerCancel = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      cancel_reason: "required",
      orderId: "required",
      remarks: "required",
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
      await Usermaster.findOne({
        where: {
          auth_token: payload.AuthenticationToken,
        },
      })
        .then(async (foundData) => {
          if (foundData) {
            let edate = moment().format("YYYY-MM-DD");
            let etime = moment().format("H:mm:ss");
            let jobManageData = {
              report_status: 5,
              modify_date: edate,
              modify_time: etime,
              cancel_reason: payload.cancel_reason,
              cancel_remark: payload.remarks,
              cancelled_by: foundData.uid,
              cancel_date: edate,
              cancel_time: etime,
            };
            await JobManage.update(jobManageData, {
              where: { uid: payload.orderId },
            });
            let executive_contact,
              executive_contact1,
              executive_contact2,
              customer_name,
              contact_no,
              reg_no,
              order_source_email,
              loan_account_no,
              email_official,
              application_id = "";
            let manufs = await JobManage.findOne({
              where: {
                uid: payload.orderId,
              },
              attributes: [
                "executive_contact",
                "customer_name",
                "contact_no",
                "reg_no",
                "order_source_email",
                "loan_account_no",
                "application_id",
                "executive_no_1",
                "executive_no_2",
              ],
              include: [
                {
                  model: Usermaster,
                  attributes: ["email_official"],
                },
              ],
            });
            if (manufs) {
              executive_contact = manufs.executive_contact;
              executive_contact1 = manufs.executive_no_1;
              executive_contact2 = manufs.executive_no_2;
              customer_name = manufs.customer_name;
              contact_no = manufs.contact_no;
              reg_no = manufs.reg_no.toUpperCase();
              order_source_email = manufs.order_source_email;
              loan_account_no = manufs.loan_account_no;
              application_id = manufs.application_id;
              email_official =
                manufs.usermaster == null
                  ? ""
                  : manufs.usermaster.email_official;
            }
            let messData = {
              customer_name,
              contact_no,
              reg_no,
              reason: payload.cancel_reason,
              remarks: payload.remarks,
              executive_contact: [
                executive_contact,
                executive_contact1,
                executive_contact2,
              ],
            };
            await emailService.sendCancelMessage(messData);
            let setAllEmails = [order_source_email, email_official];
            let subject_b = `Order Cancelled. Vehicle Number: ${reg_no}`; // Customer name- $customer_name

            let message_b = `Dear Concern,
              <br/><br/>
              Order Cancelled. Please find the below details
              <br/>
              <table border='1' cellspacing='0' cellpadding='0'><tr><th>Vehicle Number</th><th>Customer Name</th><th>Loan Account Number</th><th>Cancel Reason</th><th>Remark</th></tr>
              <tr><td>${reg_no}</td><td> ${customer_name}</td><td>${loan_account_no}</td><td>${payload.cancel_reason}</td></tr>
              </table>
              <br/><br/>
              Regards<br/>TVS Team`;
            await emailService.sendEmail({
              email_id: setAllEmails,
              subject: subject_b,
              html: message_b,
              attachments: null,
            });

            let description = `<b>Updated By-</b> ${foundData.username}<br/><b>Reason-</b> ${payload.cancel_reason} <br/><b>Remarks</b> ${payload.remarks}<br/>`;
            let jobNotes = {
              template: 0,
              remarks: description,
              created_date: edate,
              created_time: etime,
              created_user: foundData.uid,
              job_id: payload.orderId,
              created_username: foundData.username,
              other_detail: "",
              status: "Customer Cancelled",
            };
            await JobNotes.create(jobNotes);
            await Application.update(
              {
                report_status: 1,
              },
              {
                where: { job_id: payload.orderId, uid: application_id },
              }
            );
            return res.json({
              success: true,
              message: "Order Cancelled Successfully!",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Invalid Authentication Token",
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
const technicianComplete = async (req, res) => {
  try {
    const payload = req.body;

    let edate = moment().format("YYYY-MM-DD");
    let etime = moment().format("H:mm:ss");
    let subject_b = "";
    let message_b = "";
    let contact_number = "";
    let exe_1 = payload.executive_contact_1;
    let exe_2 = payload.executive_contact_2;
    let user_mobile_no = payload.executive_contact;
    let customer_name = payload.app_vehicle_owner;
    let whatsapp_number =
      typeof payload.whatsapp_number != undefined
        ? payload.whatsapp_number
        : " ";
    let loan_acc_no =
      payload.app_loan_account_no == "" ? "NA" : payload.app_loan_account_no;
    let order_holds = [user_mobile_no, exe_1, exe_2, whatsapp_number];
    let reg_no = payload.app_vehicle_number;
    let mail_trigger = payload.mail_trigger;
    let app_order_source_email = payload.app_order_source_email;
    let to_mail = "";

    if (payload.app_owner_contact != "") {
      contact_number = payload.app_owner_contact.substr(0, 5) + "#####";
    }
    if (payload.app_status == 9) {
      // email when hold

      let messData = {
        customer_name,
        contact_number,
        reason: payload.follow_reason,
        order_holds,
        loan_acc_no,
        reg_no,
      };
      if (whatsapp_number != "" || user_mobile_no != "") {
        // whatsapp to user start --- send alerts if only number exist
        await emailService.sendHoldMessage(messData);
      }

      if (mail_trigger != "" && app_order_source_email != "") {
        to_mail = mail_trigger + "," + app_order_source_email;
      } else if (mail_trigger != "") {
        to_mail = mail_trigger;
      } else {
        to_mail = app_order_source_email;
      }

      subject_b =
        "Valuation has been put on hold for the vehicle number- " +
        payload.app_vehicle_number;

      message_b = "Dear Concern,";
      message_b += "<br/><br/>";
      message_b +=
        "Valuation has been put on hold for the vehicle number " +
        payload.app_vehicle_number +
        " <br/> Please find the details below";
      message_b += "<br/>";
      message_b += "<table border='1' cellspacing='0' cellpadding='0'>";
      message_b +=
        "<tr><td  style='padding:5px;'>Hold Reason</td><td  style='padding:5px;' >" +
        payload.app_reason_remark +
        "</td></tr>";
      message_b +=
        "<tr><td  style='padding:5px;'>Customer Name-</td><td  style='padding:5px;' >" +
        customer_name +
        "</td></tr>";
      message_b +=
        "<tr><td  style='padding:5px;' >Customer mobile number-</td><td  style='padding:5px;' >" +
        contact_number +
        "</td></tr>";
      message_b +=
        "<tr><td  style='padding:5px;' >Vehicle Number-</td><td  style='padding:5px;' >" +
        payload.app_vehicle_number +
        "</td></tr>";

      message_b += "</table>";
      message_b += "<br/><br/>";
      message_b += "Regards<br/>TVS Team";
    }
    console.log("payload.app_status", payload.app_status);
    // console.log("payload.app_owner_email", payload.app_owner_email);

    if (
      (payload.app_status == 7 || payload.app_status == 10) &&
      payload.app_owner_email != ""
    ) {
      // Technician completed - send email alert
      // console.log("testing email",to_mail);

      to_mail = payload.app_owner_email;
      subject_b =
        "Technician Completed the vehicle number - " +
        payload.app_vehicle_number;
      message_b = "Dear Concern,";
      message_b += "<br/><br/>";
      message_b +=
        "Technician Completed the vehicle number - " +
        payload.app_vehicle_number +
        " <br/> Please find the details below : ";
      message_b += "<br/>";
      message_b += "<table border='1' cellspacing='0' cellpadding='0'>";
      message_b +=
        "<tr><td  style='padding:5px;'>Customer Name-</td><td  style='padding:5px;' >" +
        customer_name +
        "</td></tr>";
      message_b +=
        "<tr><td  style='padding:5px;' >Customer mobile number-</td><td  style='padding:5px;' >" +
        contact_number +
        "</td></tr>";
      message_b +=
        "<tr><td  style='padding:5px;' >Vehicle Number-</td><td  style='padding:5px;' >" +
        payload.app_vehicle_number +
        "</td></tr>";
      message_b += "</table>";
      message_b += "<br/><br/>";
      message_b += "Regards<br/>TVS Team";
    }

    let reason = payload.app_reason_hold != "" ? payload.app_reason_hold : "--";
    if (payload.app_status == 5) {
      // email when cancelled
      to_mail = payload.app_order_source_email;
      subject_b = "Order Cancelled. Vehicle Number: " + customer_name;
      message_b = "Dear Concern,";
      message_b += "<br/><br/>";
      message_b += "Order Cancelled. Please find the below details";
      message_b += "<br/>";
      message_b +=
        "<table border='1' cellspacing='0' cellpadding='0'><tr><th>Vehicle Number</th><th>Customer Name</th><th>Loan Account Number</th><th>Cancel Reason</th><th>Remark</th></tr>";
      message_b +=
        "<tr><td>" +
        payload.app_vehicle_number +
        "</td><td> " +
        customer_name +
        "</td><td>" +
        payload.app_loan_account_no +
        "</td><td>" +
        reason +
        "</td></tr>";
      message_b += "</table>";
      message_b += "<br/><br/>";
      message_b += "Regards<br/>TVS Team";
    }

    await emailService.sendEmail({
      email_id: to_mail,
      subject: subject_b,
      html: message_b,
      attachments: null,
    });
    return "Order Cancelled Successfully!";
  } catch (err) {
    return err.message;
  }
};
//Order Re-Initiated By Banker
const orderReInitiate = async (req, res) => {
  let payload = req;
  let jobManage = req.jobManage;
  let to_mail = "";
  let subject_b = "";
  let message_b = "";
  let contact_number = "";
  to_mail = jobManage.order_source_email;
  subject_b = `Order Re-Initiated Successfully - ${jobManage.reg_no}`;
  if (jobManage.contact_no != "") {
    contact_number = jobManage.contact_no.substr(0, 5) + "#####";
  }
  message_b = `Dear Concern,
      <br/><br/>
      Your Order hs been Re-Initiated,
      <br/>
      Please find the details of the update to the order
      <br/>`;
  message_b += `<table border='1' cellspacing='0' cellpadding='0'>
      <tr><td style='padding:5px;'>Banker Name-</td><td style='padding:5px;'>${payload.client_name}</td></tr>
      <tr><td style='padding:5px;'>Customer Name-</td><td style='padding:5px;'>${jobManage.customer_name}</td></tr>
      <tr><td style='padding:5px;'>Customer mobile number-</td><td style='padding:5px;'>${contact_number}</td></tr>
      <tr><td style='padding:5px;'>Vehicle Number-</td><td style='padding:5px;'>${jobManage.reg_no}</td></tr>
      <tr><td style='padding:5px;'>Make Model-</td><td style='padding:5px;'>${payload.maker_name} / ${payload.model_name}</td></tr>
      <tr><td style='padding:5px;'>Banker ex Name-</td><td style='padding:5px;'>${jobManage.executive}</td></tr>
      <tr><td style='padding:5px;'>Banker ex Number-</td><td style='padding:5px;'>${jobManage.executive_contact}</td></tr>
      </table>`;

  let sendmail = await emailService.sendEmail({
    email_id: to_mail,
    subject: subject_b,
    html: message_b,
    attachments: null,
  });
  console.log("Sent mail log ", sendmail);
};

module.exports = {
  assignAgent,
  fixAppointment,
  followUp,
  customerCancel,
  technicianComplete,
  orderReInitiate,
};
