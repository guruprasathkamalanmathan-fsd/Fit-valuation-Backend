const { Storage } = require("@google-cloud/storage");
const keyfileContent = require("../config/google-key.json");
const { Application, Usermaster } = require("../database/models");
const { Readable } = require("stream");
const path = require("path");
const Jimp = require("jimp");
require("dotenv").config();

const uploadBase64videoData = async(payload)=> {
  try {
    const bucketName = process.env.bucketName;
    const projectId = process.env.projectId;

    const fileOptions = {
      resumable: false,
      validation: false,
      metadata: {
        contentType: "video",
      },
    };

    const storage = new Storage({
      keyFilename: path.join(__dirname, "../config/google-key.json"),
      projectId: projectId,
    });

    const bucket = storage.bucket(bucketName);

    let videoData = payload.videoData;
    let matches = videoData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let imageTypeRegularExpression = /\/(.*?)$/;
    let imagetype = matches[1].match(imageTypeRegularExpression)[1];
    let imgData = matches[2];

    let img_loc = `video_${payload.app_client_id}/${payload.label}.${imagetype}`;

    const fileStream = Readable.from(Buffer.from(imgData, "base64"));

    const file = bucket.file(img_loc);
    const writeStream = file.createWriteStream(fileOptions);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
      fileStream
        .pipe(writeStream)
        .on("error", (err) => {
          console.error(err);
        })
        .on("finish", async () => {
          let cdnUrl = `https://storage.googleapis.com/${bucketName}/${img_loc}`;
          await Application.update(
            { ["media_files"]: cdnUrl },
            { where: { uid: payload.insp_id } }
          );
          return cdnUrl;
        });
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return error;
  }
}

const listFiles = async(prefix)=> {
  const storage = new Storage({
    credentials: keyfileContent,
  });

  const bucketName = process.env.bucketName || "";
  const bucket = storage.bucket(bucketName);

  const [files2] = await bucket.getFiles({ prefix: prefix });

  var files = [];
  for (let i = 0; i < files2.length; i++) {
    let [fileBuffer] = await files2[i].download();
    const mimeType = require("mime").getType(files2[i].name);
    let base64img =
      `data:${mimeType};base64,` + Buffer.from(fileBuffer).toString("base64");
    files.push(base64img);
  }
  return files;
}

const uploadtoGCS = async (payload)=> {
  const storage = new Storage({
    credentials: keyfileContent,
  });

  const bucketName = process.env.bucketName || "";
  const bucket = storage.bucket(bucketName);

  let j = 1;

  if (payload.update == "yes") {
    const folderName = `valuationPhotos/photo_${payload.insp_id}`;
    const [files] = await storage.bucket(bucketName).getFiles({
      prefix: folderName,
    });

    await Promise.all(files.map(async (file) => file.delete()));
  }

  for (let i = 0; i < payload.images.length; i++) {
    let element = payload.images[i];
    let matches = element["image_data"].match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    );
    let imageTypeRegularExpression = /\/(.*?)$/;
    let imagetype = matches[1].match(imageTypeRegularExpression)[1];
    let imgData = matches[2];

    let fileName = `valuationPhotos/photo_${payload.insp_id}/${element[
      "label"
    ].replaceAll(" ", "_")}_${element["index"]}.${imagetype}`;

    const image = await Jimp.read(Buffer.from(imgData, "base64"));
    const maxWidth = 1960;
    const maxHeight = 2160;

    let font_size = Jimp.FONT_SANS_32_WHITE;
    if (image.getWidth() > maxWidth) {
      image.resize(maxWidth, Jimp.AUTO);
    }
    if (image.getHeight() > maxHeight) {
      image.resize(maxHeight, Jimp.AUTO);
    }

    const font = await Jimp.loadFont(font_size);
    let datetime = element["date_time"];
    let location = element["location"];
    let latitude = element?.latitude ?? null;
    let longitude = element?.longitude ?? null;
    let altitude = element?.altitude ?? null;
    const logopath = path.resolve("./uploads/tvs_logo.png");
    const overlay = await Jimp.read(logopath);

    if (!payload.isWeb) {
      image.print(font, 10, 10, { text: datetime }, image.bitmap.width);
      image.print(font, 10, 50, { text: location }, image.bitmap.width);
      image.print(font, 10, 120, { text: "Lat - " + latitude }, image.bitmap.width);
      image.print(font, 10, 160, { text: "Long - " + longitude }, image.bitmap.width);
      image.print(font, 10, 200, { text: "Altitude - " + altitude }, image.bitmap.width);
    }

    const overlayWidth = 200;
    const overlayHeight = (overlayWidth / overlay.getWidth()) * overlay.getHeight();
    overlay.resize(overlayWidth, overlayHeight);

    const imageWidth = image.getWidth();
    const imageHeight = image.getHeight();
    const overlayX = imageWidth - overlayWidth - 20;
    const overlayY = imageHeight - overlayHeight - 20;

    image.composite(overlay, overlayX, overlayY);
    image.quality(30);

    const bufferedImage = await image.getBufferAsync(Jimp.MIME_JPEG);
    const file = bucket.file(fileName);
    await file.save(bufferedImage);

    let docField = `doc${element["index"] + 1}`;
    let updateData = {};
    updateData[docField] = fileName;

    if (payload.isWeb) {
      await Application.update(
        { ["doc" + payload.images[i].index]: fileName },
        { where: { uid: payload.insp_id } }
      );
    } else {
      await Application.update(updateData, { where: { uid: payload.insp_id } });
      j++;
    }
  }
}

