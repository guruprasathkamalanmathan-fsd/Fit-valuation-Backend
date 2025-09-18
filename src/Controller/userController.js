const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const Validator = require("validatorjs");
const uniqid = require("uniqid"); // kept, but replaced in use
const crypto = require("crypto"); // secure token gen
const bcrypt = require("bcrypt");
const { sequelize } = require("../Database/db");
const fileupload = require("../services/fileUpload");
const nodemailer = require("nodemailer");
const moment = require("moment-timezone");
const config = require("../config/config.json");

// Models
const UserMaster = require("../Database/models/userMaster");
const RoleMaster = require("../Database/models/Rolemaster");
const ProcessMaster = require("../Database/models/ProcessMaster");
const JobManage = require("../Database/models/JobManage");
const PasswordHistory = require("../Database/models/PasswordHistory");
const VersionControl = require("../Database/models/VersionContol");

//servicess
const attachmentService = require("../services/attachmentService");
const EmailService = require("../services/emailService");

// 🔹 Utility: Extract validation errors
const getValidationErrors = (validation) => {
  Object.values(validation.errors)
    .map((e) => e.message)
    .join(", ");
};
// login api
// login.controller.js (CJS)
const login = async (req, res) => {
  try {
    const {
      UserName,
      Password,
      FingerprintToken,
      includeSupportInfo,
      versionCode,
    } = req.body;

    // 1️⃣ Input Validation
    const validation = new Validator(req.body, {
      UserName: "required|string",
      Password: "required_if:FingerprintToken,null", // Password required if fingerprint not provided
      AppVersion: "required",
      VersionCode: "required",
      MANUFACTURER: "required",
      MODEL: "required",
      SDK_VERSION: "required|integer|min:0",
      NETWORK_TYPE: "required",
    });
    if (!(await validation.check())) {
      return res.status(400).json({
        success: false,
        message: Object.values(validation.errors)
          .map((e) => e.message)
          .join(" "),
      });
    }

    // 2️⃣ Find User
    const user = await UserMaster.findOne({
      where: { username: UserName, status: 1 },
    });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    // 3️⃣ Password expiry check
    const now = Date.now();
    const lastReset = user.last_reset_date
      ? new Date(user.last_reset_date).getTime()
      : null;

    let alert = "";
    if (lastReset) {
      const daysSinceReset = Math.ceil(
        (now - lastReset) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceReset > 30) {
        // Disable biometric if password expired
        if (user.is_biometric_enabled) {
          await user.update({ is_biometric_enabled: false });
        }
        return res.status(401).json({
          success: false,
          message: "Password expired. Reset your password.",
        });
      }
      if (daysSinceReset >= 27) {
        const remaining = 30 - daysSinceReset;
        alert = `Your password will expire in ${remaining} day${
          remaining !== 1 ? "s" : ""
        }. Please reset your password.`;
      }
    }

    // 4️⃣ Fingerprint login if enabled
    let loginSuccess = false;
    if (
      user.is_biometric_enabled &&
      FingerprintToken &&
      user.fingerprint_hash
    ) {
      loginSuccess = await bcrypt.compare(
        FingerprintToken,
        user.fingerprint_hash
      );
      if (!loginSuccess && !Password) {
        return res
          .status(401)
          .json({ success: false, message: "Fingerprint mismatch" });
      }
    }

    // 5️⃣ Fallback to password login
    // if (!loginSuccess) {
    //   if (!Password)
    //     return res
    //       .status(401)
    //       .json({ success: false, message: "Password required" });
    //   const isMatch = await bcrypt.compare(Password, user.password);
    //   if (!isMatch)
    //     return res
    //       .status(401)
    //       .json({ success: false, message: "Invalid credentials" });
    // }

    if (!loginSuccess) {
      if (!Password)
        return res
          .status(401)
          .json({ success: false, message: "Password required" });

      let isMatch = false;

      // 1️⃣ First check if DB password is plain text
      if (Password === user.password) {
        isMatch = true;
      } else {
        // 2️⃣ If not, try bcrypt comparison
        try {
          isMatch = await bcrypt.compare(Password, user.password);
        } catch (err) {
          console.error("bcrypt compare error:", err);
        }
      }

      if (!isMatch)
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
    }

    // 6️⃣ Device login check
    if (user.device_login_flag === 1) {
      return res.status(200).json({
        success: false,
        token: user.auth_token,
        username: user.username,
        message: "Already logged in on another device. Logout there first?",
        requireLogout: true,
      });
    }

    // 7️⃣ Generate or reuse auth token
    let authToken = user.auth_token || crypto.randomBytes(24).toString("hex");
    if (!user.auth_token) {
      await user.update({
        auth_token: authToken,
        device_login_flag: 1,
        last_login: new Date(),
      });
    }

    // 8️⃣ Fetch related data concurrently
    const [roles, processes, vendor, latestVersion] = await Promise.all([
      RoleMaster.findAll({
        where: {
          uid: { [Op.in]: user.role_id ? user.role_id.split(",") : [] },
        },
        attributes: ["rolename"],
      }),
      ProcessMaster.findAll({
        where: {
          uid: {
            [Op.in]: user.selected_process
              ? user.selected_process.split(",")
              : [],
          },
        },
        attributes: ["process_type_code", "process_type", "vehicle_type"],
      }),
      JobManage.findOne({
        where: { uid: user.uid },
        attributes: ["vendor_id"],
      }),
      VersionControl.findOne({ order: [["created_at", "DESC"]] }),
    ]);

    const roleNames = roles.map((r) => r.rolename);
    const vendor_id = vendor ? vendor.vendor_id : "";

    // 9️⃣ Role-based permissions
    const rolePermissions = {
      CUSTOMER_SUPERVISOR: [
        "Search",
        "Order List",
        "Create Order",
        "Dashboard",
      ],
      CUSTOMER_EXC: ["Dashboard", "Create Order", "Order List", "Search"],
      OPS_MANAGER: [
        "Dashboard",
        "Create Order",
        "Pre-QC",
        "Create User",
        "Order List",
        "Search",
      ],
      TECHNICIAN: [
        "Dashboard",
        "Notification",
        "Technician Orders",
        "Order List",
        "Search",
      ],
      APP_QC: ["Dashboard", "QC Assigned Orders", "Order List", "Search"],
    };
    const Permission = roleNames.map((role) => ({
      RoleName: role,
      Menu: rolePermissions[role] || [],
    }));

    // 🔟 Optional: Version Info
    let versionInfo = null;
    if (versionCode && latestVersion) {
      versionInfo = {
        currentVersion: versionCode,
        latestVersion: latestVersion.version_code,
        forceUpdate:
          parseInt(versionCode) < parseInt(latestVersion.version_code),
      };
    }

    // 1️⃣1️⃣ Optional: Support Info
    let supportInfo = null;
    if (includeSupportInfo === true) {
      const SupportInfo = config.support_info;
      supportInfo = Array.isArray(SupportInfo) ? SupportInfo : [SupportInfo];
    }

    // 1️⃣2️⃣ Final response
    const finalData = {
      FirstName: user.first_name,
      UserName: user.username,
      UserEmail: user.email_official,
      AuthenticationToken: authToken,
      IsLoginSuccessfull: true,
      CompanyType: user.company_type,
      CompanyId: user.company_id,
      UserAllottedStates: user.selected_state,
      UserRole: roleNames,
      Processes: processes,
      profileImage: await attachmentService.convertion(user.profile_pic),
      versionInfo,
      supportInfo,
      Permission,
      userId: `${user.empid}`,
      fromWhere: "7",
      availableImages: "Yes",
      vendor_id,
    };

    return res.status(200).json({ success: true, data: finalData, alert });
  } catch (err) {
    console.error("Login Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// logout api
const logout = async (req, res) => {
  try {
    const { UserName, AuthenticationToken } = req.body;

    if (!UserName || !AuthenticationToken) {
      return res.status(400).json({
        success: false,
        message: "Missing UserName or AuthenticationToken",
      });
    }

    const foundData = await UserMaster.findOne({
      where: {
        username: UserName,
        auth_token: AuthenticationToken,
      },
    });

    if (!foundData) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }

    await UserMaster.update(
      {
        auth_token: null,
        device_login_flag: 0,
        last_logout: new Date(),
      },
      { where: { uid: foundData.uid } }
    );

    return res.json({
      success: true,
      data: { message: "User Logged out Successfully!" },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// upload image api
const uploadImage = async (req, res) => {
  try {
    const { AuthenticationToken, profileImage } = req.body;

    if (!AuthenticationToken || !profileImage) {
      return res.status(400).json({
        success: false,
        message: "Missing AuthenticationToken or profile image",
      });
    }

    // find user by token (don’t trust uid from client)
    const foundData = await UserMaster.findOne({
      where: { auth_token: AuthenticationToken },
    });

    if (!foundData) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Authentication Token" });
    }

    await attachmentService.upload({
      uid: foundData.uid,
      image: profileImage,
    });

    return res.json({
      success: true,
      message: "Profile Pic Updated Successfully!",
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to upload profile picture",
    });
  }
};
// forgot password api Combined Forgot / Reset Password API
const handlePassword = async (req, res) => {
  try {
    const { action } = req.query; // ?action=forgot or ?action=reset

    // 🔹 Forgot password
    if (action === "forgot") {
      const { email_id } = req.body;
      const validation = new Validator(req.body, {
        email_id: "required|email",
      });
      if (!(await validation.check())) {
        return res.status(400).json({
          success: false,
          message: getValidationErrors(validation),
        });
      }

      const foundData = await UserMaster.findOne({
        where: { email_official: email_id },
      });

      if (!foundData) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid User Email Address" });
      }

      // generate temp password (plain text)
      const tempPass = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString();

      // hash before saving
      const hashedTemp = await bcrypt.hash(tempPass, 10);

      await UserMaster.update(
        { password: hashedTemp },
        { where: { uid: foundData.uid } }
      );

      await EmailService.sendEmail({
        email_id,
        subject: "Forgot password request",
        html: `Your temporary password is: ${tempPass}`, // send plain text
        attachments: null,
      });

      return res.json({
        success: true,
        message: "Temporary Password sent to Email!",
      });
    }

    // 🔹 Reset password
    if (action === "reset") {
      const { UserName, OldPassword, NewPassword } = req.body;
      const validation = new Validator(req.body, {
        UserName: "required",
        OldPassword: "required",
        NewPassword: "required",
      });

      if (!(await validation.check())) {
        return res.status(400).json({
          success: false,
          message: getValidationErrors(validation),
        });
      }

      const foundData = await UserMaster.findOne({
        where: { username: UserName },
      });

      if (!foundData) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // compare plain text OldPassword with hashed DB password
      const isMatch = await bcrypt.compare(OldPassword, foundData.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // check password history (hash it before checking)
      const isPasswordInHistory = await PasswordHistory.findOne({
        where: { password: await bcrypt.hash(NewPassword, 10) },
      });

      if (isPasswordInHistory) {
        return res.status(400).json({
          success: false,
          message: "New password already used. Choose a different one.",
        });
      }

      // hash new password before saving
      const hashedNew = await bcrypt.hash(NewPassword, 10);

      await UserMaster.update(
        {
          password: hashedNew,
          auth_token: null,
          device_login_flag: 0,
          last_reset_date: new Date(),
        },
        { where: { uid: foundData.uid } }
      );

      await PasswordHistory.create({
        uid: foundData.uid,
        password: hashedNew,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.json({
        success: true,
        message: "Password updated successfully!",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid action. Use action=forgot or action=reset",
    });
  } catch (err) {
    console.error("Password handler error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
// fingure print
const fingerPrintPassword = async (req, res) => {
  try {
    const { UserName, FingerprintToken, Password } = req.body;

    // 1️⃣ Validate payload (username always required)
    const validatorRules = { UserName: "required|string" };
    const v = new Validator(req.body, validatorRules);
    if (!(await v.check())) {
      const message = Object.values(v.errors)
        .map((e) => e.message)
        .join(" ");
      return res.status(400).json({ success: false, message });
    }

    // 2️⃣ Find user by username
    const user = await UserMaster.findOne({ where: { username: UserName } });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    let loginSuccess = false;

    // 3️⃣ Check if biometric login is enabled
    if (user.is_biometric_enabled) {
      if (!FingerprintToken) {
        return res
          .status(400)
          .json({ success: false, message: "Fingerprint token required" });
      }

      // Compare provided fingerprint token with stored hash
      loginSuccess = await bcrypt.compare(
        FingerprintToken,
        user.fingerprint_hash
      );

      if (!loginSuccess) {
        // Fallback to password if token mismatch
        if (!Password) {
          return res
            .status(401)
            .json({ success: false, message: "Fingerprint mismatch" });
        }
      }
    }

    // 4️⃣ Traditional username/password login if biometric disabled or fallback
    if (!loginSuccess) {
      if (!Password) {
        return res
          .status(401)
          .json({ success: false, message: "Password required" });
      }

      // Compare password (assuming hashed in DB)
      loginSuccess = await bcrypt.compare(Password, user.password);
      if (!loginSuccess) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    }

    // 5️⃣ Update timestamps on successful login
    const now = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    await user.update({
      last_login: now,
      last_logout: now,
      last_reset_date: now,
    });

    // 6️⃣ Respond success
    return res.json({
      success: true,
      message: "Login successful!",
      user: {
        uid: user.uid,
        username: user.username,
        email: user.email_official,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
// ---- Deactivate Users Cron Job ----
const deactivateUserCronJob = async (req, res) => {
  try {
    const allUsers = await UserMaster.findAll();
    const currentDate = new Date();

    const updatePromises = allUsers.map(async (user) => {
      const lastLoginDate = new Date(user.last_login);

      if (
        currentDate >=
          new Date(lastLoginDate.setDate(lastLoginDate.getDate() + 150)) &&
        user.device_login_flag == 1 &&
        user.auth_token != null
      ) {
        user.auth_token = null;
        user.device_login_flag = 0;
        await user.save();
      }
    });

    await Promise.all(updatePromises);
  } catch (err) {
    console.error("Error in Cron Job:", err);
  }
};
// ---- Send User Login Email ----
// const sendUserLoginEmail = async (req, res) => {
//   try {
//     const payload = req.body;
//     const validatorRules = { email_id: "required" }; // Use `email` if that's what frontend sends

//     const v = new Validator(payload, validatorRules);
//     const matched = await v.check();

//     if (!matched) {
//       const message = Object.values(v.errors).map((e) => e.message).join(" ");
//       return res.status(400).send({ success: false, message });
//     }

//     const users = await UserMaster.findAll({ where: { status: 1 } });

//     const transporter = nodemailer.createTransport({
//       host: process.env.smtphost,
//       port: process.env.smtpport,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: process.env.smtpuser,
//         pass: process.env.smtppass,
//       },
//     });

//     for (const user of users) {
//       const mailOptions = {
//         from: { name: "TVS FIT", address: process.env.smtpuser },
//         to: payload.email_official,
//         cc: "",
//         subject: `Introduction of KI MOBILITY (TVS AUTO ASSIST) - Expert Vehicle Valuation Services in Pan India - ${user.username}`,
//         html: `
//             <html>
//             <head>
//               <style>
//                 body {
//                   font-family: 'Work Sans', sans-serif;
//                   color: #333;
//                   line-height: 1.6;
//                   background-color: #f0f4f8;
//                   padding: 20px;
//                   font-size: 1rem; /* Base font size */
//                 }

//                 h1, h2, h3, h4, h5, h6 {
//                   font-weight: 700;
//                   color: #0056b3; /* Dark Blue for headings */
//                 }

//                 h1 {
//                   font-size: 2rem; /* Responsive heading size */
//                   border-bottom: 2px solid #0056b3;
//                   padding-bottom: 0.5rem;
//                   margin-bottom: 1.5rem;
//                 }

//                 h2 {
//                   font-size: 1.5rem; /* Responsive subheading size */
//                   color: #007bff; /* Blue for subheadings */
//                 }

//                 h3 {
//                   font-size: 1.2rem; /* Responsive sub-subheading size */
//                   color: #0056b3; /* Dark Blue for sub-subheadings */
//                 }

//                 h4 {
//                   font-size: 1rem; /* Responsive size for h4 */
//                 }

//                 p {
//                   margin-bottom: 1rem; /* Spacing between paragraphs */
//                 }

//                 table {
//                   width: 100%;
//                   border-collapse: collapse;
//                   margin-bottom: 1.5rem; /* Margin for spacing */
//                 }

//                 th, td {
//                   padding: 0.75rem; /* Padding inside cells */
//                   border: 1px solid #ddd;
//                   text-align: left;
//                   font-size: 1rem; /* Font size for table text */
//                 }

//                 th {
//                   background-color: #4da6ff; /* Blue background for table headers */
//                   color: #fff;
//                   font-size: 1.1rem; /* Slightly larger text for headers */
//                 }

//                 td {
//                   background-color: #fff;
//                   color: #333;
//                 }

//                 thead {
//                   background-color: #f1f9ff; /* Light Blue background for thead */
//                 }

//                 tbody tr:nth-child(even) {
//                   background-color: #f9f9f9;
//                 }

//                 tbody tr:nth-child(odd) {
//                   background-color: #ffffff;
//                 }

//                 .highlight {
//                   background-color: #ffebee;
//                   color: #c62828;
//                   padding: 0.75rem;
//                   border-radius: 0.5rem;
//                   margin: 1.5rem 0;
//                 }

//                 a {
//                   color: #007bff;
//                   text-decoration: none;
//                 }

//                 a:hover {
//                   text-decoration: underline;
//                 }

//                 .note {
//                   background-color: #e8f5e9;
//                   color: #2e7d32;
//                   padding: 1rem;
//                   border-radius: 0.5rem;
//                   margin: 1.5rem 0;
//                 }

//                 .footer {
//                   background-color: #007bff;
//                   color: #fff;
//                   padding: 1rem;
//                   border-radius: 0.5rem;
//                   margin-top: 1.5rem;
//                   text-align: center;
//                 }

//                 /* Responsive font sizes */
//                 @media (max-width: 1200px) {
//                   h1 {
//                     font-size: 1.75rem; /* Smaller size on medium screens */
//                   }

//                   h2 {
//                     font-size: 1.4rem; /* Slightly smaller size on medium screens */
//                   }

//                   h3 {
//                     font-size: 1.1rem; /* Slightly smaller size on medium screens */
//                   }

//                   p, th, td {
//                     font-size: 0.95rem; /* Slightly smaller text on medium screens */
//                   }
//                 }

//                 @media (max-width: 768px) {
//                   h1 {
//                     font-size: 1.5rem; /* Smaller size on small screens */
//                   }

//                   h2 {
//                     font-size: 1.2rem; /* Slightly smaller size on small screens */
//                   }

//                   h3 {
//                     font-size: 1rem; /* Smaller size on small screens */
//                   }

//                   p, th, td {
//                     font-size: 0.9rem; /* Smaller text on small screens */
//                   }

//                   .highlight, .note, .footer {
//                     padding: 0.5rem; /* Less padding on small screens */
//                     margin: 1rem 0; /* Less margin on small screens */
//                   }
//                 }

//                 @media (max-width: 480px) {
//                   h1 {
//                     font-size: 1.25rem; /* Smallest size on very small screens */
//                   }

//                   h2 {
//                     font-size: 1rem; /* Smallest size on very small screens */
//                   }

//                   h3 {
//                     font-size: 0.9rem; /* Smallest size on very small screens */
//                   }

//                   p, th, td {
//                     font-size: 0.85rem; /* Smallest text on very small screens */
//                   }

//                   .highlight, .note, .footer {
//                     padding: 0.5rem;
//                     margin: 0.5rem 0; /* Adjust margin for very small screens */
//                   }
//                 }
//               </style>
//             </head>
//             <body>
//               <h1>Introduction of KI MOBILITY (TVS AUTO ASSIST)</h1>

//               <p>Dear ${user.username},</p>

//               <p>I hope this message finds you well.</p>

//               <p>My name is Anant Kumar, and I am responsible for Used Vehicle Valuation at KI Mobility Solution Pvt Ltd (TVS Auto Assist). I am reaching out to introduce you to our specialized vehicle valuation services available across PAN India with the minimum turnaround time.</p>

//               <h2>About KI Mobility Solution Pvt Ltd (TVS Auto Assist):</h2>
//               <p>At <strong>KI Mobility Solution Pvt Ltd (TVS Auto Assist)</strong>, we specialize in providing accurate and reliable vehicle valuation services tailored to meet the needs of both individuals and businesses. Whether you are looking to determine the value of a single vehicle or manage a fleet, we are here to assist you.</p>

//               <div class="note">
//                 <p><strong>Note:</strong> We are already impaneled with your company to provide used vehicle valuation services for all categories including Auto, Commercial Vehicles, Construction Equipment, Tractors, 2W, and 3W across PAN India.</p>
//               </div>

//               <p>Please find your user credentials below for raising valuation requests on our portal or through the app:</p>

//               <table>
//                 <tr>
//                   <th>User ID</th>
//                   <td>${user.username}</td>
//                 </tr>
//                 <tr>
//                   <th>Password</th>
//                   <td>${user.password}</td>
//                 </tr>
//                 <tr>
//                   <th>Portal Link</th>
//                   <td><a href="https://valuation.mytvs.in/login" target="_blank">https://valuation.mytvs.in/login</a></td>
//                 </tr>
//                 <tr>
//                   <th>Application Link</th>
//                   <td><a href="https://play.google.com/store/apps/details?id=com.tvsfit.inspection&pcampaignid=web_share" target="_blank">https://play.google.com/store/apps/details?id=com.tvsfit.inspection</a> (App Name: FIT VALUATION)</td>
//                 </tr>
//               </table>

//               <p><strong>Process to Create a Request:</strong></p>
//               <p>Log in to the app or portal. In the app, you will find a + sign to create a lead, and in the portal, you will see the "Create Order" option. You will need to enter basic details like Customer Name, Mobile Number, Make, and Model of the vehicle.</p>
//               <p>Once you create a request, you will start receiving real-time updates and can track the progress through both the app and the portal.</p>

//               <h2>State-wise SPOC Person Details and Escalation Matrix</h2>

//               <table>
//                 <thead>
//                   <tr>
//                     <th colspan="9">State-wise SPOC Person Details and Escalation Matrix</th>
//                   </tr>
//                   <tr>
//                     <th>State</th>
//                     <th>Zone</th>
//                     <th>State Head (Level 1)</th>
//                     <th>Contact Number</th>
//                     <th>Email ID</th>
//                     <th>Zone Head (Level 2)</th>
//                     <th>Contact No</th>
//                     <th>Email ID</th>
//                     <th>Zone Common Email ID</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td colspan="9" style="text-align: center; background-color: #e3f2fd; font-weight: bold;">East</td>
//                   </tr>
//                   <tr>
//                     <td>West Bengal</td>
//                     <td>East</td>
//                     <td>---</td>
//                     <td>7358356210</td>
//                     <td><a href="mailto:---">---</a></td>
//                     <td>Prashant Pal</td>
//                     <td>9840842248</td>
//                     <td><a href="mailto:prashant.pal@tvs.in">prashant.pal@tvs.in</a></td>
//                     <td>—</td>
//                   </tr>
//                   <tr>
//                     <td>Odisha</td>
//                     <td>East</td>
//                     <td>---</td>
//                     <td>7358356210</td>
//                     <td><a href="mailto:---">---</a></td>
//                     <td>Prashant Pal</td>
//                     <td>9840842248</td>
//                     <td><a href="mailto:prashant.pal@tvs.in">prashant.pal@tvs.in</a></td>
//                     <td>—</td>
//                   </tr>
//                   <tr>
//                     <td>Jharkhand</td>
//                     <td>East</td>
//                     <td>---</td>
//                     <td>7358356210</td>
//                     <td><a href="mailto:---">---</a></td>
//                     <td>Prashant Pal</td>
//                     <td>9840842248</td>
//                     <td><a href="mailto:prashant.pal@tvs.in">prashant.pal@tvs.in</a></td>
//                     <td>—</td>
//                   </tr>
//                   <tr>
//                     <td>Assam</td>
//                     <td>East</td>
//                     <td>---</td>
//                     <td>7358356210</td>
//                     <td><a href="mailto:---">---</a></td>
//                     <td>Prashant Pal</td>
//                     <td>9840842248</td>
//                     <td><a href="mailto:prashant.pal@tvs.in">prashant.pal@tvs.in</a></td>
//                     <td>—</td>
//                   </tr>
//                   <tr>
//                     <td colspan="9" style="text-align: center; background-color: #e3f2fd; font-weight: bold;">North</td>
//                   </tr>
//                   <tr>
//                     <td>Rajasthan</td>
//                     <td>North</td>
//                     <td>Pankaj Singh</td>
//                     <td>9840203753</td>
//                     <td><a href="mailto:pankaj.kumar@tvs.in">pankaj.kumar@tvs.in</a></td>
//                     <td>Lokesh Kumar</td>
//                     <td>9211961977</td>
//                     <td><a href="mailto:lokesh.kumar@tvs.in">lokesh.kumar@tvs.in</a></td>
//                     <td><a href="mailto:north.valuation@tvs.in">north.valuation@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Delhi/Haryana</td>
//                     <td>North</td>
//                     <td>krishan Gopal</td>
//                     <td>7523036205</td>
//                     <td><a href="mailto:krishan.gopal@tvs.in">krishan.gopal@tvs.in</a></td>
//                     <td>Lokesh Kumar</td>
//                     <td>9211961977</td>
//                     <td><a href="mailto:lokesh.kumar@tvs.in">lokesh.kumar@tvs.in</a></td>
//                     <td><a href="mailto:north.valuation@tvs.in">north.valuation@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Uttar Pradesh/ Uttarakhand</td>
//                     <td>North</td>
//                     <td>Ajeet Singh</td>
//                     <td>9840203749</td>
//                     <td><a href="mailto:ajeet.singh@tvs.in">ajeet.singh@tvs.in</a></td>
//                     <td>Lokesh Kumar</td>
//                     <td>9211961977</td>
//                     <td><a href="mailto:lokesh.kumar@tvs.in">lokesh.kumar@tvs.in</a></td>
//                     <td><a href="mailto:north.valuation@tvs.in">north.valuation@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Punjab/Chandigarh/HP/JK</td>
//                     <td>North</td>
//                     <td>Prakash Chander</td>
//                     <td>7338796528</td>
//                     <td><a href="mailto:prakash.chander@tvs.in">prakash.chander@tvs.in</a></td>
//                     <td>Lokesh Kumar</td>
//                     <td>9211961977</td>
//                     <td><a href="mailto:lokesh.kumar@tvs.in">lokesh.kumar@tvs.in</a></td>
//                     <td><a href="mailto:north.valuation@tvs.in">north.valuation@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td colspan="9" style="text-align: center; background-color: #e3f2fd; font-weight: bold;">South</td>
//                   </tr>
//                   <tr>
//                     <td>Karnataka</td>
//                     <td>South</td>
//                     <td>Saranya S</td>
//                     <td>9900817772</td>
//                     <td><a href="mailto:saranya.sridharan@tvs.in">saranya.sridharan@tvs.in</a></td>
//                     <td>Amarnath Mohan</td>
//                     <td>9600189983</td>
//                     <td><a href="mailto:amarnath.mohan@tvs.in">amarnath.mohan@tvs.in</a></td>
//                     <td><a href="mailto:valuation.south@tvs.in">valuation.south@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Tamil Nadu 1</td>
//                     <td>South</td>
//                     <td>Thamarai Selvan</td>
//                     <td>9358152139</td>
//                     <td><a href="mailto:thamarai.selvan@tvs.in">thamarai.selvan@tvs.in</a></td>
//                     <td>Amarnath Mohan</td>
//                     <td>9600189983</td>
//                     <td><a href="mailto:amarnath.mohan@tvs.in">amarnath.mohan@tvs.in</a></td>
//                     <td><a href="mailto:valuation.south@tvs.in">valuation.south@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Tamil Nadu 2</td>
//                     <td>South</td>
//                     <td>Dinesh K</td>
//                     <td>7358779851</td>
//                     <td><a href="mailto:dinesh.kumar@tvs.in">dinesh.kumar@tvs.in</a></td>
//                     <td>Amarnath Mohan</td>
//                     <td>9600189983</td>
//                     <td><a href="mailto:amarnath.mohan@tvs.in">amarnath.mohan@tvs.in</a></td>
//                     <td><a href="mailto:valuation.south@tvs.in">valuation.south@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Andhra Pradesh</td>
//                     <td>South</td>
//                     <td>Santosh K</td>
//                     <td>7358774604</td>
//                     <td><a href="mailto:santosh.kumar@tvs.in">santosh.kumar@tvs.in</a></td>
//                     <td>Amarnath Mohan</td>
//                     <td>9600189983</td>
//                     <td><a href="mailto:amarnath.mohan@tvs.in">amarnath.mohan@tvs.in</a></td>
//                     <td><a href="mailto:valuation.south@tvs.in">valuation.south@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Telangana</td>
//                     <td>South</td>
//                     <td>Jyothi Prakash</td>
//                     <td>9840201285</td>
//                     <td><a href="mailto:jyothi.prakash@tvs.in">jyothi.prakash@tvs.in</a></td>
//                     <td>Amarnath Mohan</td>
//                     <td>9600189983</td>
//                     <td><a href="mailto:amarnath.mohan@tvs.in">amarnath.mohan@tvs.in</a></td>
//                     <td><a href="mailto:valuation.south@tvs.in">valuation.south@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Kerala</td>
//                     <td>South</td>
//                     <td>Remya M</td>
//                     <td>9384224289</td>
//                     <td><a href="mailto:remya.muraleedha@tvs.in">remya.muraleedha@tvs.in</a></td>
//                     <td>Amarnath Mohan</td>
//                     <td>9600189983</td>
//                     <td><a href="mailto:amarnath.mohan@tvs.in">amarnath.mohan@tvs.in</a></td>
//                     <td><a href="mailto:valuation.south@tvs.in">valuation.south@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td colspan="9" style="text-align: center; background-color: #e3f2fd; font-weight: bold;">West</td>
//                   </tr>
//                   <tr>
//                     <td>Maharashtra/Goa 1</td>
//                     <td>West</td>
//                     <td>Sanhita More</td>
//                     <td>7263016863</td>
//                     <td><a href="mailto:sanhita.sivoj@tvs.in">sanhita.sivoj@tvs.in</a></td>
//                     <td>Anil Thakre</td>
//                     <td>9840203691</td>
//                     <td><a href="mailto:anil.thakre@tvs.in">anil.thakre@tvs.in</a></td>
//                     <td><a href="mailto:west.valuation@tvs.in">west.valuation@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Maharashtra/Goa 2</td>
//                     <td>West</td>
//                     <td>Ajay Mahadev Pawar</td>
//                     <td>7305990923</td>
//                     <td><a href="mailto:ajay.mahadev@tvs.in">ajay.mahadev@tvs.in</a></td>
//                     <td>Anil Thakre</td>
//                     <td>9840203691</td>
//                     <td><a href="mailto:anil.thakre@tvs.in">anil.thakre@tvs.in</a></td>
//                     <td><a href="mailto:west.valuation@tvs.in">west.valuation@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Gujarat 1</td>
//                     <td>West</td>
//                     <td>Pandya Jayant</td>
//                     <td>9714999913</td>
//                     <td><a href="mailto:pandya.jayant@tvs.in">pandya.jayant@tvs.in</a></td>
//                     <td>Anil Thakre</td>
//                     <td>9840203691</td>
//                     <td><a href="mailto:anil.thakre@tvs.in">anil.thakre@tvs.in</a></td>
//                     <td><a href="mailto:west.valuation@tvs.in">west.valuation@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Gujarat 2</td>
//                     <td>West</td>
//                     <td>Kesarkar Rahul</td>
//                     <td>9737767712</td>
//                     <td><a href="mailto:kesarkar.rahul@tvs.in">kesarkar.rahul@tvs.in</a></td>
//                    <td>Anil Thakre</td>
//                     <td>9840203691</td>
//                     <td><a href="mailto:anil.thakre@tvs.in">anil.thakre@tvs.in</a></td>
//                     <td><a href="mailto:west.valuation@tvs.in">west.valuation@tvs.in</a></td>
//                   </tr>
//                   <tr>
//                     <td>Madhya Pradesh/ Chhattisgarh</td>
//                     <td>West</td>
//                     <td>Nikitesh Saxena</td>
//                     <td>7305990926</td>
//                     <td><a href="mailto:nikitesh.saxena@tvs.in">nikitesh.saxena@tvs.in</a></td>
//                     <td>Anil Thakre</td>
//                     <td>9840203691</td>
//                     <td><a href="mailto:anil.thakre@tvs.in">anil.thakre@tvs.in</a></td>
//                     <td><a href="mailto:west.valuation@tvs.in">west.valuation@tvs.in</a></td>
//                   </tr>
//                 </tbody>
//               </table>

//               <h2>Escalation Matrix</h2>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Escalation Level</th>
//                       <th>Name</th>
//                       <th>Email ID</th>
//                       <th>Mobile Number</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Level 3 (South)</td>
//                       <td>Rajesh Kumar</td>
//                       <td><a href="mailto:rajesh.kumar@tvs.in">rajesh.kumar@tvs.in</a></td>
//                       <td>78455 59963</td>
//                     </tr>
//                     <tr>
//                       <td>Level 3 (North/East)</td>
//                       <td>Prashant Pal</td>
//                       <td><a href="mailto:prashant.pal@tvs.in">prashant.pal@tvs.in</a></td>
//                       <td>9840842248</td>
//                     </tr>
//                     <tr>
//                       <td>Final Level</td>
//                       <td>Anant R Kishor</td>
//                       <td><a href="mailto:anant.ramkishor@tvs.in">anant.ramkishor@tvs.in</a></td>
//                       <td>9840122793</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               <p>Kindly note that this is an automated response. Please do not reply to this email.</p>

//               <div class="highlight">
//                 <p><strong>For any queries or additional assistance, please feel free to contact us.</strong></p>
//               </div>

//               <p>Thank you for choosing KI Mobility Solution Pvt Ltd (TVS Auto Assist). We look forward to working with you.</p>

//               <p>Best Regards,<br>
//               Anant Kumar<br>
//               Used Vehicle Valuation<br>
//               KI Mobility Solution Pvt Ltd (TVS Auto Assist)</p>

//               <div class="footer">
//                 <p>&copy; ${new Date().getFullYear()} KI Mobility Solution Pvt Ltd (TVS Auto Assist). All rights reserved.</p>
//               </div>
//             </body>
//             </html>
//           `,
//       };

//       await transporter.sendMail(mailOptions);
//     }

//     return res.status(200).json({ success: true, message: "Emails sent successfully" });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };
// ---- Upload User Information ----
const uploadUserInformation = async (req, res) => {
  try {
    const payload = req.body;
    const validatorRules = {
      AuthenticationToken: "required",
      aadharCardNumber: "required|string",
      panCardNumber: "required|string",
      drivingLicenseNumber: "required|string",
      images: "required|array",
    };

    const v = new Validator(payload, validatorRules);
    const matched = await v.check();

    if (!matched) {
      let message = Object.values(v.errors)
        .map((e) => e.message)
        .join(" ");
      return res.status(400).json({ success: false, message });
    }

    const foundData = await UserMaster.findOne({
      where: { auth_token: payload.AuthenticationToken },
    });

    if (!foundData)
      return res.status(404).json({
        success: false,
        message: "User not found or invalid Authentication Token",
      });

    if (payload.images) {
      fileupload.uploadToUserInformation(
        payload.images,
        payload.AuthenticationToken
      );
    }

    await UserMaster.update(
      {
        aadharCardNumber: payload.aadharCardNumber,
        panCardNumber: payload.panCardNumber,
        drivingLicenseNumber: payload.drivingLicenseNumber,
      },
      { where: { auth_token: payload.AuthenticationToken } }
    );

    return res.json({
      success: true,
      message: "User information updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  login,
  logout,
  uploadImage,
  handlePassword,
  fingerPrintPassword,
  deactivateUserCronJob,
  uploadUserInformation,
  // sendUserLoginEmail
};
