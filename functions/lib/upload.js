"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const functions = require("firebase-functions");
const functions = __importStar(require("firebase-functions"));
const storage_1 = require("firebase/storage");
const app_1 = require("firebase/app");
const firestore_1 = require("firebase-admin/firestore");
const admin = require("firebase-admin");
exports.uploadFile = functions.https.onRequest(async (req, res) => {
    try {
        const { data, metadata } = JSON.parse(JSON.stringify(req.body));
        const file = data.Content;
        const firebaseConfig = {
            apiKey: "AIzaSyBv0YpZub_rr-nQ_fil5DhUjQGpPV9e6jQ",
            authDomain: "rest-api-b6587.firebaseapp.com",
            projectId: "rest-api-b6587",
            storageBucket: "rest-api-b6587.appspot.com",
            messagingSenderId: "276179708375",
            appId: "1:276179708375:web:d18b52c6e02dcc03f84392",
            measurementId: "G-13Y9JC2Y1S",
        };
        const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
        const storage = (0, storage_1.getStorage)(firebaseApp);
        const db = (0, firestore_1.getFirestore)(admin.apps[0]);
        const storageRef = (0, storage_1.ref)(storage, `package/${metadata.Name}`);
        await (0, storage_1.uploadString)(storageRef, file, "base64");
        console.log("Uploaded a base64 file");
        await (0, storage_1.updateMetadata)(storageRef, metadata);
        console.log("Updated");
        const packages = db.collection("packages").doc(metadata.Name);
        const doc = await packages.get();
        if (!doc.exists) {
            const newPackage = db.collection("packages");
            await newPackage.doc(metadata.Name).set({
                Name: metadata.Name,
                Version: metadata.Version,
                ID: metadata.ID,
            });
            console.log("The metadata is successfully saved.");
        }
        else {
            console.log("The file name is already existed.");
        }
        res.status(200).send(metadata);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
//# sourceMappingURL=upload.js.map