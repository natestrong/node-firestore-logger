import db from "./db";
import yargs from "yargs";
import {merge, Observable} from "rxjs";
import {validateCollectionArgs} from "./parseCollectionArgs";
import logger from "./logger";
import {collectionObserverFactory} from "./collectionObserver";
import {ICollection, IMessage} from "./models/ICollection";
import getConfigs from "./configs";
import {IConfig} from "./models/IConfigs";
import {validatePresets} from "./validatePresets";

const {argv} = yargs(process.argv);

const configs: IConfig = getConfigs();

let [collections, collectionGroups] = validateCollectionArgs(argv['collections'], argv['collectionGroups']);

if (argv['presets']) {
    [collections, collectionGroups] = validatePresets(collections, collectionGroups, argv['presets'], configs.presets as ICollection[]);
}

console.log(collections);

db.initDb(configs);

logger.logCollectionsInit(...collections, ...collectionGroups);

const observables$: Observable<IMessage[]>[] = collectionObserverFactory([...collections, ...collectionGroups]);

merge(...observables$).subscribe(messages => logger.logIMessages(messages));
