import {ICollection} from "./models/collection";

export class Logger {
    logFunc: Function;

    constructor(logFunc = console.log) {
        this.logFunc = logFunc;
    }

    log(message: any) {
        this.logFunc(message);
    }

    logCollectionsInit(...collections: ICollection[]) {
        for (let collection of collections) {
            this.log(`Watching Collection${collection.group ? ' Group' : ''}: ${collection.path} ${collection.queries.length ?
                'with queries: ' + collection.queries : ''}`);
        }
    }
}
