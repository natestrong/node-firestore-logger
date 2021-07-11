"use strict";
exports.__esModule = true;
var yargs_1 = require("yargs");
var parseArgs_1 = require("./parseArgs");
var argv = yargs_1["default"](process.argv).argv;
var collections = parseArgs_1.parseCollectionsFromArgs(argv['collections']);
// const collectionPaths: ICollectionGroup[] = parseCollectionGroupsFromArgs(argv['collectionPaths']);
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