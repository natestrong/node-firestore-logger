"use strict";
var _a;
exports.__esModule = true;
var yargs_1 = require("yargs");
var parseArgs_1 = require("./parseArgs");
var argv = yargs_1["default"](process.argv).argv;
var collections;
var collectionGroups;
_a = parseArgs_1.validateCollections(argv['collections'], argv['collectionGroups']), collections = _a[0], collectionGroups = _a[1];
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