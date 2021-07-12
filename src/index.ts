import {collectionChanges} from 'rxfire/firestore';
import db from "./db";
import firebase from "firebase";
import yargs from "yargs";
import {first, map, merge, Observable, skip} from "rxjs";
import {validateCollections} from "./parseCollectionArgs";
import {ICollection, IMessage} from "./models/collection";
import logger, {Colors} from "./logger";
import Query = firebase.firestore.Query;

const {argv} = yargs(process.argv);

db.initDb(argv.hasOwnProperty('useEmulator'));

let collections: ICollection[];
let collectionGroups: ICollection[];

[collections, collectionGroups] = validateCollections(argv['collections'], argv['collectionGroups']);

logger.logCollectionsInit(...collections, ...collectionGroups);

const collectionObservables: Observable<IMessage>[] = [];

for (let collection of [...collections, ...collectionGroups]) {
    let fsCollection;
    if (collection.group) {
        fsCollection = db.firestore.collectionGroup(collection.path);
    } else {
        fsCollection = db.firestore.collection(collection.path) as Query;
    }
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
                    message: `${Colors.BgWhite}${Colors.Underscore}${Colors.FgBlack}        ${collection.path}${queriesMessage} has ${docChanges.length} docs        ${Colors.Reset}`,
                };
            })
        )
    );

    collectionObservables.push(collectionChanges(fsCollection)
        .pipe(
            skip(1),
            map(docChanges => {
                let color = Colors.FgGreen;
                switch (docChanges[0].type) {
                    case 'modified':
                        color = Colors.FgBlue;
                        break;
                    case 'removed':
                        color = Colors.FgRed;
                        break;
                }

                const message = docChanges
                    .map(docChange => `${color}Document ${collection.path}/${docChange.doc.id} has been ${docChange.type}${Colors.Reset}`)
                    .join('\n');
                return {
                    collection,
                    message,
                };
            })
        )
    );
}

merge(...collectionObservables).subscribe(iMessage => {
    logger.log(iMessage.message);
});
