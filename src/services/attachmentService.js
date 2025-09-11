const fs = require("fs");
const path = require("path");
const UserMaster  = require("../Database/models/UserMaster");
// const Application = require("../Database/models/Applications")

class AttachmentService {
//    * 🔹 Helper: Decode base64 image/video
  decodeBase64(data) {
    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length < 3) {
      throw new Error("Invalid base64 data");
    }
    const ext = matches[1].split("/")[1]; // get extension
    const buffer = Buffer.from(matches[2], "base64");
    return { ext, buffer };
  }

  //Helper: Ensure directory exists
  ensureDir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

   //Upload profile picture
  async upload(payload) {
    const { ext, buffer } = this.decodeBase64(payload.image);
    const dir = "uploads/profilePics";
    this.ensureDir(dir);

    const imgPath = path.join(dir, `${payload.uid}_profile_pic.${ext}`);
    await fs.promises.writeFile(imgPath, buffer);

    await UserMaster.update({ profile_pic: imgPath }, { where: { uid: payload.uid } });
    return imgPath;
  }

//Convert file to base64
  async convertion(filePath) {
    if (!fs.existsSync(filePath)) return "file not found";
    const file = await fs.promises.readFile(filePath);
    return file.toString("base64");
  }

   // Upload inspection images
  // async inspupload(payload) {
  //   const dir = `uploads/photo_${payload.app_client_id}`;
  //   this.ensureDir(dir);

  //   // Use for..of instead of forEach for async
  //   for (let [index, element] of payload.images.entries()) {
  //     const { ext, buffer } = this.decodeBase64(element.image_data);

  //     const imgPath = path.join(dir, `${element.label}_${element.index}.${ext}`);
  //     await fs.promises.writeFile(imgPath, buffer);

  //     await Application.update( 
  //       { ["doc" + index]: imgPath },
  //       { where: { uid: payload.insp_id } }
  //     );
  //   }
  //   return true;
  // }

  // Upload video file
  // async videoupload(payload) {
  //   const { ext, buffer } = this.decodeBase64(payload.video);

  //   const dir = `uploads/video_${payload.app_client_id}`;
  //   this.ensureDir(dir);

  //   const videoPath = path.join(dir, `${payload.label}.${ext}`);
  //   await fs.promises.writeFile(videoPath, buffer);

  //   await Application.update(
  //     { media_files: videoPath },
  //     { where: { uid: payload.insp_id } }
  //   );

  //   return videoPath;
  // }
}

module.exports = new AttachmentService();
