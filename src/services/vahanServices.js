const axios = require("axios");
const { Validator } = require("node-input-validator");
const VehicleInformation = require("../Database/models/VehicleInformation");
const VahanHitCount = require("../Database/models/VahanHitCount");

const nodemailer = require("nodemailer");
const moment = require("moment");

// ------------------- Malta API -------------------
const getFromMalta = async(url, vehicleNumber, res)=> {
    const postData = {
        userid: process.env.maaltauserid,
        vehicle: vehicleNumber,
    };

    try {
        const response = await axios.post(url, postData);
        const formattedResult = response.data;

        return {
            temp_vahan_search_uid: formattedResult.temp_vahan_search_uid || '',
            owner_name: formattedResult.owner_name || '',
            registered_place: formattedResult.registered_place || '',
            owner_mobile_no: formattedResult.owner_mobile_no || '',
            manufacturer: formattedResult.manufacturer || '',
            manufacturer_model: formattedResult.manufacturer_model || '',
            engine_number: formattedResult.engine_number || '',
            chassis_number: formattedResult.chassis_number || '',
            registration_number: formattedResult.registration_number || '',
            registration_date: formattedResult.registration_date || '',
            m_registration: formattedResult.m_registration?.toString() || '',
            m_registration_name: formattedResult.m_registration_name?.toString() || '',
            y_registration: formattedResult.y_registration?.toString() || '',
            body_type: formattedResult.body_type || '',
            m_y_manufacturing: formattedResult.m_y_manufacturing?.toString() || '',
            m_manufacturing: formattedResult.m_manufacturing?.toString() || '',
            y_manufacturing: formattedResult.y_manufacturing?.toString() || '',
            m_manufacturing_name: formattedResult.m_manufacturing_name || '',
            seating_capacity: formattedResult.seating_capacity || '',
            fuel_type: formattedResult.fuel_type || '',
            insurance_name: formattedResult.insurance_name || '',
            insurance_validity: formattedResult.insurance_validity || '',
            vehicle_class: formattedResult.vehicle_class || '',
            colour: formattedResult.colour || '',
            owner_serial_number: formattedResult.owner_serial_number?.toString() || '',
            number_of_cylinder: formattedResult.number_of_cylinder || '',
            permit_no: formattedResult.permit_no || '',
            fitness_upto: formattedResult.fitness_upto || '',
            insurance_policy_no: formattedResult.insurance_policy_no || '',
            permanent_address: formattedResult.permanent_address || '',
            permit_validity_from: formattedResult.permit_validity_from || '',
            permit_validity_upto: formattedResult.permit_validity_upto || '',
            permit_type: formattedResult.permit_type || '',
            financer: formattedResult.financer || '',
            noc_details: formattedResult.noc_details || '',
            norms_type: formattedResult.norms_type || '',
            blacklist_status: formattedResult.blacklist_status || '',
            puc_number: formattedResult.puc_number || '',
            current_address: formattedResult.current_address || '',
            permit_issue_date: formattedResult.permit_issue_date || '',
            npermit_upto: formattedResult.npermit_upto || '',
            father_name: formattedResult.father_name || '',
            gross_vehicle_weight: formattedResult.gross_vehicle_weight || '',
            cubic_capacity: formattedResult.cubic_capacity || '',
            status_message: formattedResult.status_message || '',
            wheelbase: formattedResult.wheelbase || '',
            status: formattedResult.status || '',
            npermit_issued_by: formattedResult.npermit_issued_by || '',
            noc_status: formattedResult.noc_status || '',
            mv_tax_upto: formattedResult.mv_tax_upto || '',
            state: formattedResult.state || '',
            npermit_no: formattedResult.npermit_no || '',
            noc_valid_upto: formattedResult.noc_valid_upto || '',
            noc_issue_date: formattedResult.noc_issue_date || '',
            status_verification: formattedResult.status_verification || '',
            puc_valid_upto: formattedResult.puc_valid_upto || '',
            unladden_weight: formattedResult.unladden_weight || '',
            standing_capacity: formattedResult.standing_capacity || '',
            status_verfy_date: formattedResult.status_verfy_date || '',
            vehicle_category: formattedResult.vehicle_category || '',
            sleeper_capacity: formattedResult.sleeper_capacity || '',
            rc_expiry_date: formattedResult.rc_expiry_date || '',
            created_at: new Date(),
        };
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: 'An error occurred while fetching data from the API' });
    }
}

