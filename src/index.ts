import db from "./db";
import yargs from "yargs";
import {merge, Observable} from "rxjs";
import {validateCollections} from "./parseCollectionArgs";
import {IMessage} from "./models/collection";
import logger from "./logger";
import {collectionObserverFactory} from "./collectionObserver";

const {argv} = yargs(process.argv);

db.initDb(argv.hasOwnProperty('useEmulator'));

let [collections, collectionGroups] = validateCollections(argv['collections'], argv['collectionGroups']);

logger.logCollectionsInit(...collections, ...collectionGroups);

const collectionObservables: Observable<IMessage>[] = collectionObserverFactory([...collections, ...collectionGroups]);

// todo - move into separate file with tests \/
merge(...collectionObservables).subscribe(iMessage => {
    logger.log(iMessage.message);
});
