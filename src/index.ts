import {collectionChanges} from 'rxfire/firestore';
import {firestore} from "./db";
import firebase from "firebase";
import DocumentChange = firebase.firestore.DocumentChange;
import yargs from "yargs";

const {argv} = yargs(process.argv);
const path = argv['path'];

const usersCollection = firestore.collection(path);

let initialEmission = true;

collectionChanges(usersCollection)
    .subscribe((docChanges: DocumentChange[]) => {
        if (initialEmission) {
            console.log(`${docChanges.length} docs in collection`);
            initialEmission = false;
            return;
        }

        if (docChanges.length > 1) {
            console.log(`${docChanges.length} docs have been ${docChanges[0].type}`);
            return;
        }

        docChanges.forEach(docChange => {
            console.log(`Document ${docChange.doc.id} has been ${docChange.type}`);
        });
    });
