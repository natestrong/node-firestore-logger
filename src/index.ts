import db from "./db";
import yargs from "yargs";
import {merge, Observable} from "rxjs";
import {validateCollections} from "./parseCollectionArgs";
import logger from "./logger";
import {collectionObserverFactory} from "./collectionObserver";

const {argv} = yargs(process.argv);

argv['collections'] = '/users';

db.initDb(argv.hasOwnProperty('useEmulator'));

let [collections, collectionGroups] = validateCollections(argv['collections'], argv['collectionGroups']);

logger.logCollectionsInit(...collections, ...collectionGroups);


const observables$: Observable<string>[] = collectionObserverFactory([...collections, ...collectionGroups]);

merge(observables$).subscribe(message => logger.log(message));
