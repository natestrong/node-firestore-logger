import {collectionChanges, collectionData} from 'rxfire/firestore';
import db from "./db";
import firebase from "firebase";
import yargs from "yargs";
import {first, map, merge, Observable, skip} from "rxjs";
import DocumentChange = firebase.firestore.DocumentChange;
import {parseCollectionsFromArgs, validateCollections} from "./parseCollectionArgs";
import {ICollection, IMessage} from "./models/collection";
import logger from "./logger";
import * as fs from "fs";
import Query = firebase.firestore.Query;

const {argv} = yargs(process.argv);

db.initDb(argv.hasOwnProperty('useEmulator'));

let collections: ICollection[];
let collectionGroups: ICollection[];

[collections, collectionGroups] = validateCollections(argv['collections'], argv['collectionGroups']);

logger.logCollectionsInit(...collections, ...collectionGroups);

const collectionObservables: Observable<IMessage>[] = [];

for (let collection of collections) {
    let fsCollection = db.firestore.collection(collection.path) as Query;
    if (collection.queries.length) {
        collection.queries.forEach(query => {
            fsCollection = fsCollection.where(query[0], query[1], query[2]);
        });
    }

    collectionObservables.push(collectionChanges(fsCollection)
        .pipe(
            first(),
            map(docChanges => {
                let queriesMessage = collection.queries.length ? ' with queries: ' + JSON.stringify(collection.queries) : '';
                return {
                    collection,
                    message: `${collection.path}${queriesMessage} has ${docChanges.length} docs\n`
                };
            })
        )
    );

    collectionObservables.push(collectionChanges(fsCollection)
        .pipe(
            skip(1),
            map(docChanges => {
                const message = docChanges
                    .map(docChange => `Document ${collection.path}/${docChange.doc.id} has been ${docChange.type}`)
                    .join('\n');
                return {
                    collection,
                    message
                };
            })
        )
    );
}

merge(...collectionObservables).subscribe(iMessage => {
    logger.log(iMessage.message);
});

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
