import firebase from "firebase";
import FieldPath = firebase.firestore.FieldPath;
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export type Query = [(string | FieldPath), WhereFilterOp, string];

export interface ICollection {
    path: string,
    queries: Query[] | [],
    group?: boolean
}

export interface IMessage {
    collection: ICollection,
    message: string
}
