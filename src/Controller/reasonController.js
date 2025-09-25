const Sequelize = require("sequelize");

const fileuploadtoCGS = require("../services/fileuploadtoCGS")

const Op = Sequelize.Op;
const { Validator } = require("node-input-validator");

  const cancelReasonList = async (req, res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        // searchKey: "required|nullable",
        // limit: "required|integer|min:0",
        // offset: "required|integer|min:0",
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
        return res.status(200).json({
          success: true,
          data: [
            {
              id:1,
              value:'Number swiitched off'
            },
            {
              id:2,
              value:'Not responding the call'
            },
            {
              id:3,
              value:'Not supporting the valuation'
            },
            {
              id:4,
              value:'Invalid number'
            },
            {
              id:5,
              value:'Wrong number'
            },
            {
              id:6,
              value:'Loan cancelled'
            },
          ],
        });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
  const followReasonList = async(req,res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        // searchKey: "required|nullable",
        // limit: "required|integer|min:0",
        // offset: "required|integer|min:0",
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
        return res.status(200).json({
          success: true,
          data: [
            {
              id:1,
              value:'Customer not picking the call'
            },
            {
              id:2,
              value:'Call me later'
            },
            {
              id:3,
              value:'Number not reachable'
            },
            {
              id:4,
              value:'Customer out of station'
            },
          ],
        });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
  const uploadImage = async (req,res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        images: "required",
        app_id: "required",
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
        let result=await fileuploadtoCGS.uploadtoGCS(payload);
        return res.status(200).json({
          success: true,
          data: result,
        });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
  const uploadVideo = async (req, res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        videos: "required",
        app_id: "required",
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
        let result=await fileuploadtoCGS.uploadvideotoGCS(payload);
        return res.status(200).json({
          success: true,
          data: result,
        });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
  const listFiles = async(req, res)=> {
    try {
      const payload = req.body;
      const validatorRules = {
        prefix: "required",
        // app_id: "required",
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
        let result=await fileuploadtoCGS.listFiles(payload.prefix);
        return res.status(200).json({
          success: true,
          data: result,
        });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

module.exports = {
    cancelReasonList,
    followReasonList,
    uploadImage,
    uploadVideo,
    listFiles
}

