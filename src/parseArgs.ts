import {ICollection, ICollectionGroup} from "./models/collection";
import * as _ from 'lodash';

/**
 *
 * @param arg - String of comma separated collection queries, such as: '/users,/users("first", "==", "Nathan")'
 */
export function parseCollectionsFromArgs(arg: string): ICollection[] {
    const regex = /(?<!["']),/g;
    const tokens = arg.split(regex);
    const collections = tokens.map(_convertTokenToCollection);
    return _.uniqWith(collections, _.isEqual);
}

function _convertTokenToCollection(token: string): ICollection {
    const tokens = token.split('(');
    const path = tokens[0].startsWith('/') ? tokens[0] : '/' + tokens[0];
    return {
        collection: path,
        queries: tokens[1] ? '(' + tokens[1] : null
    };
}

export function parseCollectionGroupsFromArgs(arg: string): ICollectionGroup[] {
    const regex = /(?<!["']),/g;
    const tokens = arg.split(regex);
    const collections = tokens.map(_convertTokenToCollectionGroup);
    return _.uniqWith(collections, _.isEqual);
}

function _convertTokenToCollectionGroup(token: string): ICollectionGroup {
    const tokens = token.split('(');
    const path = tokens[0]
    if (path.includes('/')) {
        throw new Error('Collection Group must not contain slashes');
    }
    return {
        collectionGroup: path,
        queries: tokens[1] ? '(' + tokens[1] : null
    };
}
