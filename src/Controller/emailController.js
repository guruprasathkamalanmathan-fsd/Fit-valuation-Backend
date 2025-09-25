const Validator = require("validatorjs");

const emailService =require("../services/emailService");

const sendMessage = async(req,res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        mobile: "required",
        app_vehicle_number: "required",
        report_link: "required",
        app_vehicle_owner: "required",
        app_owner_contact: "required",
        loan_acc_no: "required",
      };
      const v = new Validator(payload, validatorRules);
      const matched = await v.check();
      if (!matched) {
        let results=Object.values(v.errors);
        let message=''
        results.forEach((e) => {
          message +=e.message;
        });
        res.status(200).send({ success: false, message});
      } else {
        let data=await emailService.sendMessage(payload);
          return res.json({success:true,data:data});
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
};
const sendUserMessage = async(req, res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        mobile: "required",
        username: "required",
        password: "required",
        portal_link: "required",
        mobile_link: "required",
      };
      const v = new Validator(payload, validatorRules);
      const matched = await v.check();
      if (!matched) {
        let results=Object.values(v.errors);
        let message=''
        results.forEach((e) => {
          message +=e.message;
        });
        res.status(200).send({ success: false, message});
      } else {
        let data=await emailService.sendUserMessage(payload);
          return res.json({success:true,data:data});
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
};
const sendAgentMessage = async(req, res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        customer_name: "required",
        contact_no: "required",
        reg_no: "required",
        reason: "required",
        remarks: "required",
        executive_contact: "required",
      };
      const v = new Validator(payload, validatorRules);
      const matched = await v.check();
      if (!matched) {
        let results=Object.values(v.errors);
        let message=''
        results.forEach((e) => {
          message +=e.message;
        });
        res.status(200).send({ success: false, message});
      } else {
        let data=await emailService.sendAgentMessage(payload);
          return res.json({success:true,data:data});
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
};
const sendEmail = async(req, res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        email_id: "required",
        subject: "required",
        html: "required",
      };
      const v = new Validator(payload, validatorRules);
      const matched = await v.check();
      if (!matched) {
        let results=Object.values(v.errors);
        let message=''
        results.forEach((e) => {
          message +=e.message;
        });
        res.status(200).send({ success: false, message});
      } else {
        let data=await emailService.sendEmail(payload);
        return res.json({success:true,data:data});
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
};
const sendPdfMail = async(req, res)=> {
    try {
        const payload = req.body;
        const validatorRules = {
            uid: "required",
            email_id: "required",
        };

        const v = new Validator(payload, validatorRules);
        const matched = await v.check();
        if (!matched) {
            let results = Object.values(v.errors);
            let message = '';
            results.forEach((e) => {
                message += e.message;
            });
            res.status(200).send({ success: false, message });
        } else {
            

         
            let data = await emailService.sendPdfMail(payload);
            return res.json({ success: true, message: "Email Sent Successfully"});
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {sendMessage,sendUserMessage,sendAgentMessage,sendEmail,sendPdfMail}
