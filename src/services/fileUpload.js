const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const UserMaster  = require("../Database/models/UserMaster");

const uploadToUserInformation = async (payload, AuthenticationToken) => {
  try {
    const maxWidth = 1960;
    const maxHeight = 2160;
    const overlayPath = path.resolve("./uploads/tvs_logo.png");

    // Pre-load overlay and font once
    const overlayLogo = await Jimp.read(overlayPath);
    const overlayWidth = 200;
    const overlayHeight =
      (overlayWidth / overlayLogo.getWidth()) * overlayLogo.getHeight();
    overlayLogo.resize(overlayWidth, overlayHeight);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

    // Ensure userInformation folder exists
    const localDir = path.resolve("./uploads/userInformation");
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }

    for (const element of payload.images) {
      const matches = element.image_data.match(
        /^data:([A-Za-z-+\/]+);base64,(.+)$/
      );
      if (!matches) continue; // skip invalid base64

      const imageTypeMatch = matches[1].match(/\/(.*?)$/);
      if (!imageTypeMatch) continue;

      const imgType = imageTypeMatch[1]; // extension (png/jpg/etc.)
      const imgData = matches[2];
      const fileName = `photo_${element.label.replace(/\s+/g, "_")}_${element.index}.${imgType}`;
      const filePath = path.join(localDir, fileName);

      // Read & resize image
      const image = await Jimp.read(Buffer.from(imgData, "base64"));
      if (image.getWidth() > maxWidth) image.resize(maxWidth, Jimp.AUTO);
      if (image.getHeight() > maxHeight) image.resize(maxHeight, Jimp.AUTO);

      // Add watermark overlay
      const overlayX = image.getWidth() - overlayWidth - 20;
      const overlayY = image.getHeight() - overlayHeight - 20;
      image.composite(overlayLogo, overlayX, overlayY, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 1,
        opacityDest: 1,
      });

      // Quality
      image.quality(30);

      // Save locally instead of GCP
      await image.writeAsync(filePath);

      // Update DB record with relative/local path
      const updateData = { [element.label]: `uploads/userInformation/${fileName}` };
      await UserMaster.update(updateData, {
        where: { auth_token: AuthenticationToken },
      });
    }

    return true;
  } catch (error) {
    console.error("Error in uploadToUserInformation:", error.message);
    throw error;
  }
};

module.exports = { uploadToUserInformation };