// ------------------- Fastline API -------------------
const getFromFastline = async (url, vehicleNumber, res)=> {
    const headers = { "Content-Type": "text/plain" };
    const postData = {
        userId: process.env.userid,
        authenticationToken: process.env.authenticationToken,
        regNumber: vehicleNumber,
    };
    const response = await axios.post(url, JSON.stringify(postData), { headers });
    const formattedResult = response.data;

    let registration_date = formattedResult.vahanData[0]?.VEHICLE_REGISTERED_DATE || '';
    let dateParts = registration_date ? registration_date.split('/') : [];
    let m_registration = dateParts.length === 3 ? dateParts[1] : '';
    let y_registration = dateParts.length === 3 ? dateParts[2] : '';

    let m_y_manufacturing = formattedResult.vahanData[0]?.VEHICLE_MANUFACTURE_MONTH_YEAR || '';
    let dateParts1 = m_y_manufacturing ? m_y_manufacturing.split('/') : [];
    let m_manufacturing = dateParts1.length === 2 ? dateParts1[0] : '';
    let y_manufacturing = dateParts1.length === 2 ? dateParts1[1] : '';

    return {
        temp_vahan_search_uid: formattedResult.VEHICLE_ID || '',
        owner_name: formattedResult.vahanData[0]?.VEHICLE_OWNER_NAME || '',
        registered_place: formattedResult.vahanData[0]?.VEHICLE_REGISTERED_AT || '',
        owner_mobile_no: '',
        manufacturer: formattedResult.vahanData[0]?.VEHICLE_MAKE || '',
        manufacturer_model: formattedResult.vahanData[0]?.VEHICLE_MODEL || '',
        engine_number: formattedResult.vahanData[0]?.VEHICLE_ENGINE_NO || '',
        chassis_number: formattedResult.vahanData[0]?.VEHICLE_CHASI_NO || '',
        registration_number: formattedResult.vahanData[0]?.VEHICLE_REGISTRATION_NUMBER || '',
        registration_date: formattedResult.vahanData[0]?.VEHICLE_REGISTERED_DATE || '',
        m_registration: m_registration,
        m_registration_name: '',
        y_registration: y_registration,
        body_type: '',
        m_y_manufacturing: formattedResult.vahanData[0]?.VEHICLE_MANUFACTURE_MONTH_YEAR || '',
        m_manufacturing: m_manufacturing,
        m_manufacturing_name: '',
        y_manufacturing: formattedResult.vahanData[0]?.VEHICLE_MANUFACTURE_YEAR || '' || y_manufacturing,
        seating_capacity: formattedResult.vahanData[0]?.VEHICLE_SEAT_CAPACITY || '',
        fuel_type: formattedResult.vahanData[0]?.VEHICLE_FUEL_TYPE || '',
        insurance_name: '',
        insurance_validity: formattedResult.vahanData[0]?.INSURANCE_EXPIRY_DATE || '',
        vehicle_class: formattedResult.vahanData[0]?.VEHICLE_CLASS_DESCRIPTION || '',
        colour: formattedResult.vahanData[0]?.VEHICLE_COLOR || '',
        owner_serial_number: formattedResult.vahanData[0]?.VEHICLE_OWNER_SR || '',
        number_of_cylinder: '',
        permit_no: '',
        fitness_upto: formattedResult.vahanData[0]?.VEHICLE_FIT_UPTO || '',
        insurance_policy_no: formattedResult.vahanData[0]?.INSURANCE_POLICY_NUMBER || '',
        permanent_address: formattedResult.vahanData[0]?.VEHICLE_PERMANENT_ADDRESS || '',
        permit_validity_from: '',
        permit_validity_upto: '',
        permit_type: '',
        financer: formattedResult.vahanData[0]?.HYPTH_FNCR_NAME || '',
        noc_details: formattedResult.vahanData[0]?.VEHICLE_NOC_DETAILS || '',
        norms_type: '',
        blacklist_status: formattedResult.vahanData[0]?.VEHICLE_BLACKLIST_FLAG || '',
        puc_number: formattedResult.vahanData[0]?.VEHICLE_PUCC_NO || '',
        current_address: formattedResult.vahanData[0]?.VEHICLE_CURRENT_ADDRESS || '',
        permit_issue_date: formattedResult.vahanData[0]?.VEHICLE_PERMIT_ISSUE_DATE || '',
        npermit_upto: '',
        father_name: formattedResult.vahanData[0]?.VEHICLE_FATHER_NAME || '',
        gross_vehicle_weight: '',
        cubic_capacity: formattedResult.vahanData[0]?.VEHICLE_CUBIC_CAPACITY || '',
        status_message: '',
        wheelbase: '',
        status: '',
        npermit_issued_by: '',
        noc_status: '',
        mv_tax_upto: formattedResult.vahanData[0]?.VEHICLE_TAX_UPTO || '',
        state: '',
        npermit_no: formattedResult.vahanData[0]?.VEHICLE_PERMIT_NUMBER || '',
        noc_valid_upto: '',
        noc_issue_date: '',
        status_verification: '',
        puc_valid_upto: '',
        unladden_weight: '',
        standing_capacity: '',
        status_verfy_date: '',
        vehicle_category: '',
        sleeper_capacity: '',
        rc_expiry_date: '',
        created_at: new Date(),
    };
}

