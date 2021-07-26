import {DEFAULT_CONFIGS, DEFAULT_PRESET, IConfig} from "./models/IConfigs";
import fs from "fs";
import path from "path";

const CONFIG_FILENAME = 'firestore-logger-config.json';

export default function getConfigs(): IConfig {
    const configFile = findConfigFile();
    const configs: IConfig = parseConfigs(configFile);
    const configsWithPresets = parsePresetsToICollections(configs);
    const configsWithFirestore = getFirestoreConfigs(configsWithPresets);
    return configsWithFirestore;
}

function findConfigFile(): any {
    try {
        return fs.readFileSync(path.join(__dirname, '..', CONFIG_FILENAME), 'utf8');
    } catch (err) {
        throw new Error(`No ${CONFIG_FILENAME} found`);
    }
}

export function parseConfigs(configFile: string) {
    let configs: IConfig = JSON.parse(configFile);

    if (!configs.pathToCredentials) {
        throw new Error('Missing pathToCredentials in the firestore-logger-config.json');
    }
    configs = {...DEFAULT_CONFIGS, ...configs};
    return configs;
}

function getFirestoreConfigs(configs: IConfig): IConfig {
    let firestoreConfigs;
    try {
        firestoreConfigs = JSON.parse(fs.readFileSync(configs.pathToCredentials, 'utf8'));
    } catch (err) {
        console.error(err);
    }
    return {...configs, firestoreConfigs};
}

export function parsePresetsToICollections(configs: IConfig) {
    const newConfigs = {...configs};
    newConfigs.presets = configs.presets.map(preset => ({...DEFAULT_PRESET, ...preset}));
    return newConfigs;
}

getConfigs();
