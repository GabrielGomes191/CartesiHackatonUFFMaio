import { Contract } from "./abi";
/**
 * Read address from json file
 * @param path Path of file with address in json file
 * @returns address or undefined if file does not exist
 */
export declare const readAddressFromFile: (path: string | undefined) => string | undefined;
/**
 * Read object from json file
 * @param path Path of file with object in json file
 * @returns object or undefined if file does not exist
 */
export declare const readObjectFromFile: (path: string | undefined) => any | undefined;
/**
 * Read contract from json file
 * @param path Path of file with Contract in json file
 * @returns The Contract or undefined if file does not exist
 */
export declare const readContractFromFile: (path: string | undefined) => Contract;
export declare const readAllContractsFromDir: (...paths: string[]) => Record<string, Contract>;
