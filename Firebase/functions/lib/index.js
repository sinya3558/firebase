"use strict";
const upload = require("./upload");
//app.use(express.json());
//app.use(cors());
const auth = require("./auth");
// auth function
exports.auth = auth.auth;
exports.upload = upload.uploadFile;
/*app.listen(3005, () => {
  console.log(`Server is listening at port ${3005}`);
})*/ 
//# sourceMappingURL=index.js.map