import {_convertTokenToCollection, parseCollectionsFromArgs} from "./parseArgs";

describe('parseArgs', () => {
    it('parseCollectionsFromArgs converts given args as strings to an array of ', () => {
        const arg = '/users,/users("first", "==", "Nathan")';
        const expected = [{path: '/users', queries: null}, {path: '/users', queries: '("first", "==", "Nathan")'}];
        expect(parseCollectionsFromArgs(arg)).toEqual(expected);
    });

    it('_convertTokenToCollection converts string to ICollection object', () => {
        const token1 = '/users';
        const expected1 = {path: '/users', queries: null};
        expect(_convertTokenToCollection(token1)).toEqual(expected1);

        const token2 = '/users("first", "==", "Nathan")';
        const expected2 = {path: '/users', queries: '("first", "==", "Nathan")'};
        expect(_convertTokenToCollection(token2)).toEqual(expected2);
    });
});
