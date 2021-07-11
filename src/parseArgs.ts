import {ICollection, ICollectionGroup} from "./models/path";

export function parseCollectionsFromArgs(collectionsFromArgs: string): ICollection[] {
    const tokens = collectionsFromArgs.split(',');
    return tokens.map(this._convertTokenToCollection);
}

/**
 * @param token - The string passed in from user args, such as: "/user('name', ==, 'Nathan')"
 */
export function _convertTokenToCollection(token: string): ICollection {
    return {
        path: token.split('(')[0],
        queries: token.split('(')[1].padStart(1, '(')
    };
}

// export function parseCollectionGroupsFromArgs(collectionGroupsFromArgs: string): ICollectionGroup[] {
//     const tokens = collectionGroupsFromArgs.split(',');
//     const paths: ICollection[] = [];
//     tokens.forEach(this._convertTokenToCollection);
//     return paths;
// }
