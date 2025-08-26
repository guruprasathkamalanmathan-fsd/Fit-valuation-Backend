const axios = require("axios");
const config = require("../config/config.json");

class UserMiddleware {
    constructor() {}

    async validateHeaders(req, res, next) {
        if (
            req.headers["app-id"] !== config.creds["app-id"] ||
            req.headers["api-key"] !== config.creds["api-key"]
        ) {
            return res
                .status(401)
                .send({ status: false, message: "Invalid Authentication" });
        }
        next();
    }
}

const userMiddleware = new UserMiddleware();

module.exports = userMiddleware;
