import {ICollection, IQuery} from "./ICollection";

export interface IConfig {
    pathToCredentials: string
    emulator: IEmulator
    bufferUpdates: number
    firestoreConfigs?: any
    presets: Partial<ICollection>[]
}

interface IEmulator {
    host?: string
    port?: number
    useEmulator: boolean
}

export const DEFAULT_CONFIGS = {
    bufferUpdates: 0,
    emulator: {
        useEmulator: false,
        host: "localhost",
        port: 8080
    },
    presets: []
};

export const DEFAULT_PRESET = {
    group: false,
    queries: [],
    properties: [],
}
