import {BGCOLORS, FGCOLORS, FORMAT, ICollection, IMessage} from "./models/ICollection";
import db from './db';
import {DocumentChange, DocumentChangeType, Query} from '@google-cloud/firestore';
import {collectionChanges} from "rxfire/firestore";
import {first, generate, map, Observable, skip} from "rxjs";
import _ from "lodash";
import fp from "lodash/fp";
import {bufferDebounce} from "./utils/bufferDebounce";
import {GroupedDocChanges} from "./utils/types";

export function collectionObserverFactory(collections: ICollection[]): Observable<IMessage[]>[] {
    const obs$ = _.flatMap(collections, (collection) => {
        const fsCollection = createFSCollection(collection);
        return [
            createInitialObs$(fsCollection, collection),
            createStreamObs$(fsCollection, collection),
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

function createInitialObs$(fsCollection, collection: ICollection): Observable<IMessage[]> {
    return collectionChanges(fsCollection).pipe(
        first(),
        map(docChanges => initialMessage(docChanges, collection)),
        map(padding(10)),
        map(message => ([{message, formatting: {bg: BGCOLORS.BgWhite, fg: FGCOLORS.FgBlack, format: FORMAT.Bright}}]))
    );
}

function createStreamObs$(fsCollection, collection: ICollection): Observable<IMessage[]> {
    const docChangesToIMessages = streamMessages(collection);
    return collectionChanges(fsCollection).pipe(
        skip(1),
        bufferDebounce(500),
        map(fp.pipe(
            flattenDocChanges,
            docChangesToIMessages,
        )),
    );
}

export function flattenDocChanges(docChanges: any): GroupedDocChanges {
    const flattenedDocs = _.flattenDeep(docChanges as []);
    const grouped = [];
    for (const doc of flattenedDocs) {
        if (!grouped.length || grouped[grouped.length - 1].type !== doc['type']) {
            grouped.push({type: doc['type'], docs: [doc]});
        } else {
            grouped[grouped.length - 1].docs.push(doc);
        }
    }
    return grouped as unknown as GroupedDocChanges;
}

function generatePropertiesMessage(doc: DocumentChange, properties: string[]): string {
    let message = '';
    for (const property of properties) {
        const propString = property + ":"
        message += `\n${propString.padEnd(10, " ")} ${doc.doc.get(property).padStart(20, "")}`;
    }
    return message;
}

function streamMessages(collection: ICollection) {
    return function docChangesToIMessages(groupedDocChanges: GroupedDocChanges): IMessage[] {
        const iMessages = [];
        [] = [];
        for (const groupedDocChange of groupedDocChanges) {
            let message;
            if (groupedDocChange.docs.length === 1) {
                message = `Document ${collection.path}/${groupedDocChange.docs[0].doc.id} has been ${groupedDocChange.type}`;
                if (collection.properties.length) {
                    message += generatePropertiesMessage(groupedDocChange.docs[0], collection.properties);
                }
            } else {
                message = `${groupedDocChange.docs.length} documents at ${collection.path} have been ${groupedDocChange.type}`;
            }
            iMessages.push({
                message,
                formatting: {fg: getColorForType(groupedDocChange.type)}
            });
        }
        return iMessages;
    };
}

function streamMessage(docChanges, collection: ICollection): string {
    let message;
    if (docChanges.length === 1) {
        message = `Document ${collection.path}/${docChanges[0].doc.id} has been ${docChanges[0].type}`;
    } else {
        message = `${docChanges.length} documents at ${collection.path} have been ${docChanges[0].type}`;
    }
    return message;
}

function initialMessage(docChange, collection: ICollection): string {
    let message = collection.queries.length ? ' with queries: ' + JSON.stringify(collection.queries) : '';
    return `${collection.path}${message} has ${docChange.length} docs`;
}

export function padding(padding: number) {
    const stringToAppend = new Array(padding).fill(' ').join('');
    return function (message: string): string {
        return `${stringToAppend}${message}${stringToAppend}`;
    };
}

function getColorForType(type: DocumentChangeType): FGCOLORS {
    switch (type) {
        case 'added':
            return FGCOLORS.FgGreen;
        case 'modified':
            return FGCOLORS.FgBlue;
        case 'removed':
            return FGCOLORS.FgRed;

    }
}
