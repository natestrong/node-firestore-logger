"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseArgs_1 = require("./parseArgs");
describe('parseArgs', function () {
    it('parseCollectionsFromArgs converts given args as strings to an array of ', function () {
        var arg = '/users,/users("first", "==", "Nathan")';
        var expected = [{ path: '/users', queries: null }, { path: '/users', queries: '("first", "==", "Nathan")' }];
        expect(parseArgs_1.parseCollectionsFromArgs(arg)).toEqual(expected);
    });
    it('_convertTokenToCollection converts string to ICollection object', function () {
        var token1 = '/users';
        var expected1 = { path: '/users', queries: null };
        expect(parseArgs_1._convertTokenToCollection(token1)).toEqual(expected1);
        var token2 = '/users("first", "==", "Nathan")';
        var expected2 = { path: '/users', queries: '("first", "==", "Nathan")' };
        expect(parseArgs_1._convertTokenToCollection(token2)).toEqual(expected2);
    });
});
