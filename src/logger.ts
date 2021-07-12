import {ICollection} from "./models/collection";

export class Logger {
    _logFunc: Function;

    constructor(logFunc = console.log) {
        this._logFunc = logFunc;
    }

    log(...messages: any) {
        this._logFunc(...messages);
    }

    logCollectionsInit(...collections: ICollection[]) {
        for (let collection of collections) {
            this.log(`Watching Collection${collection.group ? ' Group' : ''}: ${collection.path} ${collection.queries.length ?
                'with queries: ' + collection.queries : ''}`);
        }
    }
}

export default new Logger();
