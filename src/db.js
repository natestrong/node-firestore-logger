"use strict";
exports.__esModule = true;
exports.firestore = void 0;
var firebase_1 = require("firebase");
var fs = require("fs");
var path = require("path");
var firestoreConfigs;
var loggerConfigs;
try {
    loggerConfigs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'logger-config.json'), 'utf8'));
    var pathToFirestoreConfigs = loggerConfigs.pathToCredentials;
    firestoreConfigs = JSON.parse(fs.readFileSync(pathToFirestoreConfigs, 'utf8'));
}
catch (err) {
    console.error(err);
}
var app = firebase_1["default"].initializeApp(firestoreConfigs);
exports.firestore = app.firestore();
//# sourceMappingURL=db.js.map