"use strict";
exports.__esModule = true;
exports.parsePathsFromArgs = void 0;
function parsePathsFromArgs(pathsFromArgs) {
    var tokens = pathsFromArgs.split(',');
    var paths = [];
    tokens.forEach(this.tokenToPath);
    return paths;
}
exports.parsePathsFromArgs = parsePathsFromArgs;
/**
 * @param token - The string passed in from user args, such as: "/user('name', ==, 'Nathan')"
 */
function tokenToPath(token) {
    return {
        path: token.split('(')[0],
        collectionGroup: false,
        queries: token.split('(')[1]
    };
}
//# sourceMappingURL=parsePaths.js.map