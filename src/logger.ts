import {FORMAT, ICollection, IMessage, IQuery} from "./models/collection";

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
                'with queries: ' + JSON.stringify(collection.queries) : ''}`);
        }
    }

    logIMessage(message: IMessage) {
        let log =
            `${message.formatting.format || ''}${message.formatting.fg || ''}${message.formatting.bg || ''}${message.message}${FORMAT.Reset}`;
        this._logFunc(log);
    }
}

export default new Logger();
