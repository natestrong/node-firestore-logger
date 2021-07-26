import {parseConfigs} from "./configs";
import {IConfig} from "./models/IConfigs";

describe('configs', () => {
    const configsString = `{
        "pathToCredentials": "/Users/nstrong/Desktop/firestore-logger.json",
        "emulator": {
            "useEmulator": true,
            "host": "localhost",
            "port": 8080
        },
        "bufferUpdates": 1000,
        "presets": [
            {
                "name": "users",
                "path": "/users"
            },
            {
                "name": "lastNameStartsWithZ",
                "path": "/users",
                "group": false,
                "queries": [
                    ["last", "<", "m"],
                    ["first", "<", "m"]
                ]
            }
        ]
    }`;

    const parsedConfigs: IConfig = {
        bufferUpdates: 1000,
        emulator: {useEmulator: true, host: 'localhost', port: 8080},
        presets: [
            {name: 'users', path: '/users'},
            {
                name: 'lastNameStartsWithZ',
                path: '/users',
                group: false,
                queries: [['last', '<', 'm'], ['first', '<', 'm']]
            }
        ],
        pathToCredentials: '/Users/nstrong/Desktop/firestore-logger.json'
    };

    it('should parse config into IConfig', () => {
        expect(parseConfigs(configsString)).toEqual(parsedConfigs);
    });
});
