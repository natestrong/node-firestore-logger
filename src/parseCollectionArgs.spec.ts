import {parseCollectionsFromArgs, validateCollectionArgs} from "./parseCollectionArgs";

describe('parseArgs', () => {
    it('should validate that some collections are to be operated on via args', () => {
        expect(() => validateCollectionArgs('', ''))
            .toThrowError('Must supply a collection or collection group to watch. Use --help for more info.');
    });

    it('should return validated collections', () => {
        expect(validateCollectionArgs(
            '/users("first", "==", "Nathan")("last", "==", "Strong")["first"],/groups("id", ">", 100)',
            'twitterFollowers("id", ">", 10000)("name", "==", "Leo Messi")'
        ))
            .toEqual([
                [
                    {path: '/users', queries: [["first", "==", "Nathan"], ["last", "==", "Strong"]], properties: ["first"]},
                    {path: '/groups', queries: [["id", ">", 100]], properties: []}
                ],
                [
                    {path: 'twitterFollowers', queries: [["id", ">", 10000], ["name", "==", "Leo Messi"]], group: true, properties: []}
                ]
            ]);
    });

    it('should convert args to Collection arrays', () => {
        expect(parseCollectionsFromArgs('/users,/users("first", "==", "Nathan")'))
            .toEqual([
                {path: '/users', queries: [], properties: []},
                {path: '/users', queries: [["first", "==", "Nathan"]], properties: []}
            ]);
    });

    it('should parse empty string or null values as empty arrays', () => {
        expect(parseCollectionsFromArgs('')).toEqual([]);
        expect(parseCollectionsFromArgs(null)).toEqual([]);
    });

    it('should parse collections with multiple queries', () => {
        expect(parseCollectionsFromArgs('/users("first", "==", "Nathan")("last", "==", "Strong"),/groups("id", ">", 100)'))
            .toEqual([
                {path: '/users', queries: [["first", "==", "Nathan"], ["last", "==", "Strong"]], properties: []},
                {path: '/groups', queries: [["id", ">", 100]], properties: []},
            ]);
    });

    it('should return unique Collections only', () => {
        expect(parseCollectionsFromArgs('/users("first", "==", "Nathan"),/groups,/users("first", "==", "Nathan")'))
            .toEqual([
                {path: '/users', queries: [["first", "==", "Nathan"]], properties: []},
                {path: '/groups', queries: [], properties: []}
            ]);
    });

    it('should validate that group collections do not have "/"', () => {
        expect(() => parseCollectionsFromArgs('/users,twitterFollowers', true))
            .toThrowError('collectionGroups can not contain "/"');
    });

    it('should parse properties', () => {
        expect(parseCollectionsFromArgs('/users["first"],/users("first", "==", "Nathan")["last"]'))
            .toEqual([
                {path: '/users', queries: [], properties: ["first"]},
                {path: '/users', queries: [["first", "==", "Nathan"]], properties: ["last"]}
            ]);
    })
});
