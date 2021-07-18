import {DocumentChange, DocumentChangeType} from "@google-cloud/firestore";

export type NestedArray<T> = T | NestedArray<T>[];

export type WithKey<K extends string | number | symbol> = {
    [k in K]: DocumentChange[]
}

export type GroupedDocChanges = { type: DocumentChangeType, docs: DocumentChange[] }[];
