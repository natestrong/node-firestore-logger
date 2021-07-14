import firebase from "firebase";
import * as fs from "fs";
import * as path from "path";
import logger from "./logger";
import {IConfig} from "./models/configs";
import App from 'firebase'

class Db {
    _app: App.app.App;

    initDb(useEmulator = false) {
        this._app = firebase.initializeApp(this.firestoreConfigs);
        if (useEmulator) {
            logger.log("Using Firestore Emulator");
            this._app.firestore().useEmulator('localhost', 8080);
        }
    }

    get loggerConfigs(): IConfig {
        try {
            return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'logger-config.json'), 'utf8'));
        } catch (err) {
            console.error(err);
        }
    }

    get firestoreConfigs() {
        try {
            const pathToFirestoreConfigs = this.loggerConfigs.pathToCredentials;
            return JSON.parse(fs.readFileSync(pathToFirestoreConfigs, 'utf8'));
        } catch (err) {
            console.error(err);
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
