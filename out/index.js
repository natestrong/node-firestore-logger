"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var _a;
exports.__esModule = true;
var yargs_1 = require("yargs");
var parseCollectionArgs_1 = require("./parseCollectionArgs");
var logger_1 = require("./logger");
var argv = yargs_1["default"](process.argv).argv;
var collections;
var collectionGroups;
_a = parseCollectionArgs_1.validateCollections(argv['collections'], argv['collectionGroups']), collections = _a[0], collectionGroups = _a[1];
logger_1.logCollectionsInit.apply(void 0, __spreadArray(__spreadArray([], collections), collectionGroups));
// const usersCollection = firestore.collection(path);
//
// let initialEmission = true;
//
// const obs1 = collectionChanges(usersCollection);``
//
// merge(obs1)
//     .pipe(
//     )
//     .subscribe((docChanges: DocumentChange[]) => {
//         if (initialEmission) {
//             console.log(`${docChanges.length} docs in collection`);
//             initialEmission = false;
//             return;
//         }
//
//         if (docChanges.length > 1) {
//             console.log(`${docChanges.length} docs have been ${docChanges[0].type}`);
//             return;
//         }
//
//         docChanges.forEach(docChange => {
//             console.log(`Document ${docChange.doc.id} has been ${docChange.type}`);
//         });
//     });
//# sourceMappingURL=index.js.map