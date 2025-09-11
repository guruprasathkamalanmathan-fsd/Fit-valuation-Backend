const Sequelize = require("sequelize");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const Validator = require("validatorjs");
const { Op } = require("sequelize");

const vahanService = require("../services/vahanServices");
const Manufmaster = require("../Database/models/Manufmaster");
const Modelmaster = require("../Database/models/Modelmaster");
const VariantMaster = require("../Database/models/VarientMaster");
const VehicleInformation = require("../Database/models/VehicleInformation");
const ProcessMaster = require("../Database/models/ProcessMaster");
const VrmMasterImage = require("../Database/models/VrmMasterImage");
const VahanHitCount = require("../Database/models/VahanHitCount");

// ------------------- Vehicle Make List -------------------
const vehicleMakeList = async (req, res) => {
  try {
    const payload = req.body;
    const v = new Validator(payload, {
      searchKey: "required|nullable",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
      processType: "required|string",
    });

    if (!(await v.check())) {
      const message = Object.values(v.errors).map(e => e.message).join("");
      return res.status(200).json({ success: false, message });
    }

    let where = {};
    if (payload.processType) {
      const processInfo = await ProcessMaster.findOne({
        where: { vehicle_type: payload.processType },
      });
      if (processInfo) {
        where = { [Op.and]: [where, { vehicle_type: { [Op.like]: `%${processInfo.vehicle_type}%` } }] };
      }
    }
    if (payload.searchKey) {
      where = { [Op.or]: [{ manuf_name: { [Op.like]: `%${payload.searchKey}%` } }] };
    }

    const { count, rows } = await Manufmaster.findAndCountAll({
      where: { [Op.and]: [where] },
      limit: payload.limit,
      offset: payload.offset * payload.limit,
      order: [["manuf_name", "ASC"]],
    });

    return res.status(200).json({ success: true, data: rows, count });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------- Vehicle Model List -------------------
const vehicleModelList = async (req, res) => {
  try {
    const payload = req.body;
    const v = new Validator(payload, {
      searchKey: "required|nullable",
      makeId: "required|integer",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
    });

    if (!(await v.check())) {
      const message = Object.values(v.errors).map(e => e.message).join("");
      return res.status(200).json({ success: false, message });
    }

    const where = { manuf_id: payload.makeId };
    if (payload.searchKey) where.model_name = { [Op.like]: `%${payload.searchKey}%` };

    const { count, rows } = await Modelmaster.findAndCountAll({
      where,
      attributes: ["uid", "model_name", "model_desc", "vehicle_type"],
      group: ["model_name", "uid", "model_desc", "vehicle_type"],
      limit: payload.limit,
      offset: payload.offset * payload.limit,
    });

    return res.status(200).json({ success: true, data: rows, count });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------- Vehicle Variant List -------------------
const vehicleVariantList = async (req, res) => {
  try {
    const payload = req.body;
    const v = new Validator(payload, {
      searchKey: "required|nullable",
      modelId: "required|integer",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
    });

    if (!(await v.check())) {
      const message = Object.values(v.errors).map(e => e.message).join("");
      return res.status(200).json({ success: false, message });
    }

    const where = { model_id: payload.modelId };
    if (payload.searchKey) where.variant_name = { [Op.like]: `%${payload.searchKey}%` };

    const { count, rows } = await VariantMaster.findAndCountAll({
      where,
      attributes: [
        "uid",
        "variant_name",
        "fuel_type",
        "exshowroom_price",
        "cont_or_disc",
        "transmission",
        "drive_type",
        "cubic_capacity",
      ],
      group: ["model_id", "variant_name", "uid", "fuel_type", "exshowroom_price", "cont_or_disc", "transmission", "drive_type", "cubic_capacity"],
      limit: payload.limit,
      offset: payload.offset * payload.limit,
    });

    return res.status(200).json({ success: true, data: rows, count });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------- Vehicle Validation -------------------
const vehicleValidateNumber = async (req, res) => {
  try {
    const payload = req.body;
    const v = new Validator(payload, { vehicleNumber: "required" });

    if (!(await v.check())) {
      const message = Object.values(v.errors).map(e => e.message).join("");
      return res.status(400).json({ success: false, message });
    }

    const url = process.env.vahanSearch;
    let existingRecord = await VehicleInformation.findOne({
      where: { registration_number: payload.vehicleNumber },
    });

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    if (existingRecord) {
      const lastUpdatedAt = new Date(existingRecord.updated_at || existingRecord.created_at);
      if (lastUpdatedAt <= threeMonthsAgo) {
        let dataFromApi, fromApi;
        if (url.includes("maalta")) {
          dataFromApi = await vahanService.getFromMalta(url, payload.vehicleNumber, res);
          fromApi = "Maalta Search API";
        } else if (url.includes("fla")) {
          dataFromApi = await vahanService.getFromFastline(url, payload.vehicleNumber, res);
          fromApi = "FastLine Search API";
        } else if (url.includes("cuvora")) {
          dataFromApi = await vahanService.getFromCarinfo(url, payload.vehicleNumber, res);
          fromApi = "CarInfo Search API";
        }
        await existingRecord.update({ ...dataFromApi, updated_at: new Date() });
        const [hitCount, created] = await VahanHitCount.findOrCreate({
          where: { vahan_name: fromApi },
          defaults: { hit_count: 1, user_id: 2725 },
        });
        if (!created) await hitCount.increment("hit_count");
      }
      return res.status(200).json({ success: true, result: existingRecord });
    }

    let dataFromApi, fromApi;
    if (url.includes("maalta")) {
      dataFromApi = await vahanService.getFromMalta(url, payload.vehicleNumber, res);
      fromApi = "Maalta Search API";
    } else if (url.includes("fla")) {
      dataFromApi = await vahanService.getFromFastline(url, payload.vehicleNumber, res);
      fromApi = "FastLine Search API";
    } else if (url.includes("cuvora")) {
      dataFromApi = await vahanService.getFromCarinfo(url, payload.vehicleNumber, res);
      fromApi = "CarInfo Search API";
    }

    if (dataFromApi.registration_number) {
      existingRecord = await VehicleInformation.create({ ...dataFromApi, updated_at: null });
      const [hitCount, created] = await VahanHitCount.findOrCreate({
        where: { vahan_name: fromApi },
        defaults: { hit_count: 1, user_id: 2725 },
      });
      if (!created) await hitCount.increment("hit_count");
      return res.status(200).json({ success: true, result: existingRecord });
    }

    return res.status(200).json({
      success: false,
      message: "The vehicle number has not been registered with the government portal",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------- Image List -------------------
const imageList = async (req, res) => {
  try {
    const payload = req.body;
    const v = new Validator(payload, {
      searchKey: "required|nullable",
      limit: "required|integer|min:0",
      offset: "required|integer|min:0",
    });

    if (!(await v.check())) {
      const message = Object.values(v.errors).map(e => e.message).join("");
      return res.status(200).json({ success: false, message });
    }

    const where = payload.searchKey
      ? { IMAGE_NAME: { [Op.like]: `%${payload.searchKey}%` } }
      : {};

    const { count, rows } = await VrmMasterImage.findAndCountAll({
      where,
      limit: payload.limit,
      offset: payload.offset * payload.limit,
    });

    return res.status(200).json({ success: true, data: rows, count });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  vehicleMakeList,
  vehicleModelList,
  vehicleVariantList,
  vehicleValidateNumber,
  imageList,
};
