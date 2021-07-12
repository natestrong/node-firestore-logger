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

const {argv} = yargs(process.argv);

db.initDb(argv.hasOwnProperty('useEmulator'));

let collections: ICollection[];
let collectionGroups: ICollection[];

[collections, collectionGroups] = validateCollections(argv['collections'], argv['collectionGroups']);

logger.logCollectionsInit(...collections, ...collectionGroups);

const collectionObservables: Observable<IMessage>[] = [];

for (let collection of collections) {
    const fsCollection = db.firestore.collection(collection.path);
    if (collection.queries.length) {
        collection.queries.forEach(query => {
            fsCollection.where(query.split(','))
        })
    }


    collectionObservables.push(collectionChanges(fsCollection)
        .pipe(
            first(),
            map(docChanges => ({
                collection,
                message: `${collection.path} has ${docChanges.length} docs\n`
            }))
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
    // initialObs.subscribe(docChanges => logger.log(`${docChanges.length} docs in collection`));

    // const streamObs = collectionChanges(fsCollection)
    //     .pipe(skip(1));
    // streamObs.subscribe(docChanges => {
    //     docChanges.forEach(docChange => {
    //         logger.log(`Document ${docChange.doc.id} has been ${docChange.type}`);
    //     });
    // });
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
