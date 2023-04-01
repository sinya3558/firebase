const upload = require("./upload");
const auth = require("./auth");

// this is for github actions testing
exports.auth = auth.auth;
console.log("authentication is completed");
exports.upload = upload.uploadFile;
