"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseArgs_1 = require("./parseArgs");
describe('parseArgs', function () {
    it('parseCollectionsFromArgs converts given args as strings to an array of ', function () {
        var arg = '/users,/users("first", "==", "Nathan"),users';
        var expected = [{ collection: '/users', queries: null }, { collection: '/users', queries: '("first", "==", "Nathan")' }];
        expect(parseArgs_1.parseCollectionsFromArgs(arg)).toEqual(expected);
    });
    it('parseCollectionGroupsFromArgs', function () {
        var arg1 = 'users,twitterFollowers';
        var expected1 = [
            { collectionGroup: 'users', queries: null },
            { collectionGroup: 'twitterFollowers', queries: null }
        ];
        expect(parseArgs_1.parseCollectionGroupsFromArgs(arg1)).toEqual(expected1);
        var arg2 = 'twitterFollowers,twitterFollowers("id", "===", "5")';
        var expected2 = [
            { collectionGroup: 'twitterFollowers', queries: null },
            { collectionGroup: 'twitterFollowers', queries: '("id", "===", "5")' }
        ];
        expect(parseArgs_1.parseCollectionGroupsFromArgs(arg2)).toEqual(expected2);
        var arg3 = '/users';
        var expected3 = [
            { collectionGroup: 'users', queries: null },
        ];
        expect(function () { return parseArgs_1.parseCollectionGroupsFromArgs(arg3); }).toThrowError('Collection Group must not contain slashes');
    });
});
