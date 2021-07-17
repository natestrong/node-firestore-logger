import {BGCOLORS, FGCOLORS, FORMAT, ICollection, IMessage} from "./models/collection";
import db from './db';
import {Query} from '@google-cloud/firestore';
import {collectionChanges} from "rxfire/firestore";
import {first, map, Observable, skip} from "rxjs";
import _ from "lodash";

export function collectionObserverFactory(collections:ICollection[]):Observable<IMessage>[] {  // todo <- fix this, not returning observable?
    const obs$ = _.flatMap(collections, (collection) => {
        const fsCollection = createFSCollection(collection);
        return [
            createInitialObs$(fsCollection, collection),
            createStreamObs$(fsCollection, collection),
        ];
    });

    return obs$
}

function createFSCollection(collection:ICollection):Query {
    let fsCollection
    if (collection.group) {
        fsCollection = db.firestore.collectionGroup(collection.path)
    } else {
        fsCollection = db.firestore.collection(collection.path) as unknown as Query
    }

    if (collection.queries.length) {
        collection.queries.forEach(query => {
            fsCollection = fsCollection.where(query[0], query[1], query[2])
        })
    }
    return fsCollection
}

function createInitialObs$(fsCollection, collection:ICollection):Observable<IMessage> {
    return collectionChanges(fsCollection).pipe(
        first(),
        map(docChanges => initialMessage(docChanges, collection)),
        map(padding(10)),
        map(message => ({message, formatting: {bg: BGCOLORS.BgWhite, fg: FGCOLORS.FgBlack, format: FORMAT.Bright}}))
    )
}

function createStreamObs$(fsCollection, collection:ICollection):Observable<IMessage> {
    return collectionChanges(fsCollection).pipe(
        skip(1),
        map(docChanges => streamMessage(docChanges, collection)),
        map(docChanges => ({
            message: streamMessage(docChanges, collection),
            formatting: {bg: BGCOLORS.BgWhite, fg: FGCOLORS.FgBlack, format: FORMAT.Bright}})
        )
    )
}

function initialMessage(docChange, collection:ICollection):string {
    let message = collection.queries.length ? ' with queries: ' + JSON.stringify(collection.queries) : ''
    return `${collection.path}${message} has ${docChange.length} docs`
}

function streamMessage(docChanges, collection:ICollection):string {
    let message;
    if (docChanges.length === 1) {
        message = `Document ${collection.path}/${docChanges[0].doc.id} has been ${docChanges[0].type}`
    } else {
        message = `${docChanges.length} documents at ${collection.path} have been ${docChanges[0].type}`
    }
    return message
}

// function colorize(bgColor:COLORS, fgColor:COLORS) {
//     return function (message:string):string {
//         return `${bgColor}${fgColor}${message}${COLORS.Reset}`;
//     }
// }

// function colorizeBasedOnAction(action: '')

export function padding(padding:number) {
    const stringToAppend = new Array(padding).fill(' ').join('');
    return function (message:string):string {
        return `${stringToAppend}${message}${stringToAppend}`;
    }
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