// ------------------- Carinfo API -------------------
const getFromCarinfo = async(url, vehicleNumber, res)=> {
    const headers = {
        "Authorization": `Bearer ${process.env.BEARER_TOKEN || ""}`,
        "apiKey": process.env.API_KEY ?? "",
        "clientId": process.env.CLIENT_ID ?? "",
        "Content-Type": "application/json",
    };

    const fullUrl = `${url}?vehicle_num=${encodeURIComponent(vehicleNumber)}`;
    const response = await axios.get(fullUrl, { headers });
    const formattedResult = response.data.data;

    let registration_date = formattedResult.regDate && moment(formattedResult.regDate, "DD-MMM-YYYY", true).isValid()
                            ? moment(formattedResult.regDate, "DD-MMM-YYYY").format("YYYY-MM-DD")
                            : '';
    let m_registration = registration_date ? moment(registration_date, "YYYY-MM-DD").format("M") : '';
    let m_registration_name = registration_date ? moment(registration_date, "YYYY-MM-DD").format("MMMM") : '';
    let y_registration = registration_date ? moment(registration_date, "YYYY-MM-DD").format("YYYY") : '';

    let m_y_manufacturing = formattedResult.vehicleManufacturingMonthYear || '';
    let m_manufacturing = m_y_manufacturing ? moment(m_y_manufacturing, "M/YYYY").format("M") : '';
    let m_manufacturing_name = m_y_manufacturing ? moment(m_y_manufacturing, "M/YYYY").format("MMMM") : '';
    let y_manufacturing = m_y_manufacturing ? moment(m_y_manufacturing, "M/YYYY").format("YYYY") : '';

    return {
        temp_vahan_search_uid: '',
        owner_name: formattedResult.owner || '',
        registered_place: formattedResult.regAuthority || '',
        owner_mobile_no: formattedResult.mobileNumber || '',
        manufacturer: formattedResult.vehicleManufacturerName || '',
        manufacturer_model: formattedResult.model || '',
        engine_number: formattedResult.engine || '',
        chassis_number: formattedResult.chassis || '',
        registration_number: formattedResult.regNo || '',
        registration_date: registration_date || '',
        m_registration: m_registration?.toString() || '',
        m_registration_name: m_registration_name?.toString() || '',
        y_registration: y_registration?.toString() || '',
        body_type: formattedResult.bodyType || '',
        m_y_manufacturing: m_y_manufacturing ? moment(m_y_manufacturing, "M/YYYY").format("MM/YYYY") : '',
        m_manufacturing: m_manufacturing?.toString() || '',
        y_manufacturing: y_manufacturing?.toString() || '',
        m_manufacturing_name: m_manufacturing_name?.toString() || '',
        seating_capacity: formattedResult.vehicleSeatCapacity || '',
        fuel_type: formattedResult.type || '',
        insurance_name: formattedResult.vehicleInsuranceCompanyName || '',
        insurance_validity: formattedResult.vehicleInsuranceUpto ? moment(formattedResult.vehicleInsuranceUpto, "DD-MMM-YYYY").format("YYYY-MM-DD") : '',
        vehicle_class: formattedResult.vehicleCategory || '',
        colour: formattedResult.vehicleColour || '',
        owner_serial_number: formattedResult.ownerCount?.toString() || '',
        number_of_cylinder: formattedResult.vehicleCylindersNo || '',
        permit_no: formattedResult.permitNumber || '',
        fitness_upto: '',
        insurance_policy_no: formattedResult.vehicleInsurancePolicyNumber || '',
        permanent_address: formattedResult.permanentAddress || '',
        permit_validity_from: formattedResult.permitValidFrom ? moment(formattedResult.permitValidFrom, "DD-MMM-YYYY").format("YYYY-MM-DD") : '',
        permit_validity_upto: formattedResult.permitValidUpto ? moment(formattedResult.permitValidUpto, "DD-MMM-YYYY").format("YYYY-MM-DD") : '',
        permit_type: formattedResult.permitType || '',
        financer: formattedResult.rcFinancer || '',
        noc_details: formattedResult.nocDetails || '',
        norms_type: formattedResult.normsType || '',
        blacklist_status: formattedResult.blacklistStatus || '',
        puc_number: formattedResult.puccNumber || '',
        current_address: formattedResult.presentAddress || '',
        permit_issue_date: formattedResult.permitIssueDate || '',
        npermit_upto: formattedResult.nationalPermitUpto || '',
        father_name: formattedResult.ownerFatherName || '',
        gross_vehicle_weight: formattedResult.grossVehicleWeight || '',
        cubic_capacity: formattedResult.vehicleCubicCapacity || '',
        status_message: '',
        wheelbase: formattedResult.wheelbase || '',
        status: formattedResult.status || '',
        npermit_issued_by: formattedResult.nationalPermitIssuedBy || '',
        noc_status: '',
        mv_tax_upto: formattedResult.vehicleTaxUpto || '',
        state: '',
        npermit_no: formattedResult.nationalPermitNumber || '',
        noc_valid_upto: '',
        noc_issue_date: '',
        status_verification: '',
        puc_valid_upto: formattedResult.puccUpto || '',
        unladden_weight: formattedResult.unladenWeight || '',
        standing_capacity: formattedResult.vehicleStandingCapacity || '',
        status_verfy_date: '',
        vehicle_category: formattedResult.vehicleClass || '',
        sleeper_capacity: formattedResult.vehicleSleeperCapacity || '',
        rc_expiry_date: formattedResult.rcExpiryDate || '',
        created_at: new Date(),
    };
}

