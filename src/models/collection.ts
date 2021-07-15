import firebase from "firebase";
import FieldPath = firebase.firestore.FieldPath;
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export type IQuery = [(string | FieldPath), WhereFilterOp, string | number];

export interface ICollection {
    path: string,
    queries: any,
    group?: boolean,
}

export interface IMessage {
    collection: ICollection,
    message: string,
}
