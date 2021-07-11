import {collectionChanges} from 'rxfire/firestore';
import {firestore} from "./db";
import firebase from "firebase";
import yargs from "yargs";
import {merge} from "rxjs";
import DocumentChange = firebase.firestore.DocumentChange;
import {parseCollectionsFromArgs} from "./parseArgs";
import {ICollection, ICollectionGroup} from "./models/collection";


const {argv} = yargs(process.argv);

const collections: ICollection[] = parseCollectionsFromArgs(argv['collections']);
// const collectionPaths: ICollectionGroup[] = parseCollectionGroupsFromArgs(argv['collectionPaths']);


// const usersCollection = firestore.collection(path);
//
// let initialEmission = true;
//
// const obs1 = collectionChanges(usersCollection);``
//
// merge(obs1)
//     .pipe(
//     )
//     .subscribe((docChanges: DocumentChange[]) => {
//         if (initialEmission) {
//             console.log(`${docChanges.length} docs in collection`);
//             initialEmission = false;
//             return;
//         }
//
//         if (docChanges.length > 1) {
//             console.log(`${docChanges.length} docs have been ${docChanges[0].type}`);
//             return;
//         }
//
//         docChanges.forEach(docChange => {
//             console.log(`Document ${docChange.doc.id} has been ${docChange.type}`);
//         });
//     });
