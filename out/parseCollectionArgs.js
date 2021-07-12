"use strict";
exports.__esModule = true;
exports.parseCollectionsFromArgs = exports.validateCollections = void 0;
var _ = require("lodash");
function validateCollections(collectionsArg, collectionsGroupsArg) {
    var collections = parseCollectionsFromArgs(collectionsArg);
    var collectionGroups = parseCollectionsFromArgs(collectionsGroupsArg, true);
    if (!collections.length && !collectionGroups.length) {
        throw new Error('Must supply a collection or collection group to watch. Use --help for more info.');
    }
    return [collections, collectionGroups];
}
exports.validateCollections = validateCollections;
/**
 * @param arg - String of comma separated collection queries, such as: '/users,/users("first", "==", "Nathan")'
 * @param groups - Whether or not to treat collection paths as collectionGroup paths, which do not allow '/'s
 */
function parseCollectionsFromArgs(arg, groups) {
    if (groups === void 0) { groups = false; }
    if (!arg || !arg.length) {
        return [];
    }
    var tokens = arg.split(/(?<!["']),/g);
    var collections = tokens.map(_convertTokenToCollection);
    if (groups) {
        collections.forEach(_validateGroupCollectionPaths);
    }
    return _.uniqWith(collections, _.isEqual);
}
exports.parseCollectionsFromArgs = parseCollectionsFromArgs;
function _convertTokenToCollection(token) {
    var path = token.split('(')[0];
    return {
        path: path,
        queries: _getQueriesFromToken(token)
    };
}
function _getQueriesFromToken(token) {
    var match = token.match(/\(.+/);
    if (!match) {
        return [];
    }
    return match[0].match(/\(.*?\)/g);
}
function _validateGroupCollectionPaths(collection) {
    if (collection.path.includes('/')) {
        throw new Error('collectionGroups can not contain "/"');
    }
    collection.group = true;
}
//# sourceMappingURL=parseCollectionArgs.js.map