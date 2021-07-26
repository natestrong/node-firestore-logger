import {ICollection} from "./models/ICollection";

export function validatePresets(collections: ICollection[], collectionGroups: ICollection[], presetArgs: string[], presets: ICollection[]) {
    const newCollection = [...collections, ...presets.filter(preset => !preset.group && presetArgs.includes(preset.name))];
    const newCollectionGroup = [...collections, ...presets.filter(preset => preset.group && presetArgs.includes(preset.name))];
    return [newCollection, newCollectionGroup];
}
