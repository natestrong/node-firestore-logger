import {ICollection, IMessage, IQuery} from "./models/collection";
import {Observable} from "rxjs";
import db from './db';
import App from 'firebase'
import firebase from "firebase";
// import Query = firebase.firestore.Query;
import {Query} from '@google-cloud/firestore';

export function collectionObserverFactory(collections: ICollection[]): Observable<IMessage> {
    const result: ICollection[] = [];

    for (let collection of collections) {
        let fsCollection = createFSCollection(collection);

        if (collection.queries.length) {
            collection.queries.forEach(query => {
                fsCollection = fsCollection.where(query[0], query[1], query[2]);
            });
        }
    }

    return result;
}

function createFSCollection(collection: ICollection): Query {
    let fsCollection;
    if (collection.group) {
        fsCollection = db.firestore.collectionGroup(collection.path);
    } else {
        fsCollection = db.firestore.collection(collection.path) as unknown as Query;
    }
    return fsCollection;
}

// for (let collection of [...collections, ...collectionGroups]) {
//     let fsCollection;
//     if (collection.group) {
//         fsCollection = db.firestore.collectionGroup(collection.path);
//     } else {
//         fsCollection = db.firestore.collection(collection.path) as Query;
//     }
//     if (collection.queries.length) {
//         collection.queries.forEach(query => {
//             fsCollection = fsCollection.where(query[0], query[1], query[2]);
//         });
//     }
//
//     collectionObservables.push(collectionChanges(fsCollection)
//         .pipe(
//             first(),
//             map(docChanges => {
//                 let queriesMessage = collection.queries.length ? ' with queries: ' + JSON.stringify(collection.queries) : '';
//                 return {
//                     collection,
//                     message: `${Colors.BgWhite}${Colors.Underscore}${Colors.FgBlack}        ${collection.path}${queriesMessage} has ${docChanges.length} docs        ${Colors.Reset}`,
//                 };
//             })
//         )
//     );
//
//     collectionObservables.push(collectionChanges(fsCollection)
//         .pipe(
//             skip(1),
//             map(docChanges => {
//                 let color = Colors.FgGreen;
//                 switch (docChanges[0].type) {
//                     case 'modified':
//                         color = Colors.FgBlue;
//                         break;
//                     case 'removed':
//                         color = Colors.FgRed;
//                         break;
//                 }
//
//                 const message = docChanges
//                     .map(docChange => `${color}Document ${collection.path}/${docChange.doc.id} has been ${docChange.type}${Colors.Reset}`)
//                     .join('\n');
//                 return {
//                     collection,
//                     message,
//                 };
//             })
//         )
//     );
// }
