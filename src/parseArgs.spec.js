"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseArgs_1 = require("./parseArgs");
describe('parseArgs', function () {
    it('should validate that some collections are to be operated on via args', function () {
        expect(function () { return parseArgs_1.validateCollections('', ''); })
            .toThrowError('Must supply a collection or collection group to watch. Use --help for more info.');
    });
    it('should return validated collections', function () {
        expect(parseArgs_1.validateCollections('/users("first", "==", "Nathan")("last", "==", "Nathan"),/groups("id", ">", 100)', 'twitterFollowers("id", ">", 10000)("name", "==", "Leo Messi")'))
            .toEqual([
            [
                { path: '/users', queries: ['("first", "==", "Nathan")', '("last", "==", "Nathan")'] },
                { path: '/groups', queries: ['("id", ">", 100)'] }
            ],
            [
                { path: 'twitterFollowers', queries: ['("id", ">", 10000)', '("name", "==", "Leo Messi")'], group: true }
            ]
        ]);
    });
    it('should convert args to Collection arrays', function () {
        expect(parseArgs_1.parseCollectionsFromArgs('/users,/users("first", "==", "Nathan")'))
            .toEqual([
            { path: '/users', queries: [] },
            { path: '/users', queries: ['("first", "==", "Nathan")'] }
        ]);
    });
    it('should parse empty string or null values as empty arrays', function () {
        expect(parseArgs_1.parseCollectionsFromArgs('')).toEqual([]);
        expect(parseArgs_1.parseCollectionsFromArgs(null)).toEqual([]);
    });
    it('should parse collections with multiple queries', function () {
        expect(parseArgs_1.parseCollectionsFromArgs('/users("first", "==", "Nathan")("last", "==", "Nathan"),/groups("id", ">", 100)'))
            .toEqual([
            { path: '/users', queries: ['("first", "==", "Nathan")', '("last", "==", "Nathan")'] },
            { path: '/groups', queries: ['("id", ">", 100)'] },
        ]);
    });
    it('should return unique Collections only', function () {
        expect(parseArgs_1.parseCollectionsFromArgs('/users("first", "==", "Nathan"),/groups,/users("first", "==", "Nathan")'))
            .toEqual([
            { path: '/users', queries: ['("first", "==", "Nathan")'] },
            { path: '/groups', queries: [] }
        ]);
    });
    it('should validate that group collections do not have "/"', function () {
        expect(function () { return parseArgs_1.parseCollectionsFromArgs('/users,twitterFollowers', true); })
            .toThrowError('collectionGroups can not contain "/"');
    });
});