const uploadToPerImageGCS = async (payload)=> {
  console.log(payload, "payload is there..");

  const storage = new Storage({ credentials: keyfileContent });
  const bucketName = process.env.bucketName || "";
  console.log("Bucket Name:", bucketName);

  const bucket = storage.bucket(bucketName);

  if (payload.update === "yes") {
    const folderName = `valuationPhotos/photo_${payload.insp_id}`;
    const [files] = await bucket.getFiles({ prefix: folderName });
    await Promise.all(files.map(async (file) => file.delete()));
  }

  const results = [];
  for (const element of payload.images) {
    console.log(element, "image is there..");

    const matches = element.image_data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches) {
      console.error("Invalid image data format.");
      continue;
    }

    const imageTypeRegularExpression = /\/(.*?)$/;
    const imagetype = matches[1].match(imageTypeRegularExpression)[1];
    const imgData = matches[2];

    const fileName = `valuationPhotos/photo_${payload.insp_id}/${element.label.replace(/ /g, "_")}.${imagetype}`;

    const bufferedImage = Buffer.from(imgData, "base64");
    const file = bucket.file(fileName);
    await file.save(bufferedImage);

    const docField = `doc${element.index + 1}`;
    const updateData = { [docField]: fileName };
    await Application.update(updateData, { where: { uid: payload.insp_id } });

    results.push({
      success: true,
      message: "Image uploaded successfully.",
      fileName,
    });
  }
  return results;
}

const deleteFromPerImageGCS = async(payload)=> {
  const storage = new Storage({ credentials: keyfileContent });
  const bucketName = process.env.bucketName || "";
  const bucket = storage.bucket(bucketName);

  const fileName = `valuationPhotos/photo_${payload.insp_id}/${payload.label.replace(/ /g, "_")}.${payload.extension}`;
  const file = bucket.file(fileName);

  try {
    await file.delete();
    console.log(`File deleted successfully: ${fileName}`);

    const docField = `doc${payload.index + 1}`;
    const updateData = { [docField]: "" };

    if (payload.isWeb) {
      await Application.update(
        { [`doc${payload.index}`]: updateData[docField] },
        { where: { uid: payload.insp_id } }
      );
    } else {
      await Application.update(updateData, { where: { uid: payload.insp_id } });
    }

    return { success: true, message: "Image deleted successfully." };
  } catch (error) {
    console.error("Error deleting file from GCS:", error);
    return { success: false, message: "Failed to delete the image.", error };
  }
}

const uploadToUserInformation = async (payload, AuthenticationToken)=> {
  const storage = new Storage({ credentials: keyfileContent });
  const bucketName = process.env.bucketName || "";
  const bucket = storage.bucket(bucketName);

  let j = 1;
  for (let i = 0; i < payload.images.length; i++) {
    let element = payload.images[i];
    let matches = element["image_data"].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let imageTypeRegularExpression = /\/(.*?)$/;
    let imagetype = matches[1].match(imageTypeRegularExpression)[1];
    let imgData = matches[2];

    let fileName = `userInformation/photo_${element["label"].replaceAll(" ", "_")}_${element["index"]}.${imagetype}`;

    const image = await Jimp.read(Buffer.from(imgData, "base64"));
    const maxWidth = 1960;
    const maxHeight = 2160;

    let font_size = Jimp.FONT_SANS_32_WHITE;
    if (image.getWidth() > maxWidth) {
      image.resize(maxWidth, Jimp.AUTO);
    }
    if (image.getHeight() > maxHeight) {
      image.resize(maxHeight, Jimp.AUTO);
    }

    const font = await Jimp.loadFont(font_size);
    const logopath = path.resolve("./uploads/tvs_logo.png");
    const overlay = await Jimp.read(logopath);

    const overlayWidth = 200;
    const overlayHeight = (overlayWidth / overlay.getWidth()) * overlay.getHeight();
    overlay.resize(overlayWidth, overlayHeight);

    const imageWidth = image.getWidth();
    const imageHeight = image.getHeight();
    const overlayX = imageWidth - overlayWidth - 20;
    const overlayY = imageHeight - overlayHeight - 20;

    image.composite(overlay, overlayX, overlayY);
    image.quality(30);

    const bufferedImage = await image.getBufferAsync(Jimp.MIME_JPEG);
    const file = bucket.file(fileName);
    await file.save(bufferedImage);

    let updateData = {};
    updateData[element.label] = fileName;

    await Usermaster.update(updateData, {
      where: { auth_token: AuthenticationToken },
    });
    j++;
  }
}

const uploadvideotoGCS = async(payload)=> {
  const storage = new Storage({ credentials: keyfileContent });
  const bucketName = process.env.bucketName || "";
  const bucket = storage.bucket(bucketName);

  if (payload.update == "yes") {
    const folderName = `valuationPhotos/photo_${payload.insp_id}/video.mp4`;
    const [files] = await storage.bucket(bucketName).getFiles({
      prefix: folderName,
    });
    await Promise.all(files.map(async (file) => file.delete()));
  }

  let matches = payload.video.match(/^data:video\/([A-Za-z-+\/]+);base64,(.+)/);
  let imgData = payload.video;

  let fileName = `valuationPhotos/photo_${payload.insp_id}/video.mp4`;

  const fileBuffer = Buffer.from(imgData, "base64");
  const file = bucket.file(fileName);
  let cdnUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  await Application.update(
    { ["media_files"]: cdnUrl },
    { where: { uid: payload.insp_id } }
  );
  await file.save(fileBuffer);
}

module.exports = {
  uploadBase64videoData,
  listFiles,
  uploadtoGCS,
  uploadToPerImageGCS,
  deleteFromPerImageGCS,
  uploadToUserInformation,
  uploadvideotoGCS,
};