// ------------------- Fetch & Update Vehicle -------------------
const fetchAndUpdateVehicleData = async (foundData, res)=> {
    const url = process.env.vahanSearch;
    const vehicleNumber = foundData.dataValues.reg_no;

    let existingRecord = await VehicleInformation.findOne({
        where: { registration_number: vehicleNumber }
    });

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    if (existingRecord) {
        const lastUpdatedAt = new Date(existingRecord.updated_at || existingRecord.created_at);

        if (lastUpdatedAt <= threeMonthsAgo) {
            let dataFromApi, fromApi;
            if (url.includes("maalta")) {
                dataFromApi = await getFromMalta(url, vehicleNumber, res);
                fromApi = "Maalta Search API";
            } else if (url.includes("fla")) {
                dataFromApi = await getFromFastline(url, vehicleNumber, res);
                fromApi = "FastLine Search API";
            } else if (url.includes("cuvora")) {
                dataFromApi = await getFromCarinfo(url, vehicleNumber, res);
                fromApi = "CarInfo Search API";
            }

            await existingRecord.update({ ...dataFromApi, updated_at: new Date() });

            const [vahanHitCount, created] = await VahanHitCount.findOrCreate({
                where: { vahan_name: fromApi },
                defaults: { hit_count: 1, user_id: 2725 }
            });

            if (!created) await vahanHitCount.increment('hit_count');
        }
        return existingRecord;
    } else {
        let dataFromApi, fromApi;
        if (url.includes("maalta")) {
            dataFromApi = await getFromMalta(url, vehicleNumber, res);
            fromApi = "Maalta Search API";
        } else if (url.includes("fla")) {
            dataFromApi = await getFromFastline(url, vehicleNumber, res);
            fromApi = "FastLine Search API";
        } else if (url.includes("cuvora")) {
            dataFromApi = await getFromCarinfo(url, vehicleNumber, res);
            fromApi = "CarInfo Search API";
        }

        if (dataFromApi?.registration_number) {
            existingRecord = await VehicleInformation.create({ ...dataFromApi, updated_at: null });

            const [vahanHitCount, created] = await VahanHitCount.findOrCreate({
                where: { vahan_name: fromApi },
                defaults: { hit_count: 1, user_id: 2725 }
            });
            if (!created) await vahanHitCount.increment('hit_count');

            return existingRecord;
        } else {
            return null;
        }
    }
}

module.exports = {
    getFromMalta,
    getFromFastline,
    getFromCarinfo,
    fetchAndUpdateVehicleData
};
