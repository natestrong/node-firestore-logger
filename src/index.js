"use strict";
exports.__esModule = true;
var firestore_1 = require("rxfire/firestore");
var db_1 = require("./db");
var usersCollection = db_1.firestore.collection('users');
firestore_1.collectionChanges(usersCollection)
    .subscribe(function (docChanges) {
    docChanges.forEach(function (docChange) {
        console.log("Document " + docChange.doc.id + " has been " + docChange.type);
    });
});
//# sourceMappingURL=index.js.map