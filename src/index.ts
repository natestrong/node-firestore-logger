import {collectionChanges} from 'rxfire/firestore';
import {firestore} from "./db";
import firebase from "firebase";
import DocumentChange = firebase.firestore.DocumentChange;


const usersCollection = firestore.collection('users');


collectionChanges(usersCollection)
    .subscribe((docChanges: DocumentChange[]) => {
        docChanges.forEach(docChange => {
            console.log(`Document ${docChange.doc.id} has been ${docChange.type}`);
        });
    });
