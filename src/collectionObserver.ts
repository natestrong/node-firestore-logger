import {ICollection} from "./models/collection";
import db from './db';
import {Query} from '@google-cloud/firestore';
import {collectionChanges} from "rxfire/firestore";
import {first, map, Observable, tap} from "rxjs";
import logger, {COLORS} from "./logger";
import _ from "lodash";

export function collectionObserverFactory(collections: ICollection[]): Observable<string>[] {  // todo <- fix this, not returning observable?
    const obs$ = _.flatMap(collections, (collection) => {
        const fsCollection = createFSCollection(collection);
        return [
            createInitialObs$(fsCollection, collection),
            // createStreamObs$(fsCollection, collection),
        ];
    });
    return obs$;
}

function createFSCollection(collection: ICollection): Query {
    let fsCollection;
    if (collection.group) {
        fsCollection = db.firestore.collectionGroup(collection.path);
    } else {
        fsCollection = db.firestore.collection(collection.path) as unknown as Query;
    }

    if (collection.queries.length) {
        collection.queries.forEach(query => {
            fsCollection = fsCollection.where(query[0], query[1], query[2]);
        });
    }
    return fsCollection;
}

function createInitialObs$(fsCollection, collection: ICollection): Observable<string> {
    return collectionChanges(fsCollection).pipe(
        first(),
        map(docChanges => docChangesToInitialMessage(docChanges, collection)),
        map(colorize(COLORS.BgWhite)),
        map(padding(10)),
        tap(val => logger.log('~~~~~~', val)),
    );
}

// function createStreamObs$(fsCollection: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>) {
//
// }

function docChangesToInitialMessage(docChanges, collection: ICollection): string {
    let queriesMessage = collection.queries.length ? ' with queries: ' + JSON.stringify(collection.queries) : '';
    return `${collection.path}${queriesMessage} has ${docChanges.length} docs`;
}

function colorize(color: COLORS) {
    return function (message: string): string {
        return color + message + COLORS.Reset;
    };
}

function padding(padding: number) {
    return function (message: string): string {
        return message.padStart(padding, ' ').padEnd(padding, ' ');
    };
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
