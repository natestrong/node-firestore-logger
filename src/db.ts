import firebase from "firebase";
import * as fs from "fs";
import * as path from "path";

let firestoreConfigs;
let loggerConfigs;
try {
    loggerConfigs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'logger-config.json'), 'utf8'));
    const pathToFirestoreConfigs = loggerConfigs.pathToCredentials;
    firestoreConfigs = JSON.parse(fs.readFileSync(pathToFirestoreConfigs, 'utf8'));
} catch (err) {
    console.error(err);
}

const app = firebase.initializeApp(firestoreConfigs);

export const firestore = app.firestore();
