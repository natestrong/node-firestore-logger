"use strict";
exports.__esModule = true;
exports._convertTokenToCollection = exports.parseCollectionsFromArgs = void 0;
function parseCollectionsFromArgs(arg) {
    var tokens = arg.split(',');
    return tokens.map(this._convertTokenToCollection);
}
exports.parseCollectionsFromArgs = parseCollectionsFromArgs;
/**
 * @param token - The string passed in from user args, such as: "/user('name', ==, 'Nathan')"
 */
function _convertTokenToCollection(token) {
    return {
        path: token.split('(')[0],
        queries: token.split('(')[1] ? '(' + token.split('(')[1] : null
    };
}
exports._convertTokenToCollection = _convertTokenToCollection;
// export function parseCollectionGroupsFromArgs(collectionGroupsFromArgs: string): ICollectionGroup[] {
//     const tokens = collectionGroupsFromArgs.split(',');
//     const paths: ICollection[] = [];
//     tokens.forEach(this._convertTokenToCollection);
//     return paths;
// }
//# sourceMappingURL=parseArgs.js.map