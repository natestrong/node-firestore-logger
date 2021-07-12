import {parseCollectionsFromArgs, validateCollections} from "./parseCollectionArgs";

describe('parseArgs', () => {
    it('should validate that some collections are to be operated on via args', () => {
        expect(() => validateCollections('', ''))
            .toThrowError('Must supply a collection or collection group to watch. Use --help for more info.');
    });

    it('should return validated collections', () => {
        expect(validateCollections(
            '/users("first", "==", "Nathan")("last", "==", "Nathan"),/groups("id", ">", 100)',
            'twitterFollowers("id", ">", 10000)("name", "==", "Leo Messi")'
        ))
            .toEqual([
                [
                    {path: '/users', queries: ['("first", "==", "Nathan")', '("last", "==", "Nathan")']},
                    {path: '/groups', queries: ['("id", ">", 100)']}
                ],
                [
                    {path: 'twitterFollowers', queries: ['("id", ">", 10000)', '("name", "==", "Leo Messi")'], group: true}
                ]
            ]);
    });

    it('should convert args to Collection arrays', () => {
        expect(parseCollectionsFromArgs('/users,/users("first", "==", "Nathan")'))
            .toEqual([
                {path: '/users', queries: []},
                {path: '/users', queries: ['("first", "==", "Nathan")']}
            ]);
    });

    it('should parse empty string or null values as empty arrays', () => {
        expect(parseCollectionsFromArgs('')).toEqual([]);
        expect(parseCollectionsFromArgs(null)).toEqual([]);
    });

    it('should parse collections with multiple queries', () => {
        expect(parseCollectionsFromArgs('/users("first", "==", "Nathan")("last", "==", "Nathan"),/groups("id", ">", 100)'))
            .toEqual([
                {path: '/users', queries: ['("first", "==", "Nathan")', '("last", "==", "Nathan")']},
                {path: '/groups', queries: ['("id", ">", 100)']},
            ]);
    });

    it('should return unique Collections only', () => {
        expect(parseCollectionsFromArgs('/users("first", "==", "Nathan"),/groups,/users("first", "==", "Nathan")'))
            .toEqual([
                {path: '/users', queries: ['("first", "==", "Nathan")']},
                {path: '/groups', queries: []}
            ]);
    });

    it('should validate that group collections do not have "/"', () => {
        expect(() => parseCollectionsFromArgs('/users,twitterFollowers', true))
            .toThrowError('collectionGroups can not contain "/"');
    });
});
