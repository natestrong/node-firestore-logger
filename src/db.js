"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = void 0;
const firebase_1 = __importDefault(require("firebase"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let firestoreConfigs;
let loggerConfigs;
try {
    loggerConfigs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'logger-config.json'), 'utf8'));
    const pathToFirestoreConfigs = loggerConfigs.pathToCredentials;
    firestoreConfigs = JSON.parse(fs.readFileSync(pathToFirestoreConfigs, 'utf8'));
}
catch (err) {
    console.error(err);
}
const app = firebase_1.default.initializeApp(firestoreConfigs);
exports.firestore = app.firestore();
//# sourceMappingURL=db.js.map