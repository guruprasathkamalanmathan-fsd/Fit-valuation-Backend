// services/emailService.js (CJS)
const axios = require("axios");
const { Validator } = require("node-input-validator");
const JobManage = require("../Database/models/JobManage");
const Application = require("../Database/models/Applications")
const nodemailer = require("nodemailer");

require('dotenv').config();


// 🔹 Utility: create nodemailer transporter (supports default SMTP)
const determineTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.smtphost,
    port: parseInt(process.env.smtpport || "587"),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.smtpuser,
      pass: process.env.smtppass,
    },
  });
};

// 🔹 Utility: send WhatsApp message
const sendWhatsAppMessage = async (templateId, parameterValues, recipients) => {
  const url = "https://rcmapi.instaalerts.zone/services/rcm/sendMessage";
  const headers = {
    "Content-Type": "application/json",
    Authentication: process.env.auth_key,
  };

  if (!Array.isArray(recipients)) recipients = [recipients];

  for (let mobile of recipients) {
    if (!mobile || mobile === "NA") continue;

    const postData = {
      message: {
        channel: "WABA",
        content: {
          preview_url: false,
          type: "TEMPLATE",
          template: { templateId, parameterValues },
        },
        recipient: { to: mobile, recipient_type: "individual" },
        sender: { from: process.env.from_mobile },
        preferences: { webHookDNId: "1001" },
      },
      metaData: { version: "v1.0.9" },
    };

    await axios.post(url, postData, { headers });
  }

  return { success: true, message: "Whatsapp Message Sent Successfully" };
};

class EmailService {
  // ---------------- EMAIL ----------------
  async sendEmail(payload) {
    try {
      const v = new Validator(payload, {
        email_id: "required",
        subject: "required",
        html: "required",
        attachments: "array|nullable",
      });
      if (!(await v.check())) return v.errors;

      const transporter = determineTransporter();
      const attachments = (payload.attachments || []).map(a => ({ path: a }));

      const mailOptions = {
        from: { name: "TVS FIT", address: process.env.smtpuser },
        to: payload.email_id,
        subject: payload.subject,
        html: payload.html,
        attachments,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, message: "Email Sent Successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async sendPdfMail(payload) {
    try {
      const v = new Validator(payload, { uid: "required", email_id: "required" });
      if (!(await v.check())) return v.errors;

      // 🔹 Fetch details from DB
      const [report_link, job] = await Promise.all([
        Application.findOne({ where: { uid: payload.uid }, attributes: ["report_link"] }),
        JobManage.findOne({
          where: { uid: payload.uid },
          attributes: ["customer_name", "contact_no", "reg_no", "loan_account_no"],
        }),
      ]);

      const reportLink = report_link?.dataValues.report_link || "";
      const { customer_name = "", contact_no = "", reg_no = "", loan_account_no = "" } = job?.dataValues || {};

      const subject = `Vehicle valuation report for the vehicle number - ${reg_no} (Customer name- ${customer_name}, Loan number ${loan_account_no})`;
      const html = `
        <p>Dear Concern,</p>
        <p>We are pleased to share the valuation report for the vehicle Number- ${reg_no}. Please find the details below:</p>
        <table border="1">
          <tr>
            <td>Report link</td><td>Customer Name</td><td>Customer Mobile</td><td>Vehicle Number</td>
          </tr>
          <tr>
            <td>https://valuation.mytvs.in/report.php?id=${reportLink}</td>
            <td>${customer_name}</td>
            <td>${contact_no}</td>
            <td>${reg_no}</td>
          </tr>
        </table>`;

      const transporter = determineTransporter();
      const mailOptions = {
        from: { name: "TVS FIT", address: process.env.smtpuser },
        to: payload.email_id,
        subject,
        html,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, message: "Email Sent Successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  // ---------------- WHATSAPP ----------------
  async sendMessage(payload) {
    return sendWhatsAppMessage("valuation_report_link", {
      0: payload.app_vehicle_number,
      1: payload.report_link,
      2: payload.app_vehicle_owner,
      3: payload.app_owner_contact,
      4: payload.app_vehicle_number,
      5: payload.loan_acc_no,
      6: payload.valuation_amount,
    }, payload.mobile);
  }

  async sendUserMessage(payload) {
    return sendWhatsAppMessage("add_new_user", {
      0: payload.username,
      1: payload.password,
      2: payload.portal_link,
      3: payload.mobile_link,
    }, payload.mobile);
  }

  async sendOrderMessage(payload) {
    return sendWhatsAppMessage("new_lead_received", {
      0: payload.banker_name,
      1: payload.customer_name,
      2: payload.customer_contact,
      3: payload.vehicle_number,
      4: payload.maker,
      5: payload.model,
      6: payload.banker_exname,
      7: payload.banker_excontact,
      8: payload.loan_no,
    }, [payload.banker_excontact, payload.exe_1, payload.exe_2, payload.banker_mobile]);
  }

  async sendAgentMessage(payload) {
    return sendWhatsAppMessage("follow_up", {
      0: payload.customer_name,
      1: payload.contact_no,
      2: payload.reg_no,
      3: payload.reason,
      4: payload.remarks,
    }, payload.executive_contact);
  }

  async sendTechMessage(payload) {
    return sendWhatsAppMessage("order_update", {
      0: payload.customer_name,
      1: payload.contact_no,
      2: payload.reg_no,
      3: payload.loan_account_no,
      4: payload.appDate,
      5: payload.appTime,
      6: payload.remarks,
    }, payload.executive_contact);
  }

  async sendCancelMessage(payload) {
    return sendWhatsAppMessage("order_cancel", {
      0: payload.customer_name,
      1: payload.contact_no,
      2: payload.reg_no,
      3: payload.reason,
      4: payload.remarks,
    }, payload.executive_contact);
  }

  async sendFollowMessage(payload) {
    return sendWhatsAppMessage("follow_up", {
      0: payload.customer_name,
      1: payload.contact_no,
      2: payload.reg_no,
      3: payload.reason,
      4: payload.remarks,
    }, payload.executive_contact);
  }

  async sendHoldMessage(payload) {
    return sendWhatsAppMessage("on_hold_order", {
      0: payload.reg_no,
      1: payload.customer_name,
      2: payload.contact_number,
      3: payload.reg_no,
      4: payload.loan_acc_no,
      5: payload.remarks,
    }, payload.order_holds);
  }
}

module.exports = new EmailService();
