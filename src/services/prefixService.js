const { createHash } = require("crypto");
const moment = require("moment");

class PrefixService {
  getPreAndPostfix(request) {
    if (request === "prefix") {
      return "tvs";
    } else if (request === "postfix") {
      return "2022";
    }
    return "";
  }

  genVisitLink(id) {
    const visitIdString = createHash("md5").update(id).digest("hex");

    // Pick random cut point between 2 and 7
    const randomPosition = Math.floor(Math.random() * (8 - 2) + 2);

    const visitIdA = visitIdString.substring(0, randomPosition);
    const visitIdB = visitIdString.substring(randomPosition);

    const randomNumber = Math.floor(Math.random() * 99999) + 1;
    const timestamp = moment().format("Hmmss");

    return `${visitIdA}${randomNumber}${timestamp}${visitIdB}`;
  }

  // Optional helper: generate unique IDs
  generatePrefix(type) {
    const prefix = this.getPreAndPostfix("prefix");
    const postfix = this.getPreAndPostfix("postfix");
    const timestamp = moment().format("YYYYMMDDHHmmss");
    return `${prefix}-${type}-${timestamp}-${postfix}`;
  }
}

module.exports = new PrefixService();
