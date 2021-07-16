import {collectionObserverFactory, padding} from "./collectionObserver"
import {ICollection, IMessage} from "./models/collection";
import db from "./db";

fdescribe('collectionObserverFactory', () => {
    db.initDb(true);

    const collections: ICollection[] = [
        {path: '/users', queries: [["first", "==", "Nathan"], ["last", "==", "Strong"]]},
        {path: '/groups', queries: [["id", ">", 100]]},
        {path: 'twitterFollowers', queries: [["id", ">", 10000], ["name", "==", "Leo Messi"]], group: true}
    ];

    let result: ICollection[];

    beforeEach(() => {
        result = collectionObserverFactory(collections);
    });

    it('should create 2 observables for each collection', () => {
        expect(result).toHaveLength(6);
    })

    it('should pad a string with x chars', () => {
        const padFunc = padding(10);
        let message = 'hello';
        expect(padFunc(message)).toBe('          hello          ');
    })
});
