"use strict";
exports.__esModule = true;
exports.parseCollectionGroupsFromArgs = exports.parseCollectionsFromArgs = void 0;
var _ = require("lodash");
/**
 *
 * @param arg - String of comma separated collection queries, such as: '/users,/users("first", "==", "Nathan")'
 */
function parseCollectionsFromArgs(arg) {
    var regex = /(?<!["']),/g;
    var tokens = arg.split(regex);
    var collections = tokens.map(_convertTokenToCollection);
    return _.uniqWith(collections, _.isEqual);
}
exports.parseCollectionsFromArgs = parseCollectionsFromArgs;
function _convertTokenToCollection(token) {
    var tokens = token.split('(');
    var path = tokens[0].startsWith('/') ? tokens[0] : '/' + tokens[0];
    return {
        collection: path,
        queries: tokens[1] ? '(' + tokens[1] : null
    };
}
function parseCollectionGroupsFromArgs(arg) {
    var regex = /(?<!["']),/g;
    var tokens = arg.split(regex);
    var collections = tokens.map(_convertTokenToCollectionGroup);
    return _.uniqWith(collections, _.isEqual);
}
exports.parseCollectionGroupsFromArgs = parseCollectionGroupsFromArgs;
function _convertTokenToCollectionGroup(token) {
    var tokens = token.split('(');
    var path = tokens[0];
    if (path.includes('/')) {
        throw new Error('Collection Group must not contain slashes');
    }
    return {
        collectionGroup: path,
        queries: tokens[1] ? '(' + tokens[1] : null
    };
}
//# sourceMappingURL=parseArgs.js.map