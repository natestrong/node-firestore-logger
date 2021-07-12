"use strict";
exports.__esModule = true;
exports.logCollectionsInit = exports.log = void 0;
function log(value) {
    console.log(value);
}
exports.log = log;
function logCollectionsInit() {
    var collections = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        collections[_i] = arguments[_i];
    }
    for (var _a = 0, collections_1 = collections; _a < collections_1.length; _a++) {
        var collection = collections_1[_a];
        module.exports.log("Watching Collection" + (collection.group ? ' Group' : '') + ": " + collection.path + " " + (collection.queries.length ?
            'with queries: ' + collection.queries : ''));
    }
}
exports.logCollectionsInit = logCollectionsInit;
//# sourceMappingURL=logger.js.map