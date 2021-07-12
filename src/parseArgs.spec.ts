import {parseCollectionGroupsFromArgs, parseCollectionsFromArgs} from "./parseArgs";

describe('parseArgs', () => {
    it('parseCollectionsFromArgs converts given args as strings to an array of ', () => {
        const arg = '/users,/users("first", "==", "Nathan"),users';
        const expected = [{collection: '/users', queries: null}, {collection: '/users', queries: '("first", "==", "Nathan")'}];
        expect(parseCollectionsFromArgs(arg)).toEqual(expected);
    });

    it('parseCollectionGroupsFromArgs', () => {
        const arg1 = 'users,twitterFollowers';
        const expected1 = [
            {collectionGroup: 'users', queries: null},
            {collectionGroup: 'twitterFollowers', queries: null}
        ];
        expect(parseCollectionGroupsFromArgs(arg1)).toEqual(expected1);

        const arg2 = 'twitterFollowers,twitterFollowers("id", "===", "5")';
        const expected2 = [
            {collectionGroup: 'twitterFollowers', queries: null},
            {collectionGroup: 'twitterFollowers', queries: '("id", "===", "5")'}
        ];
        expect(parseCollectionGroupsFromArgs(arg2)).toEqual(expected2);

        const arg3 = '/users';
        const expected3 = [
            {collectionGroup: 'users', queries: null},
        ];
        expect(() => parseCollectionGroupsFromArgs(arg3)).toThrowError('Collection Group must not contain slashes');
    })
});
