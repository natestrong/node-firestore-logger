import firebase from "firebase";
import {FieldPath} from '@google-cloud/firestore';
import {WhereFilterOp} from '@google-cloud/firestore';

export type IQuery = [(string | FieldPath), WhereFilterOp, string | number];

export interface ICollection {
    path: string,
    queries: any,
    group?: boolean,
}

export interface IMessage {
    message: string,
    formatting: IFormat,
}

export interface IFormat {
    format?: FORMAT
    fg?: FGCOLORS
    bg?: BGCOLORS
}

export enum FORMAT {
    Reset = "\x1b[0m",
    Bright = "\x1b[1m",
    Dim = "\x1b[2m",
    Underscore = "\x1b[4m",
    Blink = "\x1b[5m",
    Reverse = "\x1b[7m",
    Hidden = "\x1b[8m",
}

export enum FGCOLORS {
    FgBlack = "\x1b[30m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
    FgMagenta = "\x1b[35m",
    FgCyan = "\x1b[36m",
    FgWhite = "\x1b[37m",
}

export enum BGCOLORS {
    BgBlack = "\x1b[40m",
    BgRed = "\x1b[41m",
    BgGreen = "\x1b[42m",
    BgYellow = "\x1b[43m",
    BgBlue = "\x1b[44m",
    BgMagenta = "\x1b[45m",
    BgCyan = "\x1b[46m",
    BgWhite = "\x1b[47m",
}
