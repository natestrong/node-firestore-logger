import {collectionObserverFactory, flattenDocChanges, padding} from "./collectionObserver";
import {ICollection} from "./models/collection";
import db from "./db";
import {DocumentChange} from "@google-cloud/firestore";
import {NestedArray} from "./utils/types";

describe('collectionObserverFactory', () => {
    db.initDb(true);

    const collections: ICollection[] = [
        {path: '/users', queries: [["first", "==", "Nathan"], ["last", "==", "Strong"]], properties: []},
        {path: '/groups', queries: [["id", ">", 100]], properties: []},
        {
            path: 'twitterFollowers',
            queries: [["id", ">", 10000], ["name", "==", "Leo Messi"]],
            group: true,
            properties: []
        }
    ];

    let result: ICollection[];

    beforeEach(() => {
        result = collectionObserverFactory(collections);
    });

    it('should create 2 observables for each collection', () => {
        expect(result).toHaveLength(6);
    });

    it('should pad a string with x chars', () => {
        const padFunc = padding(10);
        let message = 'hello';
        expect(padFunc(message)).toBe('          hello          ');
    });

    // it('should break nested arrays of arbitrary docChanges into batches', () => {
    //     const docChanges = [[{doc: {id: 10}, type: 'added'}], [{doc: {id: 11}, type: 'added'}], [[[{
    //         doc: {id: 12},
    //         type: 'added'
    //     }, [{doc: {id: 14}, type: 'removed'}]]]], [{doc: {id: 15}, type: 'removed'}], {
    //         doc: {id: 12},
    //         type: 'added'
    //     }];
    //     const expected = [
    //         {
    //             type: 'added',
    //             docs: [{doc: {id: 10}, type: 'added'}, {doc: {id: 11}, type: 'added'}, {doc: {id: 12}, type: 'added'}]
    //         },
    //         {type: 'removed', docs: [{doc: {id: 14}, type: 'removed'}, {doc: {id: 15}, type: 'removed'}]},
    //         {type: 'added', docs: [{doc: {id: 12}, type: 'added'}]},
    //     ];
    //
    //     const result = flattenDocChanges(docChanges);
    //
    //     expect(result).toEqual(expected);
    // });
});
