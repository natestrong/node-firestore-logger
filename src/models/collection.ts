import firebase from "firebase";
import DocumentChangeType = firebase.firestore.DocumentChangeType;

export interface ICollection {
    path: string,
    queries: [(string | number)[]] | [],
    group?: boolean
}

export interface IMessage {
    collection: ICollection,
    message: string
}
