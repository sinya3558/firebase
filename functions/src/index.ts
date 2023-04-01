const upload = require("./upload");
const auth = require("./auth");

// this is for github actions testing
exports.auth = auth.auth;
exports.upload = upload.uploadFile;
