import db from "./db";
import yargs from "yargs";
import {merge, Observable} from "rxjs";
import {validateCollections} from "./parseCollectionArgs";
import logger from "./logger";
import {collectionObserverFactory} from "./collectionObserver";
import {IMessage} from "./models/collection";

const {argv} = yargs(process.argv);

argv['collections'] = '/users["first", "last"]';
argv['useEmulator'] = true;

db.initDb(argv.hasOwnProperty('useEmulator'));

let [collections, collectionGroups] = validateCollections(argv['collections'], argv['collectionGroups']);

logger.logCollectionsInit(...collections, ...collectionGroups);

const observables$: Observable<IMessage[]>[] = collectionObserverFactory([...collections, ...collectionGroups]);

merge(...observables$).subscribe(messages => logger.logIMessages(messages));
