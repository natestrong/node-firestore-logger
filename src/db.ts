import firebase from "firebase";
import App from "firebase";
import logger from "./logger";
import {IConfig} from "./models/IConfigs";

class Db {
    _app: App.app.App;
    configs: IConfig;

    initDb(configs) {
        this.configs = configs;
        this._app = firebase.initializeApp(this.configs.firestoreConfigs);
        if (this.configs.emulator.useEmulator) {
            logger.log("Using Firestore Emulator");
            this._app.firestore().useEmulator('localhost', 8080);
        }
    }

    get firestore() {
        if (!this._app) {
            throw new Error('Run initDb before using');
        }
        return this._app.firestore();
    }
}

export default new Db();
