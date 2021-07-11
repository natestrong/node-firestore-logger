import {ICollection, ICollectionGroup} from "./models/collection";

export function parseCollectionsFromArgs(arg: string): ICollection[] {
    const tokens = arg.split(',');
    return tokens.map(this._convertTokenToCollection);
}

/**
 * @param token - The string passed in from user args, such as: "/user('name', ==, 'Nathan')"
 */
export function _convertTokenToCollection(token: string): ICollection {
    return {
        path: token.split('(')[0],
        queries: token.split('(')[1] ? '(' + token.split('(')[1] : null
    };
}

// export function parseCollectionGroupsFromArgs(collectionGroupsFromArgs: string): ICollectionGroup[] {
//     const tokens = collectionGroupsFromArgs.split(',');
//     const paths: ICollection[] = [];
//     tokens.forEach(this._convertTokenToCollection);
//     return paths;
// }
