import {collectionObserverFactory} from "./collectionObserver";
import {ICollection, IMessage} from "./models/collection";
import db from "./db";

describe('collectionObserverFactory', () => {
    const collections: ICollection[] = [
        {path: '/users', queries: [["first", "==", "Nathan"], ["last", "==", "Strong"]]},
        {path: '/groups', queries: [["id", ">", 100]]},
        {path: 'twitterFollowers', queries: [["id", ">", 10000], ["name", "==", "Leo Messi"]], group: true}
    ];

    let result: ICollection[];

    beforeEach(() => {
        db.initDb(true);
        result = collectionObserverFactory(collections);
    });

    it('should create two observables per collection', () => {
        result
    })
});
