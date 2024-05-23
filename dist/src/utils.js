"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAllContractsFromDir = exports.readContractFromFile = exports.readObjectFromFile = exports.readAddressFromFile = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * Read address from json file
 * @param path Path of file with address in json file
 * @returns address or undefined if file does not exist
 */
const readAddressFromFile = (path) => {
    var _a;
    return (_a = (0, exports.readObjectFromFile)(path)) === null || _a === void 0 ? void 0 : _a.address;
};
exports.readAddressFromFile = readAddressFromFile;
/**
 * Read object from json file
 * @param path Path of file with object in json file
 * @returns object or undefined if file does not exist
 */
const readObjectFromFile = (path) => {
    if (path && fs_1.default.existsSync(path)) {
        return JSON.parse(fs_1.default.readFileSync(path, "utf8"));
    }
};
exports.readObjectFromFile = readObjectFromFile;
/**
 * Read contract from json file
 * @param path Path of file with Contract in json file
 * @returns The Contract or undefined if file does not exist
 */
const readContractFromFile = (path) => {
    return (0, exports.readObjectFromFile)(path);
};
exports.readContractFromFile = readContractFromFile;
const readAllContractsFromDir = (...paths) => {
    const contracts = {};
    for (let i = 0; i < paths.length; i++) {
        let path = paths[i];
        if (path && fs_1.default.existsSync(path)) {
            const deployContents = fs_1.default.readdirSync(path, { withFileTypes: true });
            deployContents.forEach(deployEntry => {
                if (deployEntry.isFile()) {
                    const filename = deployEntry.name;
                    if (filename.endsWith(".json") && filename !== "dapp.json") {
                        const contractName = filename.substring(0, filename.lastIndexOf("."));
                        contracts[contractName] = (0, exports.readContractFromFile)(`${path}/${filename}`);
                    }
                }
            });
        }
    }
    return contracts;
};
exports.readAllContractsFromDir = readAllContractsFromDir;
