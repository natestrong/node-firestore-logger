import {ICollection} from "./models/collection";
import * as _ from 'lodash';
import firebase from "firebase";
import FieldPath = firebase.firestore.FieldPath;
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export function validateCollections(collectionsArg, collectionsGroupsArg): [ICollection[], ICollection[]] {
    let collections = parseCollectionsFromArgs(collectionsArg);
    let collectionGroups = parseCollectionsFromArgs(collectionsGroupsArg, true);

    if (!collections.length && !collectionGroups.length) {
        throw new Error('Must supply a collection or collection group to watch. Use --help for more info.');
    }

    return [collections, collectionGroups];
}

/**
 * @param arg - String of comma separated collection queries, such as: '/users,/users("first", "==", "Nathan")'
 * @param groups - Whether or not to treat collection paths as collectionGroup paths, which do not allow '/'s
 */
export function parseCollectionsFromArgs(arg: string, groups: boolean = false): ICollection[] {
    if (!arg || !arg.length) {
        return [];
    }
    const tokens = arg.split(/(?<!["']),/g);
    const collections = tokens.map(_convertTokenToCollection);

    if (groups) {
        collections.forEach(_validateGroupCollectionPaths);
    }

    return _.uniqWith(collections, _.isEqual);
}

function _convertTokenToCollection(token: string): ICollection {
    let path = token.split('(')[0];
    return {
        path: path,
        queries: _getQueriesFromToken(token)
    };
}

function _getQueriesFromToken(token: string): [[(string | FieldPath), WhereFilterOp, string]] | [] {
    const match = token.match(/\(.+/);
    if (!match) {
        return [];
    }
    let queries = match[0].match(/\(.*?\)/g);
    return queries
        .map(query => JSON.parse(query
            .replace('(', '[')
            .replace(')', ']'))) as [[(string | FieldPath), WhereFilterOp, string]];
}

function _validateGroupCollectionPaths(collection: ICollection) {
    if (collection.path.includes('/')) {
        throw new Error('collectionGroups can not contain "/"');
    }
    collection.group = true;
}
