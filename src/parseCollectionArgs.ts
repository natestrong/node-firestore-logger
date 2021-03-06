import {ICollection, IQuery} from "./models/ICollection";
import * as _ from 'lodash';
import firebase from "firebase";
import {FieldPath} from '@google-cloud/firestore';
import {WhereFilterOp} from '@google-cloud/firestore';

export function validateCollectionArgs(collectionsArg, collectionsGroupsArg): [ICollection[], ICollection[]] {
    let collections = parseCollectionsFromArgs(collectionsArg);
    let collectionGroups = parseCollectionsFromArgs(collectionsGroupsArg, true);

    if (!collections.length && !collectionGroups.length) {
        throw new Error('Must supply a collection or collection group to watch. Use --help for more info.');
    }

    return [collections, collectionGroups];
}

/**
 * @param arg - String of comma separated collection queries, such as: '/users,/users("first", "==", "Nathan")["first"]'
 * @param groups - Whether or not to treat collection paths as collectionGroup paths, which do not allow '/'s
 */
export function parseCollectionsFromArgs(arg: string, groups: boolean = false): ICollection[] {
    if (!arg || !arg.length) {
        return [];
    }
    const tokens = arg.split(/(?<!["']),/g);
    const collections = tokens.map(_convertTokenToCollection);

    if (groups) {
        collections.forEach(validateGroupCollectionPaths);
    }

    return _.uniqWith(collections, _.isEqual);
}

function _convertTokenToCollection(token: string): ICollection {
    let path = token.split('(')[0];
    path = path.split('[')[0];
    return {
        path: path,
        queries: getQueriesFromToken(token),
        properties: getPropertiesFromToken(token),
    };
}

function getPropertiesFromToken(token: string): string[] {
    const regexp = /(\[.*])/gm

    let properties = [];
    const match = token.match(regexp);
    if (match) {
        properties = JSON.parse(match[0]);
    }
    return properties;
}

function getQueriesFromToken(token: string): IQuery[] | [] {
    const match = token.match(/\(.+/);
    if (!match) {
        return [];
    }
    let queries = match[0].match(/\(.*?\)/g);
    return queries.map(stringToQuery);
}

export function stringToQuery(str: string): IQuery {
    return JSON.parse(str
        .replace('(', '[')
        .replace(')', ']'));
}

function validateGroupCollectionPaths(collection: ICollection) {
    if (collection.path.includes('/')) {
        throw new Error('collectionGroups can not contain "/"');
    }
    collection.group = true;
}
