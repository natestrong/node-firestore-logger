"use strict";
exports.__esModule = true;
var firestore_1 = require("rxfire/firestore");
var db_1 = require("./db");
var yargs_1 = require("yargs");
var argv = yargs_1["default"](process.argv).argv;
var path = argv['path'];
var usersCollection = db_1.firestore.collection(path);
var initialEmission = true;
firestore_1.collectionChanges(usersCollection)
    .subscribe(function (docChanges) {
    if (initialEmission) {
        console.log(docChanges.length + " docs in collection");
        initialEmission = false;
        return;
    }
    if (docChanges.length > 1) {
        console.log(docChanges.length + " docs have been " + docChanges[0].type);
        return;
    }
    docChanges.forEach(function (docChange) {
        console.log("Document " + docChange.doc.id + " has been " + docChange.type);
    });
});
//# sourceMappingURL=index.js.map